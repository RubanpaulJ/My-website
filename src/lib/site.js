export const WHATSAPP_NUMBER = "917904203916";
export const PHONE_DISPLAY = "+91 79042 03916";
export const EMAIL = "journifyorg@gmail.com";

export function whatsappLink(message = "Hi Journify, I'd like to know more about your services.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const SERVICES = [
  {
    id: "mini-project",
    name: "Mini Project",
    tagline: "For semester & mini project submissions",
    price: 2499,
    features: [
      "Complete project implementation",
      "Full source code",
      "Project documentation / report",
      "Execution & setup support",
      "Explanation for review / viva",
    ],
  },
  {
    id: "final-year-conference",
    name: "Final Year Project + Conference Paper",
    tagline: "Best for conference publication",
    price: 3499,
    popular: true,
    features: [
      "Complete project implementation",
      "Full source code",
      "Conference paper (IEEE / Springer format)",
      "Project documentation & PPT",
      "Execution & setup support",
      "Viva & review guidance",
    ],
  },
  {
    id: "final-year-journal",
    name: "Final Year Project + Journal Paper",
    tagline: "Best for journal publication",
    price: 4499,
    features: [
      "Complete project implementation",
      "Full source code",
      "Journal paper writing",
      "Project documentation & PPT",
      "Execution & setup support",
      "Viva & review guidance",
    ],
  },
];

export const PROGRAMS = [
  {
    id: "internship",
    name: "Internships in all domains",
    description:
      "Hands-on internships where you work on real projects with guidance from our developers — in any domain you choose.",
    points: [
      "Machine Learning, AI, Web, Android, IoT, Cloud & more",
      "Work on live, real-world projects",
      "Mentor guidance throughout",
      "Internship certificate on completion",
    ],
    message: "Hi Journify, I'm interested in an internship. Please share the available domains and details.",
  },
  {
    id: "erp-crm",
    name: "ERP & CRM projects",
    description:
      "Custom ERP and CRM systems for students and businesses — built to manage inventory, sales, customers, HR and more.",
    points: [
      "Custom ERP modules (inventory, billing, HR, payroll)",
      "CRM for leads, customers & follow-ups",
      "Dashboards and reports",
      "Source code, deployment & support",
    ],
    message: "Hi Journify, I'm interested in an ERP / CRM project. Please share more details.",
  },
  {
    id: "training",
    name: "Training & experience certificate",
    description:
      "Industry-focused training that takes you from basics to building real projects — and ends with a professional experience certificate.",
    points: [
      "Practical, project-based training",
      "Industry-relevant tools & technologies",
      "Build a portfolio you can show recruiters",
      "Professional experience certificate",
    ],
    message: "Hi Journify, I'm interested in your training and experience certificate program. Please share details.",
  },
];

export function serviceMessage(service) {
  return `Hi Journify, I'm interested in the "${service.name}" service (₹${service.price}). Please share more details.`;
}

export const SITE_URL = "https://journify.tech";

export const FAQS = [
  {
    q: "How do I place an order?",
    a: "Tap any WhatsApp button on this site and send us your requirements. There is no account or sign-up.",
  },
  {
    q: "What's the difference between the two final year packages?",
    a: "Both include full implementation and source code. The ₹3,499 package comes with a conference paper; the ₹4,499 package comes with a journal paper.",
  },
  {
    q: "How much does a mini project cost?",
    a: "Our mini project package is ₹2,499 and includes the complete implementation, source code, documentation and help to explain it in your review.",
  },
  {
    q: "Which domains do you cover?",
    a: "Machine Learning, AI, IoT, Web, Android, Blockchain, Cloud, Cybersecurity, Data Science, Computer Vision, NLP and more.",
  },
  {
    q: "Will you help me run and explain the project?",
    a: "Yes. We help you set up and run the project, and walk you through it so you're ready for your review and viva.",
  },
];
