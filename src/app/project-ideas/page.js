import Link from "next/link";
import WhatsAppIcon from "../../components/WhatsAppIcon";
import { SITE_URL, whatsappLink } from "../../lib/site";

// level: "Final year" for research-heavy ideas, "Mini" for smaller semester projects.
const DOMAINS = [
  {
    id: "machine-learning",
    name: "Machine Learning & Deep Learning",
    ideas: [
      ["Crop yield prediction using weather and soil data", "Regression models on rainfall, temperature and soil parameters to help farmers plan.", "Final year"],
      ["Credit card fraud detection", "Handle imbalanced transaction data with SMOTE and compare Random Forest, XGBoost and neural networks.", "Final year"],
      ["Student performance prediction", "Predict exam outcomes from attendance, internal marks and study habits to flag at-risk students.", "Mini"],
      ["House price prediction for Indian cities", "Feature engineering on location, area and amenities with model comparison and a web front end.", "Mini"],
      ["Diabetic retinopathy detection from retina images", "CNN-based classification of fundus images with transfer learning (ResNet / EfficientNet).", "Final year"],
      ["Customer churn prediction for telecom", "Classify customers likely to leave and explain predictions with SHAP values.", "Final year"],
      ["Movie recommendation system", "Collaborative and content-based filtering with a simple web interface.", "Mini"],
      ["Air quality index forecasting", "Time-series forecasting of AQI with LSTM networks using public pollution data.", "Final year"],
      ["Heart disease prediction", "Compare logistic regression, SVM and decision trees on clinical parameters.", "Mini"],
      ["Fake job posting detection", "NLP features and classification to identify fraudulent job advertisements.", "Final year"],
    ],
  },
  {
    id: "ai-nlp",
    name: "Artificial Intelligence & NLP",
    ideas: [
      ["Tamil–English code-mixed sentiment analysis", "Classify sentiment in social media comments that mix Tamil and English.", "Final year"],
      ["AI chatbot for college admissions", "Answer common admission queries using retrieval over college documents.", "Final year"],
      ["Resume screening and job matching", "Rank resumes against job descriptions using embeddings and keyword extraction.", "Final year"],
      ["Fake news detection", "Transformer-based classification of news headlines and articles.", "Final year"],
      ["Text summarisation of research papers", "Abstractive summaries of long PDFs using pre-trained language models.", "Final year"],
      ["Speech-to-text note taker for lectures", "Transcribe lecture audio and generate key-point notes.", "Final year"],
      ["Spam SMS classifier", "Naive Bayes and TF-IDF classifier with a simple mobile-friendly UI.", "Mini"],
      ["Grammar and spelling checker", "Rule-based and model-based corrections for student essays.", "Mini"],
      ["Question paper generator", "Generate questions from syllabus text with difficulty levels.", "Final year"],
      ["Mental health support chatbot", "Conversational assistant with sentiment tracking and helpline escalation.", "Final year"],
    ],
  },
  {
    id: "computer-vision",
    name: "Computer Vision & Image Processing",
    ideas: [
      ["Face recognition attendance system", "Mark attendance automatically from a classroom camera feed.", "Final year"],
      ["Driver drowsiness detection", "Detect eye closure and yawning in real time and trigger an alert.", "Final year"],
      ["Helmet and number plate detection", "Detect riders without helmets and read their number plates with YOLO and OCR.", "Final year"],
      ["Plant leaf disease detection", "Classify leaf images to identify diseases and suggest treatments.", "Final year"],
      ["Sign language to text converter", "Recognise hand gestures and convert them to text and speech.", "Final year"],
      ["Handwritten digit recognition", "Train a CNN on MNIST and build a draw-and-predict web app.", "Mini"],
      ["Mask and social distance monitor", "Detect masks and measure distance between people in CCTV footage.", "Mini"],
      ["Traffic sign recognition", "Classify road signs for driver-assistance systems.", "Mini"],
      ["Skin cancer classification", "Classify dermoscopic images with deep learning and Grad-CAM explanations.", "Final year"],
      ["Waste segregation using image classification", "Sort waste into recyclable, organic and hazardous categories.", "Final year"],
    ],
  },
  {
    id: "iot",
    name: "IoT & Embedded Systems",
    ideas: [
      ["Smart irrigation system", "Soil moisture sensors control water pumps automatically with mobile monitoring.", "Final year"],
      ["IoT-based health monitoring", "Track heart rate, SpO2 and temperature and alert caregivers remotely.", "Final year"],
      ["Smart parking system", "Detect free slots with sensors and show availability on a web app.", "Final year"],
      ["Home automation with voice control", "Control lights and fans using ESP32 and a voice assistant.", "Mini"],
      ["Gas leakage detection and alert", "Detect LPG leaks and send SMS / app notifications.", "Mini"],
      ["Smart energy meter", "Measure power usage and show daily consumption and cost.", "Final year"],
      ["Cold-chain monitoring for medicines", "Track temperature and location of vaccine shipments in real time.", "Final year"],
      ["Women safety wearable", "Panic button sends live location to emergency contacts.", "Final year"],
      ["Smart dustbin with fill-level alerts", "Ultrasonic sensors notify municipal staff when bins are full.", "Mini"],
      ["Flood early-warning system", "Water-level sensors trigger alerts for low-lying areas.", "Final year"],
    ],
  },
  {
    id: "web",
    name: "Web Applications",
    ideas: [
      ["College event management portal", "Register for events, generate e-certificates and manage volunteers.", "Final year"],
      ["Online examination system", "Timed tests with randomised questions, auto-grading and result analytics.", "Final year"],
      ["Hostel management system", "Room allocation, mess billing, complaints and attendance.", "Final year"],
      ["Placement management portal", "Student profiles, company drives, eligibility filters and status tracking.", "Final year"],
      ["Online food ordering for campus canteen", "Menu, cart, order tracking and payment integration.", "Mini"],
      ["Library management system", "Book issue, returns, fines and search.", "Mini"],
      ["Blood bank management", "Donor registry, stock tracking and emergency requests.", "Mini"],
      ["Freelance marketplace for students", "Post gigs, bid, chat and rate completed work.", "Final year"],
      ["Personal finance tracker", "Track expenses, budgets and savings goals with charts.", "Mini"],
      ["Doctor appointment booking system", "Search doctors, book slots and get reminders.", "Mini"],
    ],
  },
  {
    id: "android",
    name: "Android & Mobile Apps",
    ideas: [
      ["Campus navigation app", "Indoor and outdoor directions to classrooms, labs and offices.", "Final year"],
      ["Bus tracking app for college transport", "Live GPS location of college buses with arrival estimates.", "Final year"],
      ["Medicine reminder app", "Dosage schedules, refill alerts and caregiver notifications.", "Mini"],
      ["Expense splitter for roommates", "Share bills and settle balances.", "Mini"],
      ["Farmer market price app", "Daily mandi prices and direct buyer contact.", "Final year"],
      ["Lost and found app for campus", "Post items with photos and match owners.", "Mini"],
      ["Fitness and diet tracker", "Step counting, calorie tracking and weekly reports.", "Mini"],
      ["Emergency SOS app", "One-tap alert with location sharing and nearby hospitals.", "Final year"],
    ],
  },
  {
    id: "blockchain-security",
    name: "Blockchain & Cybersecurity",
    ideas: [
      ["Blockchain-based certificate verification", "Issue tamper-proof academic certificates that employers can verify.", "Final year"],
      ["Secure e-voting system using blockchain", "Transparent, auditable voting with smart contracts.", "Final year"],
      ["Supply chain tracking with blockchain", "Trace products from manufacturer to customer.", "Final year"],
      ["Phishing website detection", "Classify URLs using lexical and host-based features.", "Final year"],
      ["Intrusion detection system with ML", "Detect network attacks on benchmark datasets like NSL-KDD.", "Final year"],
      ["Password strength analyser", "Evaluate passwords and suggest stronger alternatives.", "Mini"],
      ["Secure file sharing with encryption", "AES-encrypted uploads with expiring share links.", "Mini"],
      ["Steganography tool", "Hide and extract text inside images.", "Mini"],
    ],
  },
  {
    id: "data-cloud",
    name: "Data Science & Cloud",
    ideas: [
      ["Sales dashboard and forecasting", "Interactive dashboard with monthly sales trends and forecasts.", "Mini"],
      ["COVID / disease spread analysis", "Analyse and visualise public health datasets.", "Mini"],
      ["Serverless image resizing service", "Upload images to cloud storage and resize automatically with cloud functions.", "Final year"],
      ["Cloud-based document management", "Upload, version and share documents securely.", "Final year"],
      ["Twitter / X trend analysis", "Collect posts on a topic and analyse sentiment over time.", "Mini"],
      ["E-commerce product recommendation", "Recommend products from purchase history.", "Final year"],
      ["Traffic accident hotspot analysis", "Map accident data to find high-risk areas.", "Mini"],
      ["Auto-scaling web app on the cloud", "Deploy a containerised app with load balancing and auto-scaling.", "Final year"],
    ],
  },
];

const total = DOMAINS.reduce((t, d) => t + d.ideas.length, 0);

const DESCRIPTION =
  `${total} final year and mini project ideas for CSE, IT, ECE and EEE students — Machine Learning, AI, IoT, web, Android, blockchain, cybersecurity and data science. Get any idea implemented with source code and paper.`;

export const metadata = {
  title: `Final Year Project Ideas for CSE, IT & ECE — ${total} Ideas by Domain`,
  description: DESCRIPTION,
  alternates: { canonical: "/project-ideas" },
  openGraph: {
    url: "/project-ideas",
    title: `${total} Final Year Project Ideas for CSE, IT & ECE | Journify`,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};


const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Final year and mini project ideas",
      numberOfItems: total,
      itemListElement: DOMAINS.flatMap((d) => d.ideas).map(([title], i) => ({ "@type": "ListItem", position: i + 1, name: title })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Project Ideas", item: `${SITE_URL}/project-ideas` },
      ],
    },
  ],
};

export default function ProjectIdeasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="dots -mt-[76px] pt-[76px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-10 sm:pt-20 sm:pb-14">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
            <Link href="/" className="hover:text-ink hover:underline underline-offset-4">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span aria-current="page">Project Ideas</span>
          </nav>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.15em] text-brand">Free resource</p>
          <h1 className="mt-3 font-display text-[36px] leading-[1.05] sm:text-6xl font-extrabold tracking-tight max-w-4xl">
            {total} final year &amp; mini project ideas for CSE, IT and ECE
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink-soft max-w-2xl">
            Hand-picked project ideas by domain, each with a one-line scope so you can pitch it to your guide. Like an idea?
            We can build it for you with full source code, documentation and a paper.
          </p>
          <nav aria-label="Jump to domain" className="mt-8 flex flex-wrap gap-2">
            {DOMAINS.map((d) => (
              <a key={d.id} href={`#${d.id}`} className="px-3.5 py-2 rounded-full bg-paper border border-line text-sm font-semibold hover:bg-lime">
                {d.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        {DOMAINS.map((d) => (
          <section key={d.id} id={d.id} className="scroll-mt-24 pt-10" aria-labelledby={`${d.id}-h`}>
            <h2 id={`${d.id}-h`} className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              {d.name} project ideas
            </h2>
            <ol className="mt-6 grid gap-3 md:grid-cols-2">
              {d.ideas.map(([title, scope, level]) => (
                <li key={title} className="flex flex-col rounded-2xl bg-paper border border-line p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-bold leading-snug">{title}</h3>
                    <span
                      className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        level === "Mini" ? "bg-cream border border-line" : "bg-brand/10 text-brand"
                      }`}
                    >
                      {level}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink-soft flex-1">{scope}</p>
                  <a
                    href={whatsappLink(`Hi Journify, I'm interested in the project "${title}". Can you share details?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 self-start text-sm font-bold text-brand hover:underline underline-offset-4"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Get this project built
                  </a>
                </li>
              ))}
            </ol>
          </section>
        ))}

        <section className="mt-16 grid gap-4 md:grid-cols-2">
          <Link href="/final-year-projects" className="rounded-3xl bg-ink text-white p-6 sm:p-8 hover:bg-brand transition-colors">
            <span className="block text-sm font-bold uppercase tracking-[0.15em] text-lime">From ₹3,499</span>
            <span className="block mt-2 font-display text-2xl font-extrabold">Final year projects with paper →</span>
            <span className="block mt-2 text-white/70">Implementation, source code, report, PPT and a conference or journal paper.</span>
          </Link>
          <Link href="/mini-projects" className="rounded-3xl bg-lime p-6 sm:p-8 hover:bg-ink hover:text-white transition-colors">
            <span className="block text-sm font-bold uppercase tracking-[0.15em]">₹2,499</span>
            <span className="block mt-2 font-display text-2xl font-extrabold">Mini projects with source code →</span>
            <span className="block mt-2 opacity-75">Working project, documentation and help to explain it in your review.</span>
          </Link>
        </section>
      </div>
    </>
  );
}
