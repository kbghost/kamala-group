import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { services } from '../data/services';
import 'swiper/css';
import 'swiper/css/pagination';

const ROTATE_DELAY = 4500; // ms entre chaque rotation automatique (anneau 3D desktop/tablette)
const SLIDE_DELAY   = 4500; // ms entre chaque slide (carrousel mobile gauche → droite)
const N = services.length;
const ANGLE_STEP = 360 / N;
const MOBILE_BREAKPOINT = 768; // sous ce seuil : carrousel horizontal plein contenu

/* ── Une carte positionnée sur l'anneau 3D (tablette / desktop) ── */
function RingCard({ service, offset, radius, cardWidth, onClick, compact }) {
  const Icon = service.icon;
  const angle = offset * ANGLE_STEP;

  const isFront = offset === 0;
  const absOffset = Math.min(Math.abs(offset), N - Math.abs(offset));

  const opacity = isFront ? 1 : absOffset === 1 ? 0.5 : 0.18;
  const blur    = isFront ? 0 : absOffset === 1 ? 1 : 2.5;
  const scale   = isFront ? 1 : absOffset === 1 ? 0.8 : 0.68;
  const zIndex  = isFront ? 50 : 50 - absOffset * 10;

  return (
    <motion.div
      onClick={onClick}
      animate={{ rotateY: angle, opacity, scale }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        top: 0, left: '50%',
        width: `${cardWidth}px`,
        marginLeft: `-${cardWidth / 2}px`,
        transformStyle: 'preserve-3d',
        transformOrigin: `50% 50% -${radius}px`,
        filter: `blur(${blur}px)`,
        zIndex,
        cursor: isFront ? 'default' : 'pointer',
      }}
      className="select-none"
    >
      <div
        className="border overflow-hidden transition-shadow duration-500 relative"
        style={{
          background: 'var(--kg-surface)',
          borderColor: isFront ? '#1B2E6B' : 'var(--kg-border)',
          boxShadow: isFront ? '0 24px 60px -12px rgba(27,46,107,0.35)' : 'none',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-kg-navy via-kg-red to-kg-navy"
          style={{ opacity: isFront ? 1 : 0 }} />

        <div className={compact ? 'p-4 sm:p-6' : 'p-6 sm:p-8 md:p-9'}>
          <div className={`border-2 flex items-center justify-center mb-3 ${compact ? 'w-10 h-10' : 'w-14 h-14 mb-5'}`}
            style={{ borderColor: isFront ? '#1B2E6B' : 'var(--kg-border-light)' }}>
            <Icon size={compact ? 18 : 26} className={isFront ? 'text-kg-red' : 'text-kg-navy-pale'} />
          </div>

          <span className="section-label text-[8px] sm:text-[9px] block mb-1">{service.subtitle}</span>
          <h3 className={`font-display font-bold mb-2 ${compact ? 'text-base' : 'text-xl md:text-2xl mb-3'}`} style={{ color: 'var(--kg-text)' }}>
            {service.title}
          </h3>

          {isFront && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <p className={`leading-relaxed ${compact ? 'text-xs mb-3' : 'text-sm mb-5'}`} style={{ color: 'var(--kg-text-muted)' }}>
                {service.description}
              </p>
              <div className={compact ? 'space-y-1' : 'space-y-1.5'}>
                {service.items.map((item, i) => (
                  <div key={i} className={`flex items-center gap-2 ${compact ? 'text-xs' : 'text-sm gap-2.5'}`} style={{ color: 'var(--kg-text)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-kg-red flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Carte plein contenu pour le carrousel mobile ── */
function FullServiceCard({ service }) {
  const Icon = service.icon;
  return (
    <div className="border relative overflow-hidden" style={{ background: 'var(--kg-surface)', borderColor: '#1B2E6B' }}>
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-kg-navy via-kg-red to-kg-navy" />
      <div className="p-5 sm:p-7">
        <div className="w-12 h-12 border-2 flex items-center justify-center mb-4" style={{ borderColor: '#1B2E6B' }}>
          <Icon size={22} className="text-kg-red" />
        </div>
        <span className="section-label text-[9px] block mb-1.5">{service.subtitle}</span>
        <h3 className="font-display text-lg font-bold mb-2.5" style={{ color: 'var(--kg-text)' }}>
          {service.title}
        </h3>
        {/* Description et liste COMPLÈTES — rien n'est tronqué sur mobile */}
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--kg-text-muted)' }}>
          {service.description}
        </p>
        <div className="space-y-1.5">
          {service.items.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--kg-text)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-kg-red flex-shrink-0 mt-1.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Carrousel mobile : défilement gauche → droite, boucle infinie, contenu intégral ── */
function MobileServicesSlider() {
  const [playing, setPlaying] = useState(true);
  const swiperRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!swiperRef.current) return;
    if (playing) swiperRef.current.autoplay?.start();
    else swiperRef.current.autoplay?.stop();
  }, [playing]);

  return (
    <div>
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={16}
        loop
        autoHeight
        speed={550}
        autoplay={{ delay: SLIDE_DELAY, disableOnInteraction: false, pauseOnMouseEnter: false }}
        pagination={{ clickable: true, el: '.services-mobile-pagination' }}
        onSwiper={(sw) => { swiperRef.current = sw; }}
        onSlideChange={(sw) => setActiveIdx(sw.realIndex)}
        className="w-full"
      >
        {services.map(service => (
          <SwiperSlide key={service.id}>
            <FullServiceCard service={service} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Contrôles */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <div className="services-mobile-pagination flex items-center gap-1.5" />
        <button
          onClick={() => setPlaying(p => !p)}
          className="w-9 h-9 border flex items-center justify-center hover:border-kg-navy transition-colors flex-shrink-0 ml-1"
          style={{ borderColor: 'var(--kg-border)', color: 'var(--kg-text-muted)' }}
          aria-label={playing ? 'Pause' : 'Lecture'}
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>

      <div className="text-center mt-3">
        <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'var(--kg-text-faint)' }}>
          {String(activeIdx + 1).padStart(2, '0')} / {String(N).padStart(2, '0')} — {services[activeIdx].title}
        </span>
      </div>

      <style>{`
        .services-mobile-pagination {
          position: static !important;
          width: auto !important;
          flex: 0 0 auto;
        }
        .services-mobile-pagination .swiper-pagination-bullet {
          width: 7px; height: 7px; border-radius: 9999px;
          background: var(--kg-border-light); opacity: 1;
          transition: width 0.3s ease, background 0.3s ease;
          margin: 0 3px;
        }
        .services-mobile-pagination .swiper-pagination-bullet-active {
          width: 24px; background: #C0272D;
        }
      `}</style>
    </div>
  );
}

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [index, setIndex]     = useState(0);
  const [playing, setPlaying] = useState(true);
  const [viewport, setViewport] = useState(1024);

  useEffect(() => {
    const check = () => setViewport(window.innerWidth);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const isMobile = viewport < MOBILE_BREAKPOINT;

  // Rotation automatique (anneau 3D — désactivée sur mobile puisqu'on utilise le Swiper à la place)
  useEffect(() => {
    if (!playing || isMobile) return;
    const t = setInterval(() => {
      setIndex(i => (i + 1) % N);
    }, ROTATE_DELAY);
    return () => clearInterval(t);
  }, [playing, isMobile]);

  const next = () => setIndex(i => (i + 1) % N);
  const prev = () => setIndex(i => (i - 1 + N) % N);
  const goTo = (i) => setIndex(i);

  // ── Dimensions responsive (anneau 3D, tablette/desktop uniquement) ──
  const compact = viewport < 1024;
  let cardWidth, radius, sceneHeight;

  if (viewport < 1024) {
    cardWidth = 360;
    radius = 260;
    sceneHeight = 470;
  } else {
    cardWidth = 420;
    radius = 380;
    sceneHeight = 480;
  }

  return (
    <section id="services" className="section-padding relative overflow-hidden" style={{ background: 'var(--kg-bg)' }}>
      <div className="absolute top-1/3 -right-24 w-72 h-72 bg-kg-navy/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-kg-red/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8" ref={ref}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <motion.span initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55}} className="section-label block mb-2 sm:mb-3">
              Ce Que Nous Faisons
            </motion.span>
            <motion.h2 initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55,delay:0.1}}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: 'var(--kg-text)' }}>
              Nos <span className="italic brand-text">expertises</span>
            </motion.h2>
          </div>
          <motion.p initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55,delay:0.2}}
            className="text-sm sm:text-base max-w-sm leading-relaxed md:text-right" style={{ color: 'var(--kg-text-muted)' }}>
            Six domaines d'excellence pour accompagner vos projets de A à Z. {!isMobile && "Cliquez sur les cartes pour les explorer."}
          </motion.p>
        </div>

        {isMobile ? (
          /* ── Mobile : carrousel horizontal, gauche → droite, contenu complet ── */
          <MobileServicesSlider />
        ) : (
          <>
            {/* ── Scène 3D — anneau rotatif (tablette / desktop) ── */}
            <div
              className="relative mx-auto w-full overflow-hidden"
              style={{ height: `${sceneHeight}px`, perspective: '1800px', maxWidth: '100vw' }}
            >
              <motion.div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
                {services.map((service, i) => {
                  let offset = i - index;
                  if (offset > N / 2) offset -= N;
                  if (offset < -N / 2) offset += N;
                  return (
                    <RingCard
                      key={service.id}
                      service={service}
                      offset={offset}
                      radius={radius}
                      cardWidth={cardWidth}
                      compact={compact}
                      onClick={() => goTo(i)}
                    />
                  );
                })}
              </motion.div>
            </div>

            {/* ── Controls ── */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
              <button onClick={prev}
                className="w-9 h-9 sm:w-10 sm:h-10 border flex items-center justify-center hover:border-kg-navy transition-colors flex-shrink-0"
                style={{ borderColor: 'var(--kg-border)', color: 'var(--kg-text-muted)' }}>
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {services.map((s, i) => (
                  <button key={s.id} onClick={() => goTo(i)}
                    className="h-2 rounded-full transition-all duration-400"
                    style={{
                      width: i === index ? '24px' : '7px',
                      background: i === index ? '#C0272D' : 'var(--kg-border-light)',
                    }}
                    aria-label={`Voir ${s.title}`}
                  />
                ))}
              </div>

              <button onClick={next}
                className="w-9 h-9 sm:w-10 sm:h-10 border flex items-center justify-center hover:border-kg-navy transition-colors flex-shrink-0"
                style={{ borderColor: 'var(--kg-border)', color: 'var(--kg-text-muted)' }}>
                <ChevronRight size={16} />
              </button>

              <button onClick={() => setPlaying(p => !p)}
                className="w-9 h-9 sm:w-10 sm:h-10 border flex items-center justify-center hover:border-kg-navy transition-colors ml-1 sm:ml-2 flex-shrink-0"
                style={{ borderColor: 'var(--kg-border)', color: 'var(--kg-text-muted)' }}
                aria-label={playing ? 'Pause' : 'Lecture'}>
                {playing ? <Pause size={14} /> : <Play size={14} />}
              </button>
            </div>

            <div className="text-center mt-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={services[index].id}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase"
                  style={{ color: 'var(--kg-text-faint)' }}
                >
                  {String(index + 1).padStart(2, '0')} / {String(N).padStart(2, '0')} — {services[index].title}
                </motion.span>
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
