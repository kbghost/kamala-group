import { motion } from 'framer-motion';
import { ArrowUpRight, Globe } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { talents } from '../data/talents';

function TalentCard({ talent, index }) {
  return (
    <motion.div
      initial={{opacity:0, y:32}} whileInView={{opacity:1,y:0}}
      viewport={{once:true,margin:'-50px'}}
      transition={{duration:0.55, delay:index*0.08, ease:[0.22,1,0.36,1]}}
      className="group relative overflow-hidden cursor-pointer">
      <div className="relative overflow-hidden aspect-[3/4]">
        <img src={talent.image} alt={talent.name}
          className="w-full h-full object-cover object-top transition-transform duration-600 group-hover:scale-110"/>
        <div className="absolute inset-0 bg-gradient-to-t from-kg-black via-kg-black/15 to-transparent"/>
        <div className="absolute inset-0 bg-kg-navy/0 group-hover:bg-kg-navy/10 transition-colors duration-500"/>

        {talent.featured && (
          <div className="absolute top-3 left-3 bg-kg-red px-2 py-0.5">
            <span className="font-mono text-[8px] text-white font-bold tracking-widest uppercase">Featured</span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-1.5 translate-x-10 group-hover:translate-x-0 transition-transform duration-400">
          <button className="w-7 h-7 bg-kg-black/80 flex items-center justify-center hover:bg-kg-navy transition-colors">
            <FaInstagram size={12} className="text-white"/>
          </button>
          <button className="w-7 h-7 bg-kg-black/80 flex items-center justify-center hover:bg-kg-navy transition-colors">
            <Globe size={12} className="text-white"/>
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <span className="section-label text-[8px] mb-0.5 block">{talent.specialty}</span>
          <h3 className="font-display text-lg font-bold text-kg-white leading-tight group-hover:text-kg-navy-pale transition-colors duration-300">
            {talent.name}
          </h3>
          <p className="text-kg-white/55 text-xs mb-3">{talent.category}</p>
          <div className="flex items-center gap-1.5 translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
            <span className="text-xs font-semibold text-kg-red tracking-wider uppercase">Découvrir</span>
            <ArrowUpRight size={12} className="text-kg-red"/>
          </div>
          <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-kg-navy to-kg-red w-0 group-hover:w-full transition-all duration-500"/>
        </div>
      </div>
    </motion.div>
  );
}

export default function Talents() {
  return (
    <section id="talents" className="section-padding relative overflow-hidden" style={{ background: 'var(--kg-bg)' }}>
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-kg-navy/6 rounded-full blur-3xl pointer-events-none"/>

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.span initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{duration:0.55}} className="section-label block mb-3">Notre Roster</motion.span>
            <motion.h2 initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{duration:0.55,delay:0.1}} className="font-display text-3xl md:text-4xl font-bold" style={{ color: 'var(--kg-text)' }}>
              Nos <span className="italic brand-text">talents</span>
            </motion.h2>
          </div>
          <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            transition={{duration:0.55,delay:0.2}} className="text-sm max-w-xs leading-relaxed" style={{ color: 'var(--kg-text-muted)' }}>
            Une constellation de talents soigneusement sélectionnés et accompagnés vers l'excellence.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {talents.map((t, i) => <TalentCard key={t.id} talent={t} index={i}/>)}
        </div>

        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:0.55,delay:0.3}} className="text-center mt-12">
          <p className="text-sm mb-5" style={{ color: 'var(--kg-text-muted)' }}>Découvrez l'ensemble de notre roster d'artistes</p>
          <a href="#contact" className="btn-outline">
            Voir Tous les Talents
            <ArrowUpRight size={14}/>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
