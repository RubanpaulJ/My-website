import ProjectLanding from "../../components/ProjectLanding";

const DESCRIPTION =
  "Buy final year projects with full source code, documentation, PPT and a conference (₹3,499) or journal paper (₹4,499). For CSE, IT, ECE, EEE and MCA students across India — delivered online. Order on WhatsApp.";

export const metadata = {
  title: "Final Year Projects with Source Code & Paper for Students Across India",
  description: DESCRIPTION,
  alternates: { canonical: "/final-year-projects" },
  openGraph: {
    url: "/final-year-projects",
    title: "Final Year Projects with Source Code & Paper | Journify",
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const FAQS = [
  {
    q: "How much does a final year project cost?",
    a: "A complete final year project with implementation, source code, documentation, PPT and a conference paper costs ₹3,499. The same package with a journal paper instead costs ₹4,499.",
  },
  {
    q: "Will I get the full source code?",
    a: "Yes. You receive the complete source code, and we help you install and run it on your own laptop before your review.",
  },
  {
    q: "Can you suggest a final year project title?",
    a: "Yes. Tell us your department, the domain you're interested in (for example Machine Learning, IoT or Web) and any guidelines from your college, and we'll suggest suitable titles.",
  },
  {
    q: "Do you provide the project report and PPT?",
    a: "Yes. Both final year packages include project documentation and a presentation (PPT) prepared for your reviews.",
  },
  {
    q: "What is the difference between the conference and journal packages?",
    a: "Both include the full project. The ₹3,499 package includes a paper prepared in conference format (IEEE / Springer style); the ₹4,499 package includes a paper prepared for journal submission.",
  },
  {
    q: "Do you work with students from any state in India?",
    a: "Yes. Everything is handled over WhatsApp and online sessions, so we support students from every state — Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana, Maharashtra, Delhi NCR, West Bengal and beyond. Delivery, setup help and viva guidance all happen online.",
  },
  {
    q: "Will you explain the project for my viva?",
    a: "Yes. We walk you through the architecture, code and results so you can answer your guide's and examiners' questions confidently.",
  },
];

export default function FinalYearProjectsPage() {
  return (
    <ProjectLanding
      path="/final-year-projects"
      crumb="Final Year Projects"
      eyebrow="Final year projects · Delivered across India"
      title="Final year projects with source code, documentation & paper"
      intro="Complete final year projects for BE, BTech, ME, MCA and MSc students — working implementation, full source code, report, PPT and a conference or journal paper. Sorted over WhatsApp, delivered on time."
      packageIds={["final-year-conference", "final-year-journal"]}
      whatsappText="Hi Journify, I need a final year project. My department is ___ and my preferred domain is ___."
      faqs={FAQS}
      sections={[
        {
          h2: "What you get with every final year project",
          paragraphs: [
            "Your final year project decides a big part of your final semester marks — and it's often the first thing recruiters ask about in interviews. We build the project with you, not just for you: you get working code, clear documentation, and a walkthrough so you understand every part of it.",
          ],
          list: [
            "Complete working implementation",
            "Full source code you can run and modify",
            "Project report / documentation",
            "Presentation (PPT) for reviews",
            "Conference or journal paper",
            "Setup on your laptop and viva guidance",
          ],
        },
        {
          h2: "Final year project domains",
          paragraphs: [
            "We build projects across the domains colleges ask for most. If you have a title from your guide, send it — we'll check feasibility and suggest improvements.",
          ],
          list: [
            "Machine Learning & Deep Learning",
            "Artificial Intelligence & NLP",
            "Computer Vision & Image Processing",
            "IoT & Embedded Systems",
            "Web Applications (MERN, Django, Spring Boot)",
            "Android & Mobile Apps",
            "Blockchain",
            "Cloud Computing & Cybersecurity",
            "Data Science & Analytics",
            "ERP & CRM Systems",
          ],
        },
        {
          h2: "Why students choose Journify",
          paragraphs: [
            "Students across India trust Journify because the price is fixed and published, the paper is included, and you can talk to the people building your project directly on WhatsApp. There's no sign-up, no hidden charges and no middlemen.",
            "Looking for title inspiration first? Browse our free list of final year project ideas by domain, or start with one of our free programming courses to strengthen your basics before your reviews.",
          ],
        },
      ]}
      related={[
        { href: "/project-ideas", label: "Final year project ideas", text: "Ideas for CSE, IT and ECE by domain." },
        { href: "/mini-projects", label: "Mini projects", text: "Mini projects with source code for ₹2,499." },
      ]}
    />
  );
}
