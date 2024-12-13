import { motion } from 'framer-motion';
import IdeaForm from '../components/share/IdeaForm';
import IdeaPost from '../components/share/IdeaPost';
import PremiumCard from '../components/share/PremiumCard';
import TrendingTopics from '../components/share/TrendingTopics';

const samplePost = {
  author: {
    name: "John Doe",
    username: "johndoe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
  },
  content: "Just launched my new project! Check out this amazing UI design for a modern dashboard. What do you think? 🚀 #Design #UI #Innovation",
  timestamp: new Date(),
  likes: 124,
  comments: 23,
  shares: 12,
  media: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
};

export default function SharePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 pt-24 pb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <IdeaForm />
          <IdeaPost {...samplePost} />
        </div>
        <div className="space-y-6">
          <PremiumCard />
          <TrendingTopics />
        </div>
      </div>
    </motion.div>
  );
}