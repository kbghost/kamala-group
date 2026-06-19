import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { ArrowRight, ChevronDown } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ─────────────────────────────────────────────
//  ⏱️ Timing du slider — 5 secondes par slide, boucle infinie
// ─────────────────────────────────────────────
const AUTOPLAY_DELAY  = 5000;
const TRANSITION_TIME = 900;

// ─────────────────────────────────────────────
//  🖼️ Images personnalisées fournies par le client
// ─────────────────────────────────────────────
const slides = [
  {
    id: 1,
    tag: '01 — Événementiel',
    title: 'Événements',
    accent: "d'Exception",
    sub: 'Festivals, galas, conférences — nous transformons chaque moment en expérience inoubliable, à Abomey-Calavi et partout au Bénin.',
    cta: 'Découvrir',
    image: 'https://image.cueup.io/unsafe/h:2194/q:75/rt:auto/w:1920/plain/https://cdn.cueup.io/user_uploads/images/3812e6b4-8e35-40f6-b736-4f22c136a27c.jpeg',
  },
  {
    id: 2,
    tag: '02 — Production',
    title: 'Production',
    accent: 'Artistique',
    sub: 'De la conception à la scène, nous donnons vie aux projets culturels les plus audacieux, en lien avec les traditions béninoises.',
    cta: 'Explorer',
    image: 'https://prod.jaspir.com/wp-content/uploads/2025/02/BIM-252.webp',
  },
  {
    id: 3,
    tag: '03 — Management',
    title: 'Management',
    accent: 'de Talents',
    sub: 'Nous accompagnons les artistes béninois vers l\'excellence avec une vision stratégique et personnalisée.',
    cta: 'Nos Talents',
    image: 'https://ecotourismebenin.wordpress.com/wp-content/uploads/2017/03/photo-couv-enterrement.jpg?w=1200&h=800&crop=1',
  },
  {
    id: 4,
    tag: '04 — Booking',
    title: 'Booking',
    accent: 'Professionnel',
    sub: 'Un réseau d\'artistes, danseurs et performers d\'exception pour sublimer vos événements — du Festival Vodun Days de Ouidah jusqu\'à Cotonou.',
    cta: 'Notre Réseau',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR02cCfXj8srDZNYkpGPfDmLyDL7X64MTJj3IfoC2nyw&s=10',
  },
  {
    id: 5,
    tag: '05 — Digital',
    title: 'Communication',
    accent: 'Digitale',
    sub: 'Stratégie, création et amplification — votre présence dans l\'ère numérique, au cœur du Bénin.',
    cta: 'En Savoir Plus',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkrcfJ9TtLQHHPOav7dr3AWybbZE4eaUW2kaatb3Ubqg&s=10',
  },
];

function SlideContent({ slide }) {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 h-full flex items-center">
      <div className="max-w-xl hero-content">

        <span className="section-label block mb-4">
          {slide.tag}
        </span>

        <h1 className="font-display font-bold leading-[1.05] text-white
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-1">
          {slide.title}
        </h1>

        <h1 className="font-display font-bold italic leading-[1.05] brand-text
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6">
          {slide.accent}
        </h1>

        <div className="origin-left h-0.5 w-12 bg-kg-red mb-5 hero-sep" />

        <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
          {slide.sub}
        </p>

        <div className="flex flex-wrap gap-3">
          <a href="#services" className="btn-primary">
            {slide.cta}
            <ArrowRight size={14} />
          </a>
          <a href="#contact" className="btn-outline" style={{
            borderColor: 'rgba(255,255,255,0.55)',
            color: '#FFFFFF',
          }}>
            Prendre Contact
          </a>
        </div>
      </div>
    </div>
  );
}

export default function HeroSlider() {
  return (
    <section id="accueil" className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false, pauseOnMouseEnter: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        speed={TRANSITION_TIME}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full overflow-hidden">
              {/* BG image — le zoom Ken Burns est 100% piloté en CSS via .swiper-slide-active */}
              <div
                className="absolute inset-0 bg-cover bg-center hero-bg"
                style={{ backgroundImage: `url('${slide.image}')` }}
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-kg-black/65" />
              <div className="absolute inset-0 bg-gradient-to-r from-kg-black/80 via-kg-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-kg-black/70 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-kg-navy/20 via-transparent to-kg-red/10" />
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-kg-red/50 to-transparent" />

              {/* Contenu — toujours dans le DOM, révélé en CSS via .swiper-slide-active */}
              <div className="relative h-full z-10">
                <SlideContent slide={slide} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll indicator */}
      <button
        onClick={() => document.querySelector('#apropos')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 group"
      >
        <span className="section-label text-[8px]">Défiler</span>
        <div className="w-7 h-7 rounded-full border border-kg-red/40 flex items-center justify-center group-hover:border-kg-red group-hover:bg-kg-red/10 transition-all hero-bounce">
          <ChevronDown size={12} className="text-kg-red" />
        </div>
      </button>

      {/* Side brand label */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-2">
        <div className="w-px h-14 bg-gradient-to-b from-transparent to-kg-navy/60" />
        <span
          className="font-mono text-[8px] text-kg-navy-pale/60 tracking-[0.3em]"
          style={{ writingMode: 'vertical-rl' }}
        >
          KAMALA GROUP
        </span>
      </div>
    </section>
  );
}
