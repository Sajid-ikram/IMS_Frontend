import { useState } from 'react';
import PostHeader from './PostHeader';
import PostActions from './PostActions';

interface IdeaPostProps {
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  media?: string;
}

export default function IdeaPost({
  author,
  content,
  timestamp,
  likes,
  comments,
  shares,
  media
}: IdeaPostProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      <PostHeader author={author} timestamp={timestamp} />
      
      <div className="mt-2 text-white" dangerouslySetInnerHTML={{ __html: content }} />
      {media && (
        <img
          src={media}
          alt="Post media"
          className="mt-4 rounded-xl w-full max-h-96 object-cover"
        />
      )}
      
      <PostActions
        likes={likes}
        comments={comments}
        shares={shares}
        isLiked={isLiked}
        onLike={() => setIsLiked(!isLiked)}
      />
    </div>
  );
}