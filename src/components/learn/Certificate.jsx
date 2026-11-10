"use client";
import { useEffect, useRef, useState } from "react";

const W = 2000;
const H = 1414;
const INK = "#16131f";
const BRAND = "#6d28d9";
const LIME = "#d4f36b";
const CREAM = "#fbf8f2";

function cssFont(varName, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return v || fallback;
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function fitText(ctx, text, font, maxSize, maxWidth) {
  let size = maxSize;
  do {
    ctx.font = `${font.weight} ${size}px ${font.family}`;
    size -= 2;
  } while (ctx.measureText(text).width > maxWidth && size > 20);
}

async function drawCertificate(canvas, { learner, course, completedAt, certId, score, sample }) {
  await document.fonts?.ready;
  const display = cssFont("--font-bricolage", "Georgia, serif");
  const sans = cssFont("--font-jakarta", "Arial, sans-serif");
  const ctx = canvas.getContext("2d");
  canvas.width = W;
  canvas.height = H;

  // Background and frame
  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "rgba(22,19,31,0.06)";
  for (let x = 40; x < W; x += 36) for (let y = 40; y < H; y += 36) ctx.fillRect(x, y, 2.4, 2.4);
  ctx.fillStyle = CREAM;
  ctx.fillRect(110, 110, W - 220, H - 220);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 6;
  ctx.strokeRect(70, 70, W - 140, H - 140);
  ctx.strokeStyle = BRAND;
  ctx.lineWidth = 2;
  ctx.strokeRect(95, 95, W - 190, H - 190);

  // Corner accent
  ctx.fillStyle = LIME;
  ctx.beginPath();
  ctx.moveTo(W - 73, 73);
  ctx.lineTo(W - 73, 360);
  ctx.lineTo(W - 360, 73);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = BRAND;
  ctx.beginPath();
  ctx.moveTo(73, H - 73);
  ctx.lineTo(73, H - 300);
  ctx.lineTo(300, H - 73);
  ctx.closePath();
  ctx.fill();

  // Brand
  const logo = await loadImage("/logo.jpeg");
  if (logo) {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(180, 170, 110, 110, 26);
    ctx.clip();
    ctx.drawImage(logo, 180, 170, 110, 110);
    ctx.restore();
  }
  ctx.fillStyle = INK;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.font = `800 54px ${display}`;
  ctx.fillText("Journify Technologies", 315, 228);
  ctx.font = `600 26px ${sans}`;
  ctx.fillStyle = "#4a4558";
  ctx.fillText("journify.tech · Chennai, Tamil Nadu", 317, 268);

  // Title
  ctx.textAlign = "center";
  ctx.fillStyle = BRAND;
  ctx.font = `800 34px ${sans}`;
  ctx.letterSpacing = "10px";
  ctx.fillText("CERTIFICATE OF COMPLETION", W / 2, 430);
  ctx.letterSpacing = "0px";

  ctx.fillStyle = "#4a4558";
  ctx.font = `500 34px ${sans}`;
  ctx.fillText("This is to certify that", W / 2, 520);

  // Name with highlighter
  fitText(ctx, learner.name, { weight: 800, family: display }, 118, W - 520);
  const nameWidth = ctx.measureText(learner.name).width;
  ctx.fillStyle = LIME;
  ctx.fillRect(W / 2 - nameWidth / 2 - 24, 600, nameWidth + 48, 52);
  ctx.fillStyle = INK;
  ctx.fillText(learner.name, W / 2, 640);

  ctx.fillStyle = "#4a4558";
  fitText(ctx, `of ${learner.college}`, { weight: 600, family: sans }, 34, W - 600);
  ctx.fillText(`of ${learner.college}`, W / 2, 720);

  ctx.font = `500 34px ${sans}`;
  ctx.fillText(`has successfully completed the ${course.hours}-hour online course`, W / 2, 800);

  ctx.fillStyle = INK;
  fitText(ctx, course.title, { weight: 800, family: display }, 72, W - 520);
  ctx.fillText(course.title, W / 2, 890);

  ctx.fillStyle = "#4a4558";
  fitText(ctx, `covering ${course.topics},`, { weight: 500, family: sans }, 28, W - 440);
  ctx.fillText(`covering ${course.topics},`, W / 2, 950);
  ctx.font = `500 28px ${sans}`;
  ctx.fillText(`and passed the final assessment with a score of ${score}%.`, W / 2, 995);

  // Footer: date, signature, ID
  const dateStr = new Date(completedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const footY = 1170;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  [[330, "Date of completion", dateStr], [W - 330, "Authorized signatory", "Journify Technologies"]].forEach(([x, label, value]) => {
    ctx.beginPath();
    ctx.moveTo(x - 210, footY);
    ctx.lineTo(x + 210, footY);
    ctx.stroke();
    ctx.fillStyle = INK;
    ctx.font = `700 34px ${display}`;
    ctx.fillText(value, x, footY - 22);
    ctx.fillStyle = "#4a4558";
    ctx.font = `600 24px ${sans}`;
    ctx.fillText(label, x, footY + 40);
  });

  ctx.fillStyle = "#4a4558";
  ctx.font = `600 22px ${sans}`;
  ctx.fillText(`Certificate ID: ${certId}`, W / 2, H - 140);

  if (sample) {
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.rotate(-0.42);
    ctx.fillStyle = "rgba(109, 40, 217, 0.10)";
    ctx.font = `800 300px ${display}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SAMPLE", 0, 0);
    ctx.restore();
  }
}

export default function Certificate({ learner, course, completedAt, certId, score, sample = false }) {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    drawCertificate(canvasRef.current, { learner, course, completedAt, certId, score, sample }).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [learner, course, completedAt, certId, score, sample]);

  const fileBase = `Journify-${course.slug}-certificate-${learner.name.replace(/[^a-z0-9]+/gi, "-")}`;

  function downloadPng() {
    canvasRef.current.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileBase}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  }

  function printPdf() {
    const dataUrl = canvasRef.current.toDataURL("image/png");
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!doctype html><html><head><title>${fileBase}</title><style>
      @page { size: A4 landscape; margin: 0; }
      html, body { margin: 0; height: 100%; }
      img { width: 100%; height: 100%; object-fit: contain; display: block; }
    </style></head><body><img src="${dataUrl}" alt="Certificate"></body></html>`);
    w.document.close();
    w.onload = () => {
      w.focus();
      w.print();
    };
  }

  const d = new Date(completedAt);
  const linkedIn =
    "https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME" +
    `&name=${encodeURIComponent(course.title)}` +
    `&organizationName=${encodeURIComponent("Journify Technologies")}` +
    `&issueYear=${d.getFullYear()}&issueMonth=${d.getMonth() + 1}` +
    `&certId=${encodeURIComponent(certId)}` +
    `&certUrl=${encodeURIComponent(`https://journify.tech/learn/${course.slug}`)}`;

  return (
    <div>
      <div className="rounded-2xl overflow-hidden border border-line shadow-[0_24px_60px_-24px_rgba(22,19,31,0.45)] bg-white">
        <canvas
          ref={canvasRef}
          className="block w-full h-auto"
          role="img"
          aria-label={`Certificate of completion for ${learner.name}, ${course.title}, certificate ID ${certId}`}
        />
      </div>
      {!sample && (
      <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
        <button type="button" disabled={!ready} onClick={downloadPng} className="bg-ink hover:bg-brand disabled:opacity-50 text-white font-bold px-6 py-3.5 rounded-xl transition-colors">
          Download image (PNG)
        </button>
        <button type="button" disabled={!ready} onClick={printPdf} className="border-2 border-ink font-bold px-6 py-3 rounded-xl hover:bg-paper transition-colors">
          Print / Save as PDF
        </button>
        <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="text-center bg-[#0a66c2] hover:bg-[#004182] text-white font-bold px-6 py-3.5 rounded-xl transition-colors">
          Add to LinkedIn
        </a>
      </div>
      )}
    </div>
  );
}
