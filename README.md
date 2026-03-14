# ML-KEM.NetCore.Browser

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/ml-kem.netcore.browser.svg)](https://www.npmjs.com/package/ml-kem.netcore.browser)
[![nuget](https://img.shields.io/nuget/v/ML-KEM.NetCore.Browser.svg)](https://www.nuget.org/packages/ML-KEM.NetCore.Browser/)

`ML-KEM.NetCore.Browser` is a pure JavaScript companion package to [`ML-KEM.NetCore`](https://github.com/TimothyMeadows/ML-KEM.NetCore), focused on **ML-KEM-768** compatibility in browser and Node.js runtimes.

The package includes high-level KEM APIs (`generateKeyPair`, `encapsulate`, `decapsulate`) and lower-level modules for polynomial math, packing, NTT, and CPA-PKE internals.

---

## Table of contents

- [Requirements](#requirements)
- [Installation](#installation)
  - [npm](#npm)
  - [NuGet](#nuget)
  - [Browser script bundle](#browser-script-bundle)
- [Quick start](#quick-start)
  - [ESM usage](#esm-usage)
  - [Browser global usage](#browser-global-usage)
- [API reference](#api-reference)
  - [`generateKeyPair(seed64?)`](#generatekeypairseed64)
  - [`encapsulate(publicKey, seed32?)`](#encapsulatepublickey-seed32)
  - [`decapsulate(secretKey, ciphertext)`](#decapsulatesecretkey-ciphertext)
  - [`setRandomBytesProvider(provider)`](#setrandombytesproviderprovider)
  - [`MLKEM_768` parameter sizes](#mlkem_768-parameter-sizes)
- [Deterministic/vector workflows](#deterministicvector-workflows)
- [Validation and testing](#validation-and-testing)
- [Development](#development)
- [Interoperability notes](#interoperability-notes)
- [Security notes](#security-notes)
- [License](#license)

---

## Requirements

- Runtime: modern browser or Node.js with ES modules.
- No native addons required.
- Project package type: `"module"`.

---

## Installation

### npm

```bash
npm install ml-kem.netcore.browser
```

### NuGet

```bash
dotnet add package ML-KEM.NetCore.Browser
```

### Browser script bundle

Build the one-file bundle:

```bash
npm run build:bundle
```

Then include it in your page:

```html
<script src="./dist/ML-KEM.NetCore.Browser.js"></script>
<script>
  const { generateKeyPair, encapsulate, decapsulate } = window.MLKEMNetCoreBrowser;
</script>
```

---

## Quick start

### ESM usage

```js
import { generateKeyPair, encapsulate, decapsulate } from 'ml-kem.netcore.browser';

const { publicKey, secretKey } = await generateKeyPair();
const { ciphertext, sharedSecret: senderSecret } = await encapsulate(publicKey);
const { sharedSecret: receiverSecret } = await decapsulate(secretKey, ciphertext);

console.log(senderSecret.length, receiverSecret.length); // 32, 32
```

### Browser global usage

```html
<script src="./dist/ML-KEM.NetCore.Browser.js"></script>
<script>
  (async () => {
    const { generateKeyPair, encapsulate, decapsulate } = window.MLKEMNetCoreBrowser;

    const { publicKey, secretKey } = await generateKeyPair();
    const { ciphertext, sharedSecret: senderSecret } = await encapsulate(publicKey);
    const { sharedSecret: receiverSecret } = await decapsulate(secretKey, ciphertext);

    console.log(senderSecret, receiverSecret);
  })();
</script>
```

---

## API reference

All binary values are `Uint8Array`.

### `generateKeyPair(seed64?)`

```ts
async function generateKeyPair(seed64?: Uint8Array): Promise<{
  publicKey: Uint8Array;
  secretKey: Uint8Array;
}>;
```

- Without `seed64`, key generation uses the configured random source.
- With `seed64`, deterministic derivation is used (intended for vectors/tests).

### `encapsulate(publicKey, seed32?)`

```ts
async function encapsulate(publicKey: Uint8Array, seed32?: Uint8Array): Promise<{
  ciphertext: Uint8Array;
  sharedSecret: Uint8Array;
}>;
```

- `publicKey` must be a `Uint8Array` with ML-KEM-768 public key length.
- Optional `seed32` enables deterministic encapsulation for vector scenarios.

### `decapsulate(secretKey, ciphertext)`

```ts
async function decapsulate(secretKey: Uint8Array, ciphertext: Uint8Array): Promise<{
  sharedSecret: Uint8Array;
}>;
```

- Both arguments must be `Uint8Array` values.
- Returns the receiver shared secret.

### `setRandomBytesProvider(provider)`

```ts
function setRandomBytesProvider(provider: (length: number) => Uint8Array): void;
```

- Overrides random byte generation used internally.
- Useful for deterministic testing harnesses and controlled environments.

### `MLKEM_768` parameter sizes

```ts
const MLKEM_768 = {
  publicKeyBytes: 1184,
  secretKeyBytes: 2400,
  ciphertextBytes: 1088,
  sharedSecretBytes: 32,
  // ...other structural parameters
};
```

Import from:

```js
import { MLKEM_768 } from 'ml-kem.netcore.browser';
// or: import { MLKEM_768 } from 'ml-kem.netcore.browser/params';
```

---

## Deterministic/vector workflows

This package supports deterministic pathways used for fixture generation and cross-language verification:

- `generateKeyPair(seed64)` for deterministic key derivation.
- `encapsulate(publicKey, seed32)` for deterministic encapsulation.

Reference fixture:

- `test/vectors/mlkem768-fixture.json`

---

## Validation and testing

Run the test suite:

```bash
npm test
```

Dry-run publish contents:

```bash
npm run pack:check
```

Tests include:

- ML-KEM round-trip behavior
- CPA-PKE layer checks
- Cross-language deterministic vector validation

---

## Development

### Build browser bundle

```bash
npm run build:bundle
```

### Main implementation modules

- High-level API:
  - `src/index.js`
  - `src/mlkem.js`
- Core primitives:
  - `src/params.js`
  - `src/random.js`
  - `src/sha3.js`
  - `src/shake.js`
  - `src/keccak-f1600.js`
  - `src/sponge.js`
  - `src/utils.js`
  - `src/modq.js`
  - `src/poly.js`
  - `src/polyvec.js`
  - `src/ntt.js`
  - `src/packing.js`
  - `src/cpapke.js`
- Vendored core:
  - `src/vendor/mlkem/*`

---

## Interoperability notes

- This package is intended to maintain byte-level interoperability with `ML-KEM.NetCore` for ML-KEM-768 workflows.
- Keep parameter set and serialized sizes aligned between communicating peers.
- Prefer deterministic methods only for test vectors and reproducibility.

---

## Security notes

- Treat secret material (`secretKey`, `sharedSecret`) as sensitive and keep lifetimes short.
- Clear transient buffers in application code when possible.
- Validate all external key/ciphertext lengths before calling KEM operations.
- For high-assurance use, perform an independent cryptographic and implementation review.

---

## License

MIT. See [LICENSE](LICENSE).
