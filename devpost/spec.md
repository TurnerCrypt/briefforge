---
doc: spec
status: draft
---
# BriefForge — Technical Plan

## How This Works, In Plain Language
The page searches the pasted brief for explicit instruction sentences. Each match becomes a checklist item with the original text attached. It does not call an AI model or send the brief elsewhere. Your browser keeps the brief, edits and checked items locally. Export creates a text file from the current checklist.

## Decisions and Open Issues
Learner approved the proposed free browser app with rule-based extraction by answering “lets go.” Existing product direction and visual decisions are carried forward. HTML/CSS/JavaScript without dependencies is an implementation choice derived from the accepted lightweight approach. Markdown export remains the proposed default; it is inexpensive to revise. No learner-specific technical uncertainty was supplied; the main implementation risk to check is recognizing useful requirements without treating every descriptive sentence as an instruction.
Review correction: the free rule-based architecture was explicitly accepted, but the full technical document was not reviewed. Restored to draft pending the product-plan review and then technical-plan review. Keep the existing prototype available for evaluation.

## Stack
Browser HTML, CSS and JavaScript modules; Node 24 for a local static server and built-in tests. No third-party runtime packages.
Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide ; https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage ; https://nodejs.org/api/test.html

## Where It Runs and How Someone Tries It
Public source repository: https://github.com/TurnerCrypt/briefforge . Published with learner authorization on 16 October 2026. Local running instructions below still apply; a public repository is not a hosted app URL. Demo video remains outstanding.
Run `node server.cjs`, then open http://127.0.0.1:4173 . The server binds loopback and serves only application assets. A local app plus recorded demo is sufficient for this stage; no hosted deployment is currently selected. Submission still requires a public repository and short video.

## The Core Journey Through the System
Input text → extractor returns instruction items and warnings → app renders source-backed editable cards → changes save through storage → Markdown exporter creates a download.
Implements prd.md > The Core Journey, Requirements and Evidence, Automatic Saving, Review and Corrections, Export.

## Look and Feel
Implement approved theme-preview.svg: charcoal background, stable randomized maker outlines, translucent shell, subtle blur/edge highlights, amber clipped-corner main action. Original hex nut/checkmark identity and BriefForge working name. Input and cards stay readable. Narrow screens stack the two panels. Reduced-motion and visible keyboard focus supported; no external fonts required.

## Components
### Extractor
Split newlines/bullets/sentences while retaining exact source snippets. Match submission instructions, constraints, eligibility, tools and deadlines. Attach a category and review flags. Do not invent dates or infer eligibility. Mark deadlines without a timezone and contradictory-looking multiple deadlines for review. Negative requirements remain negative; optional phrasing remains optional. Keyword heuristics are deliberately limited; not a complete eligibility checker.

Real-input refinement: prefer a recognizable Rules body when available; ignore a Comments section only when it introduces dated messages (not top navigation). Required-list introductions supply evidence for noun-only entries. Preserve abbreviations such as U.S. inside source sentences. Deduplicate repeated schedule rows, flag missing years/timezones and distinguish stage dates from confirmed conflicts. Full-page parsing remains heuristic; ignored introductory guidance may still need manual review.
### App and Rendering
Extractor actionTitle creates conservative concise labels; source keeps original section/list context and sentence wording. Display and export continue to use separate editable title and immutable evidence. Existing saved work is not migrated or overwritten; refresh then regenerate explicitly to obtain updated labels.
Safe DOM text APIs render user content. Source remains immutable while editable wording and completion change. Brief changes mark results outdated; exporting outdated results is blocked until regenerating. Regeneration warns before replacing progress. Empty and no-match states are explicit. Sample brief is labeled and loaded only on request.
### Storage
One versioned localStorage record for draft brief, analyzed brief and items; validate restored shape and limit input to 60,000 characters. Storage failure keeps current session usable and shows a warning. Clear action asks before deleting local work.
### Exporter
Markdown snapshot contains checked state, edited wording, source quotations, uncertainty flags and rule-based limitations. Download uses a Blob; no external transmission.

## Data Model
Optional `eventName` string, maximum 120 characters, labels the screen and Markdown heading; safe filename uses a normalized slug. Legacy records without this field remain compatible and retain existing work. User edits supply the event name; extraction does not guess it.
`{version:1, brief:string, analyzedBrief:string, items:[{id, title, source, category, flags:string[], done:boolean}]}`. All data is browser-local, not cross-device and not guaranteed after browser storage is cleared.

## File Structure
```
index.html       # application screen
styles.css       # glass design and responsive states
app.js           # events and rendering
extractor.js     # pure extraction and Markdown functions
storage.js       # versioned save/restore
assets/maker-pattern.svg # original background artwork
tests/core.test.js # meaningful extraction, storage and export fixtures
server.cjs       # allowlisted local server
package.json     # scripts; zero dependencies
README.md        # run instructions and limits
devpost/         # planning and learning artifacts
```

## External Services and Dependencies
None at runtime. No key, purchase, cloud database or hosted model.

## Important Failure Modes
- Unusual phrasing is missed → honest rule-based label, review notice and source-visible output; do not claim completeness.
- Missing/conflicting timezones or deadlines → flag original text rather than guessing conversion.
- Local storage unavailable/corrupt → warning and usable session; never execute saved markup.
- Brief edited after generation → stale notice; block export until regeneration.

## Verification
Node tests for explicit/negative/optional requirements, ambiguous deadlines, unrelated text, HTML-like source preservation, storage validation and Markdown checkbox/source output. Browser check input → generated card → editing → completion → reload → export plus a narrow viewport. Final user feedback and learning wrap-up remain separate completion conditions.
