import { Crown } from 'lucide-react';

export default function PremiumCard() {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <Crown className="h-6 w-6 text-yellow-400" />
        <h2 className="text-xl font-bold text-white">Subscribe to Premium</h2>
      </div>
      <p className="text-gray-300 mb-6">
        Subscribe to unlock new features and if eligible, receive a share of revenue.
      </p>
      <button className="w-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg text-black font-medium hover:from-yellow-500 hover:to-yellow-700 transition-colors">
        Subscribe Now
      </button>
    </div>
  );
}