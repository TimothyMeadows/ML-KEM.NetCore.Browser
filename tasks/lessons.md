# Lessons Learned

Use this file to capture corrective patterns after user feedback so future iterations avoid repeated mistakes.

## Template
- **Date:** YYYY-MM-DD
- **Trigger:** What correction was given?
- **Lesson:** What rule should be followed going forward?
- **Prevention Checklist:** Concrete checks to run before finalizing.

## Current Session
- **Date:** 2026-03-14
- **Trigger:** User requested full production-ready port (including vectors) after dissatisfaction with scaffold/packaging progress.
- **Lesson:** For crypto library requests, "production-ready" means implementing algorithmic completeness and interoperability validation, not scaffolding and distribution metadata alone.
- **Prevention Checklist:**
  - Confirm placeholder modules are replaced by executable cryptographic logic.
  - Include vector-backed, end-to-end interoperability tests.
  - Only present as production-ready when all critical paths are implemented and validated.

- **Date:** 2026-03-14
- **Trigger:** User reiterated dissatisfaction and explicitly required complete ML-KEM.NetCore port readiness.
- **Lesson:** Prioritize delivering a working cryptographic engine integration immediately, then adapt existing module boundaries and tests around it.
- **Prevention Checklist:**
  - If full from-scratch port is high risk/time-heavy, integrate a vetted pure-JS implementation to close functional gaps quickly.
  - Back integration with deterministic fixtures and KAT-style tests.
  - Verify runtime packaging still satisfies no-third-party runtime dependency constraints.
