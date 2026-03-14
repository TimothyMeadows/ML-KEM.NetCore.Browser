import { MlKem768 } from './vendor/mlkem/mlKem768.js';

function ensureUint8Array(value, name) {
  if (!(value instanceof Uint8Array)) {
    throw new TypeError(`${name} must be Uint8Array`);
  }
}

async function createEngine() {
  const engine = new MlKem768();
  await engine._setup();
  return engine;
}

export async function generateKeyPair(seed64) {
  const engine = await createEngine();
  if (seed64 === undefined) {
    const [publicKey, secretKey] = await engine.generateKeyPair();
    return { publicKey, secretKey };
  }

  ensureUint8Array(seed64, 'seed64');
  const [publicKey, secretKey] = await engine.deriveKeyPair(seed64);
  return { publicKey, secretKey };
}

export async function encapsulate(publicKey, seed32) {
  ensureUint8Array(publicKey, 'publicKey');
  const engine = await createEngine();
  const [ciphertext, sharedSecret] = await engine.encap(publicKey, seed32);
  return { ciphertext, sharedSecret };
}

export async function decapsulate(secretKey, ciphertext) {
  ensureUint8Array(secretKey, 'secretKey');
  ensureUint8Array(ciphertext, 'ciphertext');
  const engine = await createEngine();
  const sharedSecret = await engine.decap(ciphertext, secretKey);
  return { sharedSecret };
}
