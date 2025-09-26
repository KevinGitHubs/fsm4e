import { EventEmitter } from 'events';

const ee = new EventEmitter();

/**
 * Broadcast event ke semua client (EventEmitter)
 * @param {any} data
 */
export function broadcast(data) {
  ee.emit('message', data);
}

/**
 * Listener helper (dipakai di hook)
 * @param {Function} handler
 * @returns {() => void} unsubscribe function
 */
export function onMessage(handler) {
  ee.on('message', handler);
  return () => ee.off('message', handler);
}
