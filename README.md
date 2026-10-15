# BriefForge

A small, local-first hackathon requirements checklist. Built with the Devpost Learn skill pack for Build With AI: Basics.

## Run
Install Node.js (developed using Node 24), then run `node server.cjs` from this folder. Open http://127.0.0.1:4173 . No npm install, API key or account is needed. Keep that origin/port to return to the same browser-local saved work.

## Try it
Select **Try a sample**, then **Create checklist**. Inspect the source sentences, edit wording, mark a requirement complete and reload. Export downloads a Markdown snapshot with sources, flags and checkboxes. Paste your own brief to try another event; regeneration replaces previous edits after confirmation.

## Limits and privacy
Extraction uses keyword and section patterns, not AI. For recognizable full-page copies it prefers the Rules section, skips dated comment feeds, preserves required-list context and extracts labeled Wave schedule rows. Other layouts may still be missed or misclassified. It does not verify eligibility, resolve contradictions or convert timezones. Always review full official rules. Timezone/year flags apply to the matched source; another part of the pasted brief may define them. When a recognizable Rules section exists, introductory guidance outside it can be omitted; check that too.

Data stays in this browser's localStorage. No brief content is sent to a remote service. Clearing browser storage removes saved work. Private browsing, storage limits and browser settings may prevent persistence; a warning is shown. Clearing local work asks for confirmation. Maximum brief length: 60,000 characters.

`npm test` runs core fixtures (the runner stays in one process for restricted Windows environments). `server.cjs` serves only allowlisted app files and binds loopback. Planning and personal learner notes are not served. No production hosting selected yet.

## Development and authorship
New project created during the event with Codex assistance and the [official Devpost Learn skill pack](https://github.com/challengepost/learn-ai-basics). A local curriculum copy is ignored in `.agents/`; the planning artifacts document its use. Theme artwork is original SVG; supplied reference images were used for visual direction and are not bundled. No third-party runtime libraries or pre-existing app code. Project identity is a working name; trademark/domain availability has not been checked.

Submission work still requires hands-on review, learning wrap-up, public source repository and a demonstration video under three minutes. This README is development documentation, not learner-authored Devpost submission copy.
