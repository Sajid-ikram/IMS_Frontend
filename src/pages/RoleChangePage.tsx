import { motion } from 'framer-motion';

export default function RoleChangePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 pt-24 pb-12"
    >
      <h1 className="text-4xl font-bold text-white mb-8">Change Role</h1>
      {/* Add your role change page content here */}
    </motion.div>
  );
}