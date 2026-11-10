import ProjectLanding from "../../components/ProjectLanding";

const DESCRIPTION =
  "Buy mini projects with source code and documentation for ₹2,499. Python, Java, web, ML and IoT mini projects for CSE, IT, ECE and MCA students across India — delivered online. Order on WhatsApp.";

export const metadata = {
  title: "Mini Projects with Source Code for Engineering Students — ₹2,499",
  description: DESCRIPTION,
  alternates: { canonical: "/mini-projects" },
  openGraph: {
    url: "/mini-projects",
    title: "Mini Projects with Source Code | Journify",
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const FAQS = [
  {
    q: "How much does a mini project cost?",
    a: "Our mini project package costs ₹2,499 and includes the complete implementation, full source code, documentation, setup support and an explanation for your review.",
  },
  {
    q: "Which languages and technologies do you use for mini projects?",
    a: "Python, Java, C/C++, JavaScript (React/Node), PHP, Android and Arduino/IoT — we choose based on your syllabus and what your college expects.",
  },
  {
    q: "How long does a mini project take?",
    a: "Most mini projects are delivered within a few days once the title is confirmed. Tell us your deadline and we'll confirm a delivery date before starting.",
  },
  {
    q: "Can I choose my own mini project title?",
    a: "Yes. Send us your title or topic. If you don't have one yet, we'll suggest mini project ideas suited to your semester and department.",
  },
  {
    q: "Will you help me run the mini project?",
    a: "Yes. We help you set up and run the project on your laptop and explain the code so you're ready for your review.",
  },
];

export default function MiniProjectsPage() {
  return (
    <ProjectLanding
      path="/mini-projects"
      crumb="Mini Projects"
      eyebrow="Mini projects · Delivered across India"
      title="Mini projects with source code & documentation — ₹2,499"
      intro="Semester mini projects for engineering, MCA and science students — complete implementation, full source code, documentation and help to explain it in your review. Ordered and delivered over WhatsApp."
      packageIds={["mini-project"]}
      whatsappText="Hi Journify, I need a mini project. My department is ___ and my preferred topic is ___."
      faqs={FAQS}
      sections={[
        {
          h2: "What's included in the mini project package",
          paragraphs: [
            "A mini project is your chance to show you can build something real. We deliver a clean, working project that you understand — not just a zip file.",
          ],
          list: [
            "Complete working implementation",
            "Full source code",
            "Project documentation / report",
            "Execution & setup support",
            "Explanation for your review / viva",
          ],
        },
        {
          h2: "Popular mini project categories",
          list: [
            "Python mini projects",
            "Java mini projects",
            "Web development (HTML, CSS, JavaScript, React)",
            "Machine Learning mini projects",
            "Database / DBMS mini projects",
            "IoT & Arduino mini projects",
            "Android app mini projects",
            "C / C++ mini projects",
          ],
        },
        {
          h2: "Mini project or final year project?",
          paragraphs: [
            "Mini projects are smaller, semester-level projects focused on one core feature. Final year projects are larger, usually research-oriented and often need a conference or journal paper. If you're in your final year, see our final year project packages with paper included.",
          ],
        },
      ]}
      related={[
        { href: "/final-year-projects", label: "Final year projects", text: "With conference or journal paper, from ₹3,499." },
        { href: "/project-ideas", label: "Project ideas", text: "Mini and final year project ideas by domain." },
      ]}
    />
  );
}
