import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { motion, useInView } from 'framer-motion';
import { Home, Phone, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const WHATSAPP_NUMBER = "22997000000";

// ── Ajoute ici tes propres photos en remplaçant les chemins SVG ──
const maisons = [
  {
    id: 1,
    image: '/images/maisons/maison-1.svg',
    titre: 'Villa Moderne',
    description: '3 chambres · Piscine · Abomey-Calavi',
    prix: 'À partir de 150 000 FCFA / mois',
    badge: 'Disponible',
  },
  {
    id: 2,
    image: '/images/maisons/maison-2.svg',
    titre: 'Appartement Standing',
    description: '2 chambres · Climatisé · Cotonou Centre',
    prix: 'À partir de 80 000 FCFA / mois',
    badge: 'Disponible',
  },
  {
    id: 3,
    image: '/images/maisons/maison-3.svg',
    titre: 'Villa de Plage',
    description: '4 chambres · Bord de mer · Fidjrossè',
    prix: 'À partir de 250 000 FCFA / mois',
    badge: 'Premium',
  },
  {
    id: 4,
    image: '/images/maisons/maison-4.svg',
    titre: 'Villa Prestige',
    description: '5 chambres · Jardin · Cadjèhoun',
    prix: 'À partir de 300 000 FCFA / mois',
    badge: 'Premium',
  },
  {
    id: 5,
    image: '/images/maisons/maison-5.svg',
    titre: 'Studio Meublé',
    description: '1 chambre · Tout équipé · Calavi',
    prix: 'À partir de 40 000 FCFA / mois',
    badge: 'Disponible',
  },
];

export default function MaisonSlider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const waMsg = encodeURIComponent("Bonjour KAMALA GROUP 👋\nJe suis intéressé(e) par la location d'un bien immobilier. Pouvez-vous me donner plus d'informations ?");

  return (
    <section id="location-maisons" className="section-padding relative overflow-hidden" style={{ background: 'var(--kg-bg-alt)' }} ref={ref}>
      <div className="absolute top-0 left-0 w-72 h-72 bg-kg-navy/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <motion.span initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55}} className="section-label block mb-3">
              Location Immobilière
            </motion.span>
            <motion.h2 initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55,delay:0.1}}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: 'var(--kg-text)' }}>
              Location de <span className="italic brand-text">Maisons</span>
            </motion.h2>
            <motion.p initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55,delay:0.15}}
              className="text-sm mt-2 max-w-md" style={{ color: 'var(--kg-text-muted)' }}>
              Villas, appartements et studios de standing à Abomey-Calavi, Cotonou et environs.
            </motion.p>
          </div>
          <motion.a initial={{opacity:0,scale:0.9}} animate={inView?{opacity:1,scale:1}:{}} transition={{duration:0.5,delay:0.3}}
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1ebe5d] transition-all flex-shrink-0 shadow-lg shadow-[#25D366]/20">
            <FaWhatsapp size={16} /> Renseignez-vous
          </motion.a>
        </div>

        {/* Slider */}
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.65,delay:0.25}}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            loop
            speed={800}
            className="maison-swiper"
          >
            {maisons.map(m => (
              <SwiperSlide key={m.id}>
                <div className="relative overflow-hidden" style={{ height: 'clamp(320px, 55vw, 580px)' }}>
                  <img src={m.image} alt={m.titre} className="w-full h-full object-cover maison-bg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

                  {/* Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-bold tracking-widest uppercase ${
                    m.badge === 'Premium' ? 'bg-kg-red text-white' : 'bg-emerald-500 text-white'
                  }`}>
                    {m.badge}
                  </div>

                  {/* Infos */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl sm:text-3xl font-bold text-white mb-1">{m.titre}</h3>
                        <p className="text-white/70 text-sm mb-2 flex items-center gap-1.5">
                          <Home size={12} /> {m.description}
                        </p>
                        <span className="text-kg-red font-semibold text-sm sm:text-base">{m.prix}</span>
                      </div>
                      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Bonjour, je suis intéressé(e) par la location : "${m.titre}" (${m.description}). Pouvez-vous me contacter ?`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-white text-kg-navy text-xs font-bold hover:bg-kg-red hover:text-white transition-all flex-shrink-0 shadow-lg">
                        <ArrowRight size={13} /> Voir
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
      <style>{`
        .maison-swiper .swiper-button-next,
        .maison-swiper .swiper-button-prev {
          width: 36px !important; height: 36px !important;
          background: rgba(27,46,107,0.75) !important;
          top: 50% !important; bottom: auto !important;
          margin-top: -18px !important;
        }
        .maison-bg { transition: transform 4.8s ease-out; }
        .maison-swiper .swiper-slide-active .maison-bg { transform: scale(1.07); }
        .maison-swiper .swiper-pagination { bottom: 8px !important; }
      `}</style>
    </section>
  );
}
