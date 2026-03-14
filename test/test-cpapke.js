import test from 'node:test';
import assert from 'node:assert/strict';
import { keyGen, encrypt, decrypt } from '../src/cpapke.js';
import { equalBytes } from '../src/utils.js';

test('cpapke keygen/encrypt/decrypt roundtrip', async () => {
  const seed64 = new Uint8Array(64).map((_, i) => i + 1);
  const { publicKey, secretKey } = await keyGen(seed64);

  const message = new Uint8Array(32).map((_, i) => i * 3);
  const coins = new Uint8Array(32).map((_, i) => 200 - i);

  const ciphertext = await encrypt(publicKey, message, coins);
  const decrypted = await decrypt(secretKey, ciphertext);

  assert.equal(publicKey.length, 1184);
  assert.equal(secretKey.length, 1152);
  assert.equal(ciphertext.length, 1088);
  assert.equal(equalBytes(decrypted, message), true);
});
