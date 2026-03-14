export function equalBytes(a, b) {
  if (!(a instanceof Uint8Array) || !(b instanceof Uint8Array) || a.length !== b.length) {
    return false;
  }

  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a[i] ^ b[i];
  }

  return diff === 0;
}

export function bytesToHex(bytes) {
  if (!(bytes instanceof Uint8Array)) {
    throw new TypeError('bytesToHex expects Uint8Array');
  }

  let out = '';
  for (let i = 0; i < bytes.length; i += 1) {
    out += bytes[i].toString(16).padStart(2, '0');
  }
  return out;
}

export function hexToBytes(hex) {
  if (typeof hex !== 'string' || (hex.length & 1) !== 0) {
    throw new TypeError('hexToBytes expects an even-length hex string');
  }

  const out = new Uint8Array(hex.length >>> 1);
  for (let i = 0; i < out.length; i += 1) {
    const b = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    if (Number.isNaN(b)) {
      throw new TypeError('hexToBytes encountered non-hex characters');
    }
    out[i] = b;
  }
  return out;
}

export function concatBytes(...arrays) {
  let total = 0;
  for (const arr of arrays) {
    if (!(arr instanceof Uint8Array)) {
      throw new TypeError('concatBytes expects Uint8Array inputs');
    }
    total += arr.length;
  }

  const out = new Uint8Array(total);
  let offset = 0;
  for (const arr of arrays) {
    out.set(arr, offset);
    offset += arr.length;
  }
  return out;
}

export function zeroBytes(target) {
  if (!(target instanceof Uint8Array)) {
    throw new TypeError('zeroBytes expects Uint8Array');
  }
  target.fill(0);
}

export function assertBounds(value, min, maxInclusive, label = 'value') {
  if (!Number.isInteger(value) || value < min || value > maxInclusive) {
    throw new RangeError(`${label} must be an integer in [${min}, ${maxInclusive}]`);
  }
}
