let randomProvider = null;

export function setRandomBytesProvider(provider) {
  if (provider !== null && typeof provider !== 'function') {
    throw new TypeError('provider must be null or function(length)->Uint8Array');
  }
  randomProvider = provider;
}

function getCrypto() {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.getRandomValues) {
    return globalThis.crypto;
  }
  return null;
}

export function randomBytes(length) {
  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError('length must be a non-negative integer');
  }

  if (randomProvider) {
    const out = randomProvider(length);
    if (!(out instanceof Uint8Array) || out.length !== length) {
      throw new TypeError('random provider must return Uint8Array(length)');
    }
    return out;
  }

  const c = getCrypto();
  if (!c) {
    throw new Error('No secure random source found. Inject one with setRandomBytesProvider.');
  }

  const out = new Uint8Array(length);
  c.getRandomValues(out);
  return out;
}
