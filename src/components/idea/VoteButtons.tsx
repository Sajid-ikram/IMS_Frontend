import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";

interface VoteButtonsProps {
  initialVotes: number;
  onVote: (type: "up" | null) => void;
}

export default function VoteButtons({
  initialVotes,
  onVote,
}: VoteButtonsProps) {
  const { ideaId } = useParams<{ ideaId: string }>();
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<boolean>(false);
  const { user } = useAuth();

  const handleVote = useCallback(async () => {
    if (!user) {
      return console.error("User not authenticated.");
    }
    try {
      const response = await fetch(
        `https://ism-server.onrender.com/api/ideas/${ideaId}/vote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
          }),
        }
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, ${message}`);
      }

      const data = await response.json();
      setVotes(data.votes);
      setUserVote(!userVote);
      onVote(userVote ? null : "up");
    } catch (error) {
      console.error("Failed to vote on idea:", error);
    }
  }, [ideaId, onVote, user, userVote]);

  return (
    <div className="flex items-center gap-4">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleVote}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          userVote
            ? "bg-red-500/20 text-red-500"
            : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Heart className="w-5 h-5" />
        <span>{votes}</span>
      </motion.button>
    </div>
  );
}
