import { MlKem768 } from './vendor/mlkem/mlKem768.js';
import { randomBytes } from './random.js';

function ensureUint8Array(value, name, len) {
  if (!(value instanceof Uint8Array)) {
    throw new TypeError(`${name} must be Uint8Array`);
  }
  if (len !== undefined && value.length !== len) {
    throw new RangeError(`${name} must be ${len} bytes`);
  }
}

async function createEngine() {
  const engine = new MlKem768();
  await engine._setup();
  return engine;
}

export async function keyGen(seed64) {
  const engine = await createEngine();
  const seed = seed64 ?? randomBytes(64);
  ensureUint8Array(seed, 'seed64', 64);

  const [publicKey, mlKemSecretKey] = await engine.deriveKeyPair(seed);
  const secretKey = mlKemSecretKey.slice(0, engine._skSize);
  return { publicKey, secretKey };
}

export async function encrypt(publicKey, message, coins) {
  ensureUint8Array(publicKey, 'publicKey');
  ensureUint8Array(message, 'message', 32);
  ensureUint8Array(coins, 'coins', 32);

  const engine = await createEngine();
  return engine._encap(publicKey, message, coins);
}

export async function decrypt(secretKey, ciphertext) {
  ensureUint8Array(secretKey, 'secretKey');
  ensureUint8Array(ciphertext, 'ciphertext');

  const engine = await createEngine();
  return engine._decap(ciphertext, secretKey);
}
