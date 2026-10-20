export type TimelineEntry = {
  term: string;
  classes?: string[];
  milestones?: string[];
};

type Education = {
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  classes: string[];
  clubs?: string[];
  awards?: string[];
  activities?: string[];
  timeline?: TimelineEntry[];
};

export const education: Education[] = [
  {
    school: "Cal Poly San Luis Obispo",
    degree: "B.S. Computer Science",
    location: "San Luis Obispo, CA",
    startDate: "2026",
    endDate: "Present",
    classes: ["Databases", "System Software Mechanics"],
    timeline: [
      {
        term: "Fall 2026",
        classes: [
          "Introduction to Databases",
          "Engineering Statistics",
          "System Software Mechanics (Unix and C)",
        ],
        milestones: ["Joined PolyRacing Firmware Team"],
      },
    ],
  },
  {
    school: "College of the Canyons",
    degree: "A.S. Computer Science, A.S. Mathematics, A.S. Physics",
    location: "Santa Clarita, CA",
    startDate: "2023",
    endDate: "2026",
    classes: [
      "Data Structures",
      "C and C++ Programming",
      "Java",
      "Calculus",
      "Vector Calculus",
      "Linear Algebra and Differential Equations",
      "Circuits",
      "Electricity and Magnetism Physics",
    ],
    clubs: ["COC Tech Club", "MESA", "MESA Skills Lab", "Active Minds"],
    awards: ["3.65 GPA", "Phi Theta Kappa", "NSLS"],
    activities: [
      "Founding Member and President of COC Tech Club, pushing it to the highest attendance in the club's history.",
    ],
    timeline: [
      {
        term: "Spring 2026",
        classes: ["C++ Programming", "Data Structures II"],
        milestones: ["Graduated Honors from College of the Canyons"],
      },
      {
        term: "Fall 2025",
        classes: [
          "Quantum Mechanics and Relativity",
          "Differential Equations",
          "C Programming",
        ],
        milestones: [
          "Joined COC Speech Team as a Persuasive Speaker",
          "Began as President of COC Tech Club",
        ],
      },
      {
        term: "Spring 2025",
        classes: [
          "Calculus III",
          "Electricity and Magnetism",
          "Linear Algebra",
        ],
        milestones: ["Presented at COC Science Fair"],
      },
      {
        term: "Fall 2024",
        classes: ["Calculus II", "Physics I", "Discrete Mathematics"],
        milestones: ["Became Lead Web Developer for COC Tech Club"],
      },
      {
        term: "Spring 2024",
        classes: ["Data Structures", "Communications", "Critical Thinking"],
        milestones: [
          "Started internship at College of the Canyons MESA as a Software Engineer",
          "Started development on MESAConnect and MESAMobile",
          "Became the Computer Science Lead for MESA Skills Lab",
        ],
      },
      {
        term: "Fall 2023",
        classes: ["Intro to Java", "Calculus I", "Computer Architecture"],
        milestones: ["Joined MESA", "Started independent study on React"],
      },
    ],
  },
];

type Work = {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  details: string[];
  technologies_used?: string[];
};

export const work: Work[] = [
  {
    company: "Hack4Impact Cal Poly",
    role: "Software Engineer",
    location: "San Luis Obispo, California",
    startDate: "October 2026",
    endDate: "Present",
    details: ["Offered after Bootcamp Project Placed Top 5"],
   technologies_used: ["React", "NextJS", "MongoDB"]
  },
  {
    company: "HACKMESA",
    role: "Lead Backend Engineer + Announcer",
    location: "Los Angeles City College, Los Angeles, California",
    startDate: "December 2025",
    endDate: "April 2026",
    details: [
      "Lead Backend Engineer for HACKMESA 2.0, an MLH-affiliated hackathon hosted by Los Angeles City College drawing 35 teams and 100+ participants from 20+ community colleges across California.",
      "Sponsors including Riot Games, Hologram, Pure Buttons and more.",
      "Sole COC representative on the engineering team, built and maintained backend systems supporting registration, the participant portal, and event logistics.",
      "Served as event announcer for opening and closing ceremonies.",
    ],
    technologies_used: ["NestJS", "Node.js", "React", "Supabase"],
  },
  {
    company: "MESA",
    role: "Software Engineering Intern",
    location: "College of the Canyons, Valencia, California",
    startDate: "January 2024",
    endDate: "June 2026",
    details: [
      "Developer of MESA College Website.",
      "Lead Developer and Creator for Various Projects (MESAConnect, MESAMobile, MESAKiosk)",
    ],
    technologies_used: [
      "Next.js",
      "React Native",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Git",
    ],
  },
  {
    company: "MESA",
    role: "Computer Science Lead, MESA Skills Lab",
    location: "College of the Canyons, Valencia, California",
    startDate: "March 2024",
    endDate: "March 2026",
    details: ["Tutor for Calculus, Physics, and Computer Science."],
    technologies_used: ["Java", "JavaScript", "Unity", "C#", "SolidWorks"],
  },
];
