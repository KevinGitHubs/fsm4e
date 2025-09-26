'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import AdminConsole from './components/AdminConsole';
import { useAdminAbuse } from './hooks/useAdminAbuse';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [user, setUser] = useState(null);
  const abuse = useAdminAbuse();

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => setUser(d.user)).catch(() => {});
  }, []);

  return (
    <main className="w-full max-w-md p-4">
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div key="auth" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <AuthForm onLogin={setUser} />
          </motion.div>
        ) : user.role === 'admin' ? (
          <motion.div key="admin" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
            <AdminConsole />
          </motion.div>
        ) : (
          <motion.div key="dash" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
      {abuse && <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"><div className="bg-panel border border-accent rounded-2xl p-6 text-center"><h2 className="text-2xl font-bold text-accent">ADMIN ABUSE</h2><p className="text-lg">{abuse.type}</p></div></div>}
      <ToastContainer theme="dark" />
    </main>
  );
}
