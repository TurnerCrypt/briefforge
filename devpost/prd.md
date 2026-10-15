---
doc: prd
status: approved
---

# BriefForge — Product Requirements

Working name: BriefForge. Turn a hackathon brief into a verifiable submission checklist for hackathon entrants.
Source: scope.md > Who It's For and The Unique Kernel.

## The Core Journey
1. Paste the event brief into the input panel.
2. Select Create checklist.
3. Review requirements alongside their source sentences and uncertainty flags.
4. Tick off completed requirements.
5. Export the checklist.
6. Return on the same browser/device to find the brief and checked items restored.
Source: scope.md > The Core Loop; learner explicitly approved automatic device saving.

## Screens and Layout
The accepted preview provides a single working surface: brief on the left, checklist on the right, with a large shared container. Maintain a readable narrow-screen arrangement; precise responsive behavior belongs in the technical plan.

## Look and Feel
Approved visual direction: minimalist dark theme, frosted transparent main container and appropriate secondary panels, warm orange accent, refined typography and distinctive clipped-corner primary button. No action arrows. Randomly scattered original screwdriver, screw, hex nut, ruler, terminal and code outlines with varied angle, scale and faintness. Preserve reading contrast inside the work panels.
References were supplied as visual inspiration; illustrations and arrangement are original.
The learner accepted theme-preview.svg revision 3 with “looks good.”
Proposed identity: BriefForge with a hex-nut/checkmark logo; final name and logo not yet explicitly confirmed.

## Requirements and Evidence
- Checklist items retain the relevant source sentence from the pasted brief.
- Surface mandatory tools, repository requirements, video limits and deadline timezone information when present.
- Flag unclear requirements for review rather than inventing missing details.
- Each requirement can be marked complete.
Source: scope.md > The Unique Kernel and What "Working" Looks Like.

## Automatic Saving
Save the brief and checked items automatically on the same device/browser; no account needed. Restore the saved work when the page is reopened.
Acceptance check: generate a checklist, complete an item, close/reopen the page and observe that the brief and completion state remain.
Source: learner answered “yeah lets do that” to device-local automatic saving.

## Review and Corrections
Display a concise action label above the evidence, rather than repeating the full rule as the title. Retain exact source wording and available section/list context in the source disclosure. Keep numbers, limits, negative and conditional wording visible through the label or review flags; uncertain simplifications use review-oriented labels. Learner explicitly requested this refinement with “run it.”
Users can edit the checklist wording while the source sentence remains unchanged. Marking an item complete does not certify eligibility or resolve an uncertainty flag. Continue was interpreted as agreement to the preceding recommendation to support editing; include this behavior in final product review.

## Export
Proposed default: download a Markdown file containing checklist wording, checked state, source sentences and unresolved flags. The exported checklist is a snapshot of the current work. Markdown is readable as plain text and supports checkboxes in many editors. This format is an agent recommendation, not a learner-selected format.

## Empty and Error States
Proposed behaviors included in this draft for review:
- First use shows input guidance and an empty checklist, rather than presenting example results as real extraction.
- Empty input produces an actionable request to paste a brief.
- No recognized requirements produces a review message, not a fabricated checklist.
- An unclear deadline stays flagged and is not silently converted to a guessed timezone.
- Saving failure is visible, without discarding the work currently on screen.

## Product Decisions
- Source evidence and ambiguity flags distinguish the tool from an ordinary checklist.
- Accepted preview establishes layout and visual direction.
- Brief and completion state survive reopening on the same device.

## Proposed Acceptance Checks
- A brief containing a repository requirement and video limit yields corresponding items with matching source text.
- A deadline lacking a timezone is visibly flagged.
- Marking an item complete changes its visible state and survives reopening.
- Export reflects the displayed items, completion state, source evidence and flags.

## POC Boundary
The approved paste/review/check-off/export journey plus device saving. Accounts, cloud synchronization, event scraping and registration are not part of the current plan.

## Open Questions
- This complete draft has not yet been displayed for approval. Review together: editable wording, Markdown export, empty/error states and working BriefForge name/logo.
- Technical planning must resolve whether extraction runs locally using explicit text patterns or uses a hosted model. This is a consequential choice: local rules need no API key but cannot understand arbitrary language as broadly as a model. No extraction behavior should be presented as AI if it uses rules.

Review correction: implementation preceded the complete review. The learner subsequently reviewed the plain-language behavior summary and explicitly approved it: “yes i am cool with the app.” Product-plan review is now complete; this does not imply that an organizer reviewed the project or that submission has occurred.
