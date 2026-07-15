import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  ArrowRight, Menu, X, Bot,
  ChevronDown, ArrowUpRight, Zap,
  Shield, Clock, Users, Target,
} from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import logo from "../assets/shafinityLogo.png";
import cardflyLogo from "../assets/trusted_clients/cardfly logo.png";
import dhLogo from "../assets/trusted_clients/dh logo.jpg";
import kapahLogo from "../assets/trusted_clients/kapahlogo.png";
import kteLogo from "../assets/trusted_clients/kte logo.png";

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  bg: "#0B0F0C",
  surface: "#111714",
  accent: "#7C9A5D",
  forest: "#2E5E3B",
  border: "#1D2A22",
  heading: "#F4F5F2",
  body: "#B7C0B5",
  sub: "#8D978B",
  display: "'Bricolage Grotesque', sans-serif",
  sans: "'Plus Jakarta Sans', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

// ─── Shared components ────────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-xs font-semibold tracking-[0.15em] uppercase mb-5"
      style={{ color: T.accent, fontFamily: T.sans }}
    >
      {children}
    </div>
  );
}

// ─── Hero visual ─────────────────────────────────────────────────────────────

function HeroVisual() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="relative w-full max-w-[600px]">
        {/* Main dashboard shell */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            backgroundColor: T.surface,
            border: `1px solid ${T.border}`,
            boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px ${T.border}`,
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2.5 px-4 py-3 border-b"
            style={{ borderColor: T.border, backgroundColor: T.bg }}
          >
            {["#2E3D30", "#2E3D30", T.accent].map((c, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: c, opacity: i === 2 ? 0.65 : 1 }}
              />
            ))}
            <div
              className="mx-auto rounded px-3 py-1 text-[10px]"
              style={{ backgroundColor: "#0F1510", color: T.sub, fontFamily: T.mono }}
            >
              shafinitysol / dashboard
            </div>
          </div>

          <div className="flex min-h-[340px]">
            {/* Sidebar */}
            <div
              className="hidden sm:flex w-[148px] flex-col p-3 gap-0.5 border-r flex-shrink-0"
              style={{ borderColor: T.border, backgroundColor: "#0C100D" }}
            >
              {["Overview", "Projects", "Automation", "Analytics", "Reports", "Settings"].map(
                (item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[11px]"
                    style={{
                      backgroundColor: i === 0 ? T.surface : "transparent",
                      color: i === 0 ? T.heading : T.sub,
                      fontFamily: T.sans,
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: i === 0 ? T.accent : T.border }}
                    />
                    {item}
                  </div>
                )
              )}
            </div>

            {/* Main panel */}
            <div className="flex-1 p-4 space-y-3 min-w-0">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: "REVENUE", value: "+147%", note: "vs last quarter" },
                  { label: "PROJECTS", value: "152", note: "delivered" },
                  { label: "AI TASKS", value: "98%", note: "automated" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl p-3"
                    style={{
                      backgroundColor: T.bg,
                      border: `1px solid ${T.border}`,
                    }}
                  >
                    <div
                      className="text-[8px] mb-1.5 tracking-wider"
                      style={{ color: T.sub, fontFamily: T.mono }}
                    >
                      {s.label}
                    </div>
                    <div
                      className="text-[17px] font-semibold leading-none"
                      style={{ color: T.accent, fontFamily: T.display }}
                    >
                      {s.value}
                    </div>
                    <div className="text-[8px] mt-1" style={{ color: T.sub }}>
                      {s.note}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div
                className="rounded-xl p-3"
                style={{ backgroundColor: T.bg, border: `1px solid ${T.border}` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[9px] tracking-widest"
                    style={{ color: T.sub, fontFamily: T.mono }}
                  >
                    GROWTH TRAJECTORY
                  </span>
                  <span className="text-[9px] font-medium" style={{ color: T.accent }}>
                    ↑ 147%
                  </span>
                </div>
                <div className="flex items-end gap-1.5 h-[52px]">
                  {[30, 48, 36, 62, 52, 75, 68, 82, 79, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        backgroundColor: i === 9 ? T.accent : T.border,
                        opacity: i === 9 ? 1 : 0.45 + i * 0.055,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* AI Pipeline */}
              <div
                className="rounded-xl p-3"
                style={{ backgroundColor: T.bg, border: `1px solid ${T.border}` }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span
                    className="text-[9px] tracking-widest"
                    style={{ color: T.sub, fontFamily: T.mono }}
                  >
                    AI WORKFLOW PIPELINE
                  </span>
                  <span
                    className="text-[8px] px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${T.accent}20`, color: T.accent }}
                  >
                    ● LIVE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {["Trigger", "Enrich", "AI Score", "Route", "Notify"].map((node, i) => (
                    <div key={node} className="flex items-center gap-1.5">
                      <div
                        className="rounded px-2 py-1 text-[8px]"
                        style={{
                          backgroundColor: i === 2 ? `${T.accent}18` : T.surface,
                          border: `1px solid ${i === 2 ? T.accent : T.border}`,
                          color: i === 2 ? T.accent : T.sub,
                          fontFamily: T.mono,
                        }}
                      >
                        {node}
                      </div>
                      {i < 4 && (
                        <div className="flex items-center gap-0.5">
                          <div className="w-2.5 h-px" style={{ backgroundColor: T.border }} />
                          <div
                            className="w-1 h-1 rounded-full"
                            style={{ backgroundColor: i < 2 ? T.accent : T.border }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div
                  className="mt-2.5 text-[8px]"
                  style={{ color: T.sub, fontFamily: T.mono }}
                >
                  <span style={{ color: T.accent }}>→</span> Ran in 1.3s · 45min manual work
                  eliminated
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating badge: project */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-6 top-14 rounded-xl p-3.5 hidden lg:block"
          style={{
            backgroundColor: T.surface,
            border: `1px solid ${T.border}`,
            boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
            minWidth: 148,
          }}
        >
          <div className="text-[9px] mb-1" style={{ color: T.sub, fontFamily: T.mono }}>
            NEW PROJECT
          </div>
          <div
            className="text-sm font-semibold mb-1.5"
            style={{ color: T.heading, fontFamily: T.display }}
          >
            Axiom Platform
          </div>
          <span
            className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${T.accent}20`, color: T.accent }}
          >
            <span
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: T.accent }}
            />
            In Progress
          </span>
        </motion.div>

        {/* Floating badge: automation */}
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          className="absolute -left-6 bottom-16 rounded-xl p-3.5 hidden lg:block"
          style={{
            backgroundColor: T.surface,
            border: `1px solid ${T.border}`,
            boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
            minWidth: 164,
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ backgroundColor: `${T.accent}20` }}
            >
              <Zap size={11} style={{ color: T.accent }} />
            </div>
            <span className="text-[10px] font-semibold" style={{ color: T.heading }}>
              Task Automated
            </span>
          </div>
          <div className="text-[9px]" style={{ color: T.sub, fontFamily: T.mono }}>
            80hrs of manual work saved
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [marqueePaused, setMarqueePaused] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(data.message || 'Message sent successfully!');
        setForm({
          name: '',
          email: '',
          company: '',
          service: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Failed to send the message.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setSubmitMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["Services", "Work", "Process", "About", "Contact"];

  const designLogos = [
    { name: "Figma", src: new URL("../assets/expertise/figma_logo.webp", import.meta.url).href },
    { name: "Photoshop", src: new URL("../assets/expertise/ps_logo.webp", import.meta.url).href },
    { name: "Illustrator", src: new URL("../assets/expertise/ai_logo.webp", import.meta.url).href },
  ];

  const buildLogos = [
    { name: "React", src: new URL("../assets/expertise/react_logo.webp", import.meta.url).href },
    { name: "NextJS", src: new URL("../assets/expertise/next_logo.jpg", import.meta.url).href },
    { name: "NodeJS", src: new URL("../assets/expertise/node_logo.jpg", import.meta.url).href },
    { name: "WordPress", src: new URL("../assets/expertise/wordpress_logo.webp", import.meta.url).href },
    { name: "Shopify", src: new URL("../assets/expertise/shopify_logo.png", import.meta.url).href },
    { name: "Webflow", src: new URL("../assets/expertise/webflow_logo.png", import.meta.url).href },
    { name: "Framer", src: new URL("../assets/expertise/framer_logo.svg", import.meta.url).href },
  ];

  const automateLogos = [
    { name: "n8n", src: new URL("../assets/expertise/n8n_logo.webp", import.meta.url).href },
    { name: "Zapier", src: new URL("../assets/expertise/zapier_logo.png", import.meta.url).href },
    { name: "OpenAI", src: new URL("../assets/expertise/openai_logo.jpg", import.meta.url).href },
    { name: "Claude", src: new URL("../assets/expertise/claude_logo.png", import.meta.url).href },
    { name: "Gemini", src: new URL("../assets/expertise/gemini_logo.webp", import.meta.url).href },
    { name: "Notion", src: new URL("../assets/expertise/notion_logo.png", import.meta.url).href },
    { name: "Slack", src: new URL("../assets/expertise/slack_logo.png", import.meta.url).href },
  ];

  const serviceCards = [
    {
      number: "01",
      symbol: "🌐",
      title: "Design",
      subtitle: "Beautiful websites built to convert visitors into customers.",
      cta: "Explore Design",
      logos: designLogos,
      span: "col-span-1",
    },
    {
      number: "02",
      symbol: "</>",
      title: "Build",
      subtitle: "Fast, scalable websites and web applications.",
      cta: "Explore Development",
      logos: buildLogos,
      span: "col-span-1",
    },
    {
      number: "03",
      symbol: "🤖",
      title: "Automate",
      subtitle: "AI-powered workflows that eliminate repetitive work.",
      cta: "Explore Automation",
      logos: automateLogos,
      span: "col-span-1",
    },
  ];

  const capabilityRail = [
    {
      title: "Website Designing",
      desc: "Brand-first landing pages, redesigns, and conversion-led interface systems.",
    },
    {
      title: "Website Development",
      desc: "Responsive websites, CMS builds, integrations, and performance-focused delivery.",
    },
    {
      title: "AI Automated Systems",
      desc: "Lead routing, client onboarding, reporting, internal operations, and intelligent workflows.",
    },
    {
      title: "Product Strategy",
      desc: "Discovery, information architecture, wireframing, and release planning.",
    },
    {
      title: "Growth Systems",
      desc: "Analytics, experimentation, and optimization loops that compound over time.",
    },
  ];

  const section4TechLogos = [
    { name: "React", src: new URL("../assets/expertise/react_logo.webp", import.meta.url).href },
    { name: "NextJS", src: new URL("../assets/expertise/next_logo.jpg", import.meta.url).href },
    { name: "NodeJS", src: new URL("../assets/expertise/node_logo.jpg", import.meta.url).href },
    { name: "MongoDB" },
    { name: "WordPress", src: new URL("../assets/expertise/wordpress_logo.webp", import.meta.url).href },
    { name: "Shopify", src: new URL("../assets/expertise/shopify_logo.png", import.meta.url).href },
    { name: "Webflow", src: new URL("../assets/expertise/webflow_logo.png", import.meta.url).href },
    { name: "Framer", src: new URL("../assets/expertise/framer_logo.svg", import.meta.url).href },
    { name: "Tailwind", src: new URL("../assets/expertise/figma_logo.webp", import.meta.url).href },
    { name: "n8n", src: new URL("../assets/expertise/n8n_logo.webp", import.meta.url).href },
    { name: "Zapier", src: new URL("../assets/expertise/zapier_logo.png", import.meta.url).href },
    { name: "OpenAI", src: new URL("../assets/expertise/openai_logo.jpg", import.meta.url).href },
    { name: "Claude", src: new URL("../assets/expertise/claude_logo.png", import.meta.url).href },
    { name: "Gemini", src: new URL("../assets/expertise/gemini_logo.webp", import.meta.url).href },
    { name: "Slack", src: new URL("../assets/expertise/slack_logo.png", import.meta.url).href },
    { name: "Google Workspace" },
  ];

  const work = [
    {
      name: "Project One",
      liveUrl: "#",
      image: new URL("../assets/featured_projects/Project 1.png", import.meta.url).href,
      className: "md:col-span-2 md:row-span-2",
      color: T.accent,
    },
    {
      name: "Project Two",
      liveUrl: "#",
      image: new URL("../assets/featured_projects/Project 2.png", import.meta.url).href,
      className: "md:col-span-1 md:row-span-1",
      color: "#6B8FA4",
    },
    {
      name: "Project Three",
      liveUrl: "#",
      image: new URL("../assets/featured_projects/Project 3.png", import.meta.url).href,
      className: "md:col-span-1 md:row-span-1",
      color: T.forest,
    },
    {
      name: "Project Four",
      liveUrl: "#",
      image: new URL("../assets/featured_projects/Project 4.png", import.meta.url).href,
      className: "md:col-span-1 md:row-span-2",
      color: "#8E7CA3",
    },
    {
      name: "Project Five",
      liveUrl: "#",
      image: new URL("../assets/featured_projects/Project 5.png", import.meta.url).href,
      className: "md:col-span-1 md:row-span-1",
      color: "#D0A96C",
    },
    {
      name: "Project Six",
      liveUrl: "#",
      image: new URL("../assets/featured_projects/Project 6.png", import.meta.url).href,
      className: "md:col-span-2 md:row-span-1",
      color: "#7CA493",
    },
    {
      name: "Project Seven",
      liveUrl: "#",
      image: new URL("../assets/featured_projects/Project 7.png", import.meta.url).href,
      className: "md:col-span-1 md:row-span-1",
      color: "#B98E68",
    },
  ];

  const differentiators = [
    {
      Icon: Target,
      title: "Strategic Before Tactical",
      desc: "We research your market, competitors, and users before designing a single screen. Strategy informs every decision we make.",
    },
    {
      Icon: Zap,
      title: "6–8 Week Delivery",
      desc: "Most projects ship in under 8 weeks. Parallel workstreams and clear communication eliminate bottlenecks without cutting corners.",
    },
    {
      Icon: Bot,
      title: "AI-First Methodology",
      desc: "We use AI internally to accelerate our work, and build AI systems externally that give clients compounding operational advantages.",
    },
    {
      Icon: Shield,
      title: "Long-Term Partnership",
      desc: "We don't disappear after launch. Post-launch support, optimization, and growth are standard in every engagement.",
    },
    {
      Icon: Clock,
      title: "Scalable Architecture",
      desc: "Systems designed to handle 10× your current volume. We architect for growth, not just present requirements.",
    },
    {
      Icon: Users,
      title: "Senior-Only Execution",
      desc: "No juniors, no hand-offs. Every client works directly with senior practitioners who've shipped products used by millions.",
    },
  ];

  const processSteps = [
    { n: "01", label: "Discover", desc: "Business goals, user research, competitive landscape" },
    { n: "02", label: "Strategy", desc: "Scope, architecture, success metrics, timeline" },
    { n: "03", label: "Design", desc: "UI/UX design, prototyping, iterative feedback" },
    { n: "04", label: "Build", desc: "Development, integrations, QA testing" },
    { n: "05", label: "Launch", desc: "Deployment, performance audit, go-live" },
    { n: "06", label: "Scale", desc: "Analytics, optimization, feature expansion" },
  ];

  const testimonials = [
    {
      quote: "ShafinitySol transformed our digital presence completely. The platform they built drove a 280% increase in qualified leads within 90 days of launch — without a single dollar of additional ad spend.",
      name: "Sarah Chen",
      role: "CEO, Nexus Ventures",
      initials: "SC",
    },
    {
      quote: "Their AI automation system eliminated 15 hours of manual work per week across our team. It paid for itself in the first month — and keeps compounding. Genuinely transformative.",
      name: "Marcus Webb",
      role: "Operations Director, Luminary Group",
      initials: "MW",
    },
    {
      quote: "The design quality is exceptional. They understood our brand at a depth I didn't expect from an agency. Working with ShafinitySol felt like having an elite in-house team.",
      name: "Priya Kapoor",
      role: "Founder, Solstice Studio",
      initials: "PK",
    },
  ];

  const faqs = [
    {
      q: "What types of businesses do you typically work with?",
      a: "We work with growth-stage startups, established SMBs, and enterprise teams across B2B SaaS, e-commerce, professional services, and fintech. Our sweet spot is companies investing starting from $999 in a digital project with clear business objectives and a desire for a long-term partner.",
    },
    {
      q: "How long does a typical project take from start to finish?",
      a: "Most projects run 6–10 weeks depending on scope. A focused marketing website might take 5–6 weeks. A full web application or AI automation system typically runs 10–16 weeks. We provide a precise timeline during the strategy phase before any work begins.",
    },
    {
      q: "Do you offer ongoing support and maintenance after launch?",
      a: "Yes. All projects include a 30-day post-launch support window. We also offer ongoing retainer partnerships for clients who want continued optimization, feature development, and strategic support — many of our best relationships are long-term.",
    },
    {
      q: "What does the AI Automation service include specifically?",
      a: "We build custom automation pipelines using a combination of no-code/low-code tools (Make, Zapier), custom Python services, and LLM integrations (OpenAI, Anthropic Claude). Common use cases: lead qualification, customer onboarding, internal reporting, CRM data hygiene, and document processing.",
    },
    {
      q: "How is pricing structured?",
      a: "We price per project, not by the hour. After a discovery call, we scope your project and present a fixed-price proposal with clear deliverables. No surprise invoices, no scope creep without explicit approval. Typical projects start from $999 depending on scope.",
    },
    {
      q: "Can you work alongside our existing development or design team?",
      a: "Absolutely. We regularly collaborate with in-house teams as a specialized partner — handling design strategy, a focused feature build, or an AI initiative while your team focuses on core product work. We're comfortable with any collaboration model.",
    },
  ];

  const clientLogos = [
    { name: "Cardfly", src: cardflyLogo },
    { name: "DH Logo", src: dhLogo },
    { name: "Kapah", src: kapahLogo },
    { name: "KTE Logo", src: kteLogo },
  ];

  const team = [
    {
      name: "Alex Rivera",
      role: "Design Director",
      bio: "10yr designing for Airbnb, Linear, and two YC-backed startups. Led design at Prismic.",
      initials: "AR",
    },
    {
      name: "Jordan Park",
      role: "Engineering Lead",
      bio: "Former Staff Eng at Stripe. Built infrastructure serving 100M+ requests/day.",
      initials: "JP",
    },
    {
      name: "Mia Okonkwo",
      role: "AI Systems Lead",
      bio: "Applied ML researcher turned practitioner. Specializes in production LLM pipelines.",
      initials: "MO",
    },
    {
      name: "Theo Larsen",
      role: "Strategy Director",
      bio: "Ex-McKinsey. Bridges business strategy and digital execution for growth-stage companies.",
      initials: "TL",
    },
  ];

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        * { scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
        [data-radix-accordion-content] { overflow: hidden; }
        [data-radix-accordion-content][data-state="open"] {
          animation: accordion-down 0.22s cubic-bezier(0.22, 1, 0.36, 1);
        }
        [data-radix-accordion-content][data-state="closed"] {
          animation: accordion-up 0.18s ease-in;
        }
        @keyframes services-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes accordion-down {
          from { height: 0; }
          to { height: var(--radix-accordion-content-height); }
        }
        @keyframes accordion-up {
          from { height: var(--radix-accordion-content-height); }
          to { height: 0; }
        }
        ::selection { background: #7C9A5D40; color: #F4F5F2; }
        input::placeholder, textarea::placeholder { color: #3A4A3C; }
        input, textarea, select { color-scheme: dark; }
        option { background: #111714; }
      `}</style>

      <div style={{ backgroundColor: T.bg, fontFamily: T.sans, color: T.body }}>

        {/* ── Navbar ──────────────────────────────────────────────── */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
          style={{
            backgroundColor: scrolled ? `${T.bg}ee` : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            borderBottom: `1px solid ${scrolled ? T.border : "transparent"}`,
          }}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-[68px] flex items-center justify-between">
            <a
              href="#"
              className="flex items-center gap-3"
              aria-label="ShafinitySol home"
            >
              <img
                src={logo}
                alt="ShafinitySol logo"
                className="h-9 w-9 object-contain rounded-md"
              />
              <span
                className="text-lg font-semibold tracking-tight"
                style={{ color: T.heading, fontFamily: T.display }}
              >
                ShafinitySol
              </span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm transition-colors duration-200 hover:text-[#F4F5F2]"
                  style={{ color: T.sub }}
                >
                  {link}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-88"
                style={{ backgroundColor: T.accent, color: T.bg, fontFamily: T.sans }}
              >
                Book Discovery Call
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg transition-colors"
                style={{ color: T.heading }}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden border-t px-6 py-6 space-y-1"
              style={{ backgroundColor: T.surface, borderColor: T.border }}
            >
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-sm py-3 border-b"
                  style={{ color: T.body, borderColor: T.border }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              ))}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 mt-4 px-5 py-3 rounded-lg text-sm font-semibold"
                style={{ backgroundColor: T.accent, color: T.bg }}
                onClick={() => setMobileOpen(false)}
              >
                Book Discovery Call <ArrowRight size={14} />
              </a>
            </motion.div>
          )}
        </nav>

        {/* ── Hero ────────────────────────────────────────────────── */}
        <section
          className="min-h-screen pt-[68px] flex items-center"
          style={{ backgroundColor: T.bg }}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full py-24 lg:py-32">
            <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 xl:gap-24 items-center">
              {/* Left */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55 }}
                  className="inline-flex items-center gap-2.5 rounded-full border px-4 py-2 mb-8"
                  style={{ borderColor: T.border, backgroundColor: T.surface }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: T.accent }}
                  />
                  <span
                    className="text-xs font-medium tracking-wide"
                    style={{ color: T.sub }}
                  >
                    Software Solutions Studio · Est. 2022
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.72, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-semibold leading-[1.05] tracking-tight mb-8"
                  style={{
                    color: T.heading,
                    fontFamily: T.display,
                    fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)",
                  }}
                >
                  Websites and AI Systems Built to{" "}
                  <span style={{ color: T.accent }}>Scale Modern</span> Businesses.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.24 }}
                  className="text-base lg:text-[17px] leading-relaxed mb-10 max-w-[500px]"
                  style={{ color: T.body }}
                >
                  We design and build digital products that drive measurable growth — from
                  conversion-optimized websites to intelligent AI automation systems that
                  compound your competitive advantage.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.34 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-[13px] font-semibold transition-all duration-200 hover:gap-3.5 hover:opacity-90"
                    style={{ backgroundColor: T.accent, color: T.bg }}
                  >
                    Start a Project <ArrowRight size={15} />
                  </a>
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-[13px] font-medium border transition-all duration-200"
                    style={{
                      borderColor: T.border,
                      color: T.body,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = T.accent;
                      (e.currentTarget as HTMLElement).style.color = T.heading;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = T.border;
                      (e.currentTarget as HTMLElement).style.color = T.body;
                    }}
                  >
                    View Our Work
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="flex items-center gap-0 mt-12 pt-10 border-t"
                  style={{ borderColor: T.border }}
                >
                  {[
                    { value: "100+", label: "Projects Delivered" },
                    { value: "4yr", label: "Studio Experience" },
                    { value: "95%+", label: "Happy Clients" },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className="flex-1 pr-6"
                      style={{
                        borderRight: i < 2 ? `1px solid ${T.border}` : "none",
                        marginRight: i < 2 ? "1.5rem" : 0,
                      }}
                    >
                      <div
                        className="text-2xl font-semibold leading-none mb-1"
                        style={{ color: T.heading, fontFamily: T.display }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-[11px]" style={{ color: T.sub }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <HeroVisual />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Client trust bar ─────────────────────────────────────── */}
        <section
          className="py-14 border-y overflow-hidden"
          style={{ borderColor: T.border, backgroundColor: T.surface }}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <p
              className="text-[10px] font-semibold tracking-[0.2em] uppercase text-center mb-10"
              style={{ color: T.sub }}
            >
              Trusted by forward-thinking companies
            </p>
            
            <div className="relative w-full overflow-hidden py-2 flex">
              {/* Left & Right Gradient Overlays for premium fading edge effect */}
              <div 
                className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(to right, ${T.surface}, transparent)`,
                }}
              />
              <div 
                className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(to left, ${T.surface}, transparent)`,
                }}
              />
              
              {/* Scrolling Wrapper */}
              <motion.div
                className="flex w-max"
                animate={{ x: ["-50%", "0%"] }}
                transition={{
                  ease: "linear",
                  duration: 20,
                  repeat: Infinity,
                }}
              >
                {/* Group 1 */}
                <div className="flex gap-20 pr-20 items-center flex-shrink-0">
                  {clientLogos.map((client, idx) => (
                    <img 
                      key={`g1-${idx}`} 
                      src={client.src} 
                      alt={client.name} 
                      className="h-16 w-auto object-contain rounded-2xl opacity-75 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer" 
                    />
                  ))}
                </div>
                {/* Group 2 */}
                <div className="flex gap-20 pr-20 items-center flex-shrink-0">
                  {clientLogos.map((client, idx) => (
                    <img 
                      key={`g2-${idx}`} 
                      src={client.src} 
                      alt={client.name} 
                      className="h-16 w-auto object-contain rounded-2xl opacity-75 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer" 
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Services ──────────────────────────────────────────────── */}
        <section id="services" className="py-28 lg:py-36">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
              <FadeUp>
                <SectionLabel>Our Services</SectionLabel>
                <h2
                  className="font-semibold leading-[0.95] tracking-tight max-w-[8ch]"
                  style={{
                    color: T.heading,
                    fontFamily: T.display,
                    fontSize: "clamp(3rem, 6vw, 5.2rem)",
                  }}
                >
                  Three disciplines.
                  <br />
                  One studio.
                </h2>
                <p
                  className="mt-6 text-base lg:text-lg leading-relaxed max-w-[640px]"
                  style={{ color: T.body }}
                >
                  Design, development and AI automation working together to build high-performing
                  digital experiences.
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="relative hidden lg:block h-[420px]">
                  <div
                    className="absolute inset-0 rounded-[28px] border"
                    style={{ borderColor: T.border, backgroundColor: "rgba(255,255,255,0.01)" }}
                  />
                  <div
                    className="absolute left-10 bottom-8 w-[260px] h-[260px] rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(124,154,93,0.2) 0%, rgba(124,154,93,0.08) 30%, rgba(124,154,93,0) 72%)",
                    }}
                  />
                  {[
                    { label: "🌐 Design", x: 34, y: 34, rotate: -8, delay: 0 },
                    { label: "</> Development", x: 160, y: 70, rotate: 6, delay: 0.8 },
                    { label: "🤖 Automation", x: 96, y: 170, rotate: -2, delay: 1.4 },
                  ].map((card) => (
                    <motion.div
                      key={card.label}
                      animate={{ y: [0, -10, 0], rotate: [card.rotate, card.rotate + 1.5, card.rotate] }}
                      transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
                      className="absolute rounded-[24px] border backdrop-blur-xl px-5 py-4 shadow-[0_16px_60px_rgba(0,0,0,0.35)]"
                      style={{
                        left: card.x,
                        top: card.y,
                        width: 180,
                        backgroundColor: "rgba(17,23,20,0.72)",
                        borderColor: "rgba(28,43,34,0.9)",
                      }}
                    >
                      <div className="text-[10px] uppercase tracking-[0.22em] mb-3" style={{ color: T.accent, fontFamily: T.mono }}>
                        Floating card
                      </div>
                      <div className="text-lg font-semibold" style={{ color: T.heading, fontFamily: T.display }}>
                        {card.label}
                      </div>
                    </motion.div>
                  ))}
                  <div
                    className="absolute right-8 top-24 w-[190px] h-[190px] rounded-[42px] border"
                    style={{ borderColor: `${T.accent}35`, boxShadow: `0 0 0 1px ${T.accent}10, 0 0 60px ${T.accent}12` }}
                  />
                </div>
              </FadeUp>
            </div>

            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {serviceCards.map((card, index) => (
                <FadeUp key={card.title} delay={index * 0.1} className={card.span}>
                  <motion.article
                    initial={{ y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" }}
                    whileHover={{
                      y: -8,
                      boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="group relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-[24px] border p-7 lg:p-8"
                    style={{ backgroundColor: T.surface, borderColor: T.border }}
                  >
                    <div className="flex items-start justify-between">
                      <motion.div
                        whileHover={{ rotate: card.title === "Build" ? -6 : card.title === "Automate" ? 6 : -3 }}
                        transition={{ type: "spring", stiffness: 220, damping: 14 }}
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border"
                        style={{ borderColor: T.border, backgroundColor: T.bg }}
                      >
                        <span className="text-2xl leading-none" aria-hidden="true">
                          {card.symbol}
                        </span>
                      </motion.div>
                      <span className="text-[11px] uppercase tracking-[0.24em]" style={{ color: T.sub, fontFamily: T.mono }}>
                        {card.number}
                      </span>
                    </div>

                    <h3 className="mt-10 text-[2rem] font-semibold leading-tight" style={{ color: T.heading, fontFamily: T.display }}>
                      {card.title}
                    </h3>
                    <p
                      className="mt-4 min-h-[3.25em] max-w-[20ch] text-[1rem] font-medium leading-relaxed"
                      style={{ color: T.accent }}
                    >
                      {card.subtitle}
                    </p>
                    <p
                      className="mt-5 min-h-[5.25em] max-w-[26ch] text-[13px] leading-relaxed"
                      style={{ color: T.body }}
                    >
                      {card.title === "Design"
                        ? "We design clean, user-focused interfaces that reflect your brand and drive results."
                        : card.title === "Build"
                          ? "From business websites to custom web applications, we build fast, secure and future-ready solutions."
                          : "We build intelligent automations using n8n and Zapier to streamline your operations."}
                    </p>

                    <div className="mt-auto min-h-[7.25rem] pt-10">
                      <div className="flex flex-wrap gap-3 transition-transform duration-300 group-hover:-translate-y-1">
                        {card.logos.map((logo) => (
                          <div
                            key={logo.name}
                            className="flex h-11 items-center justify-center rounded-xl border px-3"
                            style={{ borderColor: T.border, backgroundColor: T.bg }}
                          >
                            {logo.src ? (
                              <img
                                src={logo.src}
                                alt={logo.name}
                                className="h-5 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                                style={{ opacity: 1 }}
                              />
                            ) : (
                              <span className="text-[12px] font-medium" style={{ color: T.heading }}>
                                {logo.name}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      <motion.a
                        href="#contact"
                        whileHover={{ x: 4 }}
                        className="mt-10 inline-flex items-center gap-2 text-[13px] font-medium transition-colors duration-200"
                        style={{ color: T.accent }}
                      >
                        {card.cta} <ArrowUpRight size={14} />
                      </motion.a>
                    </div>

                    <div
                      className="absolute inset-x-6 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ backgroundColor: T.accent }}
                    />
                  </motion.article>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.12} className="mt-8">
              <section className="rounded-[24px] border p-6 lg:p-8" style={{ backgroundColor: T.surface, borderColor: T.border }}>
                <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] items-center">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-4" style={{ color: T.accent, fontFamily: T.sans }}>
                      Development
                    </div>
                    <h3 className="max-w-[11ch] text-[2rem] font-semibold leading-[0.98]" style={{ color: T.heading, fontFamily: T.display }}>
                      Web development that performs.
                    </h3>
                    <p className="mt-5 max-w-[34ch] text-[13px] leading-relaxed" style={{ color: T.body }}>
                      We build everything from high-converting business websites to complex web applications.
                    </p>
                    <motion.a
                      href="#work"
                      whileHover={{ x: 4 }}
                      className="mt-8 inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-[13px] font-medium"
                      style={{ borderColor: T.border, color: T.heading, backgroundColor: T.bg }}
                    >
                      View Portfolio <ArrowUpRight size={14} />
                    </motion.a>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        title: "React",
                        logo: new URL("../assets/expertise/react_logo.webp", import.meta.url).href,
                        desc: "Custom web applications built using React.",
                      },
                      {
                        title: "WordPress",
                        logo: new URL("../assets/expertise/wordpress_logo.webp", import.meta.url).href,
                        desc: "SEO-friendly business websites.",
                      },
                      {
                        title: "Shopify",
                        logo: new URL("../assets/expertise/shopify_logo.png", import.meta.url).href,
                        desc: "High-converting ecommerce stores.",
                      },
                      {
                        title: "Webflow",
                        logo: new URL("../assets/expertise/webflow_logo.png", import.meta.url).href,
                        desc: "Pixel-perfect marketing websites.",
                      },
                      {
                        title: "Framer",
                        logo: new URL("../assets/expertise/framer_logo.svg", import.meta.url).href,
                        desc: "Interactive animated websites.",
                      },
                    ].map((item, index) => (
                      <motion.article
                        key={item.title}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.45 }}
                        transition={{ delay: index * 0.06, duration: 0.45 }}
                        whileHover={{ y: -4 }}
                        className="rounded-2xl border p-4"
                        style={{ backgroundColor: T.bg, borderColor: T.border }}
                      >
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <img
                            src={item.logo}
                            alt={item.title}
                            className="h-7 w-auto object-contain transition-all duration-300"
                            style={{ opacity: 1 }}
                          />
                          <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: T.sub, fontFamily: T.mono }}>
                            {item.title}
                          </span>
                        </div>
                        <p className="text-[12px] leading-relaxed" style={{ color: T.body }}>
                          {item.desc}
                        </p>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </section>
            </FadeUp>

            <FadeUp delay={0.18} className="mt-8">
              <section className="rounded-[24px] border p-6 lg:p-8" style={{ backgroundColor: T.surface, borderColor: T.border }}>
                <div className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] mb-6" style={{ color: T.accent, fontFamily: T.sans }}>
                  Technologies We Work With
                </div>
                <div
                  className="overflow-hidden"
                  onMouseEnter={() => setMarqueePaused(true)}
                  onMouseLeave={() => setMarqueePaused(false)}
                >
                  <div
                    className="flex w-max gap-4"
                    style={{
                      animation: "services-marquee 28s linear infinite",
                      animationPlayState: marqueePaused ? "paused" : "running",
                    }}
                  >
                    {[...section4TechLogos, ...section4TechLogos].map((tech, index) => (
                      <div
                        key={`${tech.name}-${index}`}
                        className="flex h-14 min-w-[140px] items-center gap-3 rounded-full border px-4 transition-all duration-300 hover:border-[#2F4A39]"
                        style={{ borderColor: T.border, backgroundColor: T.bg }}
                      >
                        {tech.src ? (
                          <img
                            src={tech.src}
                            alt={tech.name}
                            className="h-6 w-auto object-contain transition-all duration-300 hover:scale-105"
                            style={{ opacity: 1 }}
                          />
                        ) : (
                          <span className="text-[13px] font-medium" style={{ color: T.heading }}>
                            {tech.name}
                          </span>
                        )}
                        <span className="text-[12px]" style={{ color: T.sub }}>
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </FadeUp>
          </div>
        </section>

        {/* ── Featured Work ─────────────────────────────────────────── */}
        <section
          id="work"
          className="py-32 lg:py-40 border-t"
          style={{ borderColor: T.border, backgroundColor: T.surface }}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <FadeUp>
              <div className="flex items-end justify-between mb-16 gap-8">
                <div>
                  <SectionLabel>Featured Work</SectionLabel>
                  <h2
                    className="font-semibold leading-tight tracking-tight max-w-[380px]"
                    style={{
                      color: T.heading,
                      fontFamily: T.display,
                      fontSize: "clamp(2rem, 3.5vw, 3rem)",
                    }}
                  >
                    Selected projects.
                  </h2>
                </div>
                <a
                  href="#contact"
                  className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium pb-px border-b transition-all duration-200 flex-shrink-0"
                  style={{ color: T.sub, borderColor: T.border }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = T.accent;
                    (e.currentTarget as HTMLElement).style.color = T.heading;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = T.border;
                    (e.currentTarget as HTMLElement).style.color = T.sub;
                  }}
                >
                  View all work <ArrowUpRight size={13} />
                </a>
              </div>
            </FadeUp>

            <div className="grid grid-flow-dense gap-6 md:grid-cols-2 xl:grid-cols-4 auto-rows-[160px] xl:auto-rows-[180px]">
              {work.map((proj, i) => (
                <FadeUp key={proj.name} delay={i * 0.08} className={proj.className}>
                  <a
                    href={proj.liveUrl}
                    className="group relative block h-full overflow-hidden rounded-[1.6rem] border transition-all duration-300 cursor-pointer"
                    style={{ borderColor: T.border, backgroundColor: T.bg }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = T.forest;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = T.border;
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: `${proj.color}08` }}
                    />
                    <img
                      src={proj.image}
                      alt={proj.name}
                      className="relative h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-4 text-[10px] uppercase tracking-[0.24em] text-white/60">
                      <span style={{ fontFamily: T.mono }}>Featured {String(i + 1).padStart(2, "0")}</span>
                      <ArrowUpRight size={14} className="text-white/70" />
                    </div>
                    <div className="absolute inset-0 border border-white/0 transition-colors duration-300 group-hover:border-white/10" />
                  </a>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ─────────────────────────────────────────── */}
        <section className="py-32 lg:py-40 border-t" style={{ borderColor: T.border }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24 items-start">
              <FadeUp>
                <SectionLabel>Why ShafinitySol</SectionLabel>
                <h2
                  className="font-semibold leading-tight tracking-tight mb-7"
                  style={{
                    color: T.heading,
                    fontFamily: T.display,
                    fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  }}
                >
                  Not just another agency.
                </h2>
                <p className="text-base leading-relaxed mb-5" style={{ color: T.body }}>
                  Most agencies sell you a process. We sell you outcomes. Every decision we
                  make — from architecture to UI — is measured against one question: does this
                  drive measurable business value?
                </p>
                <p className="text-base leading-relaxed mb-5" style={{ color: T.body }}>
                  We stay small intentionally. Small means every client gets senior attention,
                  not junior hand-offs. Small means we move fast, communicate clearly, and
                  take real ownership of results.
                </p>
                <p className="text-base leading-relaxed" style={{ color: T.body }}>
                  Over 8 years, we've built a studio culture where craft, strategy, and
                  accountability aren't buzzwords — they're how we operate, every day.
                </p>
              </FadeUp>

              <div className="grid sm:grid-cols-2 gap-4">
                {differentiators.map((item, i) => (
                  <FadeUp key={item.title} delay={i * 0.07}>
                    <div
                      className="rounded-xl border p-5 h-full transition-all duration-250"
                      style={{ backgroundColor: T.surface, borderColor: T.border }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = T.forest;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = T.border;
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${T.accent}15` }}
                      >
                        <item.Icon size={14} style={{ color: T.accent }} />
                      </div>
                      <h4
                        className="text-sm font-semibold mb-1.5"
                        style={{ color: T.heading, fontFamily: T.display }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-[12px] leading-relaxed" style={{ color: T.sub }}>
                        {item.desc}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Process ───────────────────────────────────────────────── */}
        <section
          id="process"
          className="py-32 lg:py-40 border-t"
          style={{ borderColor: T.border, backgroundColor: T.surface }}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <FadeUp className="text-center mb-20">
              <SectionLabel>Process</SectionLabel>
              <h2
                className="font-semibold leading-tight tracking-tight"
                style={{
                  color: T.heading,
                  fontFamily: T.display,
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                }}
              >
                How we work.
              </h2>
            </FadeUp>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
              {processSteps.map((step, i) => (
                <FadeUp key={step.label} delay={i * 0.08}>
                  <div className="relative text-center">
                    {/* Step number badge */}
                    <div className="flex justify-center mb-5">
                      <div
                        className="w-14 h-14 rounded-2xl border flex items-center justify-center"
                        style={{ backgroundColor: T.bg, borderColor: T.border }}
                      >
                        <span
                          className="text-sm font-medium"
                          style={{ color: T.accent, fontFamily: T.mono }}
                        >
                          {step.n}
                        </span>
                      </div>
                    </div>

                    {/* Connector (hidden on mobile) */}
                    {i < 5 && (
                      <div
                        className="hidden lg:block absolute top-7 left-[calc(50%+28px)] right-[-50%] h-px"
                        style={{ backgroundColor: T.border }}
                      />
                    )}

                    <h4
                      className="text-sm font-semibold mb-2"
                      style={{ color: T.heading, fontFamily: T.display }}
                    >
                      {step.label}
                    </h4>
                    <p className="text-[11px] leading-relaxed" style={{ color: T.sub }}>
                      {step.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────────────────────── */}
        <section
          className="py-32 lg:py-40 border-t"
          style={{ borderColor: T.border, backgroundColor: T.surface }}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <FadeUp className="text-center mb-16">
              <SectionLabel>Client Results</SectionLabel>
              <h2
                className="font-semibold leading-tight tracking-tight"
                style={{
                  color: T.heading,
                  fontFamily: T.display,
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                }}
              >
                What clients say.
              </h2>
            </FadeUp>

            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <FadeUp key={t.name} delay={i * 0.1}>
                  <div
                    className="rounded-2xl border p-7 h-full flex flex-col"
                    style={{ backgroundColor: T.bg, borderColor: T.border }}
                  >
                    {/* Subtle rating indicator */}
                    <div className="flex gap-1.5 mb-6">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div
                          key={j}
                          className="h-0.5 flex-1 rounded-full"
                          style={{ backgroundColor: j < 4 ? T.accent : `${T.accent}40` }}
                        />
                      ))}
                    </div>
                    <p
                      className="text-[13px] leading-relaxed flex-1 mb-6"
                      style={{ color: T.body }}
                    >
                      "{t.quote}"
                    </p>
                    <div
                      className="flex items-center gap-3 pt-5 border-t"
                      style={{ borderColor: T.border }}
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                        style={{
                          backgroundColor: `${T.accent}18`,
                          color: T.accent,
                          fontFamily: T.display,
                        }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <div
                          className="text-sm font-semibold"
                          style={{ color: T.heading }}
                        >
                          {t.name}
                        </div>
                        <div className="text-[11px]" style={{ color: T.sub }}>
                          {t.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ─────────────────────────────────────────────────── */}
        <section
          id="about"
          className="py-32 lg:py-40 border-t"
          style={{ borderColor: T.border }}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">
              <FadeUp>
                <SectionLabel>About the Studio</SectionLabel>
                <h2
                  className="font-semibold leading-tight tracking-tight mb-8"
                  style={{
                    color: T.heading,
                    fontFamily: T.display,
                    fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  }}
                >
                  Built by practitioners, not managers.
                </h2>
                <p className="text-base leading-relaxed mb-5" style={{ color: T.body }}>
                  ShafinitySol was founded in 2016 by a pair of designers and engineers who were
                  frustrated with how most agencies operated — overpromising, underdelivering,
                  and treating clients as accounts rather than partners.
                </p>
                <p className="text-base leading-relaxed mb-5" style={{ color: T.body }}>
                  We've remained small by choice. Every client works directly with senior
                  practitioners who've shipped products used by millions. No account managers,
                  no hand-offs to juniors, no bait-and-switch teams.
                </p>
                <p className="text-base leading-relaxed" style={{ color: T.body }}>
                  In 2023, we formalized our AI practice — not because it was trending, but
                  because we'd been using AI tools internally for years and recognized the
                  opportunity to help clients extract genuine, compounding value.
                </p>
              </FadeUp>

              <div className="grid sm:grid-cols-2 gap-4">
                {team.map((member, i) => (
                  <FadeUp key={member.name} delay={i * 0.08}>
                    <div
                      className="rounded-xl border p-5 h-full transition-all duration-250"
                      style={{ backgroundColor: T.surface, borderColor: T.border }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = T.forest;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = T.border;
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold mb-4"
                        style={{
                          backgroundColor: `${T.accent}18`,
                          color: T.accent,
                          fontFamily: T.display,
                        }}
                      >
                        {member.initials}
                      </div>
                      <div
                        className="font-semibold text-sm mb-0.5"
                        style={{ color: T.heading, fontFamily: T.display }}
                      >
                        {member.name}
                      </div>
                      <div className="text-[11px] mb-3" style={{ color: T.accent }}>
                        {member.role}
                      </div>
                      <p className="text-[11px] leading-relaxed" style={{ color: T.sub }}>
                        {member.bio}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section
          className="py-32 lg:py-40 border-t"
          style={{ borderColor: T.border, backgroundColor: T.surface }}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 items-start">
              <FadeUp>
                <SectionLabel>FAQ</SectionLabel>
                <h2
                  className="font-semibold leading-tight tracking-tight mb-5"
                  style={{
                    color: T.heading,
                    fontFamily: T.display,
                    fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  }}
                >
                  Common questions.
                </h2>
                <p className="text-base leading-relaxed" style={{ color: T.body }}>
                  Answers to the questions we hear most often. Don't see yours?{" "}
                  <a href="#contact" style={{ color: T.accent }}>
                    Reach out directly.
                  </a>
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <Accordion.Root type="single" collapsible className="space-y-2.5">
                  {faqs.map((faq, i) => (
                    <Accordion.Item
                      key={i}
                      value={`faq-${i}`}
                      className="rounded-xl border overflow-hidden"
                      style={{ borderColor: T.border, backgroundColor: T.bg }}
                    >
                      <Accordion.Trigger
                        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group outline-none"
                        style={{ color: T.heading }}
                      >
                        <span
                          className="text-sm font-medium"
                          style={{ fontFamily: T.display }}
                        >
                          {faq.q}
                        </span>
                        <ChevronDown
                          size={16}
                          className="flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
                          style={{ color: T.accent }}
                        />
                      </Accordion.Trigger>
                      <Accordion.Content>
                        <div
                          className="px-6 pb-5 text-[13px] leading-relaxed"
                          style={{ color: T.body }}
                        >
                          {faq.a}
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── Contact ───────────────────────────────────────────────── */}
        <section id="contact" className="py-32 lg:py-40 border-t" style={{ borderColor: T.border }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
              <FadeUp>
                <SectionLabel>Contact</SectionLabel>
                <h2
                  className="font-semibold leading-tight tracking-tight mb-6"
                  style={{
                    color: T.heading,
                    fontFamily: T.display,
                    fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  }}
                >
                  Let's build something exceptional.
                </h2>
                <p className="text-base leading-relaxed mb-12" style={{ color: T.body }}>
                  Tell us about your project. We'll schedule a 30-minute discovery call to
                  understand your goals and share exactly how we'd approach them.
                </p>
                <div className="space-y-7">
                  {[
                    { label: "Email", value: "shafinity.solutions@gmail.com" },
                    { label: "Response time", value: "Within 24 hours" },
                    { label: "Availability", value: "Currently accepting new projects" },
                    { label: "Typical project size", value: "Starting from $999" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div
                        className="text-[10px] font-semibold tracking-widest uppercase mb-1"
                        style={{ color: T.sub, fontFamily: T.mono }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="text-sm font-medium"
                        style={{ color: T.heading }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div
                  className="rounded-2xl border p-7 lg:p-10"
                  style={{ backgroundColor: T.surface, borderColor: T.border }}
                >
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {(["name", "email"] as const).map((field) => (
                        <div key={field}>
                          <label
                            className="block text-[11px] font-semibold mb-2 tracking-wide uppercase"
                            style={{ color: T.sub }}
                          >
                            {field === "email" ? "Work Email" : "Full Name"}
                          </label>
                          <input
                            type={field === "email" ? "email" : "text"}
                            value={form[field]}
                            disabled={isSubmitting}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, [field]: e.target.value }))
                            }
                            placeholder={field === "email" ? "you@company.com" : "Your name"}
                            className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 disabled:opacity-60"
                            style={{
                              backgroundColor: T.bg,
                              borderColor: T.border,
                              color: T.heading,
                              fontFamily: T.sans,
                            }}
                            onFocus={(e) =>
                              ((e.target as HTMLElement).style.borderColor = T.accent)
                            }
                            onBlur={(e) =>
                              ((e.target as HTMLElement).style.borderColor = T.border)
                            }
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label
                        className="block text-[11px] font-semibold mb-2 tracking-wide uppercase"
                        style={{ color: T.sub }}
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        disabled={isSubmitting}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, company: e.target.value }))
                        }
                        placeholder="Your company"
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 disabled:opacity-60"
                        style={{
                          backgroundColor: T.bg,
                          borderColor: T.border,
                          color: T.heading,
                          fontFamily: T.sans,
                        }}
                        onFocus={(e) =>
                          ((e.target as HTMLElement).style.borderColor = T.accent)
                        }
                        onBlur={(e) =>
                          ((e.target as HTMLElement).style.borderColor = T.border)
                        }
                      />
                    </div>

                    <div>
                      <label
                        className="block text-[11px] font-semibold mb-2 tracking-wide uppercase"
                        style={{ color: T.sub }}
                      >
                        Service of Interest
                      </label>
                      <select
                        value={form.service}
                        disabled={isSubmitting}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, service: e.target.value }))
                        }
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none disabled:opacity-60"
                        style={{
                          backgroundColor: T.bg,
                          borderColor: T.border,
                          color: form.service ? T.heading : T.sub,
                          fontFamily: T.sans,
                        }}
                      >
                        <option value="">Select a service...</option>
                        <option value="design">Website Design</option>
                        <option value="development">Website Development</option>
                        <option value="ai">AI Automation</option>
                        <option value="full">Full Studio Engagement</option>
                      </select>
                    </div>

                    <div>
                      <label
                        className="block text-[11px] font-semibold mb-2 tracking-wide uppercase"
                        style={{ color: T.sub }}
                      >
                        Tell us about your project
                      </label>
                      <textarea
                        value={form.message}
                        disabled={isSubmitting}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                        placeholder="What are you building? What's the goal? What's not working today?"
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none transition-all duration-200 disabled:opacity-60"
                        style={{
                          backgroundColor: T.bg,
                          borderColor: T.border,
                          color: T.heading,
                          fontFamily: T.sans,
                        }}
                        onFocus={(e) =>
                          ((e.target as HTMLElement).style.borderColor = T.accent)
                        }
                        onBlur={(e) =>
                          ((e.target as HTMLElement).style.borderColor = T.border)
                        }
                      />
                    </div>

                    {submitStatus === 'success' && (
                      <div className="p-4 rounded-xl text-sm border font-medium text-center" style={{ backgroundColor: 'rgba(16, 42, 24, 0.6)', borderColor: '#1F4D2B', color: '#4ADE80' }}>
                        {submitMessage}
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="p-4 rounded-xl text-sm border font-medium text-center" style={{ backgroundColor: 'rgba(44, 21, 21, 0.6)', borderColor: '#4A1D1D', color: '#F87171' }}>
                        {submitMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                      style={{ backgroundColor: T.accent, color: T.bg, fontFamily: T.sans }}
                    >
                      {isSubmitting ? 'Sending...' : 'Book Discovery Call'} <ArrowRight size={15} />
                    </button>

                    <p className="text-[11px] text-center" style={{ color: T.sub }}>
                      No commitment. 30-minute call. Response within 24 hours.
                    </p>
                  </form>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────────────── */}
        <footer
          className="border-t py-10"
          style={{ borderColor: T.border, backgroundColor: T.surface }}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <span
                className="text-base font-semibold tracking-tight"
                style={{ color: T.heading, fontFamily: T.display }}
              >
                ShafinitySol
              </span>
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-[11px] transition-colors duration-200 hover:text-[#F4F5F2]"
                    style={{ color: T.sub }}
                  >
                    {link}
                  </a>
                ))}
              </div>
              <div className="text-[11px] text-center sm:text-right" style={{ color: T.sub }}>
                <p>Isla Mujeres, Cancun, Mexico</p>
                <p>© 2022 ShafinitySol. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
