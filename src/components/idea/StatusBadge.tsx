import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Users, Clock } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type StatusType =
  | "collaborate"
  | "evaluating"
  | "Idea Pending"
  | "Idea in Progress"
  | "Idea Evaluated"
  | string;

interface StatusBadgeProps {
  type: StatusType;
  ideaName: string;
  ideaId: string;
  onStatusChange: (
    status: "Idea Pending" | "Idea in Progress" | "Idea Evaluated"
  ) => void;
}

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

// interface Collaborator {
//     _id: string;
//     name: string;
//     email: string;
// }

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  ideaName: string;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  ideaName,
  onConfirm,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-900/70 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-lg max-w-md"
      >
        <p className="text-white text-lg font-medium mb-6">
          Confirm collaboration request
        </p>
        <p className="text-white mb-6">
          Are you sure you want to send the collaboration request in "{ideaName}
          "?
        </p>
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

const statusOptions: (
  | "Idea Pending"
  | "Idea in Progress"
  | "Idea Evaluated"
)[] = ["Idea Pending", "Idea in Progress", "Idea Evaluated"];

export default function StatusBadge({
  type,
  ideaName,
  ideaId,
  onStatusChange,
}: StatusBadgeProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState<StatusType>(type);
  const Navigate = useNavigate();

  const statusConfig: {
    [key in StatusType]: {
      icon?: IconComponent;
      text: string;
      colors: string;
    };
  } = {
    collaborate: {
      icon: Users,
      text: "Collaborate",
      colors: "bg-green-500/10 text-green-400 border-green-500/20",
    },
    evaluating: {
      icon: Clock,
      text: "Being Evaluated",
      colors: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    },
    "Idea Pending": {
      text: "Idea Pending",
      colors: "bg-gray-400 text-black",
    },
    "Idea in Progress": {
      text: "Idea in Progress",
      colors: "bg-yellow-400 text-gray-900",
    },
    "Idea Evaluated": {
      text: "Idea Evaluated",
      colors: "bg-green-400 text-gray-900",
    },
  };

  const { icon: Icon, text, colors } = statusConfig[selectedStatus];

  const handleCollaborateClick = () => {
    if (type === "collaborate" && user) {
      setIsModalOpen(true);
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleStatusChange = useCallback(
    async (
      newStatus: "Idea Pending" | "Idea in Progress" | "Idea Evaluated"
    ) => {
      if (user) {
        try {
          const response = await fetch(
            `https://ism-server.onrender.com/api/ideas/${ideaId}/status`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user._id,
                status: newStatus,
              }),
            }
          );
          if (!response.ok) {
            const message = await response.text();
            throw new Error(
              `HTTP error! Status: ${response.status}, ${message}`
            );
          }
          setSelectedStatus(newStatus);
          onStatusChange(newStatus);
          setIsDropdownOpen(false);
        } catch (err) {
          console.error("Failed to change status", err);
        }
      }
    },
    [ideaId, onStatusChange, user]
  );

  const handleConfirmCollaboration = async () => {
    if (user) {
      try {
        const response = await fetch(
          `https://ism-server.onrender.com/api/ideas/${ideaId}/req-collaboration`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: user._id,
              name: user.name,
              email: user.email,
            }),
          }
        );
        if (!response.ok) {
          const message = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, ${message}`);
        }
        setIsModalOpen(false);
        Navigate(`/collaboration/${ideaId}`);
      } catch (err) {
        console.error("Failed to send collaboration request.", err);
      }
    }
  };

  const handleCancelCollaboration = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        onClick={handleCollaborateClick}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${colors} cursor-pointer`}
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span className="text-sm font-medium">{text}</span>
      </motion.div>

      <ConfirmationModal
        isOpen={type === "collaborate" && isModalOpen}
        onClose={handleCancelCollaboration}
        ideaName={ideaName}
        onConfirm={handleConfirmCollaboration}
      />

      {isDropdownOpen && type !== "collaborate" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full mt-1 right-0 w-48 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg z-10"
        >
          {statusOptions.map((statusOption) => (
            <motion.button
              key={statusOption}
              onClick={() => handleStatusChange(statusOption)}
              className="w-full text-left px-4 py-2 text-white hover:bg-white/10 block rounded-t-lg last:rounded-b-lg"
            >
              {statusOption}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
