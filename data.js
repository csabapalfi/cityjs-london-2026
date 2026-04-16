// CityJS London 2026 — Day 3 (Fri 17 April)
// Source: https://london.cityjsconf.org/schedule
// tracks: 1 = Great Hall (GF), 2 = Small Hall (L1), 3 = Session Room 1 (L-1), 4 = Session Room 2 (L-1)

const TRACKS = {
  1: { name: "Great Hall",     location: "Ground Floor", color: "#4f46e5" }, // indigo
  2: { name: "Small Hall",     location: "Level 1",      color: "#059669" }, // emerald
  3: { name: "Session Room 1", location: "Level -1",     color: "#d97706" }, // amber
  4: { name: "Session Room 2", location: "Level -1",     color: "#db2777" }, // pink
};

const TALKS = [
  // ===== Track 1 — Great Hall =====
  { id: "t1-reg",  track: 1, start: "08:30", end: "09:15", title: "Registration & Breakfast", kind: "break" },
  { id: "t1-open", track: 1, start: "09:15", end: "09:30", title: "Track 1 Opening", speaker: "Sara Vieira", org: "Senior Frontend Developer", kind: "meta" },
  { id: "t1-0930", track: 1, start: "09:30", end: "10:00", title: "The New UX", speaker: "Tejas Kumar", org: "Director, Developer Relations @ IBM", tags: ["AI-driven UX","multimodal","contejas"], pick: true },
  { id: "t1-1000", track: 1, start: "10:00", end: "10:25", title: "From Vibe Coding to Vibe Engineering", speaker: "Kitze", org: "Sizzy", tags: ["AI-assisted dev","future of frontend"], pick: true },
  { id: "t1-1025", track: 1, start: "10:25", end: "10:55", title: "The New Node.js: Built-in Batteries and the Road Ahead", speaker: "Matteo Collina", org: "Platformatic · Node.js TSC", tags: ["node.js","backend","open source"], pick: true },
  { id: "t1-1055", track: 1, start: "10:55", end: "11:20", title: "Break", kind: "break" },
  { id: "t1-1120", track: 1, start: "11:20", end: "11:45", title: "Implementing Server Driven UI", speaker: "Dan Neciu", org: "Staff Engineer" },
  { id: "t1-1145", track: 1, start: "11:45", end: "12:05", title: "Pear — P2Pify all the apps", speaker: "David Mark Clements", org: "Tether", tags: ["p2p","ota updates"] },
  { id: "t1-1205", track: 1, start: "12:05", end: "12:25", title: "Segmentation fault! Low-level debugging for JS developers", speaker: "Anna Henningsen", org: "Staff Engineer @ MongoDB" },
  { id: "t1-1225", track: 1, start: "12:25", end: "12:45", title: "The Other Local-First", speaker: "Rich Harris", org: "Vercel", pick: true },
  { id: "t1-1245", track: 1, start: "12:45", end: "13:05", title: "Video Optimization for the Web: The Missing Piece in Lighthouse", speaker: "Harshit Budhraja", org: "ImageKit", tags: ["video","web performance"] },
  { id: "t1-1305", track: 1, start: "13:05", end: "14:00", title: "Lunch", kind: "break" },
  { id: "t1-1400", track: 1, start: "14:00", end: "14:20", title: "Code Golf — Getting A Hole-in-One-(Liner)", speaker: "Steven Goodwin", org: "Unemployable computer geek" },
  { id: "t1-1420", track: 1, start: "14:20", end: "14:55", title: "Women in Tech Panel", speaker: "Denise Lashlley, Robin Ginn, Jess Madhavan, Viktorija Buklajeva, Lena Lekkou, Julia Biro", kind: "panel" },
  { id: "t1-1455", track: 1, start: "14:55", end: "15:10", title: "Federation of Specialists: From Module Federation to AI Orchestration", speaker: "Nestor Lopez", org: "Zephyr Cloud", tags: ["AI agents","composable AI"] },
  { id: "t1-1510", track: 1, start: "15:10", end: "15:30", title: "Ripple: the Good Parts of React, Svelte, and Solid", speaker: "Erik Rasmussen", org: "Fuse Energy", tags: ["frameworks"] },
  { id: "t1-1530", track: 1, start: "15:30", end: "15:50", title: "The Dark Side of Micro-Frontends", speaker: "Luca Mezzalira", org: "Software Architect @ AWS", tags: ["microfrontends","frontend architecture"], pick: true },
  { id: "t1-1550", track: 1, start: "15:50", end: "16:00", title: "Break", kind: "break" },
  { id: "t1-1600", track: 1, start: "16:00", end: "16:45", title: "The Future of the AI Bubble (Panel)", speaker: "David Whitney (NewDay), David Benson", kind: "panel" },
  { id: "t1-1645", track: 1, start: "16:45", end: "17:15", title: "JavaScript: The Best Part", speaker: "Douglas Crockford", org: "JSON creator" },

  // ===== Track 2 — Small Hall =====
  { id: "t2-bfst", track: 2, start: "08:30", end: "09:55", title: "Breakfast", kind: "break" },
  { id: "t2-open", track: 2, start: "09:55", end: "10:00", title: "Track 2 Opening", speaker: "Tony Edwards", org: "Sapphire Holidays", kind: "meta" },
  { id: "t2-1000", track: 2, start: "10:00", end: "10:25", title: "Beyond the Framework", speaker: "Daniel Roe", org: "Framework Lead @ Nuxt", tags: ["web architecture","tooling","sustainable software"], pick: true },
  { id: "t2-1025", track: 2, start: "10:25", end: "10:55", title: "React Beyond Components: The Rise of Generative UI", speaker: "Ruben Casas", org: "Staff Engineer @ Postman", tags: ["react","generative UI","LLMs"] },
  { id: "t2-1055", track: 2, start: "10:55", end: "11:20", title: "Break", kind: "break" },
  { id: "t2-1120", track: 2, start: "11:20", end: "11:45", title: "Achieving 93% Faster Next.js in (your) Kubernetes with Watt", speaker: "Paolo Insogna", org: "Platformatic", tags: ["next.js","kubernetes","performance"], pick: true },
  { id: "t2-1145", track: 2, start: "11:45", end: "12:05", title: "A personal AI agent, off cloud, for $100", speaker: "Alvin Bryan", org: "Developer Advocate at Yoto", tags: ["AI","privacy","webgpu"] },
  { id: "t2-1205", track: 2, start: "12:05", end: "12:25", title: "OTel You It's Not Just for Backend!", speaker: "Carly Richmond", org: "Senior DA @ Elastic", tags: ["observability","opentelemetry","web performance"], pick: true },
  { id: "t2-1225", track: 2, start: "12:25", end: "12:45", title: "Replacing form libraries with native web APIs", speaker: "Trust Jamin Okpukoro", org: "Uploadcare · Developer Advocate", tags: ["native web apis","html forms"] },
  { id: "t2-1245", track: 2, start: "12:45", end: "13:05", title: "Look ma, no hands! Multimodal AI-Agents in the browser", speaker: "Nico Martin", org: "Hugging Face · ML Engineer", tags: ["multimodal AI","browser AI"] },
  { id: "t2-1305", track: 2, start: "13:05", end: "14:00", title: "Lunch", kind: "break" },
  { id: "t2-1400", track: 2, start: "14:00", end: "14:25", title: "How to choose the right AI model for your project", speaker: "Ali Spivak", org: "Google", tags: ["AI","generative AI","ML"] },
  { id: "t2-1425", track: 2, start: "14:25", end: "14:50", title: "Building Resilient UIs with React", speaker: "Faris Aziz", org: "Staff Software Engineer @ Smallpdf" },
  { id: "t2-1450", track: 2, start: "14:50", end: "15:25", title: "A Decade and Counting: React's Rhapsody of Life", speaker: "Matheus Albuquerque", org: "Medallia" },
  { id: "t2-1525", track: 2, start: "15:25", end: "15:45", title: "Improve your e-commerce with Agents and Model Context Protocol", speaker: "Chris Noring", org: "Microsoft", tags: ["AI e-commerce","MCP","agents"], pick: true },
  { id: "t2-1545", track: 2, start: "15:45", end: "16:10", title: "JSBT: A Binary Serialization Format for Real JavaScript Object Graphs", speaker: "Alexander Cheprasov", org: "Senior SE · Valstro (UK)", tags: ["javascript","performance","serialization"] },
  { id: "t2-1610", track: 2, start: "16:10", end: "16:30", title: "JS at the speed of Rust: Oxc", speaker: "Jim Dummett", org: "Void(0)", tags: ["javascript","typescript","rust"] },

  // ===== Track 3 — Session Room 1 =====
  { id: "t3-bfst", track: 3, start: "08:30", end: "11:20", title: "Breakfast", kind: "break" },
  { id: "t3-open", track: 3, start: "11:20", end: "11:25", title: "Track 3 Opening", speaker: "Michael Hoffman", org: "Senior Developer", kind: "meta" },
  { id: "t3-1125", track: 3, start: "11:25", end: "12:05", title: "From Isolation to Acceleration: Building the fastest payment platform on an iFrame", speaker: "Eduardo Aparicio Cardenes", org: "Senior SE · Happening", tags: ["performance","architecture","vue.js"] },
  { id: "t3-1205", track: 3, start: "12:05", end: "13:00", title: "WebAssembly + JavaScript: Partners, Not Competitors", speaker: "Aprajita Verma", org: "Frontend Architect · Mycom", tags: ["performance","wasm"] },
  { id: "t3-1300", track: 3, start: "13:00", end: "14:00", title: "Lunch", kind: "break" },
  { id: "t3-1400", track: 3, start: "14:00", end: "14:45", title: "Pigeon-Driven Development", speaker: "Scott Spence", org: "XtendOps", tags: ["AI in practice","svelte"] },
  { id: "t3-1445", track: 3, start: "14:45", end: "15:20", title: "Effortlessly defend your dev machine from North Koreans on NPM", speaker: "Zbyszek Tenerowicz", org: "LavaMoat R&D Lead · Consensys", tags: ["security","npm","supply chain"], pick: true },
  { id: "t3-1520", track: 3, start: "15:20", end: "15:50", title: "Off-the-main-thread: Building fast, smooth and future-proof web apps", speaker: "Ananya Kittane Yogananda", org: "Samsung R&D Institute UK", tags: ["main thread","web performance"] },
  { id: "t3-1550", track: 3, start: "15:50", end: "16:00", title: "Break", kind: "break" },

  // ===== Track 4 — Session Room 2 =====
  { id: "t4-bfst", track: 4, start: "08:30", end: "11:20", title: "Breakfast", kind: "break" },
  { id: "t4-open", track: 4, start: "11:20", end: "11:25", title: "Track 4 Opening", speaker: "Praveen Kumar Purushothaman", org: "Full Stack / JavaScript", kind: "meta" },
  { id: "t4-1125", track: 4, start: "11:25", end: "12:05", title: "Securing AI-Generated Code with Semgrep", speaker: "Paul Ibeabuchi", org: "Supabase", tags: ["AI-assisted dev","AppSec","secure dev"], pick: true },
  { id: "t4-1205", track: 4, start: "12:05", end: "13:00", title: "Embeddable Agentic SaaS with A2UI and Microfrontends", speaker: "Benjamin Bartosch (Funke Mediengruppe), Alexander Günsche (AWS)", tags: ["A2UI","agentic AI","microfrontends"], pick: true },
  { id: "t4-1300", track: 4, start: "13:00", end: "14:00", title: "Lunch", kind: "break" },
  { id: "t4-1400", track: 4, start: "14:00", end: "15:20", title: "From Executor to Orchestrator: Building in the Age of AI Agents", speaker: "Nkechi Anyanwu", org: "Vouchsafe", tags: ["AI orchestration","AI-assisted dev","builder mindset"], pick: true },
  { id: "t4-1520", track: 4, start: "15:20", end: "16:00", title: "Six-Month Refactor in Six Days: Using AI to Update Deprecated JS Libraries", speaker: "Mo Khazali", org: "Associate Partner, AI Tooling @ Theodo", tags: ["AI refactoring","tech debt","styled-components"], pick: true },
];
