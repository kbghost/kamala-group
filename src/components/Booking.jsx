import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { PhoneCall, CheckCircle, XCircle, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { bookingArtists } from '../data/booking';

const WHATSAPP_NUMBER = "22997000000"; // Remplace par le vrai numéro

function ArtistCard({ artist, index }) {
  const [hov, setHov] = useState(false);

  const handleBooking = () => {
    const msg = encodeURIComponent(
      `Bonjour KAMALA GROUP 👋\n\nJe souhaite booker *${artist.name}* (${artist.category}) pour mon événement.\n\nPouvez-vous me donner plus d'informations sur la disponibilité et les tarifs ?\n\nMerci !`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="group relative overflow-hidden border transition-all duration-400 cursor-pointer"
      style={{ background: 'var(--kg-surface)', borderColor: hov ? '#1B2E6B80' : 'var(--kg-border)' }}
    >
      {/* Top gradient line on hover */}
      <div className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-kg-navy to-kg-red transition-all duration-500 ${hov ? 'opacity-100' : 'opacity-0'}`} />

      {/* Image — overlay sombre fixe pour contraste sur photo */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover object-top"
          style={{ transform: hov ? 'scale(1.07)' : 'scale(1)', transition: 'transform 0.6s ease' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Availability badge */}
        <div className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 text-[9px] font-mono font-bold tracking-wider ${
          artist.available
            ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/30'
            : 'bg-kg-red/80 text-white border border-kg-red/30'
        }`}>
          {artist.available
            ? <><CheckCircle size={9} /> DISPONIBLE</>
            : <><XCircle size={9} /> RÉSERVÉ</>
          }
        </div>

        {/* Origin */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1">
          <MapPin size={10} className="text-white/60" />
          <span className="text-[10px] text-white/60 font-mono">{artist.origin}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-1">
          <span className="section-label text-[8px] block mb-0.5">{artist.category}</span>
          <h3 className="font-display text-lg font-bold group-hover:text-kg-navy-pale transition-colors leading-tight" style={{ color: 'var(--kg-text)' }}>
            {artist.name}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--kg-text-muted)' }}>{artist.genre}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 my-3">
          {artist.tags.map(tag => (
            <span key={tag} className="text-[9px] font-mono px-2 py-0.5 border group-hover:border-kg-navy/40 transition-colors"
              style={{ borderColor: 'var(--kg-border-light)', color: 'var(--kg-text-faint)' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleBooking}
          disabled={!artist.available}
          className={`w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
            artist.available
              ? 'bg-kg-navy/15 border border-kg-navy/40 text-kg-navy-pale hover:bg-kg-navy hover:text-white hover:border-kg-navy'
              : 'cursor-not-allowed border'
          }`}
          style={!artist.available ? { borderColor: 'var(--kg-border)', color: 'var(--kg-text-faint)', background: 'var(--kg-bg-alt)' } : {}}
        >
          <FaWhatsapp size={14} />
          {artist.available ? 'Booker via WhatsApp' : 'Indisponible'}
        </button>
      </div>
    </motion.div>
  );
}

export default function Booking() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCat, setActiveCat] = useState('Tous');

  const cats = ['Tous', ...new Set(bookingArtists.map(a => a.category))];
  const filtered = activeCat === 'Tous'
    ? bookingArtists
    : bookingArtists.filter(a => a.category === activeCat);

  return (
    <section id="booking" className="section-padding relative overflow-hidden" style={{ background: 'var(--kg-bg)' }}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-kg-navy/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-kg-red/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8" ref={ref}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55 }} className="section-label block mb-3"
            >
              Notre Roster de Booking
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="font-display text-3xl md:text-4xl font-bold leading-tight"
              style={{ color: 'var(--kg-text)' }}
            >
              Bookez le talent{' '}
              <span className="italic brand-text">qu'il vous faut</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-sm mt-3 max-w-xl leading-relaxed"
              style={{ color: 'var(--kg-text-muted)' }}
            >
              Artistes, danseurs, animateurs, DJs, performers — notre réseau couvre toutes les disciplines du spectacle vivant. Contactez-nous directement sur WhatsApp pour une réponse rapide.
            </motion.p>
          </div>

          {/* WhatsApp CTA */}
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour KAMALA GROUP, je souhaite des informations sur vos services de booking.")}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3.5 bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5d] transition-colors flex-shrink-0 shadow-lg shadow-[#25D366]/20"
          >
            <FaWhatsapp size={20} />
            Demande de Booking
          </motion.a>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {cats.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-1.5 text-[10px] font-mono tracking-widest uppercase border transition-all duration-300 ${
                activeCat === cat ? 'bg-kg-navy text-white border-kg-navy' : ''
              }`}
              style={activeCat !== cat ? { borderColor: 'var(--kg-border)', color: 'var(--kg-text-muted)' } : {}}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((artist, i) => (
              <ArtistCard key={artist.id} artist={artist} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 relative overflow-hidden border border-kg-border-light p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: 'var(--kg-surface)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-kg-navy/10 to-kg-red/5 pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-kg-navy via-kg-red to-kg-navy" />

          <div className="relative text-center md:text-left">
            <h3 className="font-display text-xl md:text-2xl font-bold mb-2" style={{ color: 'var(--kg-text)' }}>
              Vous avez un artiste en tête ?
            </h3>
            <p className="text-sm leading-relaxed max-w-md" style={{ color: 'var(--kg-text-muted)' }}>
              Contactez-nous directement sur WhatsApp. Notre équipe vous répond rapidement et vous propose les meilleures options selon votre événement et votre budget.
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour KAMALA GROUP, j'ai une demande de booking spécifique.")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5d] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#25D366]/20"
            >
              <FaWhatsapp size={18} />
              WhatsApp
            </a>
            <a href="#contact"
              className="flex items-center gap-2 px-7 py-3.5 border border-kg-border-light text-sm font-semibold hover:border-kg-navy hover:text-kg-navy-pale transition-all"
              style={{ color: 'var(--kg-text)' }}
            >
              <PhoneCall size={15} />
              Formulaire
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
