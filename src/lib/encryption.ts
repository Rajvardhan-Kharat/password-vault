import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXTAUTH_SECRET || 'default-secret-key';

export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export function decrypt(encryptedText: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function generateEncryptionKey(): string {
  return CryptoJS.lib.WordArray.random(256/8).toString();
}
