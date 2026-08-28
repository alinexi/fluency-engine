/**
 * Device-bound AES-GCM key storage wrapper for client-side API key protection.
 * Ensures API keys stored in localStorage are encrypted at rest.
 */

const STORAGE_PREFIX = 'typecoach_enc_';
const DEVICE_KEY_NAME = 'typecoach_device_key';

async function getOrCreateDeviceKey(): Promise<CryptoKey> {
  const existingKeyJson = typeof window !== 'undefined' ? localStorage.getItem(DEVICE_KEY_NAME) : null;
  
  if (existingKeyJson) {
    const rawKey = new Uint8Array(JSON.parse(existingKeyJson));
    return await window.crypto.subtle.importKey(
      'raw',
      rawKey,
      { name: 'AES-GCM' },
      true,
      ['encrypt', 'decrypt']
    );
  }

  const newKey = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const exported = await window.crypto.subtle.exportKey('raw', newKey);
  if (typeof window !== 'undefined') {
    localStorage.setItem(DEVICE_KEY_NAME, JSON.stringify(Array.from(new Uint8Array(exported))));
  }
  return newKey;
}

export async function saveEncryptedApiKey(provider: string, apiKey: string): Promise<void> {
  if (typeof window === 'undefined') return;
  if (!apiKey.trim()) {
    localStorage.removeItem(STORAGE_PREFIX + provider);
    return;
  }

  const cryptoKey = await getOrCreateDeviceKey();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(apiKey);

  const ciphertext = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    encoded
  );

  const payload = {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(ciphertext)),
  };

  localStorage.setItem(STORAGE_PREFIX + provider, JSON.stringify(payload));
}

export async function getDecryptedApiKey(provider: string): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  const rawPayload = localStorage.getItem(STORAGE_PREFIX + provider);
  if (!rawPayload) return null;

  try {
    const payload = JSON.parse(rawPayload);
    const cryptoKey = await getOrCreateDeviceKey();
    const iv = new Uint8Array(payload.iv);
    const data = new Uint8Array(payload.data);

    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      data
    );

    return new TextDecoder().decode(decrypted);
  } catch (err) {
    console.error(`Failed to decrypt API key for provider ${provider}:`, err);
    return null;
  }
}
