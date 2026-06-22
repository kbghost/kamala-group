import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { motion, useInView } from 'framer-motion';
import { Car, Users, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const WHATSAPP_NUMBER = "22997000000";

// ── Ajoute ici tes propres photos en remplaçant les chemins SVG ──
const voitures = [
  {
    id: 1,
    image: '/images/voitures/voiture-1.svg',
    titre: 'Berline Premium',
    description: 'Climatisé · GPS · Chauffeur disponible',
    places: '5 places',
    prix: 'À partir de 25 000 FCFA / jour',
    categorie: 'Affaires',
  },
  {
    id: 2,
    image: '/images/voitures/voiture-2.svg',
    titre: 'SUV Luxe',
    description: 'Tout-terrain · Longue distance · 4x4',
    places: '7 places',
    prix: 'À partir de 35 000 FCFA / jour',
    categorie: 'Famille',
  },
  {
    id: 3,
    image: '/images/voitures/voiture-3.svg',
    titre: 'Citadine Sport',
    description: 'Économique · Urbaine · Automatique',
    places: '5 places',
    prix: 'À partir de 15 000 FCFA / jour',
    categorie: 'Économique',
  },
  {
    id: 4,
    image: '/images/voitures/voiture-4.svg',
    titre: 'Van 9 Places',
    description: 'Groupes · Événements · Transferts aéroport',
    places: '9 places',
    prix: 'À partir de 45 000 FCFA / jour',
    categorie: 'Groupe',
  },
  {
    id: 5,
    image: '/images/voitures/voiture-5.svg',
    titre: 'Pick-Up 4x4',
    description: 'Tout-terrain · Chantiers · Brousse',
    places: '5 places',
    prix: 'À partir de 30 000 FCFA / jour',
    categorie: 'Terrain',
  },
];

const catColors = {
  'Affaires': '#1B2E6B',
  'Famille': '#2d6a4f',
  'Économique': '#533483',
  'Groupe': '#8B0000',
  'Terrain': '#C0272D',
};

export default function VoitureSlider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const waMsg = encodeURIComponent("Bonjour KAMALA GROUP 👋\nJe souhaite louer un véhicule. Pouvez-vous me communiquer vos disponibilités et tarifs ?");

  return (
    <section id="location-voitures" className="section-padding relative overflow-hidden" style={{ background: 'var(--kg-bg)' }} ref={ref}>
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-kg-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <motion.span initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55}} className="section-label block mb-3">
              Location de Véhicules
            </motion.span>
            <motion.h2 initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55,delay:0.1}}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: 'var(--kg-text)' }}>
              Location d'<span className="italic brand-text">Automobiles</span>
            </motion.h2>
            <motion.p initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55,delay:0.15}}
              className="text-sm mt-2 max-w-md" style={{ color: 'var(--kg-text-muted)' }}>
              Berlines, SUV, vans et 4x4 avec ou sans chauffeur — disponibles 7j/7 à Cotonou et Abomey-Calavi.
            </motion.p>
          </div>
          <motion.a initial={{opacity:0,scale:0.9}} animate={inView?{opacity:1,scale:1}:{}} transition={{duration:0.5,delay:0.3}}
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1ebe5d] transition-all flex-shrink-0 shadow-lg shadow-[#25D366]/20">
            <FaWhatsapp size={16} /> Réserver un véhicule
          </motion.a>
        </div>

        {/* Slider avec coverflow effect sur desktop, simple sur mobile */}
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.65,delay:0.25}}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            loop
            speed={600}
            className="voiture-swiper pb-12"
          >
            {voitures.map(v => (
              <SwiperSlide key={v.id}>
                <div className="border overflow-hidden group cursor-pointer transition-all duration-400 hover:-translate-y-1 hover:shadow-xl"
                  style={{ background: 'var(--kg-surface)', borderColor: 'var(--kg-border)' }}>

                  {/* Image */}
                  <div className="relative overflow-hidden h-48 sm:h-52">
                    <img src={v.image} alt={v.titre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* Catégorie */}
                    <span className="absolute top-3 right-3 px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase text-white"
                      style={{ background: catColors[v.categorie] || '#1B2E6B' }}>
                      {v.categorie}
                    </span>
                    {/* Places */}
                    <span className="absolute bottom-3 left-3 flex items-center gap-1 text-white/80 text-xs">
                      <Users size={11} /> {v.places}
                    </span>
                  </div>

                  {/* Infos */}
                  <div className="p-4">
                    <h3 className="font-display text-base font-bold mb-1" style={{ color: 'var(--kg-text)' }}>{v.titre}</h3>
                    <p className="text-xs mb-3 flex items-center gap-1.5" style={{ color: 'var(--kg-text-muted)' }}>
                      <Car size={10} className="flex-shrink-0" /> {v.description}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-kg-red">{v.prix}</span>
                      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Bonjour, je voudrais louer la ${v.titre} (${v.places}). Pouvez-vous confirmer la disponibilité ?`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide bg-kg-navy text-white hover:bg-kg-red transition-colors flex-shrink-0">
                        <ArrowRight size={10} /> Réserver
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
        .voiture-swiper .swiper-button-next,
        .voiture-swiper .swiper-button-prev {
          width: 32px !important; height: 32px !important;
          background: rgba(27,46,107,0.75) !important;
          top: calc(50% - 24px) !important; bottom: auto !important;
        }
        .voiture-swiper .swiper-pagination { bottom: 0 !important; }
      `}</style>
    </section>
  );
}
