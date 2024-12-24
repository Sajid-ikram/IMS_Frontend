import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface Comment {
  _id: string;
  commentBy: string;
  comment: string;
  commentor: string;
}

interface CommentSectionProps {
  comments: Comment[];
}

const mockComments = {
  _id: "1",
  commentBy: "34234edd234234",
  commentor: "Charles Devis",
  comment:
    "This is a brilliant idea! I would love to see this implemented in my city.",
};

export default function CommentSection({
  comments: initialComments,
}: CommentSectionProps) {
  const { ideaId } = useParams<{ ideaId: string }>();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const { user } = useAuth();

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(
        `https://ism-server.onrender.com/api/ideas/${ideaId}`
      );
      if (!response.ok) {
        const message = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, ${message}`);
      }
      const data = await response.json();
      setComments(data.comments);
    } catch (err: unknown) {
      console.error("Failed to fetch comments:", err);
    }
  }, [ideaId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (newComment.trim() && user) {
        try {
          const response = await fetch(
            `https://ism-server.onrender.com/api/ideas/${ideaId}/comment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                comment: newComment,
                userId: user._id,
                userName: user.name,
              }),
            }
          );

          if (!response.ok) {
            const message = await response.text();
            throw new Error(
              `HTTP error! Status: ${response.status}, ${message}`
            );
          }

          const data = await response.json();

          setComments((prevComments) => [...prevComments, data]);
          // onAddComment(newComment);
          fetchComments();
          setNewComment("");
        } catch (err) {
          console.error("Error submitting comment:", err);
        }
      }
    },
    [newComment, user, ideaId, fetchComments]
  );

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
        />
        <div className="flex justify-end">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Comment
          </motion.button>
        </div>
      </form>

      <div className="space-y-6">
        <AnimatePresence>
          {comments
            .map((comment) => (
              <motion.div
                key={comment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  {/* <img
                    // src={comment.author.avatar}
                    alt={comment.commentBy}
                    className="w-10 h-10 rounded-full object-cover"
                  /> */}
                  <p className="text-white text-xs border-2 rounded-full w-8 h-8 p-2 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
                    {comment?.commentor
                      ?.split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </p>
                  <div>
                    <p className="font-medium text-white">
                      {comment.commentor}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300">{comment.comment}</p>
              </motion.div>
            ))
            .reverse()}
          <motion.div
            key={mockComments._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 rounded-lg bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
                alt={mockComments.commentBy}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-white">
                  {mockComments.commentor}
                </p>
              </div>
            </div>
            <p className="text-gray-300">{mockComments.comment}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
