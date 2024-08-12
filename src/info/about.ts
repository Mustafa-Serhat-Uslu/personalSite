import type { AccordionItem } from "@/components/Header/components/Accordion/Accordion";

const paragraph1 = [
  "Hi! I am a software engineer with approximately 5 total years of experience in the defense and iGaming industries.",
  "My primary focus is on Frontend Development, and I am passionate about utilizing the latest and greatest technologies.",
  "I am currently working on Live88 and various other projects at Yolo Group.",
];

const paragraph2 = [
  "In 2020, I earned my Bachelor of Science degree in Computer Science from Gazi University, as well as a second Bachelor of Science degree in Business Administration from Anadolu University. ",
  "For more details about my professional background, please refer to the past experiences listed below or explore my projects.",
];

export const aboutContent = [paragraph1, paragraph2];

export const jobExperience: AccordionItem[] = [
  {
    titleLeft: "Yolo Group",
    titleRight: "August 2022 to Present",
    content: [
      "Developed performant frontend solutions for a large-scale gaming web application with constantly evolving designs, working efficiently with minimal supervision to meet project goals.",
      "Utilized technologies including React, TypeScript, Redux, Sass, Jest, Pixi, GSAP, and WebSocket API to build responsive and interactive features.",
      "Enhanced existing features and ensured application stability by performing bug fixes and refactoring code.",
      "Contributed to code quality by mentoring new developers and conducting thorough code reviews, fostering a collaborative and high-performing development team environment.",
      "Collaborated with UI/UX designers and the product team to ensure the feasibility and maintainability of new features, driving product evolution through effective cross-team interaction and design sprints.",
      "Estimated and executed development tasks under tight timelines, consistently delivering high-quality results and meeting project deadlines.",
    ],
  },
  {
    titleLeft: "Turkish Aerospace",
    titleRight: "March 2021 to August 2022",
    content: [
      "Developed modern, performant and robust code for a model-based software development application and variety of supportive tools for the defense industry.",
      "Communicated and collaborated with multi-disciplinary teams of engineers, designers and testers.",
      "Used a technology stack which consisted of mainly Qt, C++, C and some web frameworks to develop complex algorithms and user interfaces that met industry standards.",
    ],
  },
  {
    titleLeft: "Transvaro",
    titleRight: "March 2020 to March 2021",
    content: [
      "Developed a variety of applications for the defense and health industries, primarily focused on research and development, which successfully secured multiple government contracts.",
      "Contributed to an application that detected body temperature of individuals at building entrances, utilizing React, JavaScript, Python, and OpenCV for effective real-time monitoring.",
      "Contributed to an object detection and tracking application used in aerial surveillance. As part of a small team of three, I designed intuitive user interactions and implemented features that improved usability, using React, JavaScript, and Python.",
    ],
  },
];

export const projectsData: AccordionItem[] = [
  {
    titleLeft: "BombayLive",
    titleRight: "Maintainer",
    link: "https://bombaylobby.com/",
    content: [
      "Part of the biggest crypto iGaming chain in the world. I've been contributing since 2021.",
    ],
  },
  {
    titleLeft: "Rock Paper Scissors",
    titleRight: "Creator",
    link: "https://mustafa-serhat-uslu.github.io/rock_paper_scissors/",
    content: [
      "Mobile friendly web game with basic features such as multiple bet placements.",
    ],
  },
  {
    titleLeft: "A Complex E-commerce App",
    titleRight: "Creator",
    link: "https://github.com/Mustafa-Serhat-Uslu/CRWN-CLOTHING",
    content: ["Responsive e-commerce web application."],
  },
];
