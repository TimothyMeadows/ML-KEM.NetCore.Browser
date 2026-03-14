import { MLKEM_768 } from './params.js';
import * as modq from './modq.js';

export function create() {
  return new Int16Array(MLKEM_768.n);
}

export function clone(poly) {
  return new Int16Array(poly);
}

export function normalize(poly) {
  const out = new Int16Array(MLKEM_768.n);
  for (let i = 0; i < MLKEM_768.n; i += 1) {
    out[i] = modq.normalize(poly[i]);
  }
  return out;
}

export function add(a, b) {
  const out = new Int16Array(MLKEM_768.n);
  for (let i = 0; i < MLKEM_768.n; i += 1) {
    out[i] = modq.add(a[i], b[i]);
  }
  return out;
}

export function sub(a, b) {
  const out = new Int16Array(MLKEM_768.n);
  for (let i = 0; i < MLKEM_768.n; i += 1) {
    out[i] = modq.sub(a[i], b[i]);
  }
  return out;
}

export function pointwiseMul(a, b) {
  const out = new Int16Array(MLKEM_768.n);
  for (let i = 0; i < MLKEM_768.n; i += 1) {
    out[i] = modq.mul(a[i], b[i]);
  }
  return out;
}
