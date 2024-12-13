import { TrendingUp } from 'lucide-react';
import { topics } from '../../data/trending-topics';
import TopicCard from './TopicCard';

export default function TrendingTopics() {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="h-6 w-6 text-purple-400" />
        <h2 className="text-xl font-bold text-white">What's happening</h2>
      </div>
      <div className="space-y-4">
        {topics.map((topic, index) => (
          <TopicCard key={index} {...topic} />
        ))}
      </div>
    </div>
  );
}