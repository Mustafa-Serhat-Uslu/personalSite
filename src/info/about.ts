import type { AccordionItem } from "@/components/Header/components/Accordion/Accordion";

const paragraph1 = [
  "Hi! I am a Senior Software Engineer with 6+ years of experience in the defense and iGaming industries.",
  "I specialize in building high-performance, responsive web applications using React, TypeScript, Redux, Next.js, WebSockets, GSAP, and Electron.",
  "I'm always eager to explore new fields and emerging technologies.",
  "Currently, I work at Yolo Group (Live88 team).",
];

const paragraph2 = [
  "In 2020, I earned my Bachelor of Science degree in Computer Science from Gazi University, as well as a second Bachelor of Science degree in Business Administration from Anadolu University. ",
  "For more details about my professional background, please refer to the past experiences listed below or explore my projects.",
];

export const aboutContent = [paragraph1, paragraph2];

export const jobExperience: AccordionItem[] = [
  {
    titleLeft: "Yolo Group (Live88)",
    titleRight: "August 2022 to Present",
    content: [
      "In my recent work, I led the frontend architecture for flagship live dealer games (like Live Poker, Roulette, Blackjack, Baccarat) using React, TypeScript, and Redux. Because these games rely on highly volatile, real-time states, I wired WebSocket payloads directly into the UI state—a move that made the games highly scalable & maintainable.",
      "I'm a big believer in working smart, so I adopted a 'prompt-first' coding style using Claude Code and GitHub Copilot. This cut my prototyping time by about 50% and allowed me to safely modernize our legacy React code.",
      " In this role I also built fluid, 60fps animations with GSAP and CSS.",
      "Beyond the player-facing games, I love building tools that make my coworkers' lives easier. I developed new features for our live studio's Electron-based Dealer App, built out a real-time Free Credits promotional engine, and finally got our department off manual spreadsheets by building a custom, full-stack Next.js Release Calendar.",
    ],
    actionLink: {
      label: "See My Yolo Group Impact Report →",
      href: "#impact-report",
    },
  },
  {
    titleLeft: "Turkish Aerospace",
    titleRight: "March 2021 to August 2022",
    content: [
      "Developed performant, production-grade code for a model-based software development application and a suite of supportive tools used across the defense organization.",
      "Used a technology stack consisting of Qt, C++, C, and web frameworks to build complex algorithms and user interfaces that met strict industry standards.",
    ],
  },
  {
    titleLeft: "Transvaro",
    titleRight: "March 2020 to March 2021",
    content: [
      "Developed applications for the defense and health industries, contributing to R&D efforts that successfully secured multiple government contracts.",
      "Built the UI for a real-time body temperature detection system used at building entrances, utilizing React, JavaScript, Python, and OpenCV — deployed across multiple facilities.",
    ],
  },
];

export const projectsData: AccordionItem[] = [
  {
    titleLeft: "Live88",
    titleRight: "Contributer",
    links: ["https://live88.io/", "login.yolo.com"],
    content: [
      "Real-time live casino platform serving thousands of concurrent users. Including Live Poker, Hyper Speed Baccarat, and custom Roulette variations",
    ],
  },
  {
    titleLeft: "Live88 BackOffice",
    titleRight: "Creator",
    links: ["https://live88-bo.vercel.app/calendar"],
    content: [
      "A suite of internal tools for the Live88 team, including a real-time Release Calendar and some back office functionalities hidden behind auth (Clerk).",
    ],
  },
  {
    titleLeft: "Trustdice.win",
    titleRight: "Contributor",
    links: ["https://trustdice.win/", "https://trustdice.win/blog"],
    content: [
      "Crypto-based gaming platform & supportive blog with a global user base.",
    ],
  },
  {
    titleLeft: "Rock Paper Scissors",
    titleRight: "Creator",
    links: ["https://mustafa-serhat-uslu.github.io/rock_paper_scissors/"],
    content: [
      "Mobile friendly web game with basic features such as multiple bet placements.",
    ],
  },
  {
    titleLeft: "IMODE - A Model-Based Software Development Tool",
    titleRight: "Contributor",
    links: [
      "https://www.defenceturk.net/tusas-tarafindan-gelistirilen-imode-yazilimi-ders-olarak-okutuluyor",
    ],
    content: [
      "Proprietary, model-based software development framework created by Turkish Aerospace.",
    ],
  },
];
