import { motion } from 'framer-motion';
const items = [
  { value: '+100', label: 'Projets Réalisés' },
  { value: '+50',  label: 'Talents Accompagnés' },
  { value: '+20',  label: 'Événements Produits' },
  { value: '+12', label: 'Communes Couvertes' },
];
export default function StatsBanner() {
  return (
    <div className="relative overflow-hidden" style={{ background: '#1B2E6B' }}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1B2E6B] via-[#1B2E6B] to-[#0D1533] opacity-90" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-kg-red/10 skew-x-[-12deg] translate-x-12" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.45, delay:i*0.07 }}
              className="flex flex-col items-center py-4 px-4 text-center">
              <span className="font-display text-2xl md:text-3xl font-bold text-white leading-none">{item.value}</span>
              <span className="font-mono text-[9px] text-white/50 tracking-widest uppercase mt-1">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
