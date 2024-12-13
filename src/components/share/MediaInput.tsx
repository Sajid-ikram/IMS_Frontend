import { Image } from 'lucide-react';

interface MediaInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MediaInput({ value, onChange }: MediaInputProps) {
  return (
    <div className="flex-1">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Add media URL (image, gif)"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Image className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}