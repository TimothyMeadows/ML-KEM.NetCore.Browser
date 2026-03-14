export function forwardNTT(poly) {
  return poly;
}

export function inverseNTT(poly) {
  return poly;
}

export function baseMultiply(a, b) {
  throw new Error('baseMultiply not implemented yet; wire C# zeta tables and butterfly steps.');
}

export function multiplyNTTs(a, b) {
  throw new Error('multiplyNTTs not implemented yet; depends on full NTT/baseMultiply implementation.');
}
