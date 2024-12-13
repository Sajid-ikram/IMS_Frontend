import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface PostActionsProps {
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  onLike: () => void;
}

export default function PostActions({ likes, comments, shares, isLiked, onLike }: PostActionsProps) {
  return (
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
      <button
        onClick={onLike}
        className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-colors"
      >
        <Heart className={`h-5 w-5 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
        <span>{likes}</span>
      </button>
      <button className="flex items-center gap-2 text-gray-400 hover:text-purple-500 transition-colors">
        <MessageCircle className="h-5 w-5" />
        <span>{comments}</span>
      </button>
      <button className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors">
        <Share2 className="h-5 w-5" />
        <span>{shares}</span>
      </button>
    </div>
  );
}