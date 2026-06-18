import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, Calendar, Globe } from 'lucide-react';
import logoImg from '../assets/logo/kamala-logo.jpeg';

const stats = [
  { icon: Award,    value: 100, suffix: '+', label: 'Projets Réalisés' },
  { icon: Users,    value: 50,  suffix: '+', label: 'Talents Accompagnés' },
  { icon: Calendar, value: 20,  suffix: '+', label: 'Événements Produits' },
  { icon: Globe,    value: 12,  suffix: '+', label: 'Communes Couvertes' },
];

function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1800, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);
  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl font-bold brand-text">
      {count}{suffix}
    </span>
  );
}

const up = {
  hidden:  { opacity: 0, y: 28 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: d, ease: [0.22,1,0.36,1] } }),
};

const expertises = [
  { label: "Événementiel", desc: "Festivals, concerts, conférences, soirées privées et événements institutionnels." },
  { label: "Production & Management", desc: "Création de spectacles, contenu artistique et accompagnement de carrière." },
  { label: "Communication Digitale", desc: "Réseaux sociaux, graphisme, campagnes publicitaires et couverture médiatique." },
  { label: "Formation", desc: "Danse, gestion d'événements, communication et entrepreneuriat culturel." },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="apropos" className="section-padding relative overflow-hidden" style={{ background: 'var(--kg-bg-alt)' }}>
      <div className="absolute top-0 right-0 w-80 h-80 bg-kg-navy/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-kg-red/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center mb-16">
          {/* Image */}
          <motion.div custom={0} variants={up} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="relative">
            <div className="relative overflow-hidden">
              <img src="../assets/images/about.jpg"
                alt="Kamala Group Event" className="w-full h-[420px] md:h-[500px] object-cover" />
              <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-kg-navy" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-kg-red" />
              <div className="absolute bottom-6 left-6 glass-card px-5 py-3">
                <div className="section-label mb-0.5">Fondé en</div>
                <div className="font-display text-2xl font-bold" style={{ color: 'var(--kg-text)' }}>2018</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white p-2 hidden lg:flex items-center justify-center shadow-2xl">
              <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
            </div>
          </motion.div>

          {/* Texte */}
          <div>
            <motion.span custom={0.1} variants={up} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-label block mb-4">
              Qui Sommes-Nous
            </motion.span>
            <motion.h2 custom={0.2} variants={up} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: 'var(--kg-text)' }}>
              Une agence créative <span className="italic brand-text">au cœur</span> de la culture africaine
            </motion.h2>
            <motion.div custom={0.3} variants={up} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="space-y-4 mb-8">
              <p className="text-base leading-relaxed" style={{ color: 'var(--kg-text)' }}>
                <strong>KAMALA GROUP</strong> est une entreprise créative spécialisée dans la conception, la production et la promotion de projets culturels, artistiques et événementiels.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--kg-text-muted)' }}>
                Nous ne nous contentons pas d'organiser des événements — nous créons des expériences mémorables. Nous gérons les carrières des artistes, produisons du contenu, assurons le booking de talents et formons la prochaine génération de professionnels de la culture.
              </p>
            </motion.div>
            <motion.div custom={0.4} variants={up} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="grid sm:grid-cols-2 gap-3">
              {expertises.map(e => (
                <div key={e.label} className="p-4 border transition-colors duration-300 group"
                  style={{ borderColor: 'var(--kg-border)', background: 'var(--kg-surface)' }}
                  onMouseEnter={el => el.currentTarget.style.borderColor = '#1B2E6B'}
                  onMouseLeave={el => el.currentTarget.style.borderColor = 'var(--kg-border)'}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-kg-red flex-shrink-0" />
                    <span className="text-sm font-semibold" style={{ color: 'var(--kg-text)' }}>{e.label}</span>
                  </div>
                  <p className="text-xs leading-relaxed pl-3.5" style={{ color: 'var(--kg-text-muted)' }}>{e.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div custom={0.5} variants={up} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '1px', background: 'var(--kg-border)' }}>
          {stats.map((s, i) => (
            <div key={i} className="px-6 py-10 flex flex-col items-center text-center transition-colors duration-300"
              style={{ background: 'var(--kg-bg-alt)' }}
              onMouseEnter={el => el.currentTarget.style.background = 'var(--kg-surface)'}
              onMouseLeave={el => el.currentTarget.style.background = 'var(--kg-bg-alt)'}
            >
              <div className="w-11 h-11 flex items-center justify-center mb-4 border transition-colors" style={{ borderColor: 'var(--kg-border-light)' }}>
                <s.icon size={20} className="text-kg-navy-pale" />
              </div>
              <AnimatedCounter value={s.value} suffix={s.suffix} />
              <span className="text-sm mt-2" style={{ color: 'var(--kg-text-muted)' }}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
