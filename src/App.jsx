import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  MapPin,
  Sparkles,
} from "lucide-react";
import "./App.css";

const steps = [
  { label: "Your details", hint: "A few essentials" },
  { label: "Your focus", hint: "Tell us more" },
  { label: "Final details", hint: "Almost there" },
];

const roles = [
  "Student",
  "Entrepreneur / Business Owner",
  "Working Professional",
  "Job Seeker",
  "Investor",
  "Trader",
  "Marketer",
  "Creative",
  "Consultant / Freelancer",
  "Other",
];
const interests = [
  "Business & Entrepreneurship",
  "Finance & Investment",
  "Financial Markets / Trading",
  "Marketing & Branding",
  "Technology",
  "Career Development",
  "Leadership",
  "Personal Development",
  "Sales",
  "Networking",
  "Other",
];
const gains = [
  "Practical business knowledge",
  "Financial knowledge",
  "Marketing strategies",
  "Career opportunities",
  "Networking",
  "Mentorship",
  "Investment opportunities",
  "New business connections",
  "Inspiration and exposure",
  "Access to industry leaders",
  "Other",
];

function Choice({ name, value, label, type = "radio", checked, onChange }) {
  return (
    <label className="choice flex cursor-pointer items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium transition hover:border-sfm/40">
      <input
        className="sr-only"
        name={name}
        value={value}
        type={type}
        checked={checked}
        onChange={onChange}
      />
      <span className="choice-dot flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-black/20 transition" />
      <span>{label}</span>
    </label>
  );
}

function Field({ label, hint, children, required }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-ink">
        {label} {required && <span className="text-coral">*</span>}
      </label>
      {hint && <p className="-mt-1 text-xs text-black/50">{hint}</p>}
      {children}
    </div>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    gender: "",
    ageRange: "",
    role: "",
    interests: [],
    gains: [],
    attendance: "",
    likelihood: "",
    futureEvents: "",
    referral: "",
    community: "",
    updates: "Yes, keep me updated",
    contact: [],
    collaboration: [],
    name: "",
    email: "",
    phone: "",
    location: "",
    business: "",
    challenge: "",
    topic: "",
    referredBy: "",
    extra: "",
  });

  const set = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));
  const toggle = (key, value) =>
    set(
      key,
      form[key].includes(value)
        ? form[key].filter((x) => x !== value)
        : [...form[key], value],
    );
  const next = () => {
    if (!valid()) return;
    setError("");
    setStep((s) => Math.min(s + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const prev = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const valid = () => {
    const required = [
      ["name", "email", "phone", "ageRange", "location"],
      ["role", "interests", "gains", "challenge"],
      ["community", "contact"],
    ][step];
    const missing = required.some((key) =>
      Array.isArray(form[key]) ? !form[key].length : !form[key],
    );
    if (missing) {
      setError("Please complete the required fields before continuing.");
      return false;
    }
    if (step === 0 && !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };
  const submit = async () => {
    if (!valid()) return;
    setSending(true);
    setError("");
    const payload = { ...form, submittedAt: new Date().toISOString() };
    try {
      const endpoint = import.meta.env.VITE_APPS_SCRIPT_URL;
      if (endpoint)
        await fetch(endpoint, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(payload),
        });
      setSubmitted(true);
    } catch {
      setError("We could not submit your registration. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (submitted)
    return (
      <Confirmation
        name={form.name}
        email={form.email}
        connected={Boolean(import.meta.env.VITE_APPS_SCRIPT_URL)}
      />
    );
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#e9e7e2] font-sans">
      <div className="h-2 bg-coral" />
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <img
          src="/sfm-logo.png"
          className="h-10 w-auto mix-blend-multiply sm:h-12"
          alt="SFM"
        />
        <div className="hidden items-center gap-2 text-sm font-semibold text-black/65 sm:flex">
          <CalendarDays size={17} className="text-sfm" /> December 2026{" "}
          <span className="mx-1 text-black/20">•</span>
          <MapPin size={17} className="text-sfm" /> Obafemi Awolowo University,
          Ile-Ife. Osun State
        </div>
      </header>

      <section className="relative border-y border-black/10 bg-ink px-5 py-12 text-white sm:px-8 sm:py-16">
        <div className="absolute right-[8%] top-6 h-24 w-24 rounded-full bg-coral opacity-95 blur-[1px] sm:h-36 sm:w-36" />
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-coral">
            <Sparkles size={14} /> SFM Conference 2026
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-[.98] tracking-tight sm:text-6xl">
            Your next move
            <br />
            <em className="font-normal">starts here.</em>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
            Join ambitious young people, professionals, creatives and business
            leaders for a powerful experience in strategy, finance and
            marketing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="flex items-center gap-2 text-sm text-black/60">
          <Clock3 size={16} className="text-sfm" /> Takes about 3 minutes{" "}
          <span className="mx-2 text-black/20">|</span> Your details are kept
          private
        </div>
      </section>
      <section className="form-section mx-auto grid max-w-6xl gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[230px_1fr]">
        <aside className="lg:pt-8">
          <div className="flex gap-2 overflow-auto lg:block lg:space-y-1">
            {steps.map((item, i) => (
              <div
                key={item.label}
                className={`min-w-max rounded-lg px-3 py-2 lg:flex lg:items-center lg:gap-3 ${i === step ? "bg-sfm text-white" : i < step ? "text-sfm" : "text-black/40"}`}
              >
                <span className="hidden lg:block">
                  {i < step ? (
                    <Check size={17} />
                  ) : (
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${i === step ? "bg-coral text-white" : "border border-current"}`}
                    >
                      {i + 1}
                    </span>
                  )}
                </span>
                <span>
                  <b className="block text-sm">{item.label}</b>
                  <small className="hidden text-xs opacity-70 lg:block">
                    {item.hint}
                  </small>
                </span>
              </div>
            ))}
          </div>
        </aside>
        <div className="form-card min-w-0 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_18px_60px_rgba(32,17,38,.08)] sm:p-8">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[.14em] text-sfm">
              Step {step + 1} of {steps.length}
            </p>
            <span className="text-sm text-black/45">
              {Math.round(((step + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-mist">
            <div
              className="h-full rounded-full bg-coral transition-all duration-500"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
          {step === 0 && <Details form={form} set={set} />}
          {step === 1 && <Focus form={form} set={set} toggle={toggle} />}
          {step === 2 && <Final form={form} set={set} toggle={toggle} />}
          {error && (
            <p
              role="alert"
              className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              {error}
            </p>
          )}
          <div className="form-actions mt-10 flex items-center justify-between gap-4 border-t border-black/10 pt-6">
            <button
              type="button"
              onClick={prev}
              disabled={!step}
              className="inline-flex items-center gap-2 px-2 py-3 text-sm font-bold text-black/60 disabled:invisible"
            >
              <ArrowLeft size={17} /> Back
            </button>
            {step < 2 ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-2 rounded-lg bg-sfm px-5 py-3 text-sm font-bold text-white transition hover:bg-[#35004e]"
              >
                Continue <ArrowRight size={17} />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-lg bg-coral px-5 py-3 text-sm font-bold text-white transition hover:bg-[#de3346] disabled:opacity-60"
              >
                {sending ? "Submitting…" : "Submit registration"}{" "}
                <Check size={17} />
              </button>
            )}
          </div>
        </div>
      </section>
      <footer className="border-t border-black/10 px-5 py-8 text-center text-sm text-black/45">
        © 2026 SFM Conference <span className="mx-2">•</span> Strategy. Finance.
        Marketing.
      </footer>
    </main>
  );
}

const input =
  "field mt-1 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm transition placeholder:text-black/35";
function Details({ form, set }) {
  return (
    <div>
      <Title
        title="Let’s start with you."
        text="We’ll use these details to keep you informed about your registration."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required>
          <input
            className={input}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="First and last name"
          />
        </Field>
        <Field label="Email address" required>
          <input
            type="email"
            className={input}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Phone / WhatsApp number" required>
          <input
            type="tel"
            className={input}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="e.g. +234 800 000 0000"
          />
        </Field>
        <Field label="City / State" required>
          <input
            className={input}
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="Where are you based?"
          />
        </Field>
      </div>
      <div className="mt-7 grid gap-7 sm:grid-cols-2">
        <Field label="Age range" required>
          <div className="grid gap-2">
            {["Under 18", "18–24", "25–34", "35–44", "45–54", "55+"].map(
              (x) => (
                <Choice
                  key={x}
                  name="age"
                  value={x}
                  label={x}
                  checked={form.ageRange === x}
                  onChange={() => set("ageRange", x)}
                />
              ),
            )}
          </div>
        </Field>
        <Field label="Gender" hint="Optional">
          <div className="grid gap-2">
            {["Male", "Female"].map((x) => (
              <Choice
                key={x}
                name="gender"
                value={x}
                label={x}
                checked={form.gender === x}
                onChange={() => set("gender", x)}
              />
            ))}
          </div>
        </Field>
      </div>
    </div>
  );
}
function Focus({ form, set, toggle }) {
  return (
    <div>
      <Title
        title="What moves you?"
        text="Help us shape a conference experience that’s relevant to your journey."
      />
      <Field label="Which best describes you?" required>
        <div className="grid gap-2 sm:grid-cols-2">
          {roles.map((x) => (
            <Choice
              key={x}
              name="role"
              value={x}
              label={x}
              checked={form.role === x}
              onChange={() => set("role", x)}
            />
          ))}
        </div>
      </Field>
      <Field label="Your current areas of interest" required>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {interests.map((x) => (
            <Choice
              key={x}
              type="checkbox"
              name="interests"
              value={x}
              label={x}
              checked={form.interests.includes(x)}
              onChange={() => toggle("interests", x)}
            />
          ))}
        </div>
      </Field>
      <Field
        label="If you run a business, what industry are you in?"
        hint="Optional"
      >
        <input
          className={input}
          value={form.business}
          onChange={(e) => set("business", e.target.value)}
          placeholder="Tell us briefly about your business or organisation"
        />
      </Field>
      <Field
        label="What are you hoping to gain from SFM Conference 2026?"
        required
      >
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {gains.map((x) => (
            <Choice
              key={x}
              type="checkbox"
              name="gains"
              value={x}
              label={x}
              checked={form.gains.includes(x)}
              onChange={() => toggle("gains", x)}
            />
          ))}
        </div>
      </Field>
      <Field label="What is your biggest challenge right now?" required>
        <textarea
          className={input}
          rows="4"
          value={form.challenge}
          onChange={(e) => set("challenge", e.target.value)}
          placeholder="In one or two sentences, tell us about your career, business or financial journey."
        />
      </Field>
      <Field
        label="What topic would you most like to see discussed?"
        hint="Optional"
      >
        <textarea
          className={input}
          rows="3"
          value={form.topic}
          onChange={(e) => set("topic", e.target.value)}
          placeholder="Share a topic or question"
        />
      </Field>
      <Field label="How did you hear about SFM Conference 2026?" required>
        <select
          className={input}
          value={form.referral}
          onChange={(e) => set("referral", e.target.value)}
        >
          <option value="">Select one</option>
          {[
            "WhatsApp",
            "LinkedIn",
            "Instagram",
            "Facebook",
            "X",
            "TikTok",
            "Friend / Referral",
            "SFM Team",
            "School / University",
            "Business / Organisation",
            "Other",
          ].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </Field>
      <Field label="If someone referred you, who was it?" hint="Optional">
        <input
          className={input}
          value={form.referredBy}
          onChange={(e) => set("referredBy", e.target.value)}
          placeholder="Name of the person"
        />
      </Field>
    </div>
  );
}
function Final({ form, set, toggle }) {
  return (
    <div>
      <Title
        title="One last step."
        text="Choose how you’d like to stay connected with the SFM team."
      />
      <Field
        label="Would you like to join the SFM community after the conference?"
        required
      >
        <div className="grid gap-2 sm:grid-cols-3">
          {["Yes", "Maybe", "No"].map((x) => (
            <Choice
              key={x}
              name="community"
              value={x}
              label={x}
              checked={form.community === x}
              onChange={() => set("community", x)}
            />
          ))}
        </div>
      </Field>
      <Field label="Would you like to receive SFM updates?" required>
        <div className="grid gap-2 sm:grid-cols-2">
          {["Yes, keep me updated", "No"].map((x) => (
            <Choice
              key={x}
              name="updates"
              value={x}
              label={x}
              checked={form.updates === x}
              onChange={() => set("updates", x)}
            />
          ))}
        </div>
      </Field>
      <Field label="How should we contact you?" required>
        <div className="grid gap-2 sm:grid-cols-3">
          {["WhatsApp", "Email", "SMS"].map((x) => (
            <Choice
              key={x}
              type="checkbox"
              name="contact"
              value={x}
              label={x}
              checked={form.contact.includes(x)}
              onChange={() => toggle("contact", x)}
            />
          ))}
        </div>
      </Field>
      <Field
        label="Interested in collaborating with SFM?"
        hint="Optional — select any that apply"
      >
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            "Volunteer",
            "Speaker",
            "Sponsor",
            "Partner",
            "Media",
            "Content Creation",
            "Marketing",
            "Community Building",
            "Event Support",
          ].map((x) => (
            <Choice
              key={x}
              type="checkbox"
              name="collaboration"
              value={x}
              label={x}
              checked={form.collaboration.includes(x)}
              onChange={() => toggle("collaboration", x)}
            />
          ))}
        </div>
      </Field>
      <Field
        label="Anything else you’d like the SFM team to know?"
        hint="Optional"
      >
        <textarea
          className={input}
          rows="4"
          value={form.extra}
          onChange={(e) => set("extra", e.target.value)}
          placeholder="Questions, expectations, suggestions or extra information"
        />
      </Field>
    </div>
  );
}
function Title({ title, text }) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-3xl font-bold tracking-tight">
        {title}
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-black/55">
        {text}
      </p>
    </div>
  );
}
function Confirmation({ name, email, connected }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 font-sans">
      <div className="max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sfm text-white">
          <CheckCircle2 size={32} />
        </div>
        <p className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-coral">
          Registration received
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          You’re on the list, {name.split(" ")[0]}.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-black/60">
        <span>Your details have been received.</span>
          Thank you for registering your interest in SFM Conference 2026.{" "}
          {connected ? (
            <>
              A confirmation has been sent to{" "}
              <strong className="text-ink">{email}</strong>. We’ll be in touch
              with next steps and event updates.
            </>
          ) : (
            <>
              Email confirmation will be enabled when the registration service
              is connected.
            </>
          )}
        </p>
        <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_18px_60px_rgba(32,17,38,.08)]">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Get your ticket
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-black/60">
            Continue to the ticket page to secure your place at SFM Conference
            2026.
          </p>
          <a
            href="https://selar.com/15c7g99964"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-lg bg-coral px-6 py-3 text-sm font-bold text-white transition hover:bg-[#de3346]"
          >
            Get your ticket <ArrowRight size={17} className="ml-2" />
          </a>
        </div>
        <div className="mt-9 border-t border-black/10 pt-7 text-sm font-medium text-sfm">
          Strategy. Finance. Marketing.
        </div>
      </div>
    </main>
  );
}

export default App;
