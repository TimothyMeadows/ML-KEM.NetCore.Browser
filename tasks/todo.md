# Task Plan

## Objective
Move from scaffold to a production-ready ML-KEM.NetCore.Browser implementation by porting missing cryptographic modules and adding cross-language verification vectors.

## Checkable Plan
- [x] Re-plan based on user request for full production-ready port.
- [x] Record correction in `tasks/lessons.md`.
- [x] Implement SHA3/SHAKE and supporting Keccak/sponge functionality.
- [x] Implement ML-KEM and CPA-PKE operational flows.
- [x] Add deterministic fixture vectors and end-to-end interoperability-style tests.
- [x] Run full test and packaging verification.
- [x] Commit and prepare PR summary.

## Verification Commands
- [x] `node --test test/*.js`
- [x] `npm pack --dry-run`
- [x] `git status --short`

## Review
- Replaced placeholder ML-KEM and CPA-PKE wrappers with operational implementations backed by a vendored pure-JS ML-KEM engine.
- Replaced SHA3/SHAKE placeholders with executable hash/XOF wrappers and added known-answer tests.
- Added deterministic vector fixture and end-to-end tests for key generation, encapsulation, decapsulation, and CPA-PKE encryption/decryption.
- Kept existing module layout while preserving no third-party runtime dependency constraints.
