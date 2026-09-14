import Link from "next/link";

const steps = [
  ["01", "Listen", "CDM joins your Zoom sales calls through Recall.ai."],
  ["02", "Understand", "AI identifies closed-won deals and extracts the terms that matter."],
  ["03", "Confirm", "One human reviews the extracted terms before anything is sent downstream."],
  ["04", "Route", "Engineering, Finance, and Legal get the right work without the Slack chase."],
];

export default function Home() {
  return <main className="site-shell">
    <nav className="site-nav"><Link href="/" className="brand"><span className="brand-mark">C</span> CDM</Link><div className="nav-links"><Link href="/demo">See the demo</Link><Link href="/run-local">Run locally</Link><Link href="/onboarding" className="nav-cta">Get started</Link></div></nav>
    <section className="hero"><div className="eyebrow">DEAL COORDINATION, WITHOUT THE HANDOFF</div><h1>Turn the moment a deal closes into <em>action.</em></h1><p className="hero-copy">CDM listens to sales calls, extracts the non-standard terms, and routes the right work to Engineering, Finance, and Legal — with one human confirmation before anything fires.</p><div className="hero-actions"><Link href="/demo" className="button primary">Try the live demo <span>→</span></Link><Link href="/onboarding" className="button secondary">Set up CDM</Link></div><p className="hero-note">No forms. No manual relay. Your team stays in control.</p></section>
    <section className="proof"><div><strong>1</strong><span>human confirmation</span></div><div><strong>3</strong><span>teams aligned</span></div><div><strong>0</strong><span>terms lost in Slack</span></div></section>
    <section className="section"><div className="section-label">HOW IT WORKS</div><h2>From conversation to coordinated execution.</h2><div className="steps">{steps.map(([n,t,d])=><div className="step" key={n}><span className="step-number">{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>
    <section className="section split"><div><div className="section-label">BUILT FOR TRUST</div><h2>Your deal data stays where you need it.</h2><p>CDM is designed for customer-controlled deployment. Run the same product in your own AWS, GCP, or Azure environment when your pilot is ready.</p><Link href="/onboarding" className="text-link">Explore setup options →</Link></div><div className="trust-card"><div className="card-dot"></div><div><strong>One deliberate checkpoint</strong><p>AI does the reading. A person approves the action.</p></div><div className="card-line"></div><div className="mini-row"><span>Engineering</span><b>Ready</b></div><div className="mini-row"><span>Finance</span><b>Ready</b></div><div className="mini-row"><span>Legal</span><b>Review</b></div></div></section>
    <section className="final-cta"><div className="section-label">READY WHEN YOU ARE</div><h2>See the workflow in five minutes.</h2><p>Use the demo for your next sales call, or start the guided setup when you want to connect your own environment.</p><div className="hero-actions"><Link href="/demo" className="button primary">Open demo <span>→</span></Link><Link href="/run-local" className="button secondary">Run locally</Link></div></section>
    <footer><span>© 2026 CDM</span><span>Listening layer for enterprise deals.</span></footer>
  </main>;
}
