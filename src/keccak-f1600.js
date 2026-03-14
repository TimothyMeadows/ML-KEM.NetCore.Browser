import { keccakP } from './vendor/mlkem/sha3/sha3.js';

export function keccakF1600(state) {
  return keccakP(state, 24);
}
