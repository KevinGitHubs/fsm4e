'use client';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminAbuseLayer({ abuse }) {
  return (
    <AnimatePresence>
      {abuse && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-panel border border-accent rounded-2xl p-6 text-center">
            <h2 className="text-2xl font-bold text-accent">ADMIN ABUSE</h2>
            <p className="text-lg mt-2">{abuse.type}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
