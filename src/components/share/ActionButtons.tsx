import { Link, Smile, Send } from 'lucide-react';

interface ActionButtonsProps {
  onSubmit: () => void;
}

export default function ActionButtons({ onSubmit }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <Link className="h-5 w-5 text-gray-400" />
      </button>
      <button
        type="button"
        className="p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <Smile className="h-5 w-5 text-gray-400" />
      </button>
      <button
        onClick={onSubmit}
        type="submit"
        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center gap-2"
      >
        <Send className="h-4 w-4" />
        Share
      </button>
    </div>
  );
}