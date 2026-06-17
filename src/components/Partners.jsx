import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const partners = [
  {abbr:"MTN BENIN"},{abbr:"MOOV AFRICA"},{abbr:"UAC"},{abbr:"EACE"},
  {abbr:"CANAL+"},{abbr:"ORTB"},{abbr:"BCEAO"},{abbr:"GLO MOBILE"},
  {abbr:"MAIRIE CALAVI"},{abbr:"FESTIVAL VODOUN"},
];

function LogoItem({ p }) {
  return (
    <div className="flex items-center gap-3 px-8 group">
      <div className="flex items-center gap-2.5 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-7 h-7 border flex items-center justify-center transition-colors"
          style={{ borderColor: 'var(--kg-border-light)' }}>
          <span className="font-mono text-[7px] font-bold" style={{ color: 'var(--kg-text)' }}>{p.abbr.charAt(0)}</span>
        </div>
        <span className="font-mono text-xs font-semibold tracking-[0.2em] whitespace-nowrap uppercase" style={{ color: 'var(--kg-text)' }}>
          {p.abbr}
        </span>
      </div>
      <span className="w-px h-5" style={{ background: 'var(--kg-border)' }} />
    </div>
  );
}

export default function Partners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const doubled = [...partners, ...partners];
  return (
    <section className="py-14 relative overflow-hidden" style={{ background: 'var(--kg-bg)', borderTop: '1px solid var(--kg-border)', borderBottom: '1px solid var(--kg-border)' }} ref={ref}>
      <div className="absolute inset-y-0 left-0 w-28 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--kg-bg), transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-28 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--kg-bg), transparent)' }} />
      <div className="max-w-7xl mx-auto px-5 mb-8">
        <motion.div initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.5}} className="text-center">
          <span className="section-label">Ils Nous Font Confiance</span>
        </motion.div>
      </div>
      <div className="flex overflow-hidden mb-3">
        <div className="flex animate-marquee">{doubled.map((p,i) => <LogoItem key={`a${i}`} p={p}/>)}</div>
      </div>
      <div className="flex overflow-hidden">
        <div className="flex animate-marquee" style={{animationDirection:'reverse'}}>{doubled.map((p,i) => <LogoItem key={`b${i}`} p={p}/>)}</div>
      </div>
    </section>
  );
}
