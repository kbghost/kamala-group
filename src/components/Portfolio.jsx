import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { portfolioItems, portfolioCategories } from '../data/portfolio';

function Lightbox({ item, onClose }) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="lightbox-overlay" onClick={onClose}>
      <motion.div initial={{scale:0.88,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.88,opacity:0}}
        transition={{duration:0.32, ease:[0.22,1,0.36,1]}}
        className="relative max-w-4xl w-full mx-5" onClick={e=>e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute -top-11 right-0 w-9 h-9 border border-kg-red/40 flex items-center justify-center text-kg-red hover:bg-kg-red hover:text-white transition-all">
          <X size={16}/>
        </button>
        <div className="relative overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full max-h-[70vh] object-cover"/>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-kg-black/90 to-transparent p-7">
            <span className="section-label block mb-1.5">{item.category}</span>
            <h3 className="font-display text-xl font-bold mb-1">{item.title}</h3>
            <p className="text-kg-gray text-xs">{item.description}</p>
            <div className="flex gap-1.5 mt-2.5">
              {item.tags.map(t=>(
                <span key={t} className="text-[9px] font-mono px-2 py-0.5 border border-kg-navy/50 text-kg-navy-pale">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [cat, setCat]     = useState('Tous');
  const [lb,  setLb]      = useState(null);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = cat === 'Tous' ? portfolioItems : portfolioItems.filter(i => i.category === cat);

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden" style={{ background: 'var(--kg-bg-alt)' }}>
      <div className="absolute bottom-0 left-1/3 w-80 h-56 bg-kg-red/4 rounded-full blur-3xl pointer-events-none"/>

      <div className="max-w-7xl mx-auto px-5 sm:px-8" ref={ref}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <motion.span initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55}} className="section-label block mb-3">
              Nos Réalisations
            </motion.span>
            <motion.h2 initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55,delay:0.1}}
              className="font-display text-3xl md:text-4xl font-bold" style={{ color: 'var(--kg-text)' }}>
              Notre <span className="italic brand-text">portfolio</span>
            </motion.h2>
          </div>

          <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55,delay:0.2}}
            className="flex flex-wrap gap-2">
            {portfolioCategories.map(c=>(
              <button key={c} onClick={()=>setCat(c)}
                className={`px-4 py-1.5 text-[10px] font-mono tracking-widest uppercase border transition-all duration-300 ${
                  cat===c ? 'bg-kg-navy text-white border-kg-navy' : ''
                }`}
                style={cat!==c ? { borderColor: 'var(--kg-border)', color: 'var(--kg-text-muted)' } : {}}>
                {c}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i)=>(
              <motion.div key={item.id} layout
                initial={{opacity:0,scale:0.93}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.93}}
                transition={{duration:0.35, delay:i*0.04}}
                className={`group relative overflow-hidden cursor-pointer ${i%5===0?'sm:col-span-2 sm:row-span-2':''}`}
                onClick={()=>setLb(item)}>
                <div className={`relative overflow-hidden ${i%5===0?'h-56 sm:h-full sm:min-h-[300px]':'h-40 sm:h-48'}`}>
                  <img src={item.image} alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"/>
                  {/* Gradient permanent (lisibilité du titre même sans survol) + assombrissement au hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-kg-black/85 via-kg-black/10 to-transparent group-hover:from-kg-black/90 group-hover:via-kg-black/40 transition-all duration-400"/>
                  <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                    <span className="section-label text-[8px] mb-1">{item.category}</span>
                    <h3 className="font-display text-sm sm:text-base font-bold leading-tight text-white">{item.title}</h3>
                    {/* Description : réservée au survol (desktop) pour ne pas surcharger l'affichage mobile */}
                    <p className="hidden sm:block text-kg-white/60 text-xs mt-0.5 line-clamp-2 max-h-0 group-hover:max-h-12 opacity-0 group-hover:opacity-100 transition-all duration-400 overflow-hidden">
                      {item.description}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 bg-kg-red flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 delay-75">
                    <ZoomIn size={13} className="text-white"/>
                  </div>
                  <div className="absolute top-3 left-3 glass-card px-2 py-0.5">
                    <span className="font-mono text-[9px] text-kg-navy-pale">{item.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lb && <Lightbox item={lb} onClose={()=>setLb(null)}/>}
      </AnimatePresence>
    </section>
  );
}
