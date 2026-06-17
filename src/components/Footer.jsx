import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import logoImg from '../assets/logo/kamala-logo.jpeg';

const footerLinks = {
  'Navigation': [
    { label:'Accueil',       href:'#accueil' },
    { label:'À Propos',      href:'#apropos' },
    { label:'Devis Gratuit', href:'#devis' },
    { label:'Services',      href:'#services' },
    { label:'Booking',       href:'#booking' },
    { label:'Portfolio',     href:'#portfolio' },
    { label:'Contact',       href:'#contact' },
  ],
  'Services': [
    { label:'Événementiel',         href:'#services' },
    { label:'Production Artistique',href:'#services' },
    { label:'Management',           href:'#services' },
    { label:'Booking',              href:'#services' },
    { label:'Communication',        href:'#services' },
    { label:'Formation',            href:'#services' },
  ],
};
const socials = [
  { icon:FaFacebookF, href:'https://facebook.com',  label:'Facebook' },
  { icon:FaInstagram, href:'https://instagram.com', label:'Instagram' },
  { icon:FaYoutube,   href:'https://youtube.com',   label:'YouTube' },
  { icon:FaTwitter,   href:'https://twitter.com',   label:'Twitter' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top:0, behavior:'smooth' });
  return (
    <footer className="relative overflow-hidden" style={{ background:'var(--kg-bg-alt)', borderTop:'1px solid var(--kg-border)' }}>
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-kg-navy via-kg-red to-kg-navy" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <button onClick={scrollTop} className="flex items-center gap-3 mb-5 group">
              <div className="w-12 h-12 bg-white p-1 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                <img src={logoImg} alt="Kamala Group" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-lg" style={{ color:'var(--kg-text)' }}>KAMALA GROUP</span>
                <span className="font-mono text-[8px] text-kg-red tracking-[0.28em] uppercase mt-0.5">Creating Talent. Building Experiences.</span>
              </div>
            </button>
            <p className="text-xs leading-relaxed mb-7 max-w-xs" style={{ color:'var(--kg-text-muted)' }}>
              Votre partenaire créatif pour des événements inoubliables, la production artistique et le développement des talents.
            </p>
            <div>
              <span className="section-label text-[9px] block mb-3">Suivez-nous</span>
              <div className="flex gap-2">
                {socials.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 border flex items-center justify-center hover:border-kg-navy hover:bg-kg-navy/10 transition-all duration-300 group"
                    style={{ borderColor:'var(--kg-border)' }}>
                    <s.icon size={12} className="group-hover:text-kg-navy transition-colors" style={{ color: 'var(--kg-text-muted)' }} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="section-label text-[9px] mb-5">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-xs flex items-center gap-1.5 group transition-colors"
                      style={{ color:'var(--kg-text-muted)' }}
                      onMouseEnter={e => e.currentTarget.style.color='var(--kg-text)'}
                      onMouseLeave={e => e.currentTarget.style.color='var(--kg-text-muted)'}
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-kg-red transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop:'1px solid var(--kg-border)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] font-mono" style={{ color:'var(--kg-text-faint)' }}>
            © {new Date().getFullYear()} Kamala Group. Tous droits réservés.
          </p>
          <div className="flex gap-5">
            {['Mentions légales','Confidentialité'].map(t => (
              <a key={t} href="#" className="text-[10px] transition-colors" style={{ color:'var(--kg-text-faint)' }}
                onMouseEnter={e=>e.currentTarget.style.color='var(--kg-text-muted)'}
                onMouseLeave={e=>e.currentTarget.style.color='var(--kg-text-faint)'}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
