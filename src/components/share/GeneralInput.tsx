import { Image, Lightbulb } from "lucide-react";

interface GeneralInputProps {
  value: string;
  onChange: (value: string) => void;
  inputType: string;
  placeHolder: string;
}

export default function GeneralInput({
  value,
  onChange,
  inputType,
  placeHolder,
}: GeneralInputProps) {
  return (
    <div className="flex-1">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeHolder}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {inputType === "image" ? (
          <Image className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        ) : (
          <Lightbulb className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        )}
      </div>
    </div>
  );
}
