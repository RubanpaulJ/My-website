"use client";
import { useState } from "react";

const FIELDS = [
  { name: "name", label: "Full name (as it should appear on your certificate)", type: "text", autoComplete: "name" },
  { name: "email", label: "Email address", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel", inputMode: "numeric" },
  { name: "college", label: "College / institution name", type: "text", autoComplete: "organization" },
];

function validate(v) {
  const errors = {};
  if (v.name.trim().length < 3) errors.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) errors.email = "Please enter a valid email address.";
  const digits = v.phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
  if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = "Please enter a valid 10-digit mobile number.";
  if (v.college.trim().length < 3) errors.college = "Please enter your college name.";
  return errors;
}

export default function RegisterForm({ initial, onSubmit, submitLabel = "Start learning — it's free" }) {
  const [values, setValues] = useState(initial ?? { name: "", email: "", phone: "", college: "" });
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`reg-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    onSubmit({
      name: values.name.trim().replace(/\s+/g, " "),
      email: values.email.trim().toLowerCase(),
      phone: values.phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, ""),
      college: values.college.trim().replace(/\s+/g, " "),
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {FIELDS.map((f) => (
        <div key={f.name}>
          <label htmlFor={`reg-${f.name}`} className="block text-sm font-semibold text-ink">
            {f.label}
          </label>
          <input
            id={`reg-${f.name}`}
            name={f.name}
            type={f.type}
            inputMode={f.inputMode}
            autoComplete={f.autoComplete}
            value={values[f.name]}
            onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
            aria-invalid={!!errors[f.name]}
            aria-describedby={errors[f.name] ? `reg-${f.name}-err` : undefined}
            className={`mt-1.5 block w-full rounded-xl border bg-white px-4 py-3 text-[16px] outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${
              errors[f.name] ? "border-red-500" : "border-line"
            }`}
          />
          {errors[f.name] && (
            <p id={`reg-${f.name}-err`} className="mt-1 text-sm text-red-600">
              {errors[f.name]}
            </p>
          )}
        </div>
      ))}
      <button type="submit" className="w-full bg-ink hover:bg-brand text-white font-bold px-7 py-4 rounded-xl transition-colors">
        {submitLabel}
      </button>
      <p className="text-xs text-ink-soft leading-relaxed">
        Your details and progress are saved only in this browser on this device, and your name and college are printed on
        your certificate.
      </p>
    </form>
  );
}
