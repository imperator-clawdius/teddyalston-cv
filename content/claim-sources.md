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

- Review Argos and TraceReady implementation evidence against homepage claims.
- Reconcile the downloadable PDF with the forward-deployed engineering positioning, using only established experience and project evidence. The text resumes currently lead with Entrepreneur / Operator. Preserve the original extracted long resume as source history.
- Confirm current credentials and business metrics before changing their wording or dates; source text alone does not verify present license status.
- Inspect the PDF's actual contents and layout before replacing it. Existing browser tests verify download delivery, not resume accuracy.

## Release evidence

GitHub PR 2 was open, draft and unmerged at review, with head 2ed5537 and base 57966b4. Local browser checks do not prove the repair is deployed. The Pages API lookup did not return usable metadata in this review; current deployment remains unverified.
