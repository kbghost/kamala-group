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
    image: 'https://d2aqzcyvhibcdz.cloudfront.net/wle-cdn/cdn/landing/images/bg/hero-imgdf6.jpg',
  },
  {
    id: 2,
    tag: '02 — Production',
    title: 'Production',
    accent: 'Artistique',
    sub: 'De la conception à la scène, nous donnons vie aux projets culturels les plus audacieux, en lien avec les traditions béninoises.',
    cta: 'Explorer',
    image: 'https://lanation.bj/storage/assets/2024/01/8h9AlwoRBDcU4n6v_Capture_d%E2%80%99%C3%A9cran_2024-01-26_070734.png.webp',
  },
  {
    id: 3,
    tag: '03 — Management',
    title: 'Management',
    accent: 'de Talents',
    sub: 'Nous accompagnons les artistes béninois vers l\'excellence avec une vision stratégique et personnalisée.',
    cta: 'Nos Talents',
    image: 'https://scontent.fcoo5-1.fna.fbcdn.net/v/t39.30808-6/473116081_455477574288819_1799441045599112283_n.jpg?stp=dst-jpg_tt6&cstp=mx1280x854&ctp=s1280x854&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE8vLBHW9ryWy5qshaCEJIq1gcq-sFv7T_WByr6wW_tP6piU7esX7Hjfn5PwZ5tcgIgfv2hNhvPS4PElY_TUIDG&_nc_ohc=VB0sXw7g2p0Q7kNvwFO7Mxc&_nc_oc=AdrsiL8ecp6AFJ9-L7fIfDtSg4l97w5iKsvOMno-LFMn_AABZuTWRslBS7xuaR4DLmeOHc-OBkojUVXi2-MM5Jux&_nc_zt=23&_nc_ht=scontent.fcoo5-1.fna&_nc_gid=ieUPww6VkzuqyjKx7Jt8pg&_nc_ss=7b2a8&oh=00_Af8iomWeEhwDERO9gAMy4b5nX-_ht55HGPhj8QjY6fBmXg&oe=6A3DF8CC',
  },
  {
    id: 4,
    tag: '04 — Booking',
    title: 'Booking',
    accent: 'Professionnel',
    sub: 'Un réseau d\'artistes, danseurs et performers d\'exception pour sublimer vos événements — du Festival Vodun Days de Ouidah jusqu\'à Cotonou.',
    cta: 'Notre Réseau',
    image: 'https://scontent.fcoo5-1.fna.fbcdn.net/v/t39.30808-6/472712973_455477607622149_1270002635784166414_n.jpg?stp=dst-jpg_tt6&cstp=mx1280x854&ctp=s1280x854&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGttMKgJmUC76K68vivNwJdJBdZUjJGhhMkF1lSMkaGE47W56eQC9WgfU6kJgx3y-l5XoijYUeOnCviNUrmG1ST&_nc_ohc=ZcsYX2j1fzMQ7kNvwHhsS9L&_nc_oc=Ado6e0NuMWx7iWRarpZvo28W7T7b0x0TyEHPM0VYyR6BJXz6OVrXO05JwVMW-pqZwoehI0a7cuU37ZSwVI5Wxjwa&_nc_zt=23&_nc_ht=scontent.fcoo5-1.fna&_nc_gid=B51vJou_TqaMIvxTdyklew&_nc_ss=7b2a8&oh=00_Af8-9JV7B7oj_v4wZ9kVlCUP7ZJluXiR3ll2RJPSSnjpmA&oe=6A3DCE62',
  },
  {
    id: 5,
    tag: '05 — Digital',
    title: 'Communication',
    accent: 'Digitale',
    sub: 'Stratégie, création et amplification — votre présence dans l\'ère numérique, au cœur du Bénin.',
    cta: 'En Savoir Plus',
    image: 'https://scontent.fcoo5-1.fna.fbcdn.net/v/t39.30808-6/473117220_455477927622117_3190928916008795255_n.jpg?stp=dst-jpg_tt6&cstp=mx854x1280&ctp=s854x1280&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH9AY7ZwNFrvHHi5JTshbmaTsvlrP7URgdOy-Ws_tRGB3eMhC9APKEIN9VRHUE1hwkZH04Ia4BDw5-SKIPe-XaC&_nc_ohc=Drv_I6cX094Q7kNvwHr7nX-&_nc_oc=Adpsv4Vz1GNHwpHyk0bufybslXG7Yzo8rAvjtV5UBxP2Vtjvk8io6dT1-i7-cYur86eRPjKfRHKsh_lvLKn3JvET&_nc_zt=23&_nc_ht=scontent.fcoo5-1.fna&_nc_gid=m9ovtOzXdv1Y2soAMqDO0w&_nc_ss=7b2a8&oh=00_Af-Lag_wOWIiODesuD6aOsQVPRD6-XwaOeNZsEHf7lPkIg&oe=6A3DD4D6',
  },
  {
    id: 6,
    tag: '06 — Location Immobilière',
    title: 'Location de',
    accent: 'Maisons',
    sub: 'Villas, appartements et studios de standing à Abomey-Calavi, Cotonou et environs',
    cta: 'Explorer',
    image: 'https://assets.barnes-international.com/bdata/property/2026-06/f82ebe48-fe86-5d70-95aa-d60f54cf4c26/a08Pg00001LS36PIAT_R6II0720_converted.jpg?width=800',
  },
  {
    id: 7,
    tag: '07 — Location de Véhicules',
    title: "Location d'",
    accent: 'Automobiles',
    sub: 'Berlines, SUV, vans et 4x4 avec ou sans chauffeur — disponibles 7j/7 à Cotonou et Abomey-Calavi.',
    cta: 'Explorer',
    image: 'https://www.amlbenin.com/public/img/medium/DSC5013jpg_6595634784d18.jpg',
  }
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
