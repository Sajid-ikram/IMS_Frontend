import { useState, useEffect, lazy, Suspense, useCallback } from "react";
import { motion } from "framer-motion";
import IdeaForm from "../components/share/IdeaForm";
import PremiumCard from "../components/share/PremiumCard";
import TrendingTopics from "../components/share/TrendingTopics";
import LoadingSpinner from "../components/share/LoadingSpinner";
import { Idea } from "../types/Idea";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const IdeaPost = lazy(() => import("../components/share/IdeaPost"));

export default function SharePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [postedIdeas, setPostedIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!user) navigate("/login");

  const fetchMyIdeas = useCallback(async () => {
    setLoading(true);
    try {
      if (!user?._id) {
        throw new Error("User is not authenticated");
      }
      const response = await fetch(
        `https://ism-server.onrender.com/api/ideas/${user._id}/my-ideas`
      );
      if (!response.ok) {
        const message = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, ${message}`);
      }
      const data = await response.json();
      setPostedIdeas(data);
    } catch (error: unknown) {
      let errorMessage = `Failed to fetch ideas.`;
      if (error instanceof Error) {
        errorMessage = `${errorMessage} ${error.message}`;
      } else if (typeof error === "string") {
        errorMessage = `${errorMessage} ${error}`;
      } else {
        errorMessage = `${errorMessage} ${JSON.stringify(error)}`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchMyIdeas();
  }, [fetchMyIdeas]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-24 pb-12"
      >
        <div className="text-center text-red-500">Error: {error}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 pt-24 pb-12"
    >
      <div className="grid lg:max-w-7xl mx-auto grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <IdeaForm />
          <Suspense fallback={<LoadingSpinner />}>
            {postedIdeas.map((idea) => (
              <Link key={idea._id} to={`/idea/${idea._id}`}>
                <IdeaPost {...idea} />
              </Link>
            ))}
          </Suspense>
        </div>
        <div className="space-y-6">
          <PremiumCard />
          <TrendingTopics />
        </div>
      </div>
    </motion.div>
  );
}
