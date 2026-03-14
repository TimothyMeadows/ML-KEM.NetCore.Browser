import test from 'node:test';
import assert from 'node:assert/strict';
import { MLKEM_768, generateKeyPair } from '../src/index.js';

test('index exports package entrypoints', async () => {
  assert.equal(MLKEM_768.k, 3);
  const seed64 = new Uint8Array(64).fill(9);
  const { publicKey, secretKey } = await generateKeyPair(seed64);
  assert.equal(publicKey.length, 1184);
  assert.equal(secretKey.length, 2400);
});
