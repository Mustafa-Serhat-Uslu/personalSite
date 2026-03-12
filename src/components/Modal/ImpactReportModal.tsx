import type { ReactNode } from "react";
import { Modal } from "@/components/Modal/Modal";

const MODAL_ID = "impact-report";

function parseBold(text: string): ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function stripCitations(text: string): string {
  return text.replace(/\[cite_start\]/g, "").replace(/\[cite:.*?\]/g, "");
}

function MarkdownContent({ raw }: { raw: string }) {
  const lines = raw.split("\n");
  const elements: ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let listItems: ReactNode[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc space-y-1 pl-5">
          {listItems}
        </ul>,
      );
      listItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (inCodeBlock) {
        flushList();
        elements.push(
          <pre
            key={`code-${i}`}
            className="overflow-x-auto rounded-lg bg-stone-800 p-4 text-xs leading-relaxed text-stone-100 sm:text-sm"
          >
            {codeLines.join("\n")}
          </pre>,
        );
        codeLines = [];
      }
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    const cleaned = stripCitations(line);

    if (cleaned.startsWith("# ")) {
      flushList();
      elements.push(
        <h1
          key={`h1-${i}`}
          className="text-2xl font-bold tracking-tight text-violet-950"
        >
          {parseBold(cleaned.slice(2))}
        </h1>,
      );
    } else if (cleaned.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={`h2-${i}`} className="mt-6 text-2xl font-bold text-indigo-900">
          {parseBold(cleaned.slice(3))}
        </h2>,
      );
    } else if (cleaned.startsWith("### ")) {
      flushList();
      elements.push(
        <h3
          key={`h3-${i}`}
          className="mt-4 text-lg font-semibold text-pink-700"
        >
          {parseBold(cleaned.slice(4))}
        </h3>,
      );
    } else if (cleaned.startsWith("---")) {
      flushList();
      elements.push(<hr key={`hr-${i}`} className="my-4 border-stone-300" />);
    } else if (cleaned.startsWith("- ")) {
      listItems.push(<li key={`li-${i}`}>{parseBold(cleaned.slice(2))}</li>);
    } else if (cleaned.trim() !== "") {
      flushList();
      elements.push(
        <p key={`p-${i}`} className="leading-relaxed">
          {parseBold(cleaned)}
        </p>,
      );
    } else {
      flushList();
    }
  }
  flushList();

  return (
    <div className="flex flex-col gap-2 text-sm sm:text-base">{elements}</div>
  );
}

const impactReportRaw = `# Mustafa Serhat Uslu — Live88 Engineering Impact Report

**Role:** Senior Front-end Engineer | **Department:** Live88 & OneTouch Product
**Tenure Analyzed:** August 2022 – March 2026
**Repositories Covered:** ld-client, live-dealer-app-react, dealer-app-info, live88-bo

---

## Executive Summary

Over nearly four years, Mustafa has been a cornerstone of Live88's front-end engineering, shipping complex, user-facing game features across four production repositories while simultaneously building internal tooling from scratch. His commit footprint spans **1,900+ commits in the main client**, **66 commits in the Dealer App (React)**, **50+ commits in the Dealer Info App (Electron)**, and **22 commits standing up the Live88 Back-Office** — demonstrating an ability to move fluidly between product delivery, cross-repo integrations, and full-stack internal projects.

- **Total Jira Issues Involved:** 267 (170 as Assignee, 162 as Reporter, 65 as both)
- **Resolution Rate:** 229 of 267 issues resolved (85.8%), predominantly Tasks (149) and Bugs (63).
- **Core Focus:** 261 issues belonged to the "Live88 - Live Dealer (OT-069-01)" project, where Mustafa shaped the frontend architecture, animations, and game logic of the platform.
- **Multi-Repo Reach:** Beyond the main client, Mustafa contributed production code to the Dealer App React (Blackjack, Poker, Hyper Baccarat, Aquatic Roulette), the Dealer Info App (Electron wrapper, settings, animations), and single-handedly built the Live88 Release Calendar back-office.

---

## Major Games & Product Deliverables

### 1. SpreadBet Roulette — Full Feature Ownership (Nov 2025 – Mar 2026)

Mustafa owned the entire front-end implementation of SpreadBet Roulette, a new game variant that added a secondary "spread-bet" wheel mechanic on top of the existing roulette experience. This was one of the most technically demanding features in the client's history, touching wheel rendering, animation pipelines, bet area architecture, and mobile safe-area handling.

- **Wheel Integration:** Processed SPREAD_BET_WHEEL_SPIN messages in both LOCKED and RESOLVED states, implemented spin-direction logic, and built the processSpreadWheelData pipeline to handle mid-betting data arrivals.
- **Angle Mapping & Calibration:** Mapped backend angle values to front-end wheel positions (wheelAngles), calibrated crooked BE angles, and configured wheel size limitations across landscape and portrait modes.
- **Bet Area Scaling:** Converted roulette bet area scale calculations to useLayoutEffect and requestAnimationFrame for paint-cycle-accurate sizing, eliminating "jumpy" layout shifts on mobile and desktop.
- **Feature Flags & Rollout:** Introduced spreadBetEnabled feature flag, toggled the feature to dev-only during the iterative demo phase, and progressively enabled it for production.
- **History & Data:** Built the spreadBetHistory component to render spread-bet outcomes, including text removal and data formatting once the backend was ready.
- **Safe Area & Responsive:** Added safeLeft/safeRight support via ResizeComponent for devices with display notches, and adjusted racetrack positioning for landscape spread-bet tables.
- **Polish & Demo Feedback:** Delivered two rounds of "after demo" touch-ups, resolved blurry text caused by will-change, added borders, and optimized wheel rendering.
- **Commit Volume:** 40+ dedicated SpreadBet commits across 5 months.

### 2. Roulette Variations & Visuals (2024 – 2026)

Beyond SpreadBet, Mustafa drove the front-end for multiple roulette variants:

- **Multiplier Roulette (Apr – May 2024):** Implemented multiplier payouts, useIsBetAreaCompressedState, hot/cold toggle positioning, bet zone style toggles, and scoreboard overflow fixes. Built out the getSimpleNumber utility and RTP multiplier changes.
- **Aquatic Roulette (Sep 2025 – Jan 2026):** Handled golden border pulse animations, multiplier highlight conversions (standard to golden), magnifier sizing for landscape, and bet area animation timing adjustments. Also contributed to the Dealer Info App's Aquatic Roulette branch and set up the Aquatic Roulette feature branch in the Dealer App React.
- **Royal Riches Roulette (May 2024):** Fixed winning number history styles, centered suit SVGs, built Key Collection info screens, click-through animations for key-collect, and implemented onScrollToTargetAnimation for GenericScrollable2.
- **Common Roulette Architecture:** Decoupled roulette history components, moved isOpenHotCold state to RouContext, refactored hot/cold hooks, and built racetrack neighbor state management.

### 3. Live Poker & Texas Hold'em (Oct 2023 – Apr 2024)

Mustafa implemented the Vol. 2 and Vol. 3 frontend expansions for Live Poker across both the main client and the Dealer App React:

- **Lobby Seat Selection:** A multi-month effort enabling users to select specific poker seats from the lobby, including SVG seat layers, hover data, joining animations, mobile seat selector behavior, and GET_BUY_IN_REQUIREMENTS WebSocket integration.
- **Buy-In Validation System:** Created useLobbyItemBuyInValidation, LobbyItemContext, CircularLoader, and CategoryLoadingPage to validate player eligibility before joining poker tables, with snackbar currency formatting.
- **Watchers Mode:** Implemented frontend logic for joining full tables as watchers, including dynamic isJoinAvailable checks on hover content.
- **Poker History Refactoring:** Completely refactored the history component architecture, added RIT (Run It Twice) history support, separated UserRoundResults into four files, and fixed other-winners data parsing.
- **Sounds & Timers:** Created SeatActionsTimer.tsx, implemented poker action sounds for all player events, synchronized time-bank sounds, and added GenericButton and Slider sound support.
- **In-Game UX:** Added fold label animations, raise preset labels ("Bet" vs "Raise"), rake display, PT reactions modal, video fade fixes, and emojis with restructured data.
- **Dealer App React:** Extended the Poker feature branch in the Dealer App, including reconnection delays.

### 4. Hyper Speed Baccarat (Jul – Sep 2024)

For the rollout of Hyper Speed Baccarat, Mustafa worked across both the client and the Dealer App React:

- **Client:** Built the approved Hyper Speed Baccarat feature, implemented handleUnprocessedBets for balance handling when players switch away from Hyper tables, fixed active zone bet calculations, and resolved autoplay issues specific to the hyper variant.
- **Dealer App React:** Created the feature/hyper-baccarat-DA branch with 15+ commits, implementing scanner-based burn card display and multiple game-specific dealer-side fixes.
- **Edge-Case Handling:** Fixed bugs where bets would get stuck or disappear during the fast pace of Hyper rounds, and resolved crashes when opening bet limits mid-game.

### 5. Blackjack Redesign (Dec 2022 – Mar 2023)

During his first months, Mustafa spearheaded the Blackjack frontend overhaul:

- **New Seat Components:** Built entirely new Blackjack seat components (BJSeatCards, seat label system), supporting portrait and landscape layouts, with GSAP-driven seat animations.
- **Split State Rendering:** Handled complex split-state rendering — removing duplicate chips, adding blue split icons, separate score visibility, and reversed split scores for live-view variants.
- **Mobile Gestures:** Implemented "swipe up to leave" for mobile Blackjack seats using GSAP transforms (not CSS), decision-maker indicator animations, and insurance/streak crown icons.
- **Bet-Behind System:** Added tooltips for bet-behind on other player seats, chip icons for other-player bets via GenericBetZone.ownBet, and early-actions layouts across portrait/landscape.
- **Dealer App React:** Contributed to Blackjack logic including above-3-character BJ score handling, Perfect Pair badge visibility, hand ranking card highlighting, and second-card reveal for American BJ.

### 6. Early Platform Work & Mystic 5, TeenPatti, Dragon Tiger (Aug – Dec 2022)

Before the Blackjack redesign, Mustafa immediately contributed to the live product:

- **Mystic 5 Side Bet:** Fixed popup lifecycle bugs (reappearing popups, previous wins showing at round start), coin margins, animation issues on iOS, and platform-level disable support.
- **TeenPatti / Andar Bahar / Bollywood:** Fixed bet area highlighting, liability calculations (filtering NaN during multi-lay bets), active-bet-zone CSS conditions, and autoplay rules.
- **Roulette & DT Foundations:** Fixed racetrack neighbor state management, statistics overlay page navigation, scoreboard colors, and Dragon Tiger score/video alignment.

### 7. Promotional Systems & Free Credits (Apr – Sep 2023)

Mustafa built the entire Free Credits front-end from the ground up — one of the platform's most complex cross-cutting features:

- **Balance-Switching Architecture:** Created BalanceSwitchController, TopBalance refactoring, BalanceItem with currency formatting, and the radio-button balance selector dropdown. Handled edge cases: bets on different balance types, table validity checks per balance type, automatic balance switching on table join, and forbidding mixed/lay bets on FC.
- **Offer Management:** Built FreeCreditsWrapper, offer acceptance/rejection via WebSocket, forfeiting flow (with active-bet blocking), FreeOfferBadge with counter, OfferInfo and OfferList modals, promo tab integration, and offer-end snackbars.
- **Tooltips & Notifications:** Implemented FreeCreditsTooltips with session-aware visibility, FreeCreditError component on offer accept, and offer-complete snackbars across lobby and game room.
- **Automated Testing:** Built a comprehensive unit test suite for FC selectors — promotionSelectors, lobbyDataSelectors, betDataSelectors, menuItemSelector, uiComponentSelectors, and more. Also resolved heap-out-of-memory issues during test builds by excluding .test.ts from type checking.
- **Lootboxes (May – Jun 2025):** Developed the Christmas Lootbox UI with terms-button translation fixes, welcome modal image/text changes, and state management for error/opened states.

### 8. Relic Hunt & Lightning Features (Jul – Dec 2025)

- **Relic Hunt Sounds:** Added select-relic and winning-relic sounds, multiplier appear/disappear sounds, and extended DEV_HARDCODES of BonusGame for development.
- **Lightning Roulette Behavior:** Cleared lightning state when not in RoundStarted status, and defaulted the lightning test button to hidden.
- **Confirm Bets for Lucky Claws:** Implemented bet confirmation flow for the LC variant with RTP changes.

---

## Internal Tools & Cross-Repo Applications

### Live Dealer App React (66 commits, Feb 2023 – Jan 2026)

The Dealer App React is the dealer-facing application used by studio operators. Mustafa's contributions span multiple game launches:

- **Hyper Speed Baccarat DA:** Built the dealer-app side of Hyper Baccarat (15+ commits), enabling scanner-based burn card display and game-specific dealer workflows.
- **Blackjack & Poker Extensions:** Added Perfect Pair badges, hand ranking card logic, BJ score handling, American BJ second-card reveal, Poker reconnection delays, and Poker emoji support.
- **Aquatic Roulette Setup:** Initialized the feature/aquatic-roulette branch and versioned it for DA integration (5.10.0-aquatic-roulette).
- **Top Winners Styling:** Increased font size/weight on winners list components for better studio-screen readability.

### Dealer Info App — Electron Wrapper (50+ commits, Jan – May 2025)

The Dealer Info App is an Electron-based desktop application that dealers use to monitor game information. Mustafa's contributions focused on:

- **Electron Wrapper Additions:** Extended the Electron shell with new supporting functions and wrapper hooks.
- **Settings Window:** Built a URL input field for switching environments, reduced modal width, prevented ESC key dismissal in settings mode, and removed pre-population of URL values.
- **Animation Checks:** Added extra validation checks for dealer-info animations to prevent rendering glitches.
- **Overlay Stability:** Fixed a production bug where the settings window could get stuck behind the overlay.
- **Aquatic Roulette Branch:** Dedicated branch with 10+ commits handling Aquatic Roulette-specific dealer-side features.

### Live88 Release Calendar — Full-Stack Application (22 commits, May – Sep 2025)

Mustafa independently conceived and built a full-stack internal tool to replace manual Excel-based release tracking:

- **Tech Stack:** Next.js with App Router, integrated database, and Vercel deployment for the testing environment.
- **Authentication:** Implemented user authentication and role management via Clerk, including admin dashboard with user-support features.
- **Core Features:** Calendar view with release entries, form/dialog components for CRUD operations, custom navigation with Header and CustomLink, responsive design, and image support.
- **API & Feature Flags:** Built API endpoints for release data, added feature flag support for progressive rollout, and cleaned up unused Clerk integrations during production hardening.

---

## Technical Debt & Architecture Improvements

Mustafa's history shows a consistent commitment to codebase health alongside feature delivery:

- **Coding Standards:** Authored and merged the project-wide GUIDELINES.md, consolidating scattered conventions into a single, enforceable reference document.
- **History Component Refactoring:** Broke down monolithic history components into game-specific parsers, decoupled roulette history, and separated UserRoundResults into four dedicated files with proper type exports.
- **Rules Refactoring:** Restructured Baccarat and generic rules components, moving display-content logic into selectors and cleaning up fill-table functions.
- **Context Architecture:** Created GameRoomContext for table info, LobbyItemContext for poker hover data, TexasHoldemContext for buy-in snackbars, and RouContext for hot/cold state — reducing prop-drilling and enabling cleaner component boundaries.
- **Performance Optimizations:** Resolved heap-out-of-memory pipeline issues by excluding .test.ts from type-checking, optimized array sorting with pre-copy, properly destroyed video elements, and moved bet area scale calculations to useLayoutEffect with requestAnimationFrame.
- **Connection & Resilience:** Implemented GET_ALL_TABLES_V2 migration, reconnection delay logic, and balance-request strategies on table join/leave.
- **Testing Infrastructure:** Built unit tests for Free Credits selectors, racetrack configuration, and lobby data selectors — establishing testing patterns for complex state logic in the client.

---

## Appendix: Visual Breakdown

The charts below provide a visual summary of the data behind this report — issue volumes, types, priorities, timelines, and current status.

### Yearly Output

Shows how Mustafa's Jira issue involvement grew year-over-year, from onboarding in mid-2022 to a peak of 89 issues in 2025. The 2026 figure reflects January–March only.

\`\`\`
 2022        ██████                                            11
 2023        ████████████████████████████████████               66
 2024        ███████████████████████████████████████████         79
 2025        █████████████████████████████████████████████████   89
 2026 (YTD)  ████████████                                      22
             ┬─────────┬─────────┬─────────┬─────────┬─────────┬
             0        20        40        60        80       100
\`\`\`

### Issue Type Breakdown

The majority of Mustafa's work consisted of feature Tasks (55.8%) and Bug fixes (23.6%), with Sub-tasks making up the rest of hands-on development.

\`\`\`
 Task            ████████████████████████████████████████████████  149  (55.8%)
 Bug             ████████████████████                              63  (23.6%)
 Sub-task        █████████████                                     39  (14.6%)
 Change Request  ███                                               10  ( 3.7%)
 Other           ██                                                 6  ( 2.2%)
\`\`\`

### Mustafa's Role Across Issues

Breaks down whether Mustafa was the person doing the work (Assignee), the person who identified and reported the issue (Reporter), or both. The high "Both" count (24.3%) reflects self-driven work where Mustafa identified issues and resolved them himself.

\`\`\`
 Assignee Only              ████████████████████████████████████████  105  (39.3%)
 Reporter Only              ████████████████████████████████████████  97   (36.3%)
 Both (Assignee & Reporter) █████████████████████████                65   (24.3%)
\`\`\`

### Resolution Rate

Of the 267 Jira issues Mustafa was involved in, 85.8% have been resolved. The remaining open items are mostly in "To Do" or "Review" status.

\`\`\`
 Resolved  ██████████████████████████████████████████████░░░░  229 / 267 (85.8%)
 Open      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   38 / 267 (14.2%)
\`\`\`

### Cross-Repository Commit Distribution

Mustafa contributed production code across four codebases. The main client represents the vast majority of his work, with meaningful contributions to three supporting applications.

\`\`\`
 ld-client (Main Client)           █████████████████████████████████████████████  1900+
 live-dealer-app-react (Dealer)    ██                                              66
 dealer-app-info (Electron)        █                                               50+
 live88-bo (Back-Office)           ▏                                               22
                                   ┬──────────┬──────────┬──────────┬──────────┬
                                   0         500       1000       1500       2000
\`\`\`

### Work Category Distribution

A proportional view of where Mustafa's effort went across the major work streams, accounting for all four repositories. Over half his time was dedicated to shipping game features, with contributions across promotions, internal tooling, and architecture.

\`\`\`
 Game Features (BJ, Rou, Poker, Bac, SB)  ██████████████████████████████████████████  53%
 Bug Fixes & Edge Cases                   █████████████████                          22%
 Promotional Systems (FC, Lootbox)        ██████                                      8%
 Internal Tools (Calendar, DA, DAI)       ██████████                                 11%
 Architecture & Tech Debt                 █████                                       6%
\`\`\`

### Priority Handling

Most issues fell in the Medium (47.9%) and Low (31.5%) priority bands, reflecting steady feature delivery. The 40 High-priority and 3 Critical issues highlight Mustafa's involvement in urgent production fixes.

\`\`\`
 Critical   ██                                                  3  ( 1.1%)
 High       ██████████████                                     40  (15.0%)
 Medium     █████████████████████████████████████████████████  128  (47.9%)
 Low        ██████████████████████████████████                  84  (31.5%)
 Super Low  ████                                               12  ( 4.5%)
\`\`\`

### Delivery Timeline

A chronological view of Mustafa's major deliverables across all repositories and work streams. Each bar represents the approximate active development period.

\`\`\`
                               2022        2023        2024        2025        2026
                               Q3 Q4  Q1 Q2 Q3 Q4  Q1 Q2 Q3 Q4  Q1 Q2 Q3 Q4  Q1

 ─── CORE PLATFORM (ld-client) ──────────────────────────────────────────────────────
 Shared Components & Arch.     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 GUIDELINES.md & Standards                                                     ▓▓
 Performance & Memory Opt.                          ▓▓▓▓▓▓▓▓▓▓▓▓
 Free Credits Testing                         ▓▓▓▓▓▓

 ─── GAMES (ld-client + DA React) ───────────────────────────────────────────────────
 Mystic 5 / TP / AB / DT      ▓▓▓▓▓▓
 Blackjack Redesign               ▓▓▓▓▓▓▓▓▓▓▓
 Roulette (Multiplier, RRR)             ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 Live Poker Vol. 2 & 3                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 Hyper Speed Baccarat                                  ▓▓▓▓▓▓▓▓
 Aquatic Roulette                                            ▓▓▓▓▓▓▓▓▓▓
 SpreadBet Roulette ★                                              ▓▓▓▓▓▓▓▓▓▓▓
 Relic Hunt & Lightning                                         ▓▓▓▓▓▓▓▓

 ─── PROMOTIONS ─────────────────────────────────────────────────────────────────────
 Free Credits Engine                      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 Christmas Lootboxes                                               ▓▓▓▓

 ─── INTERNAL TOOLS ─────────────────────────────────────────────────────────────────
 Dealer App React (DA)         ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 Dealer Info App (Electron)                                  ▓▓▓▓▓▓▓▓▓▓▓
 Release Calendar (Next.js)                                        ▓▓▓▓▓▓▓▓▓▓▓
\`\`\`

### Status Snapshot (as of March 2026)

Current state of all 267 Jira issues. The vast majority (86.1%) are Done, with a small number still in earlier pipeline stages.

\`\`\`
 Done          ████████████████████████████████████████████  230  (86.1%)
 To Do         █████                                         24  ( 9.0%)
 Review        ██                                             8  ( 3.0%)
 Ready For QA  █                                              3  ( 1.1%)
 In Progress   ▏                                              1  ( 0.4%)
 Blocked       ▏                                              1  ( 0.4%)
\`\`\``;

export function ImpactReportModal() {
  return (
    <Modal id={MODAL_ID} title="Live88 Engineering Impact Report">
      <MarkdownContent raw={impactReportRaw} />
    </Modal>
  );
}

export { MODAL_ID as impactReportModalId };
