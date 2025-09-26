import { useEffect, useState } from 'react';
import { EventEmitter } from 'events';

const ee = new EventEmitter();

export function useGlobalChat() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handler = ({ msg }) => setMessage(msg);
    ee.on('global', handler);
    return () => ee.off('global', handler);
  }, []);

  return message;
}

export const broadcastGlobal = (msg) => ee.emit('global', { msg });
