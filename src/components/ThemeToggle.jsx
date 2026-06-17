import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme, isDark } = useTheme();

  if (compact) {
    // Version icône seule pour la navbar
    return (
      <motion.button
        onClick={toggleTheme}
        whileTap={{ scale: 0.88 }}
        aria-label={isDark ? 'Passer en thème clair' : 'Passer en thème sombre'}
        className="relative w-9 h-9 flex items-center justify-center border transition-all duration-300 flex-shrink-0"
        style={{
          borderColor: isDark ? 'var(--kg-border-light)' : '#D0D6F0',
          background:  isDark ? 'transparent' : '#ffffff',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0,   scale: 1 }}
              exit={{    opacity: 0, rotate:  90,  scale: 0.5 }}
              transition={{ duration: 0.22 }}
              className="absolute"
            >
              <Sun size={15} style={{ color: '#F4C542' }} />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: 90,  scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0,   scale: 1 }}
              exit={{    opacity: 0, rotate: -90,  scale: 0.5 }}
              transition={{ duration: 0.22 }}
              className="absolute"
            >
              <Moon size={15} style={{ color: '#1B2E6B' }} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }

  // Version pill avec texte (pour mobile menu ou autre)
  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.96 }}
      className="flex items-center gap-3 w-full px-4 py-3 border transition-all duration-300"
      style={{
        borderColor: 'var(--kg-border)',
        background:  'var(--kg-surface)',
      }}
    >
      {/* Toggle pill */}
      <div
        className="relative w-10 h-5 rounded-full flex-shrink-0 transition-colors duration-400"
        style={{ background: isDark ? '#1B2E6B' : '#C0272D' }}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
          style={{ left: isDark ? '2px' : 'calc(100% - 18px)' }}
        />
      </div>

      <div className="flex items-center gap-2">
        {isDark
          ? <Sun  size={14} style={{ color: '#F4C542' }} />
          : <Moon size={14} style={{ color: '#1B2E6B' }} />
        }
        <span className="text-sm font-medium" style={{ color: 'var(--kg-text)' }}>
          {isDark ? 'Thème Clair' : 'Thème Sombre'}
        </span>
      </div>

      <span
        className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded"
        style={{
          background: isDark ? 'rgba(27,46,107,0.2)' : 'rgba(192,39,45,0.1)',
          color: isDark ? '#3A52B8' : '#C0272D',
        }}
      >
        {isDark ? 'DARK' : 'LIGHT'}
      </span>
    </motion.button>
  );
}
