import { motion } from "framer-motion";
import CollaborationTable from "../components/collaboration/CollaborationTable";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ManageCollaborationPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) navigate("/login");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container lg:max-w-7xl mx-auto px-4 pt-24 pb-12"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Collaboration</h1>
        <p className="text-gray-400">
          Review and manage collaboration requests for your ideas
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
        <CollaborationTable />
      </div>
    </motion.div>
  );
}
