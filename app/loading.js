import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-bg flex items-center justify-center z-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-t-transparent border-accent rounded-full"
      />
    </div>
  );
}
