import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import IdeaGrid from "../components/discover/IdeaGrid";
import Pagination from "../components/discover/Pagination";
import LoadingSpinner from "../components/share/LoadingSpinner";
import { Idea } from "../types/Idea";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface IdeasResponse {
  ideas: Idea[];
  totalIdeas: number;
  currentPage: number;
  totalPages: number;
}

const ITEMS_PER_PAGE = 12;

export default function DiscoverPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) navigate("/login");

  const fetchIdeas = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://ism-server.onrender.com/api/ideas?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );
      if (!response.ok) {
        const message = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, ${message}`);
      }

      const data: IdeasResponse = await response.json();
      setIdeas(data.ideas);
      setTotalPages(data.totalPages);
    } catch (err: unknown) {
      let errorMessage = "Failed to fetch ideas";
      if (err instanceof Error) {
        errorMessage = `Failed to fetch ideas, ${err.message}`;
      } else if (typeof err === "string") {
        errorMessage = `Failed to fetch ideas, ${err}`;
      } else {
        errorMessage = `Failed to fetch ideas, ${JSON.stringify(err)}`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

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
      className="container lg:max-w-7xl mx-auto px-4 pt-24 pb-12"
    >
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Discover Ideas</h1>
        <p className="text-gray-400">
          Explore innovative ideas from creative minds around the world
        </p>
      </div>

      <IdeaGrid ideas={ideas} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </motion.div>
  );
}
