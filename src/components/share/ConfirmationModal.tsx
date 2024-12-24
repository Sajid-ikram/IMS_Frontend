import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: "accept" | "reject" | null;
  confirmSource: string;
  username?: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  action,
  confirmSource,
  username,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const actionText = action === "accept" ? "accept" : "reject";
  const actionColor = action === "accept" ? "green" : "red";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md p-6 rounded-2xl bg-gray-900 border border-white/10 shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-semibold text-white mb-2">
              Confirm {actionText} {confirmSource}
            </h3>

            <p className="text-gray-300 mb-6">
              Are you sure you want to {actionText} the {confirmSource} request
              from <span className="font-medium text-white">{username}</span>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={`px-4 py-2 rounded-lg bg-${actionColor}-500/10 text-${actionColor}-500 hover:bg-${actionColor}-500/20 transition-colors`}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
