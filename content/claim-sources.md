# Published claim sources

Reviewed 2026-09-20. Source consistency is not independent verification.

| Homepage claim | Source inspected | Evidence limit |
| --- | --- | --- |
| 7+ months in production | Trident README, section 7, commit c6e5004ba3187227cc60291642e1afada2aa5520 | Historical operator report; no uptime telemetry inspected |
| 5,800+ logged agent events | Same case study, section 7 | No underlying event export inspected |
| 50+ days without a sync gap | Same case study, section 7; reports continuous sync since June 2 | Historical interval, not a current streak guarantee |
| 500+ regulated-service clients | short-resume.txt and long-resume.txt, True Tax experience | Supplied professional history; no client records inspected |
| Four core agents, two hosts, independent monitoring | Trident README sections 1 and 4 | Two workload hosts plus separate watchdog host; not two machines total |

The homepage now links to the pinned case-study snapshot alongside its metrics.
Do not increase counts based only on elapsed calendar time.

## Remaining content work

- Argos source inspection supports the seven named states and nine weighted domains (workflows/state_machine.md and schema/risk_policy.json at 401b19f86cf386eab56ddb70924b95a7f2878a0d). This is specification/policy evidence, not proof of live enforcement.
- TraceReady README and next.config.ts at 1e5df237ed382d93cb0f6e37d1445e305fa29eca describe browser-side file cleanup, paid service Payment Links and a static GitHub Pages export. These support the homepage scope; they do not support the PDF wording about regulated document management or a Cloudflare deployment.
- Reconcile the downloadable PDF with the forward-deployed engineering positioning, using only established experience and project evidence. The text resumes currently lead with Entrepreneur / Operator. Preserve the original extracted long resume as source history.
- Confirm current credentials and business metrics before changing their wording or dates; source text alone does not verify present license status.
- PDF inspected and rendered on 2026-09-20 using local PyMuPDF (Poppler unavailable): one legible page, no observed clipping or overlaps. It already contains technical skills and engineering projects. Text extraction produces replacement characters for some punctuation although the visible rendering is correct; a rebuilt PDF should verify text extraction as well as appearance.
- PDF says True Tax was founded in 2016; both extracted source resumes say 2018. Owner clarification is pending. Do not silently select one date.
- PDF groups Passive Print Labs and Fire Blast under 2022-Present, while source text dates Passive Print Labs to 2024. Separate the entries when rebuilding.
- PDF lists a public phone number; the historical extracted text deliberately omits it. Preserve existing publication choices pending a deliberate resume revision; do not copy the number into new audit documents.

## Release evidence

GitHub PR 2 was open, draft and unmerged at review, with head 2ed5537 and base 57966b4. Local browser checks do not prove the repair is deployed. Direct authenticated Pages API verification subsequently confirmed HTTPS-enforced main/root deployment at 57966b48b7145a2510c35c831aec2e0c127bcb39. Public homepage and catalog bytes match that main commit and differ from the repair branch. The PDF matches both branches. The repair navigation script is not available on the public site. These repairs are therefore not yet deployed. CI run 35526186668 succeeded for a2742bf; run 35526190074 was still active when checked. The earlier billing failures from other repositories do not establish a current blocker here.
