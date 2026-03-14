import { MLKEM_768 } from './params.js';
import * as poly from './poly.js';

export function create() {
  const out = [];
  for (let i = 0; i < MLKEM_768.k; i += 1) {
    out.push(poly.create());
  }
  return out;
}

export function clone(vec) {
  return vec.map((p) => poly.clone(p));
}

export function normalize(vec) {
  return vec.map((p) => poly.normalize(p));
}

export function add(a, b) {
  return a.map((p, i) => poly.add(p, b[i]));
}

export function sub(a, b) {
  return a.map((p, i) => poly.sub(p, b[i]));
}
