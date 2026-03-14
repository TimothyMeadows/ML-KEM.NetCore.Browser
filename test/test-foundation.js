import test from 'node:test';
import assert from 'node:assert/strict';
import { bytesToHex, hexToBytes, concatBytes, equalBytes, zeroBytes } from '../src/utils.js';
import { setRandomBytesProvider, randomBytes } from '../src/random.js';
import * as modq from '../src/modq.js';
import * as poly from '../src/poly.js';
import * as polyvec from '../src/polyvec.js';

test('utils roundtrips hex and byte concatenation', () => {
  const b = new Uint8Array([0, 1, 2, 255]);
  const hex = bytesToHex(b);
  assert.equal(hex, '000102ff');
  assert.deepEqual(hexToBytes(hex), b);

  const c = concatBytes(new Uint8Array([1, 2]), new Uint8Array([3]));
  assert.deepEqual(c, new Uint8Array([1, 2, 3]));
  assert.equal(equalBytes(c, new Uint8Array([1, 2, 3])), true);

  zeroBytes(c);
  assert.deepEqual(c, new Uint8Array([0, 0, 0]));
});

test('random source supports deterministic test injection', () => {
  setRandomBytesProvider((len) => new Uint8Array(len).fill(7));
  const out = randomBytes(4);
  assert.deepEqual(out, new Uint8Array([7, 7, 7, 7]));
  setRandomBytesProvider(null);
});

test('modq arithmetic normalizes to [0,q)', () => {
  assert.equal(modq.normalize(-1), 3328);
  assert.equal(modq.add(3328, 2), 1);
  assert.equal(modq.sub(0, 1), 3328);
  assert.equal(modq.mul(2000, 2), 671);
});

test('poly and polyvec operations are shape-correct', () => {
  const a = poly.create();
  const b = poly.create();
  a[0] = 3328;
  b[0] = 2;

  const sum = poly.add(a, b);
  assert.equal(sum.length, 256);
  assert.equal(sum[0], 1);

  const vec = polyvec.create();
  assert.equal(vec.length, 3);
  assert.equal(vec[0].length, 256);
});
