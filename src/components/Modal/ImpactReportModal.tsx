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
  return text
    .replace(/\[cite_start\]/g, "")
    .replace(/\[cite:.*?\]/g, "");
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
        <h1 key={`h1-${i}`} className="text-2xl font-bold">
          {parseBold(cleaned.slice(2))}
        </h1>,
      );
    } else if (cleaned.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={`h2-${i}`} className="mt-6 text-xl font-bold">
          {parseBold(cleaned.slice(3))}
        </h2>,
      );
    } else if (cleaned.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={`h3-${i}`} className="mt-4 text-lg font-semibold">
          {parseBold(cleaned.slice(4))}
        </h3>,
      );
    } else if (cleaned.startsWith("---")) {
      flushList();
      elements.push(<hr key={`hr-${i}`} className="my-4 border-stone-300" />);
    } else if (cleaned.startsWith("- ")) {
      listItems.push(
        <li key={`li-${i}`}>{parseBold(cleaned.slice(2))}</li>,
      );
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

  return <div className="flex flex-col gap-2 text-sm sm:text-base">{elements}</div>;
}

const impactReportRaw = `# Mustafa Serhat Uslu — Live88 Engineering Impact Report

**Role:** Senior Front-end Engineer | **Department:** Live88 & OneTouch Product
**Tenure Analyzed:** August 2022 – March 2026

---

## Executive Summary

Over his tenure, Mustafa has been a cornerstone of the Front-end engineering team, heavily involved in both high-stakes user-facing game features and critical internal tooling.

- **Total Issues Involved:** 267 (170 as Assignee, 162 as Reporter)
- **Resolution Rate:** Contributed to the successful resolution of 229 issues, predominantly Tasks (149) and Bugs (63).
- **Core Focus:** The vast majority of Mustafa's work (261 issues) was dedicated to the core "Live88 - Live Dealer (OT-069-01)" project, shaping the frontend architecture, animations, and game logic of the platform.

---

## Major Games & Product Deliverables

### 1. Early Tenure: Core Architecture & Blackjack Redesign (2022-2023)

During his first year, Mustafa laid critical groundwork for the platform's shared components and spearheaded the frontend overhaul of Blackjack.

- **Blackjack Redesign:** Rebuilt the Blackjack seating components, integrating new card atlases and handling complex split-state rendering logic.
- **Mobile UX Enhancements:** Implemented intuitive mobile interactions, such as the "swipe up to leave" functionality for mobile Blackjack seats.
- **Dynamic UI States:** Engineered a "disabled" visual state for seats when table limits are reached, and integrated continuous win-streak crown icons next to usernames.
- **Common Components:** Restyled the top navigation architecture (including history and bet limits) and established new chip backgrounds utilized across multiple games.

### 2. Roulette Variations & Visuals

Mustafa drove the frontend development for multiple complex Roulette variations, including **Multiplier Roulette**, **Spread-Bet Roulette**, **Aquatic Roulette**, and **Royal Riches**.

- **Wheel & Animation Logic:** Engineered spread-bet wheel angle mappings, locking animations, and digital wheel behaviors.
- **Bet Area Redesigns:** Completely overhauled the roulette bet areas to support magnifiers, golden borders, and dynamic scaling for mobile and desktop. Mustafa also fixed complex state bugs where flying keys or suits would disappear mid-animation.
- **Aquatic Roulette Integration:** Handled the UI layers, winning bet zone multiplier layouts, and aligned finished animations with background videos.

### 3. Live Poker & Texas Hold'em Features

Mustafa implemented massive frontend expansions for the Live Poker offering (Vol. 2 & Vol. 3).

- **Lobby & Seat Selection:** Enabled users to select specific poker seats directly from the lobby, complete with hover data and buy-in requirements.
- **Watchers Mode:** Implemented the frontend logic allowing players to join full tables as watchers.
- **In-Game UX:** Added RIT (Run It Twice) history support, foldable card opacities, customized Texas Hold'em snackbars, and dynamic time-bank sounds.

### 4. Hyper Speed Baccarat

For the rollout of Hyper Speed Baccarat, Mustafa ensured the client could handle fast-paced betting actions.

- **Betting Controls:** Built simultaneous round bet zones, disabled Mystic 5 for the Hyper variation, and addressed drag-and-drop chip shaking.
- **Edge-Case Handling:** Fixed critical bugs where bets would get stuck, disappear during the initial seconds of a round, or crash the client upon opening the bet limits.

### 5. Promotional Systems & Free Credits

Mustafa was instrumental in building the frontend logic for Live88's promotional campaigns.

- **Free Credits Engine:** Designed the "Free Credits" architecture, including complex balance-switching logic, offer acceptance/forfeiting modals, and eligibility checks.
- **Lootboxes:** Developed the UI and translation integrations for Christmas Lootboxes, adding specific error states ("not available", "already opened") and dynamic drawer animations.

---

## Internal Tools & Standalone Applications

### Live88 Release Calendar

Mustafa took ownership of a full-stack internal application to track Live88 releases, transitioning the team away from manual Excel sheets.

- **Tech Stack:** Initialized the project in Next.js, added an integrated database, and deployed the testing environment to Vercel.
- **Features:** Implemented responsive design, image support, custom navigation, and user authentication using Clerk.

### Dealer Info App

Mustafa contributed to the frontend wrapper that dealers use to operate the games.

- **Electron Integration:** Added supporting functions and wrapper additions to the Electron app.
- **Settings & UI:** Implemented URL switchers, customized settings windows, and handled UI animation checks.

---

## Technical Debt & Architecture Improvements

Beyond feature work, Mustafa's history shows a strong commitment to codebase health:

- **Refactoring:** Migrated scattered coding standards into a unified GUIDELINES.md. Mustafa refactored legacy history components, Poker rules data, and isolated complex animation logics into dedicated hooks (e.g., separating suit and multiplier animations).
- **Performance:** Improved memory management by optimizing array sorting, resolving heap out-of-memory pipeline issues, and properly unmounting/destroying video elements.
- **Linter & Type Safety:** Consistently resolved strict React Hook linter errors and TypeScript definition updates across the platform.

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

Breaks down whether Mustafa was the person doing the work (Assignee), the person who identified and reported the issue (Reporter), or both. The high "Both" count (24.3%) reflects self-driven work where he identified issues and resolved them himself.

\`\`\`
 Assignee Only              ████████████████████████████████████████  105  (39.3%)
 Reporter Only              ████████████████████████████████████████  97   (36.3%)
 Both (Assignee & Reporter) █████████████████████████                65   (24.3%)
\`\`\`

### Resolution Rate

Of the 267 issues Mustafa was involved in, 85.8% have been resolved. The remaining open items are mostly in "To Do" or "Review" status.

\`\`\`
 Resolved  ██████████████████████████████████████████████░░░░  229 / 267 (85.8%)
 Open      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   38 / 267 (14.2%)
\`\`\`

### Work Category Distribution

A proportional view of where Mustafa's effort went across the major work streams. Over half his time was dedicated to shipping game features, with a quarter spent on bug fixes and edge-case handling.

\`\`\`
 Game Features (Blackjack, Roulette, Poker, Baccarat)  ████████████████████████████████████████  55%
 Bug Fixes & Edge Cases                                █████████████████                       24%
 Promotional Systems                                   ██████                                   8%
 Internal Tools                                        █████                                    7%
 Architecture & Tech Debt                              ████                                     6%
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

A chronological view of Mustafa's major deliverables across the four work streams. Each bar represents the approximate active development period for that initiative.

\`\`\`
                               2022        2023        2024        2025        2026
                               Q3 Q4  Q1 Q2 Q3 Q4  Q1 Q2 Q3 Q4  Q1 Q2 Q3 Q4  Q1
 ─── CORE PLATFORM ──────────────────────────────────────────────────────────────────
 Shared Components & Arch.     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 GUIDELINES.md & Standards              ▓▓▓▓▓
 Performance & Memory Opt.                          ▓▓▓▓▓▓▓▓▓▓▓▓

 ─── GAMES ──────────────────────────────────────────────────────────────────────────
 Blackjack Redesign               ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 Roulette (Multiplier, SB)              ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 Aquatic Roulette                                   ▓▓▓▓▓▓▓▓▓▓▓
 Live Poker Vol. 2 & 3                                 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 Hyper Speed Baccarat                                     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 Royal Riches Roulette                                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

 ─── PROMOTIONS ─────────────────────────────────────────────────────────────────────
 Free Credits Engine                                    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 Christmas Lootboxes                                            ▓▓▓▓▓

 ─── INTERNAL TOOLS ─────────────────────────────────────────────────────────────────
 Dealer Info App (Electron)           ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 Release Calendar (Next.js)                                        ▓▓▓▓▓▓▓▓▓▓▓▓▓
\`\`\`

### Status Snapshot (as of March 2026)

Current state of all 267 issues. The vast majority (86.1%) are Done, with a small number still in earlier pipeline stages.

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
