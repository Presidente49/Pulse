# GatorBait Bold — separate editorial comparison

Owner requested a separate, bolder version using UI UX Pro Max. Route: /pro-max/. Existing PULSE root and production Wix are preserved. This is a private, noindex static comparison using the same October 4 story selection. Article links lead to the original reporting, with actual bylines and available photo credits.

## Source and status
UI UX Pro Max source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill at 477bcb28c9812b385cb51a4605ddf30d7b2266e2. MIT license read and retained in PRO-MAX-LICENSE.txt. Evaluated locally; not installed in production. It supplies design guidance, not a finished template or measured performance result.

Queries: `sports editorial magazine photography --design-system --variance 8 --motion 2 --density 6`; narrowed to `editorial magazine grid --domain style -n 1`, which returned editorial-grid-magazine. Applied asymmetric grid, strong hierarchy, large imagery, bylines, dividers and responsive reflow. Rejected the generic red palette and heavier brutalist effects. Used GatorBait blue, orange, white and field green with the actual wordmark.

## Hypothesis and comparison
Hypothesis: the dominant lead, separated writer column and compact supporting stories help readers identify a story they want faster than the PULSE layout. Baseline: same seven stories in content/stories.json, same destinations, actual writers and snapshot dates. Analytics baseline is unknown; no engagement improvement claimed.

Proposed small moderated comparison after owner review: counterbalance both layouts with the same stories; ask readers to select a relevant story and locate Buddy Martin's show. Record completion time, success, and a 1–5 ease rating. Advance only if median selection time improves at least 15% without lower task success or satisfaction. A later authorized live test would separately measure next-article clicks and engaged reading time, never attribute traffic changes to this preview.

## Checks
Desktop and phone-width browser rendering of the same route; headings remain in document flow below photos. Phone widths 320, 390 and 430 CSS pixels are rendered in same-origin frames, not claimed as physical iPhone/Safari tests. A 320px headline overflow and wrapped header were found and corrected. No canvas, forced cursor or scroll takeover on this route. Reduced-motion style and visible keyboard focus. Build/lint checked before publication.

SEO: semantic visible headings, original story URLs and credits, no invented writer profiles or schema. Preview remains noindex/nofollow with owner-only access. Production indexing, Wix schema and search settings untouched. Search clicks, AI citations and AI-referred visits remain distinct and unmeasured here.

Next: owner compare visual direction on desktop and phone before any proposed Wix adaptation.
