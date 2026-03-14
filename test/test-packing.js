import test from 'node:test';
import assert from 'node:assert/strict';
import { packPublicKey, unpackPublicKey } from '../src/packing.js';

test('packing module public key pack/unpack roundtrip', () => {
  const pk = new Uint8Array(1184).map((_, i) => i & 0xff);
  const packed = packPublicKey(pk);
  const unpacked = unpackPublicKey(packed);
  assert.deepEqual(unpacked, pk);
});
