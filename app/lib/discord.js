import axios from 'axios';

/**
 * Kirim pesan ke Discord webhook
 * @param {string} msg
 * @returns {Promise<void>}
 */
export async function discord(msg) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) return;
  try {
    await axios.post(url, { content: msg });
  } catch (e) {
    console.error('Discord webhook error:', e.message);
  }
}
