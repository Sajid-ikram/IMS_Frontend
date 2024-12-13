import { MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostHeaderProps {
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  timestamp: Date;
}

export default function PostHeader({ author, timestamp }: PostHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex gap-3">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white">{author.name}</h3>
            <span className="text-gray-400">@{author.username}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-400">
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
      <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
        <MoreHorizontal className="h-5 w-5 text-gray-400" />
      </button>
    </div>
  );
}