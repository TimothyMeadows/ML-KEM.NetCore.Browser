import { shake128 as _shake128, shake256 as _shake256 } from './vendor/mlkem/sha3/sha3.js';

export function shake128(input, outputLen) {
  return _shake128(input, { dkLen: outputLen });
}

export function shake256(input, outputLen) {
  return _shake256(input, { dkLen: outputLen });
}
