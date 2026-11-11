// SEO copy for each project domain page (/projects/[domain]). Keys match DOMAINS ids in projectIdeas.js.
export const DOMAIN_PAGES = {
  "machine-learning": {
    short: "Machine Learning",
    intro:
      "Machine learning is the most requested final year project domain for CSE, IT and AI & DS students. We build ML and deep learning projects end to end: dataset preparation, model training and comparison, evaluation metrics, and a simple web interface so you can demo predictions live in your review.",
    stack: ["Python", "scikit-learn", "TensorFlow / Keras", "PyTorch", "Pandas & NumPy", "Flask / Streamlit"],
    faqs: [
      { q: "Which machine learning project is best for final year?", a: "Projects with a clear dataset, a comparison of at least two or three algorithms and a working demo score well — for example fraud detection, disease prediction or crop yield prediction. Tell us your interest and we'll suggest titles." },
      { q: "Do you provide the dataset and trained model?", a: "Yes. You get the dataset source, preprocessing code, training notebooks, the trained model and the code to run predictions." },
      { q: "Will I understand the algorithms for my viva?", a: "Yes. We explain the algorithm choice, accuracy metrics, confusion matrix and results so you can answer examiner questions confidently." },
    ],
  },
  "ai-nlp": {
    short: "AI & NLP",
    intro:
      "Artificial intelligence and natural language processing projects stand out in reviews because they solve problems people recognise — chatbots, sentiment analysis, summarisation and resume screening. We build them with modern transformer models and explain every step, from text cleaning to model evaluation.",
    stack: ["Python", "Hugging Face Transformers", "NLTK / spaCy", "LangChain", "FastAPI", "React front end"],
    faqs: [
      { q: "Can you build a chatbot for my final year project?", a: "Yes. We build chatbots for domains such as college admissions, healthcare and customer support, with a web interface you can demo." },
      { q: "Do NLP projects work with Indian languages like Tamil or Hindi?", a: "Yes. We can build projects on Tamil, Hindi and code-mixed text, such as sentiment analysis of social media comments." },
      { q: "Is an AI project suitable for a conference paper?", a: "Yes. AI and NLP projects with a comparison of models and clear results are well suited to conference and journal papers." },
    ],
  },
  "computer-vision": {
    short: "Computer Vision",
    intro:
      "Computer vision projects make strong live demos: point a camera and the system recognises faces, detects drowsiness or reads number plates. We build image processing and deep learning projects with OpenCV, CNNs and YOLO, with real-time detection wherever your laptop can support it.",
    stack: ["Python", "OpenCV", "TensorFlow / Keras", "YOLO", "MediaPipe", "Flask / Streamlit"],
    faqs: [
      { q: "Do computer vision projects need a GPU?", a: "Training is done in advance, so the delivered project runs on a normal laptop. For heavier models we provide the trained weights and Google Colab notebooks." },
      { q: "Can the project work with a live webcam?", a: "Yes. Projects such as face recognition attendance, drowsiness detection and sign language recognition run in real time on a webcam." },
      { q: "Which image processing project is good for ECE students?", a: "Plant disease detection, traffic sign recognition and medical image classification are popular with ECE as well as CSE students." },
    ],
  },
  iot: {
    short: "IoT",
    intro:
      "IoT projects combine hardware and software — sensors, a microcontroller and a mobile or web dashboard. They are the first choice for ECE and EEE students and increasingly popular with CSE. We build the circuit design, firmware and cloud dashboard, and explain how to assemble and demo the working model.",
    stack: ["Arduino", "ESP32 / NodeMCU", "Raspberry Pi", "MQTT", "Firebase / ThingSpeak", "Blynk / web dashboard"],
    faqs: [
      { q: "Do you provide the hardware kit for IoT projects?", a: "We provide the circuit diagram, component list, firmware code and dashboard. Ask us on WhatsApp about hardware kit availability for your project and location." },
      { q: "Which IoT project is best for ECE final year?", a: "Smart irrigation, health monitoring and smart energy meter projects are popular because they combine sensors, wireless communication and a live dashboard." },
      { q: "Can CSE students do an IoT project?", a: "Yes. CSE students usually focus on the cloud, dashboard and analytics side, with a simpler hardware setup." },
    ],
  },
  web: {
    short: "Web Development",
    intro:
      "Web application projects are practical, easy to demo and directly useful for placements. We build full-stack applications with login, role-based dashboards, database design and reports — using the stack your college prefers, whether that's MERN, Django, Spring Boot or PHP.",
    stack: ["React / Next.js", "Node.js & Express", "Django", "Spring Boot", "MySQL / MongoDB", "PHP"],
    faqs: [
      { q: "Which technology do you use for web projects?", a: "We work with MERN (MongoDB, Express, React, Node), Django, Spring Boot and PHP/MySQL. Tell us what your syllabus or guide expects." },
      { q: "Will you help me host the project?", a: "Yes. We help you run it locally for your review and can guide you to deploy it online so you can add a live link to your resume." },
      { q: "Are web projects accepted as final year projects?", a: "Yes, especially when they solve a real problem and include features such as authentication, analytics, payment integration or an ML component." },
    ],
  },
  android: {
    short: "Android",
    intro:
      "A mobile app is a project you can hand to your examiner on a phone. We build Android apps with clean screens, a real backend and features such as GPS, notifications and offline storage — using Java, Kotlin or Flutter depending on your syllabus.",
    stack: ["Android Studio", "Java / Kotlin", "Flutter", "Firebase", "SQLite / Room", "REST APIs"],
    faqs: [
      { q: "Will I get the APK and the source code?", a: "Yes. You receive the full Android Studio project, the installable APK and setup instructions." },
      { q: "Do you build apps in Flutter?", a: "Yes. We build in native Android (Java / Kotlin) or Flutter, based on what you prefer." },
      { q: "Can an Android app be a mini project?", a: "Yes. Apps such as an expense tracker, medicine reminder or lost-and-found app are well sized for a mini project." },
    ],
  },
  "blockchain-security": {
    short: "Blockchain & Cybersecurity",
    intro:
      "Blockchain and cybersecurity projects are valued for their research depth. We build decentralised applications with smart contracts, and security projects such as phishing detection and intrusion detection systems, with clear architecture diagrams and results for your report.",
    stack: ["Solidity", "Ethereum / Ganache", "Web3.js", "Python", "Scapy / Wireshark", "React front end"],
    faqs: [
      { q: "Do blockchain projects need real cryptocurrency?", a: "No. Projects run on a local test blockchain such as Ganache, so there is no cost to deploy or demo." },
      { q: "Which cybersecurity project is good for final year?", a: "Phishing website detection and ML-based intrusion detection are popular because they combine security concepts with measurable results." },
      { q: "Are these projects suitable for a journal paper?", a: "Yes. Blockchain and security topics are well suited to papers when the project includes a clear method and evaluation." },
    ],
  },
  "data-cloud": {
    short: "Data Science & Cloud",
    intro:
      "Data science and cloud projects show skills that employers ask for directly — dashboards, analysis, deployment and scaling. We build analytics projects with interactive visualisations, and cloud projects deployed on real services with architecture diagrams for your documentation.",
    stack: ["Python", "Pandas & Matplotlib", "Power BI / Tableau", "AWS", "Docker", "SQL"],
    faqs: [
      { q: "Do cloud projects cost money to run?", a: "We design projects to run within free tiers, and explain how to shut resources down after your demo." },
      { q: "Is a data analysis project enough for final year?", a: "A dashboard alone suits a mini project. For final year we add forecasting, recommendations or a deployed application." },
      { q: "Which tools do you use for dashboards?", a: "Python (Plotly, Streamlit), Power BI or Tableau — based on what your college expects." },
    ],
  },
};

// Department pages (/final-year-projects/[dept]).
export const DEPARTMENT_PAGES = {
  cse: {
    name: "CSE",
    full: "Computer Science and Engineering",
    title: "B.Tech CSE Final Year Projects with Source Code",
    intro:
      "Final year projects for B.E. / B.Tech Computer Science and Engineering students — complete implementation, full source code, report, PPT and a conference or journal paper. Choose from machine learning, AI, web, cloud, blockchain and more, or bring the title your guide approved.",
    domains: ["machine-learning", "ai-nlp", "computer-vision", "web", "blockchain-security", "data-cloud", "android"],
    faqs: [
      { q: "Which domain is best for a CSE final year project?", a: "Machine learning, AI and full-stack web projects are the most popular for CSE. Choose based on the career you want: ML/AI for data roles, web or cloud for developer roles." },
      { q: "How much does a CSE final year project cost?", a: "₹3,499 with a conference paper or ₹4,499 with a journal paper. Both include implementation, source code, documentation and PPT." },
      { q: "Can you work from my guide's approved title?", a: "Yes. Send us the title and abstract, and we'll confirm feasibility and the plan before starting." },
      { q: "Do you support M.E., M.Tech and MCA projects too?", a: "Yes. We support B.E., B.Tech, M.E., M.Tech, MCA and M.Sc computer science projects." },
    ],
  },
  it: {
    name: "IT",
    full: "Information Technology",
    title: "B.Tech IT Final Year Projects with Source Code",
    intro:
      "Final year projects for B.Tech Information Technology students, with complete implementation, source code, documentation, PPT and paper. IT projects typically focus on full-stack applications, data, cloud and security — we build them with the stack your college expects.",
    domains: ["web", "data-cloud", "machine-learning", "android", "blockchain-security", "ai-nlp"],
    faqs: [
      { q: "What are good final year project topics for IT students?", a: "Full-stack web applications, cloud-based systems, data analytics dashboards and security projects such as phishing detection suit the IT curriculum well." },
      { q: "Is the price the same for IT projects?", a: "Yes. ₹3,499 with a conference paper or ₹4,499 with a journal paper, for all departments." },
      { q: "Will the project include a database design?", a: "Yes. We include the database schema, ER diagram and sample data, and explain them for your viva." },
    ],
  },
  ece: {
    name: "ECE",
    full: "Electronics and Communication Engineering",
    title: "ECE Final Year Projects — IoT, Embedded & Image Processing",
    intro:
      "Final year projects for B.E. / B.Tech Electronics and Communication Engineering students. ECE projects usually combine hardware and software — IoT systems, embedded controllers and image processing. We provide the circuit design, firmware, software, documentation and paper.",
    domains: ["iot", "computer-vision", "machine-learning", "android"],
    faqs: [
      { q: "Which project is best for ECE final year?", a: "IoT-based monitoring systems, embedded automation and image processing projects are the most popular and demonstrate both hardware and software skills." },
      { q: "Do ECE projects include hardware?", a: "We provide the circuit diagram, component list, firmware and software. Ask us on WhatsApp about hardware kit availability for your project and location." },
      { q: "Can ECE students do a software-only project?", a: "Yes. Image processing and machine learning projects in Python or MATLAB are accepted in most ECE departments — check with your guide." },
    ],
  },
};
