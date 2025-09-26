import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'FSm4e',
  description: 'Game & Rewards Platform',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f0f23" />
      </head>
      <body className="bg-bg text-white min-h-screen flex items-center justify-center">
        {children}
        <ToastContainer theme="dark" position="top-center" />
      </body>
    </html>
  );
}
