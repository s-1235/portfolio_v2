# Portfolio v3 — Rebuild Project

## Authorization rule (most important)

Make only changes explicitly requested in the current task. No unrequested refactors, renames, file moves, new abstractions, new dependencies, config changes, or "while I was in there" improvements. If you notice something worth changing, flag it and wait for approval.

## Anti-over-engineering

- Build only what the current feature requires. No speculative flexibility, no abstractions for hypothetical future needs.
- Prefer editing existing files over creating new ones. No new patterns or libraries when existing ones work.
- No new dependencies, build tooling, or architectural patterns beyond what this homepage needs — ask first.

## Workflow loop

1. Before any significant task, present 2–3 approaches with tradeoffs. Wait for a choice.
2. Implement only the chosen scope.
3. Stop and report exactly what changed, file by file.
4. Verify visually/functionally before calling anything done.

## Communication

- Never open with filler ("Great question!", "Certainly!"). Start with the answer.
- Match length to task: short answers for simple questions, detail only where complexity demands it. No restating the question, no closing summaries that repeat the response.
- If uncertain about any fact, API behavior, or technical detail, say so explicitly before including it. Never fill gaps with plausible-sounding information.

Sadam Khan's personal portfolio. Rebuilding from a 2021-era Next.js Pages Router site
into a modern, light, editorial portfolio positioned around **full-stack + AI product
engineering**. Design reference: https://www.jennyddesigns.com/ (architecture and
restraint), upgraded with far deeper case studies than the reference.

## Decisions (agreed with Sadam)

- **Rebuild, not renovate** — fresh Next.js app in this repo (work on a branch), port assets worth keeping.
- **Visual direction:** light/editorial base following Jenny's principles (whitespace,
  minimal palette, few typefaces), with selected signature touches from the old site
  (single accent color, purposeful motion). NOT a 50/50 merge of the two designs.
- **Target stack:** Next.js 15+ App Router, React 19, TS 5, Tailwind CSS 4, Motion
  (framer-motion 12), Lenis or native scroll, MDX/typed content dir for case studies,
  next/image, static generation.
- **Kill list from old site:** audio preloader, 9s gate, hover-effect WebGL lib,
  locomotive-scroll, react-ga (→ modern analytics), fake tweets API, dead
  /portfolio stubs, inherited Adeola content/links, emoji-heavy copy.
- **Site map:** `/` (hero, selected work, brief about, contact) · `/work` ·
  `/work/[slug]` case studies · `/about` · optional `/playground` or `/writing`.
- **Case study template:** problem → role → stack → architecture (incl. how the AI
  part works) → screenshots → outcome/metrics → links.
- **Contact form** must actually deliver to Sadam's email (Resend or similar — pending
  choice + API key).

## Content sources

- **Toptal public profile (ACCESSIBLE, primary source):**
  https://www.toptal.com/developers/resume/saddam-hussain?preview
  Fetched 2026-07-27. Key content:
  - Positioning: full-stack + AI systems; SaaS and LLM-powered apps; currently LLM
    evaluation & benchmark design. "Verified Expert in Engineering", Lahore, Pakistan.
  - Projects: **Podding** (AI podcast guest booking, LangGraph/RAG, −85-88% workflow
    time, 95% acceptance, podding.vercel.app) · **Hire Kayana VA** (AI hiring
    marketplace, multi-agent, −90% hiring time, hirekayana.com) · **Medical Imaging AI
    Platform** (fine-tuned MedGemma 4B, 87% X-ray fracture acc., 30K+ image dataset,
    HIPAA/FHIR) · **Sitescripter AI** (commercial Chrome extension, FAISS RAG, solo
    founder) · **Mya Team** (bookings/staff platform, joinmya.com/pricing-mya-team/).
  - Experience: Expert Crowd/Vetto (2026, LLM evals, 300+ contributors) · Medical
    Imaging (2025) · Podding (2024-25) · Sitescripter (2023-24, founder) · Kayana
    (2022-23) · Revinate (2021-22, 5000+ properties) · Kallidus (2020-21, Rails,
    60min→3min report optimization). Education: BSCS, COMSATS Lahore (2017-2021).
- `public/projects` file — Sadam will drop extra project details + links here (pending).
  Read it at session start if it exists; supplements/overrides Toptal content.
- Project screenshots/graphics: capture from the live project sites.
- Social links (LinkedIn, X, GitHub, etc.): Sadam will provide — pending.
- OPEN QUESTION: name on site — old site says "Sadam Khan", Toptal says "Saddam
  Hussain". Confirm which to brand the portfolio with.

## Progress catalogue

### Done
- [x] Full audit of old codebase (session 2026-07-27)
- [x] Reference site analysis (jennyddesigns.com: home, /portfolio, case-study pages)
- [x] Direction + stack decisions agreed
- [x] CLAUDE.md created
- [x] Toptal profile fetched — confirmed as primary content source (Sadam's decision)
- [x] Permissions: `.claude/settings.local.json` created (allow reversible: edits, npm/npx,
      git branch/commit; ask: push/reset/rm; deny: force-push, rm -rf /). Gitignored.
- [x] Playwright + Chromium installed in session scratchpad (browser cached at
      ~/.cache/ms-playwright, survives sessions; the npm pkg may need reinstall in a
      new scratchpad). Smoke-tested on podding.vercel.app.

### In progress / next
- [ ] `public/projects` file from Sadam — optional supplement to Toptal (repo links, NDA notes)
- [ ] Receive social links (LinkedIn, X, GitHub)
- [ ] Capture screenshots/graphics from live project sites
      NOTE: podding.vercel.app public page = login screen only; interior shots need
      creds or exported images from Sadam. Check hirekayana.com and joinmya.com too.
      DONE for Podding: saved in repo at `content-assets/podding/` — 10 shots of
      podding.co (client's marketing site — video agency, dark theme, green accent)
      plus `app-login.png` (podding.vercel.app login screen).
      **NDA CONSTRAINT: the Podding app/tool is under NDA. Never show or describe
      internal tool screens/details on the portfolio — only the login screen, the
      public marketing site, and the high-level outcomes already public on Toptal.**
- [ ] Scaffold new Next.js 15 app (branch: `rebuild`), design tokens, fonts, layout shell
- [ ] Build: home → /work → case-study template → /about
- [ ] Contact form wired to email (needs provider decision + API key from Sadam)
- [ ] Motion/polish pass, OG images, SEO, Lighthouse
- [ ] Ship: merge to main, deploy, archive old code

## Build plan (authoritative, step-by-step)

Work top to bottom; each step has its own verification. Mark [x] as steps complete.

### Phase 0 — Unblock (needs Sadam)
- [ ] 0.1 Name + hero title decision (Sadam Khan vs Saddam Hussain)
- [ ] 0.2 Social links (GitHub, LinkedIn, X)
- [ ] 0.3 Email provider choice (Resend vs Formspree) + API key + delivery address (only blocks Phase 5)
- [x] 0.4 Capture remaining project screenshots → content-assets/<project>/ (2026-07-27)
      - kayana/: current site (REPOSITIONED — now 'Operational Alpha for PE-backed
        companies', Lovable-built; NOT the VA marketplace Sadam built) + Wayback
        May-2024 marketplace-era captures (marketplace-2024-hero/full.png, toolbar
        hidden). Use marketplace-era shots for the case study; current-site shots are
        context only. Wayback earliest snapshot = 2024-05-24.
      - mya/: hero+full for home, features, integrations, pricing, testimonials,
        about — recaptured with HubSpot cookie banner + chat widget hidden (clean).
        Design: warm cream/dark-green editorial, serif headings — nice reference for
        our light direction too.
      - sitescripter/webstore.png verified: shows extension UI carousel, developer
        listing (sadamhussainkhan100), v2.02 updated Dec 2025. SiteScripter is
        Sadam's OWN product — no NDA; in-product shots allowed.
      - sitescripter/: sitescripter.co hero+full (dark theme, purple gradient,
        'Unprecedented Web AI') + Chrome Web Store listing (webstore.png)
      - podding/: done earlier (see NDA note)
      - Medical Imaging AI Platform: NO public URL known — need link or images from
        Sadam (or mark case study as visuals-pending)
      All captures visually verified; no blank frames. Machine DNS is flaky —
      Playwright goto sometimes needs retries (ERR_NAME_NOT_RESOLVED, transient).

### Phase 1 — Scaffold
- [ ] 1.1 Create `rebuild` branch
- [ ] 1.2 Scaffold Next.js 15 (App Router, TS, Tailwind 4) — decide in-place vs subdirectory
      via approach options first
- [ ] 1.3 Port keepers: content-assets, avatar/logo SVGs, CLAUDE.md stays at root
- [ ] 1.4 Base config: fonts (variable pairing), metadata, prettier
      Test: `npm run dev` boots; `npm run build` passes; `tsc --noEmit` clean

### Phase 2 — Design system
- [ ] 2.1 Tokens: light palette + single purple accent, type scale, spacing, radii
- [ ] 2.2 Motion primitives (Motion 12): fade/slide reveals, page transitions, durations
- [ ] 2.3 Shared components: header/nav, footer, container, button, link styles
      Test: Playwright screenshots of a token demo page at 1440/768/390px; visual review

### Phase 3 — Content layer
- [ ] 3.1 Typed `content/projects/*` for the 5 Toptal projects (+ NDA flag per project)
- [ ] 3.2 About/bio + experience timeline data from Toptal
      Test: `tsc --noEmit`; render raw content dump page; proofread copy

### Phase 4 — Pages (build → verify each before next)
- [ ] 4.1 Home: hero (name, positioning, CTA), selected work (3-4), brief about, contact strip
- [ ] 4.2 /work index: all projects, filter chips (AI / full-stack / frontend)
- [ ] 4.3 /work/[slug] case-study template: problem→role→stack→architecture→visuals→outcome;
      NDA variant (login shot + "interface under NDA" + public metrics only) — Podding uses it
- [ ] 4.4 /about: photo, story, skills, timeline, resume download, Toptal badge/link
- [ ] 4.5 404 page
      Test per page: Playwright at 1440/768/390px; check dark-content-on-light contrast;
      keyboard nav; all links resolve

### Phase 5 — Contact
- [ ] 5.1 Form + API route (provider from 0.3), validation, honeypot
      Test: send real submission end-to-end, confirm delivery to Sadam's inbox; test
      validation errors and rate limiting

### Phase 6 — Polish & SEO
- [ ] 6.1 Motion pass: scroll reveals, page transitions, prefers-reduced-motion support
- [ ] 6.2 SEO: metadata, OG image, favicon, sitemap.xml, robots.txt
- [ ] 6.3 Image optimization: next/image everywhere, compress content-assets exports
- [ ] 6.4 Analytics (Vercel Analytics or GA4)
      Test: Lighthouse ≥90 all four categories (mobile+desktop); OG preview correct;
      reduced-motion actually disables animations

### Phase 7 — Full QA sweep
- [ ] 7.1 Playwright full-page screenshots of every route at 3 viewports; review all
- [ ] 7.2 Link check (internal + external), tsc, build, no console errors
- [ ] 7.3 Cross-check content against Toptal for accuracy; NDA compliance re-check

### Phase 8 — Ship
- [ ] 8.1 Commit history clean on `rebuild`; merge to main (with Sadam)
- [ ] 8.2 Deploy (Vercel), verify production URL, submit sitemap
- [ ] 8.3 Archive old code (tag pre-rebuild commit), update README

### Backlog / later
- [ ] /playground or /writing section
- [ ] Analytics (GA4 or Vercel Analytics)
- [ ] Resume download on /about

## Conventions for future sessions

- Keep this file updated: move items between Done / Next / Backlog as work happens,
  and log non-obvious decisions under Decisions with a one-line rationale.
- Old site remains untouched on `main` until the rebuild is deployable.
