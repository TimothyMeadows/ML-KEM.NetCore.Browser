import { Keccak } from './vendor/mlkem/sha3/sha3.js';

export class Sponge {
  constructor(blockLen = 136, suffix = 0x1f, outputLen = 32, enableXOF = true) {
    this.keccak = new Keccak(blockLen, suffix, outputLen, enableXOF);
  }

  absorb(bytes) {
    this.keccak.update(bytes);
    return this;
  }

  finalize() {
    this.keccak.finish();
    return this;
  }

  squeeze(length) {
    const out = new Uint8Array(length);
    this.keccak.xofInto(out);
    return out;
  }
}
