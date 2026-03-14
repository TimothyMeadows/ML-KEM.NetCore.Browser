import test from 'node:test';
import assert from 'node:assert/strict';
import { generateKeyPair, encapsulate, decapsulate } from '../src/mlkem.js';
import { equalBytes } from '../src/utils.js';

test('mlkem deterministic keygen + encapsulation/decapsulation roundtrip', async () => {
  const seed64 = new Uint8Array(64).map((_, i) => i);
  const seed32 = new Uint8Array(32).map((_, i) => 255 - i);

  const { publicKey, secretKey } = await generateKeyPair(seed64);
  const { ciphertext, sharedSecret: senderSecret } = await encapsulate(publicKey, seed32);
  const { sharedSecret: receiverSecret } = await decapsulate(secretKey, ciphertext);

  assert.equal(publicKey.length, 1184);
  assert.equal(secretKey.length, 2400);
  assert.equal(ciphertext.length, 1088);
  assert.equal(senderSecret.length, 32);
  assert.equal(equalBytes(senderSecret, receiverSecret), true);
});
