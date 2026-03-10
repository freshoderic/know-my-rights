import React, { useState, useMemo } from "react";

const FL = {
  name: "Florida",
  emoji: "🌴",
  accent: "#1a3a6b",
  accentLight: "#e8eef8",
  accentDark: "#0a1628",
  tag: "FL",
  note: "Florida Statute §856.021 requires name + address if stopped with reasonable suspicion.",
};

const GA = {
  name: "Georgia",
  emoji: "🍑",
  accent: "#8b0000",
  accentLight: "#fdf0f0",
  accentDark: "#5a0000",
  tag: "GA",
  note: "Georgia has NO stop-and-identify law for pedestrians. O.C.G.A. §16-10-24 (obstruction) is broad — stay calm.",
};

const CARDS = [
  {
    id: "encounter-types",
    category: "The Basics",
    icon: "⚖️",
    title: "3 Types of Encounters",
    tags: ["must-know", "both"],
    content: {
      sections: [
        {
          label: "① Consensual Contact",
          color: "green",
          body: "Officer approaches voluntarily. You are FREE TO LEAVE. No obligation to stop, answer, or show ID.",
          phrase: '"Am I free to go?"',
        },
        {
          label: "② Investigative Stop (Terry Stop)",
          color: "amber",
          body: "Officer has reasonable suspicion of a crime. You must stop. Limited rights apply.",
          phrase: '"I am invoking my right to remain silent."',
          stateNote: {
            FL: "Florida: Must provide name & address if stopped.",
            GA: "Georgia: NO stop-and-identify law — you are not required to give your name on foot.",
          },
        },
        {
          label: "③ Arrest",
          color: "red",
          body: "You are being detained/arrested. Do NOT physically resist — ever. Assert rights verbally.",
          phrase: '"I want a lawyer. I won\'t answer questions."',
        },
      ],
    },
  },
  {
    id: "id-laws",
    category: "ID & Identification",
    icon: "🪪",
    title: "When Must You Show ID?",
    tags: ["identification", "both"],
    content: {
      rows: [
        {
          situation: "Walking / On Foot",
          FL: { required: true, detail: "Must give name & address if police have reasonable suspicion. Stating your name is enough — no physical ID required." },
          GA: { required: false, detail: "NOT required to give name or ID on foot. Georgia has no stop-and-identify law for pedestrians." },
        },
        {
          situation: "Driving a Vehicle",
          FL: { required: true, detail: "Must show driver's license, registration, and proof of insurance." },
          GA: { required: true, detail: "Must show driver's license, registration, and proof of insurance. (O.C.G.A. §40-5-29)" },
        },
        {
          situation: "Passenger in a Car",
          FL: { required: false, detail: "NOT required to show ID unless police have reasonable suspicion you committed a crime." },
          GA: { required: false, detail: "NOT required to show ID unless police have specific suspicion connecting you to a crime." },
        },
        {
          situation: "If Arrested",
          FL: { required: true, detail: "Must identify yourself once arrested." },
          GA: { required: true, detail: "Must identify yourself once formally arrested." },
        },
      ],
    },
  },
  {
    id: "searches",
    category: "Searches",
    icon: "🔍",
    title: "Search Rights (4th Amendment)",
    tags: ["searches", "both"],
    content: {
      bullets: [
        { type: "can-refuse", text: "You can say: \"I do not consent to this search.\" — say it clearly and calmly." },
        { type: "warning", text: "If they search anyway, do NOT physically resist. You can challenge it in court later." },
        { type: "info", text: "Police CAN search without consent if: they have a warrant, you've been arrested, evidence is in plain view, there's an emergency, or (for vehicles) they have probable cause." },
      ],
      phrase: '"I do not consent to this search."',
    },
  },
  {
    id: "silence",
    category: "Right to Silence",
    icon: "🤫",
    title: "Right to Remain Silent",
    tags: ["silence", "both"],
    content: {
      bullets: [
        { type: "info", text: "The 5th Amendment protects you from self-incrimination. Anything you say CAN and WILL be used against you." },
        { type: "warning", text: "CRITICAL: After arrest, silence alone is NOT enough. You must say it OUT LOUD (Berghuis v. Thompkins, 2010)." },
        { type: "can-refuse", text: "Before arrest: You don't have to answer questions beyond identification (where required)." },
        { type: "can-refuse", text: "After arrest: Police must stop questioning once you clearly invoke your rights." },
      ],
      phrases: [
        { label: "Before Arrest", text: '"I am invoking my right to remain silent."' },
        { label: "After Arrest", text: '"I want a lawyer. I will not answer questions without one."' },
      ],
    },
  },
  {
    id: "phone",
    category: "Phone & Recording",
    icon: "📱",
    title: "Your Phone & Recording Police",
    tags: ["phone", "recording", "both"],
    content: {
      bullets: [
        { type: "can-refuse", text: "Police CANNOT search your phone without a warrant — Riley v. California (2014) is federal law." },
        { type: "can-refuse", text: "You have the right to film police in public spaces as long as you don't physically interfere." },
      ],
      stateSpecific: {
        FL: [
          { type: "info", text: "Florida is a TWO-PARTY consent state for private audio recording. However, police in public have no expectation of privacy — you can record them." },
        ],
        GA: [
          { type: "info", text: "Georgia is a ONE-PARTY consent state. You can record any conversation you are part of without informing the other party." },
          { type: "warning", text: "Georgia's obstruction law (O.C.G.A. §16-10-24) is broad. Even verbal argument can potentially be charged. Stay calm and fight it in court." },
        ],
      },
      phrase: '"I do not consent to a search of my phone."',
    },
  },
  {
    id: "if-arrested",
    category: "If Arrested",
    icon: "🚨",
    title: "If You Are Arrested",
    tags: ["arrest", "both"],
    content: {
      bullets: [
        { type: "warning", text: "Do NOT resist physically — even if the arrest is illegal. Resisting can result in additional charges." },
        { type: "can-refuse", text: "You have the right to know why you are being arrested." },
        { type: "can-refuse", text: "You have the right to an attorney. If you can't afford one, one will be appointed to you." },
        { type: "can-refuse", text: "You have the right to remain silent — but you MUST say so out loud." },
        { type: "info", text: "You can be held without charges for up to 48–72 hours before being brought before a judge." },
        { type: "info", text: "Do not sign anything without a lawyer present. Do not answer questions about the incident." },
      ],
      phrase: '"I want a lawyer. I will not answer questions."',
    },
  },
  {
    id: "dos-donts",
    category: "Quick Reference",
    icon: "⚡",
    title: "Do's & Don'ts",
    tags: ["tips", "both"],
    content: {
      dos: [
        "Stay calm — keep hands visible at all times",
        "Ask clearly: \"Am I free to go?\"",
        "Say: \"I invoke my right to remain silent\"",
        "Say: \"I do not consent to this search\"",
        "Ask for a lawyer immediately if arrested",
        "Note the officer's name, badge number, and patrol car number",
        "Write everything down as soon as you safely can",
      ],
      donts: [
        "Argue, yell, or insult the officer",
        "Physically resist, even if you believe the stop is illegal",
        "Lie or give false information — that's a crime",
        "Reach into pockets or bags without being told to",
        "Consent to a search just because you feel pressured",
        "Post about it on social media before talking to a lawyer",
        "Sign anything without reading it or having a lawyer present",
      ],
    },
  },
  {
    id: "resources",
    category: "Help & Resources",
    icon: "📞",
    title: "If Your Rights Were Violated",
    tags: ["resources", "help", "both"],
    content: {
      resources: [
        { state: "FL", name: "ACLU of Florida", url: "aclufl.org", desc: "Free legal resources & know-your-rights materials" },
        { state: "FL", name: "Florida Bar Lawyer Referral", url: "floridabar.org", desc: "Find a licensed attorney in Florida" },
        { state: "GA", name: "ACLU of Georgia", url: "acluga.org", desc: "Free legal resources & know-your-rights materials" },
        { state: "GA", name: "Georgia Legal Aid", url: "georgialegalaid.org", desc: "Free civil legal help for qualifying residents" },
        { state: "both", name: "National Lawyers Guild", url: "nlg.org", desc: "Legal observer network; know-your-rights hotlines" },
      ],
      disclaimer: "This guide is for general educational purposes only and is not legal advice. Laws change. For your specific situation, always consult a licensed attorney.",
    },
  },
];

const CATEGORIES = ["All", "The Basics", "ID & Identification", "Searches", "Right to Silence", "Phone & Recording", "If Arrested", "Quick Reference", "Help & Resources"];

const colorMap = {
  green: { bg: "#e8f5ee", text: "#1a5c34", border: "#a8d8bc" },
  amber: { bg: "#fff8e6", text: "#7a5000", border: "#f0c060" },
  red: { bg: "#fdf0f0", text: "#8b0000", border: "#f0b0b0" },
};

const bulletStyles = {
  "can-refuse": { bg: "#e8f5ee", border: "#a8d8bc", icon: "✅", text: "#1a5c34" },
  warning: { bg: "#fff8e6", border: "#f0c060", icon: "⚠️", text: "#7a5000" },
  info: { bg: "#e8f0ff", border: "#b0c8f8", icon: "ℹ️", text: "#1a3a8b" },
};

export default function App() {
  const [state, setState] = useState("FL");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const theme = state === "FL" ? FL : GA;

  const filtered = useMemo(() => {
    return CARDS.filter((card) => {
      const matchCat = category === "All" || card.category === category;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        card.title.toLowerCase().includes(q) ||
        card.category.toLowerCase().includes(q) ||
        card.tags.some((t) => t.includes(q));
      return matchCat && matchSearch;
    });
  }, [search, category]);

  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#f5f5f0", minHeight: "100vh", paddingBottom: 40 }}>
      {/* HEADER */}
      <div style={{ background: theme.accentDark, color: "#fff", padding: "0 0 0 0", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "16px 16px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#aabbcc", fontWeight: 600, marginBottom: 2 }}>
                Pocket Reference
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1 }}>
                Know Your Rights
              </div>
            </div>

            {/* STATE TOGGLE */}
            <div style={{ display: "flex", background: "rgba(255,255,255,0.1)", borderRadius: 40, padding: 3, gap: 2 }}>
              {["FL", "GA"].map((s) => {
                const t = s === "FL" ? FL : GA;
                const active = state === s;
                return (
                  <button
                    key={s}
                    onClick={() => { setState(s); setExpanded(null); }}
                    style={{
                      background: active ? t.accent : "transparent",
                      color: active ? "#fff" : "rgba(255,255,255,0.6)",
                      border: "none",
                      borderRadius: 36,
                      padding: "8px 16px",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      letterSpacing: 0.5,
                    }}
                  >
                    {t.emoji} {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STATE NOTE */}
          <div style={{ background: "rgba(255,255,255,0.08)", borderLeft: `3px solid ${theme.accent}`, padding: "7px 12px", borderRadius: "0 4px 4px 0", marginBottom: 14, fontSize: 11.5, color: "#d0ddf0", lineHeight: 1.4 }}>
            {theme.note}
          </div>

          {/* SEARCH */}
          <div style={{ position: "relative", marginBottom: 14 }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, opacity: 0.5 }}>🔎</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search rights, situations, keywords…"
              style={{
                width: "100%",
                padding: "10px 12px 10px 36px",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 8,
                color: "#fff",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* CATEGORY TABS */}
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 14, scrollbarWidth: "none" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  flexShrink: 0,
                  background: category === cat ? theme.accent : "rgba(255,255,255,0.1)",
                  color: category === cat ? "#fff" : "rgba(255,255,255,0.65)",
                  border: "none",
                  borderRadius: 20,
                  padding: "5px 13px",
                  fontSize: 12,
                  fontWeight: category === cat ? 700 : 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CARDS */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "16px 12px 0" }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#888", fontSize: 15 }}>
            No results found for "{search}"
          </div>
        )}

        {filtered.map((card) => {
          const isOpen = expanded === card.id;
          return (
            <div
              key={card.id}
              style={{
                background: "#fff",
                borderRadius: 12,
                marginBottom: 10,
                overflow: "hidden",
                boxShadow: isOpen ? "0 4px 20px rgba(0,0,0,0.12)" : "0 1px 4px rgba(0,0,0,0.07)",
                border: isOpen ? `2px solid ${theme.accent}` : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {/* CARD HEADER */}
              <button
                onClick={() => toggle(card.id)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: 22, lineHeight: 1 }}>{card.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: theme.accent, fontWeight: 700, marginBottom: 2 }}>
                    {card.category}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", letterSpacing: "-0.2px" }}>
                    {card.title}
                  </div>
                </div>
                <span style={{
                  fontSize: 18,
                  color: theme.accent,
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                  lineHeight: 1,
                }}>▾</span>
              </button>

              {/* CARD BODY */}
              {isOpen && (
                <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${theme.accentLight}` }}>
                  <CardBody card={card} state={state} theme={theme} />
                </div>
              )}
            </div>
          );
        })}

        {/* DISCLAIMER */}
        <div style={{ textAlign: "center", padding: "24px 16px 8px", fontSize: 11, color: "#999", lineHeight: 1.5 }}>
          ⚠️ This app is for general educational purposes only and is not legal advice.<br />
          Laws can change. For your specific situation, always consult a licensed attorney.
        </div>
      </div>
    </div>
  );
}

function Phrase({ text }) {
  return (
    <div style={{ background: "#1a2640", color: "#fff", borderRadius: 8, padding: "10px 14px", margin: "10px 0", fontWeight: 700, fontSize: 14, letterSpacing: "-0.2px" }}>
      <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#7a9bc8", marginBottom: 4 }}>SAY THIS</div>
      {text}
    </div>
  );
}

function BulletItem({ item }) {
  const s = bulletStyles[item.type] || bulletStyles.info;
  return (
    <div style={{ display: "flex", gap: 10, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, padding: "9px 12px", marginBottom: 7 }}>
      <span style={{ fontSize: 14, lineHeight: 1.5 }}>{s.icon}</span>
      <span style={{ fontSize: 13, color: "#2a2a3e", lineHeight: 1.5 }}>{item.text}</span>
    </div>
  );
}

function CardBody({ card, state, theme }) {
  const c = card.content;

  // Encounter types
  if (c.sections) {
    return (
      <div style={{ marginTop: 12 }}>
        {c.sections.map((sec, i) => {
          const col = colorMap[sec.color];
          return (
            <div key={i} style={{ background: col.bg, border: `1px solid ${col.border}`, borderRadius: 8, padding: "11px 13px", marginBottom: 9 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: col.text, marginBottom: 5, letterSpacing: "-0.2px" }}>{sec.label}</div>
              <div style={{ fontSize: 13, color: "#2a2a3e", marginBottom: 7, lineHeight: 1.5 }}>{sec.body}</div>
              {sec.stateNote && (
                <div style={{ fontSize: 12, background: "rgba(255,255,255,0.7)", borderRadius: 6, padding: "6px 10px", marginBottom: 6, color: "#444", borderLeft: `3px solid ${col.border}` }}>
                  {sec.stateNote[state]}
                </div>
              )}
              <div style={{ background: "#1a2640", color: "#fff", borderRadius: 6, padding: "7px 11px", fontSize: 13, fontWeight: 700 }}>
                <span style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#7a9bc8", display: "block", marginBottom: 2 }}>SAY THIS</span>
                {sec.phrase}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ID rows table
  if (c.rows) {
    return (
      <div style={{ marginTop: 12 }}>
        {c.rows.map((row, i) => {
          const d = row[state];
          return (
            <div key={i} style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e8e8e8", marginBottom: 9 }}>
              <div style={{ background: theme.accentLight, padding: "7px 12px", fontSize: 12, fontWeight: 700, color: theme.accentDark, letterSpacing: 0.3 }}>
                {row.situation}
              </div>
              <div style={{ padding: "9px 12px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{
                  flexShrink: 0,
                  background: d.required ? "#fde8ea" : "#e8f5ee",
                  color: d.required ? "#8b0000" : "#1a5c34",
                  border: `1px solid ${d.required ? "#f0b0b0" : "#a8d8bc"}`,
                  borderRadius: 6,
                  padding: "3px 9px",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}>
                  {d.required ? "Required" : "Not Required"}
                </div>
                <div style={{ fontSize: 13, color: "#2a2a3e", lineHeight: 1.5 }}>{d.detail}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Bullets + phrases + state-specific
  if (c.bullets || c.phrases || c.stateSpecific) {
    return (
      <div style={{ marginTop: 12 }}>
        {c.bullets && c.bullets.map((b, i) => <BulletItem key={i} item={b} />)}
        {c.stateSpecific && c.stateSpecific[state] && (
          <div>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: theme.accent, fontWeight: 700, margin: "10px 0 6px", padding: "4px 10px", background: theme.accentLight, borderRadius: 4, display: "inline-block" }}>
              {state}-Specific
            </div>
            {c.stateSpecific[state].map((b, i) => <BulletItem key={i} item={b} />)}
          </div>
        )}
        {c.phrases && c.phrases.map((p, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <Phrase text={`[${p.label}] ${p.text}`} />
          </div>
        ))}
        {c.phrase && !c.phrases && <Phrase text={c.phrase} />}
      </div>
    );
  }

  // Dos & Don'ts
  if (c.dos) {
    return (
      <div style={{ marginTop: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <div style={{ background: "#1a5c34", color: "#fff", borderRadius: "8px 8px 0 0", padding: "7px 12px", fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>✅ DO</div>
            <div style={{ border: "1px solid #a8d8bc", borderTop: "none", borderRadius: "0 0 8px 8px", overflow: "hidden" }}>
              {c.dos.map((d, i) => (
                <div key={i} style={{ padding: "7px 10px", fontSize: 12, borderBottom: i < c.dos.length - 1 ? "1px solid #e8f5ee" : "none", background: i % 2 === 0 ? "#fff" : "#f6fcf8", lineHeight: 1.4, color: "#1a2e1a" }}>
                  {d}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ background: "#8b0000", color: "#fff", borderRadius: "8px 8px 0 0", padding: "7px 12px", fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>❌ DON'T</div>
            <div style={{ border: "1px solid #f0b0b0", borderTop: "none", borderRadius: "0 0 8px 8px", overflow: "hidden" }}>
              {c.donts.map((d, i) => (
                <div key={i} style={{ padding: "7px 10px", fontSize: 12, borderBottom: i < c.donts.length - 1 ? "1px solid #fde8ea" : "none", background: i % 2 === 0 ? "#fff" : "#fdf8f8", lineHeight: 1.4, color: "#2e1a1a" }}>
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Resources
  if (c.resources) {
    const stateRes = c.resources.filter(r => r.state === state || r.state === "both");
    return (
      <div style={{ marginTop: 12 }}>
        {stateRes.map((r, i) => (
          <div key={i} style={{ border: "1px solid #e0e0e8", borderRadius: 8, padding: "11px 13px", marginBottom: 9, display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 20 }}>🏛️</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 2 }}>{r.name}</div>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>{r.desc}</div>
              <div style={{ fontSize: 12, color: theme.accent, fontWeight: 600 }}>{r.url}</div>
            </div>
          </div>
        ))}
        <div style={{ background: "#fff8e6", border: "1px solid #f0c060", borderRadius: 8, padding: "10px 13px", fontSize: 12, color: "#7a5000", lineHeight: 1.5 }}>
          ⚠️ {c.disclaimer}
        </div>
      </div>
    );
  }

  return null;
}
