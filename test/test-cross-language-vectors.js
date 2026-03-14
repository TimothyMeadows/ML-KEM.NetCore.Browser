import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { decapsulate, generateKeyPair, encapsulate } from '../src/mlkem.js';
import { hexToBytes, bytesToHex } from '../src/utils.js';

test('deterministic fixture reproduces keypair/ciphertext/shared secret', async () => {
  const fixture = JSON.parse(readFileSync(new URL('./vectors/mlkem768-fixture.json', import.meta.url), 'utf8'));

  const seed64 = hexToBytes(fixture.seed64Hex);
  const seed32 = hexToBytes(fixture.seed32Hex);

  const { publicKey, secretKey } = await generateKeyPair(seed64);
  const { ciphertext, sharedSecret } = await encapsulate(publicKey, seed32);
  const { sharedSecret: decapSecret } = await decapsulate(secretKey, ciphertext);

  assert.equal(bytesToHex(publicKey), fixture.publicKeyHex);
  assert.equal(bytesToHex(secretKey), fixture.secretKeyHex);
  assert.equal(bytesToHex(ciphertext), fixture.ciphertextHex);
  assert.equal(bytesToHex(sharedSecret), fixture.sharedSecretHex);
  assert.equal(bytesToHex(decapSecret), fixture.sharedSecretHex);
});
