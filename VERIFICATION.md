# Portfolio verification — 2026-09-18

Baseline: `57966b4`. Static GitHub Pages site; no application backend or forms.

## Repaired defects

- The fixed two-column hero squeezed the non-wrapping headline at tablet and
  small desktop widths. Stack the hero below 1361px; adapt narrow case-study
  grids while retaining the desktop rail, content hierarchy, and visual system.
- Font-provider failure caused even larger text overflow. Allow the heading to
  wrap when its font or available width changes.
- The native mobile menu stayed open after navigation and did not handle Escape.
  A small progressive-enhancement script closes it and restores trigger focus
  on Escape. The disclosure still works with JavaScript disabled.
- Homepage skip-link focus was unreliable; the catalog lacked a skip link.
  Both now target focusable main elements and share visible-on-focus styling.
- Mobile anchor targets now allow clearance for the sticky header.

## Evidence

- `npm ci` installs the pinned lockfile; `npm audit --audit-level=low`: zero
  findings at the time of review.
- `npm test`: 24 Chromium browser tests passed locally on Windows. The suite
  checks both pages' local links, cross-page fragments, loaded images, PDF
  response signatures and an actual download, 16 homepage viewport widths
  (including both sides of layout boundaries), five catalog widths, keyboard
  skip links, mobile navigation, disabled JavaScript, and blocked font providers.
- Screenshots inspected at tablet width; desktop/mobile captures also retained
  in the local review workspace. Content remains visible without clipping.
- Public homepage, catalog, and PDF returned HTTP 200; PDF content type was
  `application/pdf`. GitHub Pages reported a built HTTPS deployment.
- Unauthenticated HTTP checks: TraceReady, X profile, GitHub profile and the
  Trident, Argos, TraceReady, Backstop, Daybreak, and Eidetic repos returned 200.
- Etsy returned HTTP 403 to automated access; that is not proof of a dead shop.

## Limits / follow-up

- These branch changes are not deployed until merged into the Pages source
  branch. Recheck the public pages after deployment; CI tests a local server.
- Historical `design-qa.md` scores are not current evidence. The new suite is not
  a complete accessibility audit or a Firefox/Safari compatibility guarantee.
- External links and third-party fonts/icons can change independently of this
  repository. Tests intentionally do not treat third-party availability as a
  local link guarantee. Etsy needs an ordinary interactive check.
- Published operating metrics can be traced to the Trident case study, not to
  telemetry inspected during this review. Do not silently increase them.
- The downloadable resume and source resume text retain older operator/founder
  positioning. No personal experience, credentials, or employment facts were
  invented or rewritten as part of the functional repairs.

GitHub Actions now runs the browser suite on every push and pull request.

2026-09-20: reinstalled dependencies and revalidated all 24 browser tests on Windows. Trident metrics match the pinned case-study source and are now linked as reported snapshot metrics. See content/claim-sources.md for provenance and unresolved content/deployment requirements. No underlying telemetry or client records were inspected.

Resume review correction: the PDF already contains extensive technical skills and selected engineering work; only the text sources retain the older operator headline. One-page visual rendering is clean. Founding-date conflict and TraceReady scope/deployment mismatch are recorded in content/claim-sources.md. No PDF replacement has been made pending resolution of factual discrepancies.
