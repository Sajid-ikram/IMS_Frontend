interface TopicCardProps {
  category: string;
  topic: string;
  posts: string;
}

export default function TopicCard({ category, topic, posts }: TopicCardProps) {
  return (
    <div className="hover:bg-white/5 p-3 rounded-lg transition-colors cursor-pointer">
      <p className="text-sm text-gray-400">{category}</p>
      <p className="text-white font-medium">{topic}</p>
      <p className="text-sm text-gray-400">{posts} posts</p>
    </div>
  );
}