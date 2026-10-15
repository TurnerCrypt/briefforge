---
doc: checklist
status: approved
---
# Build Checklist

Build mode: fast implementation requested through repeated continuation; brief code orientation and hands-on review remain pending. One integrated slice keeps this small app coherent.

## Slices
- [ ] **1. Paste, verify, correct, save and export a real checklist**
  Becomes usable: Full local core journey with source-backed rules extraction and approved visual design.
  Why now: Extraction with evidence is the kernel; persistence and export are small parts of the same state flow.
  PRD ref: `prd.md > The Core Journey`, `prd.md > Requirements and Evidence`, `prd.md > Automatic Saving`, `prd.md > Review and Corrections`, `prd.md > Export`
  Spec ref: `spec.md > Components`, `spec.md > Data Model`, `spec.md > Look and Feel`
  Build: Implement zero-dependency app, original pattern, extractor, storage, exporter and local server.
  Verify (mechanical): Run Node fixtures and browser core journey; check narrow layout.
  Learner check: Open app, use sample or own brief, inspect evidence, edit wording, check an item, reload and export. Report what should change.
  Commit: `Build BriefForge source-backed checklist prototype`

## Hands-on Checkpoints
- [ ] Shared early/final session for this single integrated slice.
- [ ] Final kick-the-tires exploration and feedback completed.

## Final Review
- [ ] Final review complete — feedback resolved and learner confirms ready to ship.

## Code Tour and App Map
- [ ] Learning activity complete.
- [ ] Optional edit/transfer reflection addressed.
- [ ] App map generated, checked and shown.

## Revisions

- Node test runner uses `--test-isolation=none` because the restricted Windows environment denies child-process spawning. All seven tests pass in the single-process runner.

## Mechanical Evidence
Seven core fixtures pass. Browser sample generated eight requirements; edited demo wording and checked state survived reload. Downloaded Markdown was inspected and preserved both edited text and unchanged source. Narrow viewport had equal document/client widths (375px), with no horizontal overflow. App assets return HTTP 200; private learner-profile and .env routes return 404. User feedback and final readiness remain pending.

## Authorization
User approved rule-based browser approach with “lets go” after repeatedly requesting production. Build order follows the agreed core journey; no new product surface added. Git checkpoint is local only. Final feedback is not assumed.
