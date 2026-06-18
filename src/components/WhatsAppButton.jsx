import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = "22945036838"; // ← Remplace par le vrai numéro admin

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed,   setDismissed]   = useState(false);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Bonjour KAMALA GROUP 👋\n\nJe souhaite obtenir des informations sur vos services.\n\nMerci !"
  )}`;

  return (
    <div className="fixed bottom-20 right-5 z-50 flex flex-col items-end gap-2">
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && !dismissed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{    opacity: 0, scale: 0.85, y: 8 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white text-kg-black rounded-lg shadow-2xl p-4 max-w-[200px]"
          >
            {/* Arrow */}
            <div className="absolute -bottom-2 right-5 w-4 h-4 bg-white rotate-45 shadow" />

            <button
              onClick={() => setDismissed(true)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X size={12} />
            </button>

            <p className="text-xs font-semibold text-gray-800 mb-0.5">Besoin d'infos ? 💬</p>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              Chattez avec nous sur WhatsApp, on répond vite !
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp button */}
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.4, type: 'spring', stiffness: 200 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40"
        style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
        aria-label="Contactez-nous sur WhatsApp"
      >
        <FaWhatsapp size={30} className="text-white" />

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-25 bg-[#25D366]" />
      </motion.a>
    </div>
  );
}
