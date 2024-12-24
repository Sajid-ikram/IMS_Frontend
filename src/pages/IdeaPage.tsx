import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import LoadingSpinner from "../components/share/LoadingSpinner";
import VoteButtons from "../components/idea/VoteButtons";
import CommentSection from "../components/idea/CommentSection";
import StatusBadge from "../components/idea/StatusBadge";
import { convertGoogleDriveLink } from "../utils/convertGoogleDriveLink";
import { Idea } from "../types/Idea";
import { useAuth } from "../hooks/useAuth";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function IdeaPage() {
  const { ideaId } = useParams<{ ideaId: string }>();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [authorData, setAuthorData] = useState<User | undefined>(undefined);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) navigate("/login");

  const fetchIdea = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://ism-server.onrender.com/api/ideas/${ideaId}`
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, ${message}`);
      }
      const data: Idea = await response.json();

      setIdea(data);
    } catch (error: unknown) {
      console.error("Failed to fetch single idea", error);
    } finally {
      setLoading(false);
    }
  }, [ideaId]);

  const fetchAuthor = useCallback(async () => {
    try {
      if (idea) {
        const response = await fetch(
          `https://ism-server.onrender.com/api/users/${idea.author}`
        );

        if (!response.ok) {
          const message = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, ${message}`);
        }
        const data = await response.json();
        setAuthorData(data);
      }
    } catch (err: unknown) {
      console.error("Failed to fetch author data", err);
    }
  }, [idea]);

  useEffect(() => {
    fetchIdea();
  }, [fetchIdea]);

  useEffect(() => {
    fetchAuthor();
  }, [fetchAuthor]);

  if (loading) return <LoadingSpinner />;

  if (!idea) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen pt-24 pb-12 flex items-center justify-center"
      >
        <div className="text-white text-center"> Idea not found. </div>
      </motion.div>
    );
  }

  const handleStatusChange = (
    newStatus: "Idea Pending" | "Idea in Progress" | "Idea Evaluated"
  ) => {
    if (idea) {
      setIdea({ ...idea, status: newStatus });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12"
    >
      <div className="max-w-4xl mx-auto px-4">
        <Link
          to="/discover"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Discover
        </Link>

        <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
          <img
            src={convertGoogleDriveLink(idea.banner)}
            alt={idea.title}
            className="w-full h-[400px] object-cover"
          />

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              {authorData && (
                <div className="flex items-center gap-4">
                  <p className="text-white text-xs border-2 rounded-full w-8 h-8 p-2 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
                    {authorData?.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </p>
                  <div>
                    <h3 className="font-medium text-white">
                      {authorData?.name}
                    </h3>
                    <p className="text-xs font-light text-gray-300">
                      {idea.createdAt &&
                        formatDistanceToNow(new Date(idea.createdAt), {
                          addSuffix: true,
                        })}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                {user?.role !== "Employee" && (
                  <StatusBadge
                    ideaName={idea?.title}
                    ideaId={idea._id}
                    type="collaborate"
                    onStatusChange={handleStatusChange}
                  />
                )}
                {user?.role === "Innovation" && (
                  <StatusBadge
                    ideaName={idea?.title}
                    ideaId={idea._id}
                    type={idea.status}
                    onStatusChange={handleStatusChange}
                  />
                )}
              </div>
            </div>

            <h1 className="lg:text-2xl mb:text-xl font-bold text-white mb-4">
              {idea.title}
            </h1>
            <div
              className="text-gray-300 mb-8"
              dangerouslySetInnerHTML={{ __html: idea.content }}
            />
            <div className="flex items-center gap-4">
              <VoteButtons
                initialVotes={idea.votes}
                onVote={(type) => console.log("Voted:", type)}
              />
              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Comments</span>
              </button>
              <Link to={`/collaboration/${idea._id}`}>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
                  <Users className="w-5 h-5" />
                  <span>See Collaboration</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {showComments && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <CommentSection comments={idea.comments} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
