---
doc: checklist
status: draft
---
# Build Checklist

Build mode: fast implementation requested through repeated continuation; brief code orientation and hands-on review remain pending. One integrated slice keeps this small app coherent.

## Slices
- [x] **1. Paste, verify, correct, save and export a real checklist**
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

Reference map prepared at `devpost/app-map.html`. Plain-language code route presented: generate click in app.js → extractRequirements in extractor.js → render in app.js, with local saveState in storage.js. This is explanation/reference material; no learner hands-on code navigation or edit claimed. Map display/inspection and optional learning activity remain pending.

## Revisions

- Real full-page input revealed 110 noisy results including participant comments and missed noun-only deliverables. Extractor refined with rule-section preference, dated-comment filtering, required-list context, abbreviation preservation and schedule-row handling. Existing saved checklists are not overwritten; regenerate to use the new parser.

- Planning approval audit corrected: full PRD/spec/build-order reviews were not completed before implementation. Documents returned to draft; implemented prototype retained for review. Do not claim workflow completion until learner reviews are recorded.
- Glass visibility revised after learner feedback: shell tint reduced from 74% to 25%, blur reduced from 15px to 2.5px, and original background outlines made brighter. Input and requirement surfaces retain strong reading contrast.

- Node test runner uses `--test-isolation=none` because the restricted Windows environment denies child-process spawning. All seven tests pass in the single-process runner.

## Mechanical Evidence
Real-input regression: 56,109-character supplied page reduced from 110 old exported items to 42 revised items. Isolated localhost browser run confirmed 42 displayed items, README and slide-deck capture, and absence of the sampled participant-comment leaks. Ten Node tests pass. Original 127.0.0.1 saved work was not regenerated or replaced; learner must refresh and choose to regenerate.
Seven core fixtures pass. Browser sample generated eight requirements; edited demo wording and checked state survived reload. Downloaded Markdown was inspected and preserved both edited text and unchanged source. Narrow viewport had equal document/client widths (375px), with no horizontal overflow. App assets return HTTP 200; private learner-profile and .env routes return 404. User feedback and final readiness remain pending.

Implementation checkpoint: `c9ee88c`. The slice is implemented and verified; unchecked hands-on/final-review boxes above remain outstanding.

## Authorization
User approved rule-based browser approach with “lets go” after repeatedly requesting production. Build order follows the agreed core journey; no new product surface added. Git checkpoint is local only. Final feedback is not assumed.
