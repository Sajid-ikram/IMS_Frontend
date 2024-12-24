import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../share/LoadingSpinner";

interface Collaborator {
  user: string;
  _id: string;
  name: string;
  email: string;
  role:
    | "General"
    | "Team Leader"
    | "Researcher"
    | "Developer"
    | "Designer"
    | "Analyst";
  status: "Pending" | "Accepted";
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  ideaName: string;
  onConfirm: () => void;
  username?: string;
  action?: "accept" | "reject" | null;
  confirmSource: "collaboration" | "statusChange";
}

const ConfirmationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  ideaName,
  onConfirm,
  username,
  action,
  confirmSource,
}) => {
  if (!isOpen) return null;

  let actionMessage = "";
  if (confirmSource === "collaboration") {
    actionMessage = `Are you sure you want to ${
      action === "accept" ? "accept" : "reject"
    } the collaboration request from ${username} for ${ideaName}?`;
  } else if (confirmSource === "statusChange") {
    actionMessage = `Are you sure you want to change the role for ${username} in ${ideaName}`;
  }

  return (
    <div className="fixed inset-0 bg-gray-900/70 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-lg max-w-md"
      >
        <p className="text-white text-lg font-medium mb-6">
          Confirm{" "}
          {confirmSource === "collaboration"
            ? "Collaboration request"
            : "Status change"}
        </p>
        <p className="text-white mb-6">{actionMessage}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-colors"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function CollaborationTable() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [selectedCollaborator, setSelectedCollaborator] =
    useState<Collaborator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<"accept" | "reject" | null>(null);
  const { user } = useAuth();
  const { ideaId } = useParams<{ ideaId: string }>();
  const [selectedRole, setSelectedRole] = useState<
    | "General"
    | "Team Leader"
    | "Researcher"
    | "Developer"
    | "Designer"
    | "Analyst"
    | null
  >(null);

  const fetchCollaborators = useCallback(async () => {
    setLoading(true);
    try {
      if (!ideaId) {
        throw new Error("Idea ID is not provided.");
      }

      const response = await fetch(
        `https://ism-server.onrender.com/api/ideas/${ideaId}/collaborators`
      );
      if (!response.ok) {
        const message = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, ${message}`);
      }
      const data = await response.json();
      setCollaborators(data.collaborators);
      setCurrentUser(data.author?._id);
    } catch (err: unknown) {
      let errorMessage = "Failed to fetch collaborators";
      if (err instanceof Error) {
        errorMessage = `${errorMessage}, ${err.message}`;
      } else if (typeof err === "string") {
        errorMessage = `${errorMessage}, ${err}`;
      } else {
        errorMessage = `${errorMessage}, ${JSON.stringify(err)}`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [ideaId]);

  useEffect(() => {
    fetchCollaborators();
  }, [fetchCollaborators]);

  const handleAction = (
    collaborator: Collaborator,
    actionType: "accept" | "reject"
  ) => {
    setSelectedCollaborator(collaborator);
    setAction(actionType);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (
    collaborator: Collaborator,
    newRole:
      | "General"
      | "Team Leader"
      | "Researcher"
      | "Developer"
      | "Designer"
      | "Analyst"
  ) => {
    if (!user) {
      return console.error("User is not authenticated.");
    }

    console.log(
      JSON.stringify({
        regionalUserId: user._id,
        collaboratorEmail: collaborator.email,
        newRole,
      })
    );

    try {
      const response = await fetch(
        `https://ism-server.onrender.com/api/ideas/${ideaId}/assign-role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            regionalUserId: user._id,
            collaboratorEmail: collaborator.email,
            newRole,
          }),
        }
      );
      if (!response.ok) {
        const message = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, ${message}`);
      }
    } catch (err) {
      console.error("Failed to change role", err);
    }
    fetchCollaborators();
    setSelectedRole(null);
  };

  const handleConfirm = useCallback(async () => {
    if (selectedCollaborator && action && user) {
      try {
        const response = await fetch(
          `https://ism-server.onrender.com/api/ideas/${ideaId}/collaborators`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              collaboratorId: selectedCollaborator.user,
              action,
              authorId: user._id,
            }),
          }
        );

        if (!response.ok) {
          const message = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, ${message}`);
        }

        if (action !== "accept") {
          setCollaborators((prev) =>
            prev.filter((req) => req._id !== selectedCollaborator._id)
          );
        }

        setIsModalOpen(false);
        setSelectedCollaborator(null);
        setAction(null);
        fetchCollaborators();
      } catch (error: unknown) {
        console.error("Failed to respond to collab request:", error);
      }
    }
  }, [action, ideaId, selectedCollaborator, user, fetchCollaborators]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRole(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                User
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Role
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Status
              </th>
              {user?._id === currentUser && (
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {collaborators?.map((collaborator) => (
                <motion.tr
                  key={collaborator._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="border-b border-white/10"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <p className="text-white text-xs border-2 rounded-full w-8 h-8 p-2 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
                        {collaborator?.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </p>
                      <div>
                        <div className="font-medium text-white">
                          {collaborator.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {collaborator.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">
                    {user?.role === "Regional" ? (
                      <div className="flex gap-2 items-center">
                        <select
                          // value={selectedRole || collaborator.role}
                          defaultValue={collaborator?.role}
                          onChange={(e) =>
                            setSelectedRole(
                              e.target.value as
                                | "General"
                                | "Team Leader"
                                | "Researcher"
                                | "Developer"
                                | "Designer"
                                | "Analyst"
                            )
                          }
                          className="bg-gray-600 rounded-md border border-white/10 py-1 px-2 text-white"
                        >
                          <option value="General">General</option>
                          <option value="Team Leader">Team Leader</option>
                          <option value="Researcher">Researcher</option>
                          <option value="Developer">Developer</option>
                          <option value="Designer">Designer</option>
                          <option value="Analyst">Analyst</option>
                        </select>
                        <button
                          onClick={() =>
                            handleStatusChange(
                              collaborator,
                              selectedRole || "General"
                            )
                          }
                          className="bg-green-500/10 rounded-md p-2 text-green-500 hover:bg-green-500/20 transition-colors"
                        >
                          Assign
                        </button>
                      </div>
                    ) : (
                      <div className="font-medium text-white">
                        {collaborator.role}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-white">
                    {collaborator.status}
                  </td>
                  {user?._id === currentUser &&
                    collaborator?.status !== "Accepted" && (
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleAction(collaborator, "accept")}
                            className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleAction(collaborator, "reject")}
                            className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        action={action}
        confirmSource="collaboration"
        username={selectedCollaborator?.name}
        ideaName=""
      />
    </div>
  );
}
