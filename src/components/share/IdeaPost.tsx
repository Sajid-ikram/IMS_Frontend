import { Heart, MessageCircle } from "lucide-react";
import DOMPurify from "dompurify";
import { convertGoogleDriveLink } from "../../utils/convertGoogleDriveLink";
import { truncateText } from "../../utils/text";
import { formatDistanceToNow } from "date-fns";

interface IdeaPostProps {
  _id: string;
  title: string;
  content: string;
  author: string;
  banner: string;
  votes: number;
  voters: string[];
  status: "Idea Pending" | "Idea in Progress" | "Idea Evaluated";
  comments: {
    comment: string;
    commentBy: string;
    commentor: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function IdeaPost({
  content,
  title,
  banner,
  votes,
  comments,
  createdAt,
}: IdeaPostProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mt-8">
      {/* I have to create PostHeader component from the idea object */}
      <h1 className="lg:text-2xl sm:text-xl font-bold text-white ">{title}</h1>
      <p className="text-xs font-light text-gray-300 mb-4">
        {createdAt &&
          formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
      </p>
      <div
        className="mt-2 text-white"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(truncateText(content, 250)),
        }}
      />
      {banner && (
        <img
          src={convertGoogleDriveLink(banner)}
          alt={title}
          className="mt-4 rounded-xl w-full max-h-96 object-cover"
        />
      )}

      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
        <button className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-colors">
          <Heart className={`h-5 w-5 fill-pink-500 text-pink-500`} />
          <span>{votes}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-400 hover:text-purple-500 transition-colors">
          <MessageCircle className="h-5 w-5" />
          <span>{comments?.length}</span>
        </button>
      </div>
    </div>
  );
}
