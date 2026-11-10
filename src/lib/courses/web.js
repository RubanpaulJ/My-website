// Web Development course. JavaScript examples contain backticks and ${...}, which can't
// appear inside a template literal, so lessons write § for a backtick and $[expr] for ${expr}.
const md = (strings, ...values) =>
  String.raw(strings, ...values)
    .replace(/§/g, "`")
    .replace(/\$\[([^\]]*)\]/g, "$${$1}");

const MODULES = [
  {
    id: "web1",
    title: "How the Web Works & HTML Basics",
    summary: "Clients, servers, HTTP and the structure of an HTML page.",
    lessons: [
      {
        title: "How the web works",
        minutes: 15,
        body: md`When you open «https://journify.tech», a lot happens in under a second:
- Your browser asks **DNS** to turn the domain into an **IP address**.
- It opens a secure (**HTTPS**) connection to that server.
- It sends an **HTTP request**: «GET /».
- The server replies with an **HTTP response** — status «200 OK» plus an HTML document.
- The browser parses the HTML, downloads CSS, JavaScript and images, and **renders** the page.

### The three languages of the front end
- **HTML** — structure and content (the skeleton)
- **CSS** — presentation and layout (the skin)
- **JavaScript** — behaviour and interactivity (the muscles)

### Front end vs back end
The **front end** runs in the browser. The **back end** runs on servers — APIs, databases, authentication — in languages like Node.js, Python, Java or PHP.

> Status codes to know: «200» OK, «301» moved, «404» not found, «500» server error.`,
      },
      {
        title: "HTML document structure",
        minutes: 15,
        body: md`~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, Journify!</h1>
    <p>This is my first web page.</p>
  </body>
</html>
~~~
- «<!DOCTYPE html>» — tells the browser to use modern HTML5.
- «<head>» — metadata: title, character set, links to CSS.
- «<body>» — everything visible on the page.
- The **viewport** meta tag makes pages work properly on phones.

### Elements and attributes
An **element** has an opening tag, content and a closing tag: «<p>Text</p>». **Attributes** add information: «<html lang="en">». Some elements are self-closing: «<br>», «<img>», «<meta>».`,
      },
      {
        title: "Text, links and images",
        minutes: 15,
        body: md`~~~html
<h1>Main heading</h1>          <!-- one per page -->
<h2>Section heading</h2>       <!-- h1 → h6 in order -->
<p>A paragraph with <strong>important</strong> and <em>emphasised</em> text.</p>
<p>Line one<br>Line two</p>
<hr>

<a href="https://journify.tech">Visit Journify</a>
<a href="/services">Relative link</a>
<a href="https://example.com" target="_blank" rel="noopener">Opens in new tab</a>
<a href="mailto:hello@example.com">Email us</a>

<img src="logo.png" alt="Journify logo" width="120">
~~~

### Accessibility starts here
- Every «<img>» needs an «alt» text describing it (or «alt=""» if purely decorative).
- Use headings in order — screen-reader users navigate by them.
- Link text should make sense on its own: "View pricing", not "click here".`,
      },
    ],
    quiz: [
      { q: "Which language controls a web page's structure?", options: ["CSS", "HTML", "JavaScript", "SQL"], answer: 1, explain: "HTML defines structure and content." },
      { q: "What does the HTTP status 404 mean?", options: ["OK", "Server error", "Not found", "Redirect"], answer: 2, explain: "The requested resource doesn't exist." },
      { q: "Where do the page title and meta tags go?", options: ["<body>", "<head>", "<footer>", "<title> only"], answer: 1, explain: "Metadata belongs in <head>." },
      { q: "Which attribute provides alternative text for an image?", options: ["title", "src", "alt", "desc"], answer: 2, explain: "alt is read by screen readers and shown if the image fails." },
      { q: "What does DNS do?", options: ["Styles pages", "Translates domain names into IP addresses", "Stores cookies", "Runs JavaScript"], answer: 1, explain: "DNS is the internet's phone book." },
    ],
    challenge: {
      title: "Your first page",
      prompt: md`Build a complete HTML page with a «<title>», an «<h1>» that says «Hello, Journify!», a paragraph «<p>» about yourself, and a link «<a>» to «https://journify.tech».`,
      starter: md`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
  </head>
  <body>

  </body>
</html>`,
      rules: [
        { re: /<!DOCTYPE\s+html>/i, msg: "Start with <!DOCTYPE html>" },
        { re: /<title>[^<]+<\/title>/i, msg: "Add a <title> inside <head>" },
        { re: /<h1>\s*Hello, Journify!\s*<\/h1>/i, msg: "Add <h1>Hello, Journify!</h1>" },
        { re: /<p>[^<]{5,}/i, msg: "Add a paragraph <p> with some text" },
        { re: /<a\s+[^>]*href\s*=\s*["']https:\/\/journify\.tech\/?["'][^>]*>/i, msg: 'Add a link <a href="https://journify.tech">' },
      ],
      solution: md`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>About me</title>
  </head>
  <body>
    <h1>Hello, Journify!</h1>
    <p>I am a CSE student learning web development.</p>
    <a href="https://journify.tech">Visit Journify</a>
  </body>
</html>`,
    },
  },
  {
    id: "web2",
    title: "HTML Lists, Tables, Forms & Semantics",
    summary: "Structure content properly and collect user input.",
    lessons: [
      {
        title: "Lists and tables",
        minutes: 15,
        body: md`### Lists
~~~html
<ul>                      <!-- unordered (bullets) -->
  <li>HTML</li>
  <li>CSS</li>
</ul>

<ol>                      <!-- ordered (numbers) -->
  <li>Learn</li>
  <li>Build</li>
  <li>Deploy</li>
</ol>
~~~

### Tables — for tabular data only
~~~html
<table>
  <caption>Semester results</caption>
  <thead>
    <tr><th>Subject</th><th>Marks</th></tr>
  </thead>
  <tbody>
    <tr><td>DBMS</td><td>91</td></tr>
    <tr><td>Networks</td><td>84</td></tr>
  </tbody>
</table>
~~~
«<th>» is a header cell, «<td>» a data cell, «<tr>» a row. Use «colspan»/«rowspan» to merge cells. Never use tables for page layout — that's CSS's job.`,
      },
      {
        title: "Forms",
        minutes: 15,
        body: md`~~~html
<form action="/register" method="post">
  <label for="name">Full name</label>
  <input id="name" name="name" type="text" required>

  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>

  <label for="dept">Department</label>
  <select id="dept" name="dept">
    <option>CSE</option>
    <option>ECE</option>
  </select>

  <fieldset>
    <legend>Year</legend>
    <label><input type="radio" name="year" value="3"> 3rd</label>
    <label><input type="radio" name="year" value="4"> 4th</label>
  </fieldset>

  <label><input type="checkbox" name="terms" required> I agree</label>
  <textarea name="message" rows="4"></textarea>
  <button type="submit">Register</button>
</form>
~~~
Useful input types: «email», «tel», «number», «date», «password», «url», «file». Attributes like «required», «min», «max» and «pattern» give free browser validation.

> Every input needs a «<label>» connected with «for»/«id» — it's essential for accessibility and makes the label clickable.`,
      },
      {
        title: "Semantic HTML",
        minutes: 15,
        body: md`Semantic elements describe their **meaning**, not just their look.
~~~html
<header>
  <nav>
    <a href="/">Home</a> <a href="/learn">Courses</a>
  </nav>
</header>

<main>
  <article>
    <h1>Learn Java for free</h1>
    <section>
      <h2>Syllabus</h2>
      ...
    </section>
  </article>
  <aside>Related courses</aside>
</main>

<footer>© 2026 Journify</footer>
~~~

### Why it matters
- **Accessibility** — screen readers can jump straight to «<nav>» or «<main>».
- **SEO** — search engines understand your content better.
- **Readability** — «<nav>» is clearer than «<div class="nav">».

Use «<div>» and «<span>» only when no semantic element fits.`,
      },
    ],
    quiz: [
      { q: "Which tag creates a numbered list?", options: ["<ul>", "<ol>", "<li>", "<dl>"], answer: 1, explain: "<ol> is an ordered list." },
      { q: "Which element is a table header cell?", options: ["<td>", "<th>", "<thead> only", "<tr>"], answer: 1, explain: "<th> marks header cells." },
      { q: "How is a <label> connected to an <input>?", options: ["Same class", "label for = input id", "Same name", "It's automatic"], answer: 1, explain: "for/id pairing links them." },
      { q: "Which element should wrap the main navigation links?", options: ["<div>", "<nav>", "<menu>", "<links>"], answer: 1, explain: "<nav> is the semantic navigation element." },
      { q: "Which input type shows an email keyboard and validates format?", options: ["text", "email", "mail", "string"], answer: 1, explain: "type=\"email\"." },
    ],
    challenge: {
      title: "Registration form",
      prompt: md`Create a «<form>» with a **labelled** name input («type="text"») and a **labelled** email input («type="email"»), both «required», plus a «<button type="submit">». Use «for» and «id» to connect each label to its input.`,
      starter: md`<form>

</form>`,
      rules: [
        { re: /<form[^>]*>/i, msg: "Use a <form> element" },
        { re: /<label\s+[^>]*for\s*=\s*["'](\w+)["'][\s\S]*<input[^>]*id\s*=\s*["']\1["'][^>]*type\s*=\s*["']text["']|<label\s+[^>]*for\s*=\s*["'](\w+)["'][\s\S]*<input[^>]*type\s*=\s*["']text["'][^>]*id\s*=\s*["']\2["']/i, msg: 'Label a text input: <label for="name"> + <input id="name" type="text">' },
        { re: /<input[^>]*type\s*=\s*["']email["']/i, msg: 'Add an <input type="email">' },
        { re: /<label\s+[^>]*for\s*=\s*["']email["']/i, msg: 'Label it with <label for="email">' },
        { re: /<input[^>]*required[\s\S]*<input[^>]*required/i, msg: "Mark both inputs as required" },
        { re: /<button[^>]*type\s*=\s*["']submit["']/i, msg: 'Add <button type="submit">' },
      ],
      solution: md`<form>
  <label for="name">Full name</label>
  <input id="name" name="name" type="text" required>

  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>

  <button type="submit">Register</button>
</form>`,
    },
  },
  {
    id: "web3",
    title: "CSS Fundamentals",
    summary: "Selectors, colours, typography and the box model.",
    lessons: [
      {
        title: "Adding CSS and selectors",
        minutes: 15,
        body: md`### Three ways to add CSS
~~~html
<link rel="stylesheet" href="styles.css">       <!-- external file (best) -->
<style> p { color: navy; } </style>             <!-- internal -->
<p style="color: navy">Inline</p>               <!-- inline (avoid) -->
~~~

### Rule anatomy
~~~css
selector {
  property: value;
}
~~~

### Selectors
~~~css
p { }                 /* element */
.card { }             /* class — reusable */
#hero { }             /* id — unique */
nav a { }             /* descendant */
.btn:hover { }        /* pseudo-class */
input[type="email"] { }  /* attribute */
h1, h2 { }            /* group */
~~~

### Specificity and the cascade
When rules conflict: inline > id > class > element. If equal, the **later** rule wins. Prefer classes to keep specificity low and predictable.`,
      },
      {
        title: "Colours, fonts and text",
        minutes: 15,
        body: md`~~~css
body {
  font-family: "Inter", Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #16131f;
  background-color: #f7f3ec;
}

h1 {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

a {
  color: rgb(109, 40, 217);
  text-decoration: none;
}
a:hover { text-decoration: underline; }
~~~

### Colour formats
Names («red»), hex («#6d28d9»), «rgb(109 40 217)», «rgba(0, 0, 0, 0.5)», «hsl(262 69% 50%)».

### Units
«px» fixed, «rem» relative to the root font size (great for accessibility), «em» relative to the parent, «%», «vw»/«vh» relative to the viewport.

> Check contrast: body text needs a contrast ratio of at least 4.5:1 with its background.`,
      },
      {
        title: "The box model",
        minutes: 15,
        body: md`Every element is a box made of **content → padding → border → margin**.
~~~css
.card {
  width: 300px;
  padding: 24px;              /* space inside the border */
  border: 2px solid #e6dfd2;
  margin: 16px auto;          /* space outside; auto centres horizontally */
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
~~~
By default «width» sets only the content, so the card above is actually 352px wide. Fix that globally:
~~~css
*, *::before, *::after {
  box-sizing: border-box;     /* width now includes padding and border */
}
~~~

### Shorthand
«padding: 10px 20px;» → top/bottom 10, left/right 20.
«margin: 0 auto 16px;» → top 0, sides auto, bottom 16.`,
      },
    ],
    quiz: [
      { q: "Which selector targets elements with class=\"card\"?", options: ["#card", ".card", "card", "*card"], answer: 1, explain: "A dot selects by class." },
      { q: "Which has higher specificity?", options: ["p", ".intro", "#hero", "All equal"], answer: 2, explain: "ID selectors beat classes and elements." },
      { q: "In the box model, what is between the content and the border?", options: ["Margin", "Padding", "Outline", "Gap"], answer: 1, explain: "Padding is inside the border." },
      { q: "What does box-sizing: border-box do?", options: ["Adds a border", "Makes width include padding and border", "Removes margins", "Centres the box"], answer: 1, explain: "Sizes become easier to reason about." },
      { q: "Which unit is relative to the root font size?", options: ["px", "em", "rem", "vh"], answer: 2, explain: "rem = root em." },
    ],
    challenge: {
      title: "Style a card",
      prompt: md`Inside the «<style>» tag, style the «.card» class with: **padding**, a **border**, a **border-radius**, and a **max-width** with «margin: 0 auto» to centre it. Give «h2» a **color**.`,
      starter: md`<style>

</style>

<div class="card">
  <h2>Java Programming</h2>
  <p>12 hours · Free · Certificate</p>
</div>`,
      rules: [
        { re: /\.card\s*\{[^}]*padding\s*:/i, msg: "Give .card some padding" },
        { re: /\.card\s*\{[^}]*border\s*:/i, msg: "Give .card a border" },
        { re: /\.card\s*\{[^}]*border-radius\s*:/i, msg: "Round the corners with border-radius" },
        { re: /\.card\s*\{[^}]*max-width\s*:/i, msg: "Set a max-width on .card" },
        { re: /\.card\s*\{[^}]*margin\s*:\s*0\s+auto/i, msg: "Centre it with margin: 0 auto" },
        { re: /h2\s*\{[^}]*color\s*:/i, msg: "Give h2 a color" },
      ],
      solution: md`<style>
  .card {
    max-width: 360px;
    margin: 0 auto;
    padding: 24px;
    border: 2px solid #e6dfd2;
    border-radius: 16px;
    font-family: Arial, sans-serif;
  }
  h2 {
    color: #6d28d9;
  }
</style>

<div class="card">
  <h2>Java Programming</h2>
  <p>12 hours · Free · Certificate</p>
</div>`,
    },
  },
  {
    id: "web4",
    title: "CSS Layout: Flexbox & Grid",
    summary: "Display, positioning and modern layout systems.",
    lessons: [
      {
        title: "Display and position",
        minutes: 15,
        body: md`### display
- «block» — starts on a new line, takes full width («div», «p», «h1»)
- «inline» — flows within text, ignores width/height («span», «a»)
- «inline-block» — inline but respects width/height
- «none» — removed from the page
- «flex» / «grid» — modern layout containers

### position
~~~css
.badge   { position: relative; top: -2px; }      /* nudged from normal place */
.tooltip { position: absolute; top: 100%; }      /* relative to nearest positioned ancestor */
.navbar  { position: sticky; top: 0; }           /* sticks while scrolling */
.chat    { position: fixed; bottom: 20px; right: 20px; }  /* relative to the viewport */
~~~
«z-index» controls which positioned element appears on top.`,
      },
      {
        title: "Flexbox",
        minutes: 15,
        body: md`Flexbox lays items out in **one direction** — a row or a column.
~~~css
.navbar {
  display: flex;
  justify-content: space-between;   /* main axis: start | center | space-between | space-around */
  align-items: center;              /* cross axis */
  gap: 16px;
}

.cards {
  display: flex;
  flex-wrap: wrap;                  /* allow multiple lines */
  gap: 24px;
}
.cards > .card {
  flex: 1 1 280px;                  /* grow, shrink, base width */
}
~~~

### Perfect centring
~~~css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
~~~
«flex-direction: column» switches the main axis to vertical.`,
      },
      {
        title: "CSS Grid",
        minutes: 15,
        body: md`Grid lays items out in **two dimensions** — rows and columns.
~~~css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* 3 equal columns */
  gap: 20px;
}

/* responsive without media queries */
.courses {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}
~~~
«fr» means a fraction of the free space.

### Page layout with named areas
~~~css
.page {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
header { grid-area: header; }
aside  { grid-area: sidebar; }
main   { grid-area: main; }
footer { grid-area: footer; }
~~~
> Use **Flexbox** for components in one direction (nav bars, buttons) and **Grid** for page layouts and card galleries.`,
      },
    ],
    quiz: [
      { q: "Which property makes an element a flex container?", options: ["flex: 1", "display: flex", "position: flex", "float: flex"], answer: 1, explain: "display: flex creates a flex container." },
      { q: "In a row flex container, which property aligns items horizontally?", options: ["align-items", "justify-content", "text-align", "vertical-align"], answer: 1, explain: "justify-content works on the main axis." },
      { q: "What does «grid-template-columns: repeat(3, 1fr)» create?", options: ["3 rows", "3 equal columns", "1 column 3 times wider", "A 3×3 grid"], answer: 1, explain: "Three columns sharing space equally." },
      { q: "Which position keeps an element fixed to the viewport while scrolling?", options: ["relative", "absolute", "fixed", "static"], answer: 2, explain: "fixed is relative to the viewport." },
      { q: "When is Grid usually a better choice than Flexbox?", options: ["Single-row nav bars", "Two-dimensional layouts", "Centring text", "Never"], answer: 1, explain: "Grid handles rows and columns together." },
    ],
    challenge: {
      title: "Course card grid",
      prompt: md`Make «.grid» a **CSS Grid** with **3 equal columns** («repeat(3, 1fr)») and a **gap**. Make «.nav» a **flex** container with «justify-content: space-between» and «align-items: center».`,
      starter: md`<style>
  .card { padding: 16px; border: 1px solid #ccc; border-radius: 12px; }
</style>

<nav class="nav">
  <strong>Journify</strong>
  <a href="#">Courses</a>
</nav>

<div class="grid">
  <div class="card">Java</div>
  <div class="card">Python</div>
  <div class="card">SQL</div>
</div>`,
      rules: [
        { re: /\.grid\s*\{[^}]*display\s*:\s*grid/i, msg: "Set .grid { display: grid }" },
        { re: /\.grid\s*\{[^}]*grid-template-columns\s*:\s*repeat\s*\(\s*3\s*,\s*1fr\s*\)/i, msg: "Use grid-template-columns: repeat(3, 1fr)" },
        { re: /\.grid\s*\{[^}]*gap\s*:/i, msg: "Add a gap to .grid" },
        { re: /\.nav\s*\{[^}]*display\s*:\s*flex/i, msg: "Set .nav { display: flex }" },
        { re: /\.nav\s*\{[^}]*justify-content\s*:\s*space-between/i, msg: "justify-content: space-between" },
        { re: /\.nav\s*\{[^}]*align-items\s*:\s*center/i, msg: "align-items: center" },
      ],
      solution: md`<style>
  .card { padding: 16px; border: 1px solid #ccc; border-radius: 12px; }
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
</style>

<nav class="nav">
  <strong>Journify</strong>
  <a href="#">Courses</a>
</nav>

<div class="grid">
  <div class="card">Java</div>
  <div class="card">Python</div>
  <div class="card">SQL</div>
</div>`,
    },
  },
  {
    id: "web5",
    title: "Responsive & Accessible Design",
    summary: "Media queries, mobile-first CSS and building for everyone.",
    lessons: [
      {
        title: "Media queries and mobile-first",
        minutes: 15,
        body: md`Over 70% of Indian web traffic is on phones — design for small screens **first**, then enhance.
~~~css
/* base: mobile */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* tablets and up */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* laptops and up */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
~~~
Remember the viewport meta tag, or phones will render a zoomed-out desktop page:
~~~html
<meta name="viewport" content="width=device-width, initial-scale=1">
~~~`,
      },
      {
        title: "Fluid layouts, images and typography",
        minutes: 15,
        body: md`~~~css
img {
  max-width: 100%;      /* never overflow the container */
  height: auto;
}

.container {
  width: min(1100px, 100% - 32px);   /* max 1100px with 16px gutters */
  margin-inline: auto;
}

h1 {
  font-size: clamp(2rem, 5vw, 4rem); /* grows with the screen, within limits */
}
~~~

### Responsive images
~~~html
<img src="hero-800.jpg"
     srcset="hero-400.jpg 400w, hero-800.jpg 800w, hero-1600.jpg 1600w"
     sizes="(max-width: 600px) 100vw, 50vw"
     alt="Students coding together" loading="lazy">
~~~
The browser downloads the smallest image that looks sharp — faster pages on mobile data.

> Make tap targets at least **44×44px** and avoid horizontal scrolling at 320px width.`,
      },
      {
        title: "Accessibility essentials",
        minutes: 15,
        body: md`Accessible sites work for people using screen readers, keyboards, magnifiers or voice control — and they rank better in search.

### Checklist
- Use **semantic HTML** («button» for actions, «a» for navigation).
- Every image has meaningful «alt» text.
- Every form field has a «label».
- Text contrast of at least **4.5:1**.
- Everything works with the **keyboard** — try Tab, Shift+Tab, Enter and Space.
- Never remove focus outlines without a visible replacement:
~~~css
:focus-visible {
  outline: 3px solid #6d28d9;
  outline-offset: 3px;
}
~~~
- Respect users who prefer less motion:
~~~css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
~~~
- Use ARIA only when HTML can't express something: «aria-label», «aria-expanded», «aria-live».

Test with the **Lighthouse** tab in Chrome DevTools.`,
      },
    ],
    quiz: [
      { q: "What does mobile-first CSS mean?", options: ["Only support phones", "Write base styles for small screens and add min-width media queries for larger ones", "Use max-width queries only", "Hide content on mobile"], answer: 1, explain: "Start small and enhance upwards." },
      { q: "Which rule stops images overflowing their container?", options: ["width: 100vw", "max-width: 100%", "overflow: hidden on body", "display: inline"], answer: 1, explain: "max-width: 100% lets images shrink." },
      { q: "Which meta tag is essential for responsive pages?", options: ["charset", "viewport", "robots", "description"], answer: 1, explain: "Without it phones render a desktop-width page." },
      { q: "What's the minimum contrast ratio for normal body text (WCAG AA)?", options: ["2:1", "3:1", "4.5:1", "10:1"], answer: 2, explain: "4.5:1 for normal text." },
      { q: "Which element should be used for a clickable action that isn't navigation?", options: ["<div onclick>", "<a href=\"#\">", "<button>", "<span>"], answer: 2, explain: "Buttons are focusable and keyboard-accessible by default." },
    ],
    challenge: {
      title: "Responsive grid",
      prompt: md`Make «.grid» show **1 column** by default, **2 columns** from «min-width: 768px» and **3 columns** from «min-width: 1024px» using **media queries**. Also make images responsive with «max-width: 100%».`,
      starter: md`<style>

</style>

<div class="grid">
  <div>One</div><div>Two</div><div>Three</div>
</div>`,
      rules: [
        { re: /\.grid\s*\{[^}]*display\s*:\s*grid/i, msg: "Set .grid to display: grid" },
        { re: /\.grid\s*\{[^}]*grid-template-columns\s*:\s*(1fr|repeat\s*\(\s*1\s*,\s*1fr\s*\))/i, msg: "Start with one column (grid-template-columns: 1fr)" },
        { re: /@media\s*\(\s*min-width\s*:\s*768px\s*\)\s*\{[^@]*repeat\s*\(\s*2\s*,\s*1fr\s*\)/i, msg: "@media (min-width: 768px) → repeat(2, 1fr)" },
        { re: /@media\s*\(\s*min-width\s*:\s*1024px\s*\)\s*\{[^@]*repeat\s*\(\s*3\s*,\s*1fr\s*\)/i, msg: "@media (min-width: 1024px) → repeat(3, 1fr)" },
        { re: /img\s*\{[^}]*max-width\s*:\s*100%/i, msg: "img { max-width: 100% }" },
      ],
      solution: md`<style>
  img { max-width: 100%; height: auto; }
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
  @media (min-width: 768px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 1024px) {
    .grid { grid-template-columns: repeat(3, 1fr); }
  }
</style>

<div class="grid">
  <div>One</div><div>Two</div><div>Three</div>
</div>`,
    },
  },
  {
    id: "web6",
    title: "JavaScript Basics",
    summary: "Variables, types, operators, conditions and loops.",
    lessons: [
      {
        title: "Variables and types",
        minutes: 15,
        body: md`Add JavaScript to a page with a script tag, usually at the end of «<body>» or with «defer»:
~~~html
<script src="app.js" defer></script>
~~~

~~~js
const name = "Asha";      // can't be reassigned — use by default
let score = 90;           // can be reassigned
score = 95;
// var is the old way — avoid it

console.log(name, score); // open DevTools → Console to see output
~~~

### Types
- «string» — «"hi"», «'hi'», «§hi $[name]§» (template literal)
- «number» — «42», «3.14» (one type for all numbers)
- «boolean» — «true», «false»
- «undefined» — declared but no value
- «null» — intentionally empty
- «object», «array», «function» — reference types
~~~js
typeof 42;        // "number"
typeof "hi";      // "string"
~~~`,
      },
      {
        title: "Operators and conditions",
        minutes: 15,
        body: md`### Equality — always use ===
~~~js
5 == "5";    // true  (type coercion — confusing)
5 === "5";   // false (strict — compares type too)
~~~

### Conditions
~~~js
const marks = 72;
if (marks >= 90) {
  console.log("A");
} else if (marks >= 75) {
  console.log("B");
} else {
  console.log("C");
}

const result = marks >= 40 ? "Pass" : "Fail";
~~~

### Truthy, falsy and handy operators
Falsy values: «false», «0», «""», «null», «undefined», «NaN».
~~~js
const user = null;
const nameToShow = user?.name ?? "Guest";   // optional chaining + nullish coalescing
~~~`,
      },
      {
        title: "Loops",
        minutes: 15,
        body: md`~~~js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

let n = 3;
while (n > 0) {
  console.log(n);
  n--;
}

const courses = ["HTML", "CSS", "JS"];
for (const c of courses) {      // values of an array
  console.log(c);
}

const user = { name: "Ravi", dept: "IT" };
for (const key in user) {       // keys of an object
  console.log(key, user[key]);
}
~~~
«break» and «continue» work like in other languages.

> In modern JavaScript you'll often replace loops with array methods like «forEach», «map» and «filter» — coming next module.`,
      },
    ],
    quiz: [
      { q: "Which keyword declares a variable that can't be reassigned?", options: ["var", "let", "const", "static"], answer: 2, explain: "const prevents reassignment." },
      { q: "What is «5 === \"5\"»?", options: ["true", "false", "TypeError", "undefined"], answer: 1, explain: "Strict equality compares types too." },
      { q: "What does «null ?? \"Guest\"» return?", options: ["null", "\"Guest\"", "false", "undefined"], answer: 1, explain: "?? returns the right side when the left is null or undefined." },
      { q: "Which loop iterates over the values of an array?", options: ["for...in", "for...of", "while...in", "each"], answer: 1, explain: "for...of gives values; for...in gives keys." },
      { q: "Where can you see console.log output?", options: ["On the page", "In the browser DevTools console", "In the URL bar", "Nowhere"], answer: 1, explain: "Open DevTools (F12) → Console." },
    ],
    challenge: {
      title: "FizzBuzz",
      prompt: md`In the «<script>», loop from **1 to 15** with a «for» loop and «let». For each number, log «"FizzBuzz"» if divisible by 3 **and** 5, «"Fizz"» if by 3, «"Buzz"» if by 5, otherwise the number. Use «===» for comparisons.`,
      starter: md`<script>

</script>`,
      rules: [
        { re: /for\s*\(\s*let\s+(\w+)\s*=\s*1\s*;\s*\1\s*<=\s*15\s*;/, msg: "Loop with for (let i = 1; i <= 15; i++)" },
        { re: /%\s*15\s*===\s*0|%\s*3\s*===\s*0\s*&&\s*\w+\s*%\s*5\s*===\s*0/, msg: "Check divisibility by both 3 and 5 first (i % 15 === 0)" },
        { re: /%\s*3\s*===\s*0/, msg: "Check i % 3 === 0" },
        { re: /%\s*5\s*===\s*0/, msg: "Check i % 5 === 0" },
        { re: /["']FizzBuzz["']/, msg: 'Log "FizzBuzz"' },
        { re: /console\.log\s*\(/, msg: "Use console.log" },
      ],
      solution: md`<script>
  for (let i = 1; i <= 15; i++) {
    if (i % 15 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
</script>`,
    },
  },
  {
    id: "web7",
    title: "Functions, Arrays & Objects",
    summary: "Reusable functions and working with data structures.",
    lessons: [
      {
        title: "Functions",
        minutes: 15,
        body: md`~~~js
// function declaration
function add(a, b) {
  return a + b;
}

// arrow function
const square = (x) => x * x;
const greet = (name = "friend") => §Hello, $[name]!§;

// functions are values
const operations = { add, square };
console.log(operations.add(2, 3));   // 5
~~~

### Scope and closures
Variables declared with «let»/«const» are **block-scoped**. A function remembers the variables around it even after the outer function finishes — a **closure**:
~~~js
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const next = makeCounter();
next(); // 1
next(); // 2
~~~`,
      },
      {
        title: "Arrays and array methods",
        minutes: 15,
        body: md`~~~js
const marks = [78, 92, 65, 88];
marks.push(70);          // add to end
marks.length;            // 5
marks.includes(92);      // true
marks.indexOf(65);       // 2
~~~

### Transforming data without loops
~~~js
const doubled = marks.map((m) => m * 2);
const passed  = marks.filter((m) => m >= 75);
const total   = marks.reduce((sum, m) => sum + m, 0);
const topper  = marks.find((m) => m > 90);
const allPass = marks.every((m) => m >= 40);
marks.forEach((m, i) => console.log(i, m));

const sorted = [...marks].sort((a, b) => b - a);   // copy, then sort descending
~~~
> «sort()» without a compare function sorts as **strings**: «[10, 9, 1].sort()» → «[1, 10, 9]». Always pass «(a, b) => a - b» for numbers.`,
      },
      {
        title: "Objects and JSON",
        minutes: 15,
        body: md`~~~js
const student = {
  name: "Divya",
  dept: "CSE",
  marks: [91, 88],
  greet() {
    return §Hi, I'm $[this.name]§;
  },
};

student.name;              // dot notation
student["dept"];           // bracket notation
student.cgpa = 9.1;        // add a property
delete student.dept;

Object.keys(student);      // ['name', 'marks', 'greet', 'cgpa']
Object.entries(student);   // [['name', 'Divya'], ...]
~~~

### Arrays of objects — the shape of most API data
~~~js
const students = [
  { name: "Asha", cgpa: 8.9 },
  { name: "Ravi", cgpa: 7.4 },
];
const names = students.filter((s) => s.cgpa > 8).map((s) => s.name);
~~~

### JSON
~~~js
const text = JSON.stringify(students);   // object → string (to send or store)
const data = JSON.parse(text);           // string → object
~~~`,
      },
    ],
    quiz: [
      { q: "What does «[1, 2, 3].map(x => x * 10)» return?", options: ["[10, 20, 30]", "60", "[1, 2, 3]", "[10]"], answer: 0, explain: "map transforms every element." },
      { q: "Which method returns only the elements that pass a test?", options: ["map", "filter", "reduce", "forEach"], answer: 1, explain: "filter keeps matching elements." },
      { q: "What does «[1, 2, 3].reduce((s, x) => s + x, 0)» return?", options: ["[1, 2, 3]", "6", "0", "123"], answer: 1, explain: "reduce accumulates a sum." },
      { q: "What does JSON.stringify do?", options: ["Parses JSON text", "Converts an object to a JSON string", "Validates JSON", "Sends JSON to a server"], answer: 1, explain: "It serialises values to text." },
      { q: "What is a closure?", options: ["A function that remembers variables from where it was created", "A finished loop", "A closed browser tab", "A private class"], answer: 0, explain: "Closures capture their surrounding scope." },
    ],
    challenge: {
      title: "Student data",
      prompt: md`Given the «students» array, use **filter** to keep students with «cgpa >= 8», **map** to get their names, and **reduce** to compute the **average cgpa** of everyone. Log both results.`,
      starter: md`<script>
  const students = [
    { name: "Asha", cgpa: 8.9 },
    { name: "Ravi", cgpa: 7.4 },
    { name: "Divya", cgpa: 9.2 },
  ];

</script>`,
      rules: [
        { re: /students\s*\.filter\s*\(\s*\(?\s*(\w+)\s*\)?\s*=>\s*\1\.cgpa\s*>=\s*8\s*\)/, msg: "students.filter((s) => s.cgpa >= 8)" },
        { re: /\.map\s*\(\s*\(?\s*(\w+)\s*\)?\s*=>\s*\1\.name\s*\)/, msg: ".map((s) => s.name)" },
        { re: /\.reduce\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>\s*\w+\s*\+\s*\w+\.cgpa\s*,\s*0\s*\)/, msg: "students.reduce((sum, s) => sum + s.cgpa, 0)" },
        { re: /\/\s*students\.length/, msg: "Divide by students.length for the average" },
        { re: /console\.log\s*\([\s\S]*console\.log\s*\(/, msg: "Log both results" },
      ],
      solution: md`<script>
  const students = [
    { name: "Asha", cgpa: 8.9 },
    { name: "Ravi", cgpa: 7.4 },
    { name: "Divya", cgpa: 9.2 },
  ];

  const toppers = students.filter((s) => s.cgpa >= 8).map((s) => s.name);
  const average = students.reduce((sum, s) => sum + s.cgpa, 0) / students.length;

  console.log(toppers);
  console.log(average.toFixed(2));
</script>`,
    },
  },
  {
    id: "web8",
    title: "The DOM & Events",
    summary: "Select elements, change the page and respond to users.",
    lessons: [
      {
        title: "Selecting and changing elements",
        minutes: 15,
        body: md`The **DOM** (Document Object Model) is the browser's live tree of your HTML. JavaScript can read and change it.
~~~js
const title = document.querySelector("h1");          // first match
const cards = document.querySelectorAll(".card");    // all matches
const form  = document.getElementById("signup");

title.textContent = "Welcome back!";
title.style.color = "#6d28d9";
title.classList.add("highlight");
title.classList.toggle("hidden");
title.setAttribute("data-id", "42");
~~~

### Creating elements
~~~js
const li = document.createElement("li");
li.textContent = "New course: SQL";
document.querySelector("ul").append(li);
li.remove();
~~~
> Prefer «textContent» over «innerHTML» for user-provided text — «innerHTML» can run injected HTML/scripts (XSS).`,
      },
      {
        title: "Events",
        minutes: 15,
        body: md`~~~js
const btn = document.querySelector("#like");
let likes = 0;

btn.addEventListener("click", () => {
  likes++;
  btn.textContent = §❤ $[likes]§;
});
~~~

### Common events
«click», «input», «change», «submit», «keydown», «mouseenter», «scroll», «DOMContentLoaded».

### The event object
~~~js
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});
~~~

### Event delegation
Attach one listener to a parent instead of many to children:
~~~js
document.querySelector("#list").addEventListener("click", (e) => {
  if (e.target.matches("button.delete")) {
    e.target.closest("li").remove();
  }
});
~~~`,
      },
      {
        title: "Form handling and validation",
        minutes: 15,
        body: md`~~~html
<form id="signup" novalidate>
  <label for="email">Email</label>
  <input id="email" type="email" required>
  <p id="error" role="alert"></p>
  <button>Sign up</button>
</form>
~~~
~~~js
const form = document.querySelector("#signup");
const email = document.querySelector("#email");
const error = document.querySelector("#error");

form.addEventListener("submit", (event) => {
  event.preventDefault();                    // stop the page reloading
  const value = email.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error.textContent = "Please enter a valid email.";
    email.focus();
    return;
  }
  error.textContent = "";
  form.reset();
  alert("Thanks for signing up!");
});
~~~
«role="alert"» makes screen readers announce the error. Client-side validation improves UX, but **always validate again on the server**.`,
      },
    ],
    quiz: [
      { q: "Which method selects the first element matching a CSS selector?", options: ["getElementsByClassName", "querySelector", "querySelectorAll", "find"], answer: 1, explain: "querySelector returns the first match." },
      { q: "Why prefer textContent over innerHTML for user input?", options: ["It's shorter", "innerHTML can execute injected HTML (XSS)", "textContent supports styling", "No reason"], answer: 1, explain: "textContent treats input as plain text." },
      { q: "What does event.preventDefault() do on form submit?", options: ["Deletes the form", "Stops the browser's default page reload", "Validates the form", "Submits twice"], answer: 1, explain: "It cancels the default action." },
      { q: "Which method attaches an event handler?", options: ["onEvent()", "addEventListener()", "listen()", "attach()"], answer: 1, explain: "element.addEventListener(type, handler)." },
      { q: "What is event delegation?", options: ["Removing events", "Handling child events with one listener on a parent", "Firing events manually", "Using inline onclick"], answer: 1, explain: "Events bubble up to ancestors." },
    ],
    challenge: {
      title: "Click counter",
      prompt: md`Select the button with «querySelector», add a **click** event listener with «addEventListener», increase a counter, and update the «#count» element's «textContent». Try it in the preview!`,
      starter: md`<button id="add">Add one</button>
<p>Count: <span id="count">0</span></p>

<script>

</script>`,
      rules: [
        { re: /document\.querySelector\s*\(\s*["']#add["']\s*\)|getElementById\s*\(\s*["']add["']\s*\)/, msg: 'Select the button: document.querySelector("#add")' },
        { re: /let\s+\w+\s*=\s*0/, msg: "Create a counter with let count = 0" },
        { re: /addEventListener\s*\(\s*["']click["']/, msg: 'Listen for "click" with addEventListener' },
        { re: /\w+\s*\+\+|\+\+\s*\w+|\w+\s*\+=\s*1/, msg: "Increase the counter" },
        { re: /\.textContent\s*=/, msg: "Update the #count element's textContent" },
      ],
      solution: md`<button id="add">Add one</button>
<p>Count: <span id="count">0</span></p>

<script>
  const button = document.querySelector("#add");
  const output = document.querySelector("#count");
  let count = 0;

  button.addEventListener("click", () => {
    count++;
    output.textContent = count;
  });
</script>`,
    },
  },
  {
    id: "web9",
    title: "Modern JavaScript (ES6+)",
    summary: "Destructuring, spread, template literals, modules and classes.",
    lessons: [
      {
        title: "Destructuring, spread and rest",
        minutes: 15,
        body: md`### Destructuring
~~~js
const student = { name: "Asha", dept: "CSE", cgpa: 8.9 };
const { name, cgpa } = student;
const { dept: department = "Unknown" } = student;   // rename + default

const [first, second, ...others] = [10, 20, 30, 40];
~~~

### Spread
~~~js
const a = [1, 2];
const b = [...a, 3, 4];                 // copy and extend arrays
const updated = { ...student, cgpa: 9.1 };   // copy object with a change
Math.max(...[4, 9, 2]);                 // 9
~~~

### Rest parameters
~~~js
const sum = (...nums) => nums.reduce((t, n) => t + n, 0);
sum(1, 2, 3);   // 6
~~~

> Spread makes **shallow** copies — nested objects are still shared. Use «structuredClone(obj)» for deep copies.`,
      },
      {
        title: "Template literals and modules",
        minutes: 15,
        body: md`### Template literals
~~~js
const name = "Ravi", course = "Web Development";
const msg = §Hi $[name], welcome to $[course]!§;
const html = §
  <article class="card">
    <h3>$[course]</h3>
  </article>
§;
~~~

### ES modules
~~~js
// math.js
export const PI = 3.14159;
export function area(r) { return PI * r * r; }
export default function greet() { return "hi"; }

// app.js
import greet, { area, PI } from "./math.js";
~~~
~~~html
<script type="module" src="app.js"></script>
~~~
Modules have their own scope and load in strict mode — no more global variable collisions.`,
      },
      {
        title: "Classes",
        minutes: 15,
        body: md`~~~js
class Course {
  #enrolled = 0;                     // private field

  constructor(title, hours) {
    this.title = title;
    this.hours = hours;
  }

  enroll() {
    this.#enrolled++;
    return this;                     // allows chaining
  }

  get summary() {
    return §$[this.title] ($[this.hours] h, $[this.#enrolled] learners)§;
  }

  static compare(a, b) {
    return a.hours - b.hours;
  }
}

class FreeCourse extends Course {
  constructor(title, hours) {
    super(title, hours);
    this.price = 0;
  }
}

const java = new FreeCourse("Java", 12).enroll().enroll();
console.log(java.summary);   // Java (12 h, 2 learners)
~~~`,
      },
    ],
    quiz: [
      { q: "What does «const { a } = { a: 1, b: 2 }» assign?", options: ["a = { a: 1 }", "a = 1", "a = 2", "Error"], answer: 1, explain: "Object destructuring extracts property a." },
      { q: "What is «[...[1, 2], 3]»?", options: ["[[1, 2], 3]", "[1, 2, 3]", "6", "Error"], answer: 1, explain: "Spread expands the inner array." },
      { q: "How do you embed a variable in a template literal?", options: ["{name}", "$name", "${name} inside backticks", "#{name}"], answer: 2, explain: "Template literals use backticks and ${}." },
      { q: "Which keyword calls the parent class constructor?", options: ["this", "super", "parent", "base"], answer: 1, explain: "super(...) inside the subclass constructor." },
      { q: "What does «export default» allow?", options: ["Exporting many values", "Importing the main value without braces", "Private exports", "Nothing"], answer: 1, explain: "import x from './file.js'." },
    ],
    challenge: {
      title: "Course class",
      prompt: md`Create a class «Course» with a «constructor(title, hours)» that sets both properties, and a method «describe()» that returns a **template literal** like «Java — 12 hours». Create an instance with «new» and log «describe()». Then use **object destructuring** to pull «title» out of the instance.`,
      starter: md`<script>

</script>`,
      rules: [
        { re: /class\s+Course\s*\{/, msg: "Define class Course { }" },
        { re: /constructor\s*\(\s*title\s*,\s*hours\s*\)/, msg: "Add constructor(title, hours)" },
        { re: /this\.title\s*=\s*title/, msg: "Set this.title" },
        { re: /this\.hours\s*=\s*hours/, msg: "Set this.hours" },
        { re: /describe\s*\(\s*\)\s*\{[\s\S]*return\s*`[^`]*\$\{\s*this\.title\s*\}/, msg: "describe() returns a template literal using ${this.title}" },
        { re: /new\s+Course\s*\(/, msg: "Create an instance with new Course(...)" },
        { re: /const\s*\{\s*title\s*\}\s*=/, msg: "Destructure: const { title } = ..." },
      ],
      solution: md`<script>
  class Course {
    constructor(title, hours) {
      this.title = title;
      this.hours = hours;
    }

    describe() {
      return §$[this.title] — $[this.hours] hours§;
    }
  }

  const java = new Course("Java", 12);
  console.log(java.describe());

  const { title } = java;
  console.log(title);
</script>`,
    },
  },
  {
    id: "web10",
    title: "Asynchronous JavaScript & APIs",
    summary: "Callbacks, promises, async/await and fetching data.",
    lessons: [
      {
        title: "The event loop and callbacks",
        minutes: 15,
        body: md`JavaScript runs on a **single thread**. Slow work — timers, network requests, file reads — happens in the background, and a callback runs when it's done.
~~~js
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// prints 1, 3, 2
~~~
Even with a 0 ms delay, the callback waits until the current code finishes — that's the **event loop**.

### Callback hell
~~~js
getUser(id, (user) => {
  getCourses(user, (courses) => {
    getMarks(courses[0], (marks) => {
      // deeper and deeper…
    });
  });
});
~~~
Promises and async/await were created to fix this.`,
      },
      {
        title: "Promises and async/await",
        minutes: 15,
        body: md`A **Promise** represents a value that will arrive later: *pending → fulfilled* or *rejected*.
~~~js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

wait(1000)
  .then(() => console.log("1 second later"))
  .catch((err) => console.error(err))
  .finally(() => console.log("done"));
~~~

### async / await — asynchronous code that reads top to bottom
~~~js
async function loadDashboard() {
  try {
    const user = await getUser(7);
    const courses = await getCourses(user.id);
    console.log(courses);
  } catch (err) {
    console.error("Something failed:", err);
  }
}
~~~

### Run things in parallel
~~~js
const [user, notices] = await Promise.all([getUser(7), getNotices()]);
~~~`,
      },
      {
        title: "fetch and REST APIs",
        minutes: 15,
        body: md`~~~js
async function loadUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error(§HTTP $[res.status]§);
  }
  const users = await res.json();
  return users.map((u) => u.name);
}
~~~

### Sending data
~~~js
await fetch("/api/enroll", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ courseId: 1 }),
});
~~~

### REST conventions
- «GET /courses» — list
- «GET /courses/1» — one item
- «POST /courses» — create
- «PUT/PATCH /courses/1» — update
- «DELETE /courses/1» — delete

> «fetch» only rejects on network failure — a 404 or 500 still "succeeds". Always check «res.ok».`,
      },
    ],
    quiz: [
      { q: "What does «console.log(1); setTimeout(() => console.log(2), 0); console.log(3);» print?", options: ["1 2 3", "1 3 2", "2 1 3", "3 2 1"], answer: 1, explain: "The timeout callback waits for the current code to finish." },
      { q: "What are the possible settled states of a Promise?", options: ["started and stopped", "fulfilled or rejected", "true or false", "open or closed"], answer: 1, explain: "A promise resolves or rejects." },
      { q: "Which keyword pauses an async function until a promise settles?", options: ["wait", "await", "then", "yield"], answer: 1, explain: "await waits for the promise." },
      { q: "Does fetch reject when the server returns 404?", options: ["Yes", "No — check res.ok", "Only in Chrome", "Only for POST"], answer: 1, explain: "HTTP errors are still successful responses." },
      { q: "Which HTTP method typically creates a new resource?", options: ["GET", "POST", "DELETE", "HEAD"], answer: 1, explain: "POST creates resources." },
    ],
    challenge: {
      title: "Fetch users",
      prompt: md`Write an **async function** «loadUsers» that uses **fetch** with **await** to get «https://jsonplaceholder.typicode.com/users», checks «res.ok», parses the JSON, and shows each user's name in the «#users» list. Wrap it in **try / catch**. (The preview can load this public test API.)`,
      starter: md`<ul id="users"></ul>

<script>

</script>`,
      rules: [
        { re: /async\s+function\s+loadUsers\s*\(|const\s+loadUsers\s*=\s*async/, msg: "Define async function loadUsers()" },
        { re: /await\s+fetch\s*\(\s*["']https:\/\/jsonplaceholder\.typicode\.com\/users["']/, msg: "await fetch(the users URL)" },
        { re: /\.ok\b/, msg: "Check res.ok" },
        { re: /await\s+\w+\.json\s*\(\s*\)/, msg: "Parse with await res.json()" },
        { re: /try\s*\{[\s\S]*catch\s*\(/, msg: "Wrap it in try / catch" },
        { re: /\.name/, msg: "Use each user's .name" },
        { re: /loadUsers\s*\(\s*\)\s*;?\s*(\n|<\/script>)/, msg: "Call loadUsers()" },
      ],
      solution: md`<ul id="users"></ul>

<script>
  async function loadUsers() {
    const list = document.querySelector("#users");
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("HTTP " + res.status);
      const users = await res.json();
      users.forEach((u) => {
        const li = document.createElement("li");
        li.textContent = u.name;
        list.append(li);
      });
    } catch (err) {
      list.textContent = "Could not load users.";
    }
  }

  loadUsers();
</script>`,
    },
  },
  {
    id: "web11",
    title: "Storage, Debugging & Git",
    summary: "Save data in the browser, debug like a pro and version your code.",
    lessons: [
      {
        title: "localStorage and sessionStorage",
        minutes: 15,
        body: md`Store small amounts of data in the browser — it survives page reloads.
~~~js
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");   // "dark" or null
localStorage.removeItem("theme");

// objects must be stored as JSON strings
const progress = { lesson: 4, completed: [1, 2, 3] };
localStorage.setItem("progress", JSON.stringify(progress));
const saved = JSON.parse(localStorage.getItem("progress") ?? "null");
~~~
- «localStorage» — persists until cleared
- «sessionStorage» — cleared when the tab closes
- Around 5 MB per site; strings only; same-origin only

> Never store passwords or tokens that grant access in localStorage — any script on the page can read it. (This is exactly how Journify's free courses remember your progress — without a backend!)`,
      },
      {
        title: "Debugging with DevTools",
        minutes: 15,
        body: md`Press **F12** (or Ctrl+Shift+I) to open DevTools.
- **Elements** — inspect and live-edit HTML and CSS; see the box model.
- **Console** — errors, «console.log» output; run JavaScript.
- **Sources** — set **breakpoints** and step through code line by line.
- **Network** — every request, its status and timing; simulate slow 3G.
- **Application** — view and clear localStorage, cookies and caches.
- **Lighthouse** — audit performance, accessibility and SEO.

### Better logging
~~~js
console.table([{ name: "Asha", cgpa: 8.9 }, { name: "Ravi", cgpa: 7.4 }]);
console.error("Something broke");
debugger;    // pauses here when DevTools is open
~~~

### Reading errors
«Uncaught TypeError: Cannot read properties of null (reading 'addEventListener') at app.js:12» → the element wasn't found. Check the selector and that the script runs after the HTML loads («defer»).`,
      },
      {
        title: "Git and GitHub basics",
        minutes: 15,
        body: md`**Git** tracks every version of your code. **GitHub** hosts repositories online for backup, collaboration and your portfolio.
~~~bash
git init                         # start tracking a folder
git status                       # what changed?
git add .                        # stage changes
git commit -m "Add course page"  # save a snapshot
git log --oneline                # history

git branch feature-login         # create a branch
git switch feature-login         # move to it
git merge feature-login          # bring changes back

git remote add origin https://github.com/you/portfolio.git
git push -u origin main          # upload
git pull                         # download others' changes
~~~
- Commit small, focused changes with clear messages.
- Add a «.gitignore» for «node_modules», «.env» and build folders.
- Never commit passwords or API keys.

> Recruiters look at GitHub profiles. Push every project you build in this course!`,
      },
    ],
    quiz: [
      { q: "What type of values can localStorage store directly?", options: ["Any object", "Strings", "Numbers only", "Functions"], answer: 1, explain: "Use JSON.stringify for objects." },
      { q: "When is sessionStorage cleared?", options: ["Never", "When the tab is closed", "Every hour", "On page reload"], answer: 1, explain: "It lasts for the tab's session." },
      { q: "Which DevTools panel shows network requests?", options: ["Elements", "Console", "Network", "Sources"], answer: 2, explain: "The Network panel lists every request." },
      { q: "Which command stages all changes in Git?", options: ["git commit", "git add .", "git push", "git stage all"], answer: 1, explain: "git add . stages changes for the next commit." },
      { q: "What should go in .gitignore?", options: ["index.html", "node_modules and secret .env files", "README.md", "All CSS"], answer: 1, explain: "Generated folders and secrets shouldn't be committed." },
    ],
    challenge: {
      title: "Remember the theme",
      prompt: md`When the «#toggle» button is clicked, toggle a «dark» class on «document.body» and **save** the current theme («"dark"» or «"light"») with «localStorage.setItem("theme", ...)». On page load, **read** it with «localStorage.getItem("theme")» and apply the class if it's «"dark"».`,
      starter: md`<style>
  body.dark { background: #16131f; color: #fff; }
</style>

<button id="toggle">Toggle theme</button>
<p>Reload the preview — the theme should stay.</p>

<script>

</script>`,
      rules: [
        { re: /localStorage\.getItem\s*\(\s*["']theme["']\s*\)/, msg: 'Read the saved theme with localStorage.getItem("theme")' },
        { re: /===\s*["']dark["']/, msg: 'Check whether it equals "dark"' },
        { re: /addEventListener\s*\(\s*["']click["']/, msg: "Listen for clicks on the button" },
        { re: /classList\.toggle\s*\(\s*["']dark["']\s*\)/, msg: 'Toggle with document.body.classList.toggle("dark")' },
        { re: /localStorage\.setItem\s*\(\s*["']theme["']/, msg: 'Save with localStorage.setItem("theme", ...)' },
      ],
      solution: md`<style>
  body.dark { background: #16131f; color: #fff; }
</style>

<button id="toggle">Toggle theme</button>
<p>Reload the preview — the theme should stay.</p>

<script>
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  document.querySelector("#toggle").addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
</script>`,
    },
  },
  {
    id: "web12",
    title: "Building & Deploying Real Projects",
    summary: "Frameworks, performance, SEO and putting your site online.",
    lessons: [
      {
        title: "Frameworks and React concepts",
        minutes: 15,
        body: md`As apps grow, updating the DOM by hand gets messy. Frameworks like **React**, **Vue**, **Angular** and **Svelte** let you describe the UI as a function of **state**.
~~~jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
~~~
- **Components** — reusable UI pieces
- **Props** — inputs passed into a component
- **State** — data that changes; React re-renders when it does
- **JSX** — HTML-like syntax inside JavaScript

**Next.js** (which powers journify.tech) adds routing, server rendering and SEO on top of React.

> Learn vanilla HTML, CSS and JavaScript well first — every framework builds on them.`,
      },
      {
        title: "Performance and SEO",
        minutes: 15,
        body: md`### Performance
- Compress images and use modern formats (WebP/AVIF); add «loading="lazy"» below the fold.
- Load scripts with «defer» so they don't block rendering.
- Minify CSS/JS and serve from a **CDN**.
- Measure **Core Web Vitals** in Lighthouse: LCP (loading), INP (responsiveness), CLS (layout shift).

### SEO basics
~~~html
<title>Free Java Course with Certificate | Journify</title>
<meta name="description" content="Learn Java from scratch in 12 hours…">
<link rel="canonical" href="https://journify.tech/learn/java">
<meta property="og:image" content="https://journify.tech/og.png">
~~~
- One clear «<h1>» per page and logical headings
- Descriptive URLs: «/learn/java», not «/page?id=7»
- «sitemap.xml» and «robots.txt»
- Mobile-friendly, fast and accessible pages rank better
- Submit your site to **Google Search Console**`,
      },
      {
        title: "Deploying your site",
        minutes: 15,
        body: md`### Static sites (HTML/CSS/JS)
- **GitHub Pages** — push to a repo, enable Pages in settings
- **Netlify** or **Vercel** — connect your GitHub repo; every push deploys automatically
- Both give free HTTPS and a «.netlify.app» / «.vercel.app» domain

### Custom domain
Buy a domain (e.g. from GoDaddy, Namecheap, Hostinger), then add the DNS records your host gives you — usually an «A» record for the root and a «CNAME» for «www».

### A professional workflow
- Code locally → commit → push to GitHub
- The host builds and deploys automatically
- Preview deployments for every branch or pull request
- Environment variables for API keys (never in the code)

### Portfolio project ideas
- Personal portfolio with projects and contact form
- Weather app using a public API
- Quiz app that saves scores in localStorage
- Responsive landing page for a local business

> Ship something. A live link on your resume beats a certificate alone.`,
      },
    ],
    quiz: [
      { q: "In React, what triggers a component to re-render?", options: ["Calling console.log", "Changing its state or props", "Scrolling", "Nothing"], answer: 1, explain: "UI is a function of state and props." },
      { q: "Which attribute delays loading off-screen images?", options: ["defer", "async", "loading=\"lazy\"", "hidden"], answer: 2, explain: "Native lazy loading." },
      { q: "Which tag tells search engines the preferred URL of a page?", options: ["<meta robots>", "<link rel=\"canonical\">", "<base>", "<title>"], answer: 1, explain: "Canonical links prevent duplicate-content issues." },
      { q: "What does Vercel/Netlify do when you push to GitHub?", options: ["Deletes the repo", "Automatically builds and deploys the site", "Sends an email only", "Nothing"], answer: 1, explain: "Continuous deployment." },
      { q: "Which DNS record usually points www to your host?", options: ["MX", "CNAME", "TXT", "SOA"], answer: 1, explain: "CNAME aliases one name to another." },
    ],
    challenge: {
      title: "SEO-ready landing page",
      prompt: md`Complete the «<head>»: add a «<title>», a «<meta name="description">», a «<link rel="canonical">» and the responsive **viewport** meta tag. In the body, use semantic «<header>», «<main>» with one «<h1>», and «<footer>».`,
      starter: md`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">

</head>
<body>

</body>
</html>`,
      rules: [
        { re: /<title>[^<]+<\/title>/i, msg: "Add a <title>" },
        { re: /<meta\s+name\s*=\s*["']description["']\s+content\s*=\s*["'][^"']{10,}["']/i, msg: 'Add <meta name="description" content="...">' },
        { re: /<link\s+rel\s*=\s*["']canonical["']\s+href\s*=\s*["']https?:\/\/[^"']+["']/i, msg: 'Add <link rel="canonical" href="https://...">' },
        { re: /<meta\s+name\s*=\s*["']viewport["']\s+content\s*=\s*["'][^"']*width=device-width/i, msg: "Add the viewport meta tag" },
        { re: /<header[\s>]/i, msg: "Use a <header>" },
        { re: /<main[\s>][\s\S]*<h1[\s>]/i, msg: "Put an <h1> inside <main>" },
        { re: /<footer[\s>]/i, msg: "Use a <footer>" },
      ],
      solution: md`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Asha Ramesh — Web Developer Portfolio</title>
  <meta name="description" content="Portfolio of Asha Ramesh, a web developer building fast, accessible websites.">
  <link rel="canonical" href="https://asha.dev/">
</head>
<body>
  <header>
    <nav><a href="/">Home</a> <a href="#projects">Projects</a></nav>
  </header>
  <main>
    <h1>Hi, I'm Asha — I build websites.</h1>
    <section id="projects">
      <h2>Projects</h2>
    </section>
  </main>
  <footer>© 2026 Asha Ramesh</footer>
</body>
</html>`,
    },
  },
];

const FINAL_EXAM = [
  { q: "Which language styles a web page?", options: ["HTML", "CSS", "JavaScript", "HTTP"], answer: 1, explain: "CSS handles presentation." },
  { q: "Which element holds the visible content of a page?", options: ["<head>", "<body>", "<meta>", "<html> only"], answer: 1, explain: "Visible content goes in <body>." },
  { q: "Which tag is most appropriate for a site's main navigation?", options: ["<div>", "<nav>", "<section>", "<aside>"], answer: 1, explain: "<nav> is semantic navigation." },
  { q: "Which CSS selector targets id=\"hero\"?", options: [".hero", "#hero", "hero", "*hero"], answer: 1, explain: "# selects by id." },
  { q: "Which value makes width include padding and border?", options: ["content-box", "border-box", "padding-box", "inherit"], answer: 1, explain: "box-sizing: border-box." },
  { q: "Which property centres flex items along the main axis?", options: ["align-items", "justify-content", "text-align", "place-self"], answer: 1, explain: "justify-content controls the main axis." },
  { q: "What does «@media (min-width: 768px)» target?", options: ["Screens narrower than 768px", "Screens 768px and wider", "Only tablets", "Print"], answer: 1, explain: "min-width applies at or above the value." },
  { q: "What is «typeof []» in JavaScript?", options: ["\"array\"", "\"object\"", "\"list\"", "\"undefined\""], answer: 1, explain: "Arrays are objects; use Array.isArray to check." },
  { q: "Which comparison should you normally use in JavaScript?", options: ["==", "===", "=", "!=="], answer: 1, explain: "=== avoids type coercion." },
  { q: "What does «[3, 1, 2].filter(n => n > 1)» return?", options: ["[3, 2]", "[1]", "[3, 1, 2]", "2"], answer: 0, explain: "filter keeps 3 and 2." },
  { q: "Which method attaches a click handler to an element?", options: ["el.onClick()", "el.addEventListener(\"click\", fn)", "el.click(fn) only", "el.listen(\"click\")"], answer: 1, explain: "addEventListener is the standard API." },
  { q: "What does «await» do?", options: ["Delays forever", "Pauses an async function until a promise settles", "Creates a thread", "Cancels a promise"], answer: 1, explain: "await waits for the result." },
  { q: "Why check «res.ok» after fetch?", options: ["fetch doesn't reject on HTTP errors like 404", "It's required syntax", "To parse JSON", "To set headers"], answer: 0, explain: "Only network failures reject." },
  { q: "Where can a website store data that survives page reloads without a server?", options: ["sessionStorage only", "localStorage", "Variables", "The URL only"], answer: 1, explain: "localStorage persists until cleared." },
  { q: "Which command uploads local commits to GitHub?", options: ["git pull", "git push", "git commit", "git fetch"], answer: 1, explain: "git push sends commits to the remote." },
];

export const WEB_COURSE = {
  id: "web",
  slug: "web",
  title: "Web Development",
  topics: "HTML5, CSS3, Flexbox and Grid, Responsive Design, JavaScript, the DOM, Async APIs and Deployment",
  hours: 12,
  passPercent: 70,
  storageKey: "journify.course.web.v1",
  lang: "html",
  fileName: "index.html",
  preview: true,
  icon: "</>",
  tagline: "Build and launch responsive websites with HTML, CSS and JavaScript — with live previews as you code.",
  modules: MODULES,
  finalExam: FINAL_EXAM,
};
