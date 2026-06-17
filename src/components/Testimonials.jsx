import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: 'var(--kg-bg-alt)' }} ref={ref}>
      <div className="absolute top-0 right-0 w-80 h-80 bg-kg-red/4 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <motion.span initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55}} className="section-label block mb-3">Témoignages Clients</motion.span>
          <motion.h2 initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55,delay:0.1}}
            className="font-display text-3xl md:text-4xl font-bold" style={{ color: 'var(--kg-text)' }}>
            Ce qu'ils disent <span className="italic brand-text">de nous</span>
          </motion.h2>
        </div>
        <motion.div initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.65,delay:0.2}}>
          <Swiper modules={[Autoplay,Pagination]} autoplay={{delay:5000,disableOnInteraction:false}}
            pagination={{clickable:true}} spaceBetween={20} slidesPerView={1}
            breakpoints={{768:{slidesPerView:2},1200:{slidesPerView:3}}} loop className="pb-12">
            {testimonials.map(t => (
              <SwiperSlide key={t.id}>
                <div className="group border transition-all duration-400 p-8 h-full relative overflow-hidden"
                  style={{ background: 'var(--kg-surface)', borderColor: 'var(--kg-border)' }}>
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-kg-navy to-kg-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="w-10 h-10 flex items-center justify-center mb-5 border" style={{ background: 'rgba(27,46,107,0.1)', borderColor: 'rgba(27,46,107,0.2)' }}>
                    <Quote size={16} className="text-kg-navy-pale" />
                  </div>
                  <div className="flex gap-1 mb-4">{[...Array(t.rating)].map((_,i) => <span key={i} className="text-kg-red text-sm">★</span>)}</div>
                  <p className="text-sm leading-relaxed mb-8 italic" style={{ color: 'var(--kg-text-muted)' }}>"{t.text}"</p>
                  <div className="flex items-center gap-3.5 pt-5" style={{ borderTop: '1px solid var(--kg-border)' }}>
                    <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover border-2" style={{ borderColor: 'var(--kg-border-light)' }} />
                    <div>
                      <div className="font-semibold text-sm" style={{ color: 'var(--kg-text)' }}>{t.name}</div>
                      <div className="text-kg-navy-pale text-xs font-mono">{t.role}</div>
                      <div className="text-xs" style={{ color: 'var(--kg-text-muted)' }}>{t.company}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
