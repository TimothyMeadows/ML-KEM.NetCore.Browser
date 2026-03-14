function ensureUint8Array(value, name) {
  if (!(value instanceof Uint8Array)) {
    throw new TypeError(`${name} must be Uint8Array`);
  }
}

export function packPublicKey(pk) {
  ensureUint8Array(pk, 'pk');
  return new Uint8Array(pk);
}

export function unpackPublicKey(bytes) {
  ensureUint8Array(bytes, 'bytes');
  return new Uint8Array(bytes);
}

export function packSecretKey(sk) {
  ensureUint8Array(sk, 'sk');
  return new Uint8Array(sk);
}

export function unpackSecretKey(bytes) {
  ensureUint8Array(bytes, 'bytes');
  return new Uint8Array(bytes);
}

export function packCiphertext(ct) {
  ensureUint8Array(ct, 'ct');
  return new Uint8Array(ct);
}

export function unpackCiphertext(bytes) {
  ensureUint8Array(bytes, 'bytes');
  return new Uint8Array(bytes);
}
