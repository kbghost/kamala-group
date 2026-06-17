import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import logoImg from '../assets/logo/kamala-logo.jpeg';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const WHATSAPP_NUMBER = "22997000000";

const navLinks = [
  { href: '#accueil',  label: 'Accueil' },
  { href: '#apropos',  label: 'À propos' },
  { href: '#services', label: 'Services' },
  { href: '#booking',  label: 'Booking' },
  { href: '#portfolio',label: 'Portfolio' },
  { href: '#contact',  label: 'Contact' },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState('#accueil');
  const { isDark } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setActiveLink(href);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour KAMALA GROUP 👋, je souhaite des informations.")}`;

  const navBg = scrolled
    ? isDark ? 'rgba(10,10,18,0.95)' : 'rgba(248,249,255,0.97)'
    : 'transparent';

  const navBorder = scrolled ? 'var(--kg-border)' : 'transparent';

  // Tant que la navbar est transparente (sur le Hero), on force le blanc
  // pour tout le texte/les icônes — quel que soit le thème — car le fond
  // sombre du slider rend le bleu marine illisible. Une fois "scrolled"
  // (fond plein), on revient aux couleurs normales du thème actif.
  const navTextColor   = scrolled ? 'var(--kg-text)'       : '#FFFFFF';
  const navMutedColor  = scrolled ? 'var(--kg-text-muted)' : 'rgba(255,255,255,0.75)';
  const navIconBorder  = scrolled ? 'var(--kg-border-light)' : 'rgba(255,255,255,0.4)';

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: navBg,
          borderBottom: `1px solid ${navBorder}`,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          paddingTop:    scrolled ? '6px' : '10px',
          paddingBottom: scrolled ? '6px' : '10px',
        }}
      >
        {/* gap-2 sur mobile très étroit, gap-4 dès sm — empêche tout débordement à 320px */}
        <div className="max-w-7xl mx-auto px-3 sm:px-5 flex items-center justify-between gap-2 sm:gap-4">

          {/* ── LOGO — taille fixe et compacte sur mobile, ne déborde jamais ── */}
          <button
            onClick={() => handleNav('#accueil')}
            className="flex items-center gap-2 sm:gap-3 group min-w-0"
          >
            <div
              className={`overflow-hidden flex-shrink-0 transition-all duration-500 bg-white shadow-md ${
                scrolled ? 'w-9 h-9 lg:w-11 lg:h-11' : 'w-9 h-9 lg:w-[60px] lg:h-[60px]'
              }`}
              style={{ padding: '3px' }}
            >
              <img src={logoImg} alt="Kamala Group" className="w-full h-full object-contain" />
            </div>

            {/* min-w-0 + truncate : le texte se réduit plutôt que de pousser le reste hors écran */}
            <div className="flex flex-col leading-none min-w-0">
              <span
                className="font-display font-bold tracking-wide truncate text-sm lg:text-base transition-colors duration-300"
                style={{ color: navTextColor }}
              >
                KAMALA GROUP
              </span>
              {/* Slogan masqué sur mobile : pas assez de place, pas essentiel dans la barre */}
              <span className="hidden lg:block font-mono text-[8px] text-kg-red tracking-[0.26em] uppercase mt-0.5 truncate">
                Creating Talent. Building Experiences.
              </span>
            </div>
          </button>

          {/* ── Desktop links ── */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 flex-shrink-0">
            {navLinks.map(({ href, label }) => (
              <button
                key={href}
                onClick={() => handleNav(href)}
                className="relative group text-[13px] font-medium transition-colors duration-300 whitespace-nowrap"
                style={{ color: activeLink === href ? '#C0272D' : navMutedColor }}
                onMouseEnter={e => e.currentTarget.style.color = navTextColor}
                onMouseLeave={e => e.currentTarget.style.color = activeLink === href ? '#C0272D' : navMutedColor}
              >
                {label}
                <span
                  className="absolute -bottom-0.5 left-0 h-[2px] bg-kg-red transition-all duration-300"
                  style={{ width: activeLink === href ? '100%' : '0' }}
                />
              </button>
            ))}
          </div>

          {/* ── Right CTAs — toujours visibles, ne rétrécissent jamais ── */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <ThemeToggle compact />

            <a
              href={waUrl} target="_blank" rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white text-xs font-semibold tracking-wide hover:bg-[#1ebe5d] transition-all hover:-translate-y-px"
            >
              <FaWhatsapp size={14} />
              WhatsApp
            </a>

            <button
              onClick={() => handleNav('#devis')}
              className="hidden lg:flex btn-primary text-[11px] py-2 px-4"
            >
              Devis Gratuit
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center flex-shrink-0 border transition-colors duration-300"
              style={{ borderColor: navIconBorder, color: navTextColor }}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-x-0 top-0 z-40 backdrop-blur-2xl pt-[64px] pb-8 px-4 sm:px-5 overflow-y-auto max-h-screen"
            style={{ background: isDark ? 'rgba(10,10,18,0.98)' : 'rgba(248,249,255,0.98)' }}
          >
            {/* Logo mobile */}
            <div className="flex items-center gap-3 py-4 mb-2 min-w-0" style={{ borderBottom: '1px solid var(--kg-border)' }}>
              <div className="w-10 h-10 bg-white p-1 flex-shrink-0 shadow">
                <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0">
                <span className="font-display font-bold text-base block truncate" style={{ color: 'var(--kg-text)' }}>KAMALA GROUP</span>
                <span className="font-mono text-[7px] text-kg-red tracking-widest block truncate">Creating Talent. Building Experiences.</span>
              </div>
            </div>

            <div className="flex flex-col">
              {navLinks.map(({ href, label }, i) => (
                <motion.button
                  key={href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => handleNav(href)}
                  className="text-left text-[15px] font-medium py-3.5 px-3 flex items-center justify-between transition-all"
                  style={{
                    borderBottom: '1px solid var(--kg-border)',
                    color: activeLink === href ? '#C0272D' : 'var(--kg-text-muted)',
                  }}
                >
                  {label}
                  {activeLink === href && <span className="w-1.5 h-1.5 rounded-full bg-kg-red flex-shrink-0" />}
                </motion.button>
              ))}

              {/* Theme toggle mobile — version pill */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }} className="mt-3">
                <ThemeToggle compact={false} />
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.34 }}
                className="flex gap-2.5 mt-3 px-1">
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white text-sm font-semibold">
                  <FaWhatsapp size={16} /> WhatsApp
                </a>
                <button onClick={() => handleNav('#devis')} className="flex-1 btn-primary justify-center py-3">
                  Devis
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
