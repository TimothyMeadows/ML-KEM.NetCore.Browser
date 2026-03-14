import test from 'node:test';
import assert from 'node:assert/strict';
import { sha3_256, sha3_512 } from '../src/sha3.js';
import { bytesToHex } from '../src/utils.js';

test('sha3 known vectors', () => {
  const msg = new TextEncoder().encode('abc');
  assert.equal(
    bytesToHex(sha3_256(msg)),
    '3a985da74fe225b2045c172d6bd390bd855f086e3e9d525b46bfe24511431532'
  );
  assert.equal(
    bytesToHex(sha3_512(msg)),
    'b751850b1a57168a5693cd924b6b096e08f621827444f70d884f5d0240d2712e10e116e9192af3c91a7ec57647e39340' +
    '57340b4cf408d5a56592f8274eec53f0'
  );
});
