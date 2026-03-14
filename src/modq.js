import { MLKEM_768 } from './params.js';

const Q = MLKEM_768.q;

export function normalize(x) {
  const r = x % Q;
  return r < 0 ? r + Q : r;
}

export function add(a, b) {
  return normalize(a + b);
}

export function sub(a, b) {
  return normalize(a - b);
}

export function mul(a, b) {
  return normalize(a * b);
}
