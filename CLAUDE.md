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
- **Visual direction (REVISED 2026-07-29, Sadam's call):** FULL light, image-led,
  Jenny-converged. Graphite blocks dropped entirely (variant C's dark sections felt
  too far from the reference in production). Work cards = large screenshot tiles
  with name + tagline beneath; purple only in small details (eyebrows, links,
  buttons, timeline dots). Projects without visuals get accent-soft typographic
  placeholder tiles.
- **Copy style rule (Sadam, 2026-07-29): NO em-dashes (—) anywhere in site copy.**
  Use commas/colons/periods instead. Numeric ranges keep en-dashes (85–88%).
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
- Name on site: RESOLVED — "Sadam Khan" (decided 2026-07-27; git identity matches).

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
- [x] 0.1 Name decision: **Sadam Khan** (matches GitHub profile). Hero/positioning
      line: full-stack engineer building AI-powered products (exact wording at
      design time, sourced from Toptal bio). Toptal profile still says "Saddam
      Hussain" — fine, keep the badge link as-is.
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

### Phase 1 — Scaffold ✅ (2026-07-27)
- [x] 1.1 `rebuild` branch created (approach chosen: root swap on branch; old app
      removed on branch only — main untouched)
- [x] 1.2 Scaffolded: Next.js 16.2.12, React 19.2.4, TS, Tailwind 4, App Router,
      no src-dir, alias @/*. Package name: sadam-khan-portfolio
- [x] 1.3 Keepers: content-assets/ intact; brand SVGs copied to content-assets/brand/
      AND public/brand/ (sadam2.svg, sadam_logo.svg, sadamAva.png)
- [x] 1.4 Fonts: Fraunces (--font-display) + Inter (--font-sans) via next/font;
      metadata set (Sadam Khan — Full-Stack Engineer · AI Systems); prettier added
      Test PASSED: tsc clean, build green, dev boots HTTP 200

### Phase 2 — Design system ✅ (2026-07-27)
- [x] Direction chosen by Sadam from 3 rendered variants: **C — light + graphite
      blocks** (light editorial base, near-black "Selected work" sections, purple
      accent #8000ff, Fraunces display + Inter)
- [x] 2.1 Tokens in globals.css via @theme inline: bg #f5f5f4, surface #fff, ink
      #18181b, muted #63636a, accent #8000ff, accent-soft, line, block #18181b,
      block-surface #232327, block-ink, block-muted → Tailwind utilities (bg-block,
      text-muted, text-accent, font-display, etc.)
- [x] 2.2 Motion: `motion` pkg installed; components/motion/Reveal.tsx (whileInView
      fade+rise, respects prefers-reduced-motion). NOTE: full-page screenshots must
      scroll through the page first or whileInView content captures as invisible.
- [x] 2.3 components/ui/{Container,Button(primary|secondary|inverse)}, components/
      layout/{SiteHeader,SiteFooter}; content/site.ts (site meta + socials, socials
      still TODO pending 0.2). /preview = temporary token demo route, REMOVE in Phase 7.
      Test PASSED: tsc + build clean; verified at 1440/768/390 (fixed mobile header
      wrap with whitespace-nowrap). Stale .next types after route deletion → rm -rf .next.

### Phase 3 — Content layer ✅ (2026-07-28)
- [x] 3.1 content/projects.ts — typed Project (slug, tagline, tags, category[] for
      /work filters, period, role, summary/problem/approach/outcomes, stack, links,
      nda, visualsPending, assetsDir, featured order). 5 projects: podding (NDA,
      featured 1), kayana (2), medical-imaging-ai (visualsPending, 3), sitescripter
      (4), mya (not featured). featuredProjects export drives home page.
- [x] 3.2 content/experience.ts (7 roles + education) + site.ts extended (bio,
      heroHeading/Sub, email sadamkhan505880@gmail.com, location, toptalBadge).
      Home page now consumes content layer (no inline data).
      /preview/content = temporary proofread dump route, REMOVE in Phase 7.
      Test PASSED: tsc, eslint, build clean; dump page + home verified in browser.

### Phase 4 — Pages ✅ (2026-07-28)
- [x] 4.1 Home: hero + featured ProjectCards (link to case studies) + "View all
      work" + about + mailto contact. (Interim version had shipped 07-28 to fix
      Vercel prod after main's legacy React17/next@latest ERESOLVE failure.)
- [x] 4.2 /work: filter chips derived from categories present (All/AI/Full-Stack),
      components/work/WorkGrid.tsx (client) + ProjectCard.tsx (shared with home)
- [x] 4.3 /work/[slug]: SSG (generateStaticParams, 5 pages), per-page metadata,
      outcomes cards on graphite, problem/approach, stack chips, image gallery with
      captions, NDA banner variant (Podding), visuals-pending variant (Medical),
      prev/next nav. Case-study images copied to public/projects/<slug>/ with
      intrinsic dims in content (next/image). FIXED: Kayana toolbar-hidden archive
      capture was blank (19KB white) — recaptured waiting for 'Can-do' text; blank
      marketplace-2024-full.png git-rm'd.
- [x] 4.4 /about: avatar (public/brand/sadamAva.png — cartoon avatar, Sadam may
      want a real photo later), bio, Toptal badge button, experience timeline on
      graphite, education. Resume download SKIPPED (no file — backlog).
- [x] 4.5 app/not-found.tsx. Header route links restored (/work, /about).
      Test PASSED: tsc/eslint/build clean; screenshots verified: work+podding+about
      (1440+390), medical (visuals-pending), 404, home. Keyboard nav not yet
      audited — do in Phase 7.

### Phase 5 — Contact ~✅ code complete (2026-07-28), delivery test BLOCKED on key
- [x] 5.1 Provider: Resend via plain fetch (no SDK dep). app/api/contact/route.ts:
      validation (name ≤200, email regex ≤320, message 10–5000), honeypot field
      "company" (silently accepted), per-instance rate limit 5/min/IP. Env:
      RESEND_API_KEY (required), CONTACT_TO_EMAIL (optional, defaults site.email).
      Sender: onboarding@resend.dev sandbox — NOTE: sandbox only delivers to the
      Resend account owner's own inbox; verify a custom domain later for cleaner
      From. components/contact/ContactForm.tsx (client, idle/sending/sent/error
      states). Wired into home #contact with mailto fallback link.
      Tested: 400s per field, honeypot 200, rate-limit 429 after 5/min, 503 +
      friendly error when key missing (UI shows it, mailto fallback visible).
      PENDING (Sadam): create Resend account, add RESEND_API_KEY (+ optional
      CONTACT_TO_EMAIL) in Vercel env → then run real end-to-end delivery test.

### Phase 6 — Polish & SEO ✅ (2026-07-28)
- [x] 6.1 Motion: Reveal (existing) + app/template.tsx route-transition fade
      (respects prefers-reduced-motion via useReducedMotion)
- [x] 6.2 SEO: metadataBase from VERCEL_PROJECT_PRODUCTION_URL (localhost fallback),
      title template "%s — Sadam Khan" (per-page titles trimmed to bare names),
      OG+Twitter meta, public/og.png (1200x630, generated from branded HTML via
      Playwright — regen template in scratchpad og.html), app/icon.svg (brand mark
      recolored #f0f0f0→#18181b for light tabs; default favicon.ico removed),
      app/sitemap.ts (all routes), app/robots.ts (disallow /preview, /api)
- [x] 6.3 Images: public/projects/* downscaled to ≤1920w via sharp (9.9MB→2MB);
      intrinsic dims updated in content/projects.ts. content-assets/ keeps originals.
- [x] 6.4 @vercel/analytics installed, <Analytics/> in layout. NOTE: needs Analytics
      enabled in Vercel dashboard (Sadam) to record data.
      Test PASSED: Lighthouse home — desktop 100/100/96/100, mobile 94/100/96/100
      (perf/a11y/bp/seo). BP=96 due to local-only 404 of /_vercel/insights/script.js
      (exists only on Vercel infra). Sitemap+robots verified on prod server.
      OG preview + reduced-motion spot-check: pending in Phase 7 sweep.

### Phase 7 — Full QA sweep ✅ (2026-07-29)
- [x] /preview + /preview/content routes REMOVED (robots.ts still disallows /preview —
      harmless, left in)
- [x] 7.1 27 full-page screenshots (9 routes × 1440/768/390) — representative set
      reviewed incl. NDA + visuals-pending variants, sitescripter, mya, 404
- [x] 7.2 tsc/eslint/build clean. Console: ONLY /_vercel/insights/script.js 404
      (local-only, resolves on Vercel). Links: all internal 200; externals OK
      except LinkedIn 999 (bot-block, not broken — URL still unverified pending
      0.2) and joinmya 301 (fine). Tab order on home: fully logical, 14 stops.
      FIXED during sweep: reduced-motion was broken (useReducedMotion returns
      value post-mount; motion bakes initial opacity:0 into SSR HTML and ignores
      later initial changes) → replaced hook with CSS: .motion-safe-anim +
      @media (prefers-reduced-motion: reduce) { opacity/transform !important }.
      Verified: reduce=all visible instantly; normal=below-fold still animates.
      LESSON: pkill -f pattern must not match own shell cmd (use "[n]ext" bracket
      trick) or the compound kills itself with empty output.
- [x] 7.3 Content metrics cross-checked against Toptal record — all match. NDA
      compliance: Podding = marketing site + login + public metrics only ✓

### Playground v2 (2026-08-01, Sadam: scripted demo too weak)
- AgentPipelineDemo (scripted) REPLACED by components/playground/
  OrchestratorDemo.tsx: a REAL engine in the browser. 8-node DAG (planner,
  3 tools, drafter, citations, critic, finalizer), scheduler loop with
  concurrency cap, seeded PRNG (mulberry32) failure injection on tool nodes,
  retries with exponential backoff, skip cascades on upstream failure, token
  budget accounting, cancel, metrics tiles, event log. Same slug
  /playground/agent-pipeline (URL stable). Functionally tested: default run
  8/8 success; 60% failure + 0 retries run gives failed tools + cascaded
  skips + partial completion. Both domains verified serving the new site
  (user cache was showing them the old one).

### Vetto AI case study (2026-07-31, from Sadam's direct account)
- Project #8, featured 1 (others renumbered 2 to 8); /work/vetto. Role updated in
  experience.ts too: "Full-Stack Engineer, LLM Evals" at "Vetto AI (Expert Crowd)".
- Content sources: Sadam's description (Coding Arena: Next.js, agentic pipelines,
  VS Code integration, sandboxed Oracle Cloud envs for multi-LLM task runs, eval
  task authoring) + Toptal record (300+ contributors, handbook) + vetto.ai public
  site (frontier-lab evals positioning, ex-DeepMind/Meta/Mistral founders).
  Public reviews sparse (young company). Hero captured from vetto.ai.

### Domain + full project roster (2026-07-30)
- Case studies now 7: added revinate + kallidus (employer roles, category
  full-stack, marketing-site hero images from revinate.com/kallidus.com —
  kallidus.com blocks headless UAs, needs real-UA override to capture).
- **sadamkhan.vercel.app is LIVE**: the domain belonged to a second Vercel
  project "sadamkhan" (Sept 2022, linked to the SAME repo, failing on Node 16
  pin like portfolio-v2 did). Fixed its nodeVersion→22.x and redeployed; it now
  serves the new site with correct self-referencing sitemap. NOTE: TWO projects
  (sadamkhan + portfolio-v2) now auto-deploy every push to main. Recommend
  eventually deleting portfolio-v2 project (or make one a redirect) — ask Sadam.

### Vercel production (FIXED 2026-07-29)
Root cause of all failing deploys: project had Node.js Version pinned to
discontinued "16.x" (2021-era setting) — builds aborted in ~5s before install.
Fixed via API PATCH nodeVersion→"22.x" (project prj_SlQ8xZllgNP1ocuAuV4wzyGJpJgQ,
team s1235s-projects) + redeploy. Production URL:
https://portfolio-v2-fawn-nine.vercel.app — verified: all routes 200, sitemap
uses prod domain, /api/contact 405 on GET (POST-only, correct).
Vercel CLI installed globally + repo linked (.vercel/ + .env.local gitignored).
Sadam is logged in via `vercel login` — future sessions can use vercel
CLI/API directly (auth token in ~/.local/share/com.vercel.cli/auth.json).

### Phase 8 — Ship ✅ (2026-07-29)
- [x] 8.1 main synced with rebuild continuously (same tip); history clean, all
      commits authored by Sadam
- [x] 8.2 Production live + verified: https://portfolio-v2-fawn-nine.vercel.app
      (sitemap submission to Search Console = Sadam, needs his Google account)
- [x] 8.3 Tags: v2-legacy (root commit, old site archive) + v3.0.0 (rebuild ship).
      README rewritten for the new site.

## PENDING on Sadam (post-ship)
- [ ] RESEND_API_KEY (+ optional CONTACT_TO_EMAIL) in Vercel env → then e2e
      contact-form delivery test
- [ ] Enable Analytics in Vercel dashboard
- [ ] Real social links (LinkedIn/X/GitHub) → content/site.ts socials
- [ ] Real photo for /about (cartoon avatar currently); resume PDF for download
- [ ] Optional: custom domain; submit sitemap in Google Search Console

### Backlog / later
- [x] /writing section SHIPPED (2026-07-29, Sadam chose it over /playground):
      @next/mdx pipeline (pageExtensions md/mdx, mdx-components.tsx at root),
      content/writing.ts registry drives index + sitemap, .prose CSS in globals,
      components/writing/PostLayout.tsx, posts live at app/writing/<slug>/page.mdx.
      First post: "Rebuilding my portfolio for the AI era" (drafted by Claude in
      Sadam's voice from true build facts — SADAM SHOULD REVIEW/EDIT before
      promoting it anywhere). New post = registry entry + page.mdx file.
- [x] /playground SHIPPED (2026-07-30, Sadam chose agent-pipeline demo):
      content/playground.ts registry + app/playground (index) + app/playground/
      agent-pipeline + components/playground/AgentPipelineDemo.tsx (client,
      scripted simulation: planner → 3 parallel workers incl. retry state →
      judge; Play/Step/Reset; clearly labeled simulated; animate-pulse has
      motion-reduce:animate-none). Playground nav link hidden on mobile
      (sm:inline) to avoid header overflow; mobile CTA label is "Contact".
      FIXED during build: mobile horizontal overflow on / and /work (was LIVE
      in prod since image-led redesign) — grid children needed min-w-0 + card
      img w-full; grid min-content sizing ignores percentage max-width.
      LESSON: after rm -rf .next, ALWAYS hard-kill the old `next start`
      (fuser -k 3199/tcp) before re-verifying — stale servers serve old markup
      with broken CSS and produce false test results (bit us twice).
- [ ] Resume download on /about (needs PDF from Sadam)

## Conventions for future sessions

### Git history (rewritten 2026-07-27)
Entire pre-rebuild history squashed into root commit "Legacy portfolio site";
munu251/adeola/Mazen identities removed. ALL commits are authored by Sadam Khan
<s-1235@users.noreply.github.com> — keep it that way. Do not reintroduce old refs.

### Commit style (Sadam's rule, 2026-07-27)
Short, professional, single-line messages that read as written by Sadam. NO
Co-Authored-By or any AI attribution — enforced via attribution:"" in
.claude/settings.local.json. Author: Sadam Khan <s-1235@users.noreply.github.com>.

- Keep this file updated: move items between Done / Next / Backlog as work happens,
  and log non-obvious decisions under Decisions with a one-line rationale.
- Old site remains untouched on `main` until the rebuild is deployable.
