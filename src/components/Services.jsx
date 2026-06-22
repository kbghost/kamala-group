import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

const ROTATE_DELAY = 4500;
const SLIDE_DELAY   = 4000;
const MOBILE_BP     = 768;

// ── 8 images de service stockées localement dans /public/images/services/ ──
// Pour remplacer une image : pose ton fichier dans public/images/services/
// et mets à jour le champ `image` ci-dessous.
const serviceImages = [
  { id: 1, image: '/images/services/service-1.jpeg', titre: 'Événementiel',         label: 'Organisation de A à Z' },
  { id: 2, image: '/images/services/service-2.jpeg', titre: 'Production Artistique', label: 'Création & Spectacles' },
  { id: 3, image: '/images/services/service-3.jpeg', titre: 'Management de Talents', label: 'Accompagnement Artistes' },
  { id: 4, image: '/images/services/service-4.jpeg', titre: 'Booking',               label: 'Réseau & Mise en scène' },
  { id: 5, image: '/images/services/service-5.jpeg', titre: 'Communication Digitale',label: 'Stratégie & Réseaux' },
  { id: 6, image: '/images/services/service-6.jpeg', titre: 'Formation',             label: 'Ateliers & Masterclass' }
];

const N = serviceImages.length;
const ANGLE_STEP = 360 / N;

/* ── Carte image sur l'anneau 3D (tablette / desktop) ── */
function RingImageCard({ svc, offset, radius, cardWidth, onClick }) {
  const isFront   = offset === 0;
  const absOff    = Math.min(Math.abs(offset), N - Math.abs(offset));
  const angle     = offset * ANGLE_STEP;
  const opacity   = isFront ? 1 : absOff === 1 ? 0.55 : 0.2;
  const blur      = isFront ? 0 : absOff === 1 ? 1 : 3;
  const scale     = isFront ? 1 : absOff === 1 ? 0.82 : 0.68;
  const zIndex    = isFront ? 50 : 50 - absOff * 10;

  return (
    <motion.div
      onClick={onClick}
      animate={{ rotateY: angle, opacity, scale }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute', top: 0, left: '50%',
        width: `${cardWidth}px`, marginLeft: `-${cardWidth / 2}px`,
        transformStyle: 'preserve-3d',
        transformOrigin: `50% 50% -${radius}px`,
        filter: `blur(${blur}px)`, zIndex,
        cursor: isFront ? 'default' : 'pointer',
      }}
      className="select-none"
    >
      <div className="relative overflow-hidden border-2 transition-all duration-500"
        style={{
          borderColor: isFront ? '#C0272D' : 'rgba(27,46,107,0.3)',
          boxShadow: isFront ? '0 28px 70px -10px rgba(192,39,45,0.4)' : 'none',
        }}>
        <img src={svc.image} alt={svc.titre} className="w-full h-56 sm:h-72 object-cover block" />
        {/* Overlay + titre */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <span className="section-label text-[8px] block mb-1" style={{ color: '#C0272D' }}>{svc.label}</span>
          <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">{svc.titre}</h3>
        </div>
        {/* Ligne accent top si carte active */}
        {isFront && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-kg-navy via-kg-red to-kg-navy" />}
      </div>
    </motion.div>
  );
}

/* ── Carrousel mobile gauche→droite, images pleine largeur ── */
function MobileImageSlider() {
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
        spaceBetween={12}
        loop
        speed={550}
        autoplay={{ delay: SLIDE_DELAY, disableOnInteraction: false }}
        pagination={{ clickable: true, el: '.svc-mobile-pagination' }}
        onSwiper={sw => { swiperRef.current = sw; }}
        onSlideChange={sw => setActiveIdx(sw.realIndex)}
        className="w-full"
      >
        {serviceImages.map(svc => (
          <SwiperSlide key={svc.id}>
            <div className="relative overflow-hidden border-2" style={{ borderColor: '#1B2E6B' }}>
              <img src={svc.image} alt={svc.titre} className="w-full object-cover block"
                style={{ height: 'clamp(240px, 70vw, 380px)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-kg-navy via-kg-red to-kg-navy" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="section-label text-[8px] block mb-1" style={{ color: '#C0272D' }}>{svc.label}</span>
                <h3 className="font-display text-lg font-bold text-white">{svc.titre}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center justify-center gap-3 mt-5">
        <div className="svc-mobile-pagination flex items-center gap-1.5" />
        <button onClick={() => setPlaying(p => !p)}
          className="w-9 h-9 border flex items-center justify-center hover:border-kg-navy transition-colors flex-shrink-0 ml-1"
          style={{ borderColor: 'var(--kg-border)', color: 'var(--kg-text-muted)' }}
          aria-label={playing ? 'Pause' : 'Lecture'}>
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>
      <div className="text-center mt-3">
        <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'var(--kg-text-faint)' }}>
          {String(activeIdx + 1).padStart(2, '0')} / {String(N).padStart(2, '0')} — {serviceImages[activeIdx].titre}
        </span>
      </div>
      <style>{`
        .svc-mobile-pagination { position:static!important; width:auto!important; flex:0 0 auto; }
        .svc-mobile-pagination .swiper-pagination-bullet {
          width:7px; height:7px; border-radius:9999px;
          background:var(--kg-border-light); opacity:1;
          transition:width .3s,background .3s; margin:0 3px;
        }
        .svc-mobile-pagination .swiper-pagination-bullet-active { width:24px; background:#C0272D; }
      `}</style>
    </div>
  );
}

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [index,  setIndex]   = useState(0);
  const [playing,setPlaying] = useState(true);
  const [viewport, setVp]    = useState(1024);

  useEffect(() => {
    const check = () => setVp(window.innerWidth);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const isMobile = viewport < MOBILE_BP;

  useEffect(() => {
    if (!playing || isMobile) return;
    const t = setInterval(() => setIndex(i => (i + 1) % N), ROTATE_DELAY);
    return () => clearInterval(t);
  }, [playing, isMobile]);

  const goTo = i => setIndex(i);

  let cardWidth, radius, sceneHeight;
  if (viewport < 1024) { cardWidth = 360; radius = 260; sceneHeight = 380; }
  else                  { cardWidth = 460; radius = 400; sceneHeight = 400; }

  return (
    <section id="services" className="section-padding relative overflow-hidden" style={{ background: 'var(--kg-bg)' }}>
      <div className="absolute top-1/3 -right-24 w-72 h-72 bg-kg-navy/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-kg-red/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8" ref={ref}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <motion.span initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55}} className="section-label block mb-3">
              Ce Que Nous Faisons
            </motion.span>
            <motion.h2 initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55,delay:0.1}}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: 'var(--kg-text)' }}>
              Nos <span className="italic brand-text">expertises</span>
            </motion.h2>
          </div>
          <motion.p initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55,delay:0.2}}
            className="text-sm sm:text-base max-w-sm leading-relaxed md:text-right" style={{ color: 'var(--kg-text-muted)' }}>
            {isMobile
              ? 'Huit domaines d\'excellence pour vos projets.'
              : 'Huit domaines d\'excellence pour accompagner vos projets de A à Z. Cliquez pour explorer.'}
          </motion.p>
        </div>

        {isMobile ? (
          <MobileImageSlider />
        ) : (
          <>
            {/* Scène 3D — anneau d'images rotatif */}
            <div className="relative mx-auto w-full overflow-hidden"
              style={{ height: `${sceneHeight}px`, perspective: '1800px' }}>
              <motion.div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
                {serviceImages.map((svc, i) => {
                  let offset = i - index;
                  if (offset > N / 2) offset -= N;
                  if (offset < -N / 2) offset += N;
                  return (
                    <RingImageCard key={svc.id} svc={svc} offset={offset}
                      radius={radius} cardWidth={cardWidth} onClick={() => goTo(i)} />
                  );
                })}
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
              <button onClick={() => goTo((index - 1 + N) % N)}
                className="w-10 h-10 border flex items-center justify-center hover:border-kg-navy transition-colors"
                style={{ borderColor: 'var(--kg-border)', color: 'var(--kg-text-muted)' }}>
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-2">
                {serviceImages.map((s, i) => (
                  <button key={s.id} onClick={() => goTo(i)}
                    className="h-2 rounded-full transition-all duration-400"
                    style={{ width: i === index ? '24px' : '7px',
                             background: i === index ? '#C0272D' : 'var(--kg-border-light)' }}
                    aria-label={`Voir ${s.titre}`} />
                ))}
              </div>
              <button onClick={() => goTo((index + 1) % N)}
                className="w-10 h-10 border flex items-center justify-center hover:border-kg-navy transition-colors"
                style={{ borderColor: 'var(--kg-border)', color: 'var(--kg-text-muted)' }}>
                <ChevronRight size={18} />
              </button>
              <button onClick={() => setPlaying(p => !p)}
                className="w-10 h-10 border flex items-center justify-center hover:border-kg-navy transition-colors ml-2"
                style={{ borderColor: 'var(--kg-border)', color: 'var(--kg-text-muted)' }}
                aria-label={playing ? 'Pause' : 'Lecture'}>
                {playing ? <Pause size={15} /> : <Play size={15} />}
              </button>
            </div>
            <div className="text-center mt-4">
              <AnimatePresence mode="wait">
                <motion.span key={serviceImages[index].id}
                  initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}}
                  transition={{duration:0.3}}
                  className="font-mono text-[10px] tracking-widest uppercase"
                  style={{ color: 'var(--kg-text-faint)' }}>
                  {String(index+1).padStart(2,'0')} / {String(N).padStart(2,'0')} — {serviceImages[index].titre}
                </motion.span>
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
