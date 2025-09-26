import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useSound from 'use-sound';
import { EventEmitter } from 'events';

const ee = new EventEmitter();

export function useAdminAbuse() {
  const [abuse, setAbuse] = useState(null);
  const [play] = useSound('/sfx/abuse-alert.mp3', { volume: 0.5 });

  useEffect(() => {
    const handler = ({ abuse }) => {
      play();
      setAbuse(abuse);
      Swal.fire({ title: 'ADMIN ABUSE', text: abuse.type, icon: 'warning', timer: 3000 });
      setTimeout(() => setAbuse(null), abuse.duration * 1000);
    };
    ee.on('message', handler);
    return () => ee.off('message', handler);
  }, [play]);

  return abuse;
}

// helper broadcast (dipakai di API)
export const broadcast = (data) => ee.emit('message', data);
