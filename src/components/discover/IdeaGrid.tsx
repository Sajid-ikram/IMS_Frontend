import { motion } from "framer-motion";
import IdeaCard from "./IdeaCard";
import { Idea } from "../../types/Idea";
import { Link } from "react-router-dom";

interface IdeaGridProps {
  ideas: Idea[];
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function IdeaGrid({ ideas }: IdeaGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ideas.map((idea) => (
        <motion.div key={idea._id} variants={item}>
          <Link to={`/idea/${idea._id}`}>
            <IdeaCard {...idea} />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
