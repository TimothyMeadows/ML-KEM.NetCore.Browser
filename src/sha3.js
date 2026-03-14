import { sha3_256 as _sha3_256, sha3_512 as _sha3_512 } from './vendor/mlkem/sha3/sha3.js';

export function sha3_256(input) {
  return _sha3_256(input);
}

export function sha3_512(input) {
  return _sha3_512(input);
}
