import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft, Send, Sparkles, AlertCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import emailjs from 'emailjs-com';

// ─────────────────────────────────────────────────────────────
//  🔧 CONFIGURATION — même clés que Contact.jsx
// ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_XXXXXXX';
const EMAILJS_TEMPLATE_ID = 'template_XXXXXXX';
const EMAILJS_PUBLIC_KEY  = 'XXXXXXXXXXXX';
const WHATSAPP_NUMBER     = "22997000000";
// ─────────────────────────────────────────────────────────────

/* ── Données des étapes ── */
const STEPS = [
  {
    id: 1,
    label: 'Service',
    question: 'Quel service vous intéresse ?',
    sub: 'Sélectionnez une ou plusieurs options',
    field: 'services',
    type: 'multi',
    options: [
      { value: 'evenement',      label: 'Événementiel',          icon: '🎪' },
      { value: 'production',     label: 'Production Artistique', icon: '🎬' },
      { value: 'management',     label: 'Management d\'Artiste', icon: '⭐' },
      { value: 'booking',        label: 'Booking',               icon: '🎤' },
      { value: 'communication',  label: 'Communication Digitale',icon: '📱' },
      { value: 'formation',      label: 'Formation',             icon: '📚' },
    ],
  },
  {
    id: 2,
    label: 'Budget',
    question: 'Quel est votre budget approximatif ?',
    sub: 'Cette information nous aide à vous proposer la meilleure offre',
    field: 'budget',
    type: 'single',
    options: [
      { value: 'moins500k',  label: 'Moins de 500 000 FCFA',     icon: '💡' },
      { value: '500k-2m',    label: '500 000 – 2 000 000 FCFA',  icon: '📊' },
      { value: '2m-5m',      label: '2 000 000 – 5 000 000 FCFA',icon: '🚀' },
      { value: 'plus5m',     label: 'Plus de 5 000 000 FCFA',    icon: '💎' },
      { value: 'indefini',   label: 'À définir ensemble',         icon: '🤝' },
    ],
  },
  {
    id: 3,
    label: 'Délai',
    question: 'Quel est votre délai ?',
    sub: 'Quand souhaitez-vous démarrer votre projet ?',
    field: 'delai',
    type: 'single',
    options: [
      { value: 'urgent',    label: 'Urgent (moins d\'1 mois)',  icon: '⚡' },
      { value: '1-3mois',   label: '1 à 3 mois',               icon: '📅' },
      { value: '3-6mois',   label: '3 à 6 mois',               icon: '🗓️' },
      { value: 'plus6mois', label: 'Plus de 6 mois',           icon: '🌟' },
      { value: 'flexible',  label: 'Flexible',                  icon: '🔄' },
    ],
  },
  {
    id: 4,
    label: 'Contact',
    question: 'Vos coordonnées',
    sub: 'Pour recevoir votre devis personnalisé',
    field: 'contact',
    type: 'form',
  },
];

const SLIDE = {
  initial: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  animate: { opacity: 1, x: 0 },
  exit:    (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

/* ── Barre de progression ── */
function ProgressBar({ current, total }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center gap-2 flex-1">
          <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-400 ${
            i < current
              ? 'bg-kg-red border-kg-red text-white'
              : i === current
              ? 'bg-transparent border-kg-navy text-kg-navy-pale'
              : 'bg-transparent'
          }`}
            style={i >= current ? { borderColor: 'var(--kg-border)', color: 'var(--kg-text-faint)' } : {}}
          >
            {i < current ? <CheckCircle size={14} /> : s.id}
          </div>
          <span className="text-[10px] font-mono tracking-wider hidden sm:block transition-colors"
            style={{ color: i === current ? 'var(--kg-text)' : i < current ? '#3A52B8' : 'var(--kg-text-faint)' }}
          >
            {s.label}
          </span>
          {i < total - 1 && (
            <div className="flex-1 h-px transition-colors duration-400"
              style={{ background: i < current ? '#C0272D' : 'var(--kg-border)' }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Carte option ── */
function OptionCard({ option, selected, onClick, multi }) {
  const isSelected = multi
    ? (selected || []).includes(option.value)
    : selected === option.value;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      onClick={() => onClick(option.value)}
      className={`relative flex items-center gap-3 p-4 border text-left transition-all duration-300 ${
        isSelected ? 'bg-kg-navy/15 border-kg-navy' : 'hover:border-kg-navy/40'
      }`}
      style={{
        background: isSelected ? undefined : 'var(--kg-bg)',
        borderColor: isSelected ? undefined : 'var(--kg-border)',
        color: isSelected ? 'var(--kg-text)' : 'var(--kg-text-muted)',
      }}
    >
      {/* Check indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-4 h-4 bg-kg-red rounded-full flex items-center justify-center"
        >
          <CheckCircle size={10} className="text-white" />
        </motion.div>
      )}
      <span className="text-xl flex-shrink-0">{option.icon}</span>
      <span className="text-sm font-medium leading-tight min-w-0 break-words">{option.label}</span>
    </motion.button>
  );
}

/* ── Formulaire étape 4 ── */
function ContactStep({ data, onChange, errors }) {
  const fields = [
    { key: 'name',    label: 'Nom complet *',   type: 'text',  placeholder: 'Votre nom' },
    { key: 'email',   label: 'Email *',          type: 'email', placeholder: 'votre@email.com' },
    { key: 'phone',   label: 'Téléphone',        type: 'tel',   placeholder: '+229 97 00 00 00' },
    { key: 'details', label: 'Détails du projet',type: 'area',  placeholder: 'Décrivez votre projet en quelques lignes...' },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {fields.map(f => (
        <div key={f.key} className={f.type === 'area' ? 'sm:col-span-2' : ''}>
          <label className="section-label text-[9px] block mb-2">{f.label}</label>
          {f.type === 'area' ? (
            <textarea
              value={data[f.key] || ''}
              onChange={e => onChange(f.key, e.target.value)}
              placeholder={f.placeholder}
              rows={3}
              className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-kg-navy transition-colors resize-none ${
                errors?.[f.key] ? 'border-kg-red/50' : ''
              }`}
              style={{ background: 'var(--kg-bg)', color: 'var(--kg-text)', borderColor: errors?.[f.key] ? undefined : 'var(--kg-border)' }}
            />
          ) : (
            <input
              type={f.type}
              value={data[f.key] || ''}
              onChange={e => onChange(f.key, e.target.value)}
              placeholder={f.placeholder}
              className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-kg-navy transition-colors ${
                errors?.[f.key] ? 'border-kg-red/50' : ''
              }`}
              style={{ background: 'var(--kg-bg)', color: 'var(--kg-text)', borderColor: errors?.[f.key] ? undefined : 'var(--kg-border)' }}
            />
          )}
          {errors?.[f.key] && <p className="text-kg-red text-[10px] mt-1">{errors[f.key]}</p>}
        </div>
      ))}
    </div>
  );
}

/* ── Composant principal ── */
export default function Devis() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [step,      setStep]      = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers,   setAnswers]   = useState({});
  const [contactErrors, setContactErrors] = useState({});
  const [status,    setStatus]    = useState(null); // 'success'|'error'|'sending'
  const [submitted, setSubmitted] = useState(false);

  const currentStep = STEPS[step];

  /* ── Sélection options ── */
  const handleSelect = (value) => {
    if (currentStep.type === 'multi') {
      const prev = answers[currentStep.field] || [];
      const next = prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value];
      setAnswers(a => ({ ...a, [currentStep.field]: next }));
    } else {
      setAnswers(a => ({ ...a, [currentStep.field]: value }));
    }
  };

  /* ── Changement champ contact ── */
  const handleContactChange = (key, val) => {
    setAnswers(a => ({ ...a, contact: { ...(a.contact || {}), [key]: val } }));
    if (contactErrors[key]) setContactErrors(e => ({ ...e, [key]: null }));
  };

  /* ── Navigation ── */
  const canNext = () => {
    if (currentStep.type === 'multi')   return (answers[currentStep.field] || []).length > 0;
    if (currentStep.type === 'single')  return !!answers[currentStep.field];
    if (currentStep.type === 'form')    return true;
    return true;
  };

  const goNext = () => {
    if (step < STEPS.length - 1) { setDirection(1); setStep(s => s + 1); }
  };
  const goPrev = () => {
    if (step > 0) { setDirection(-1); setStep(s => s - 1); }
  };

  /* ── Soumission finale ── */
  const handleSubmit = async () => {
    const contact = answers.contact || {};
    const errs = {};
    if (!contact.name?.trim())  errs.name  = 'Nom requis';
    if (!contact.email?.trim()) errs.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(contact.email)) errs.email = 'Email invalide';
    if (Object.keys(errs).length) { setContactErrors(errs); return; }

    setStatus('sending');
    const serviceLabels  = (answers.services || []).map(v => STEPS[0].options.find(o => o.value === v)?.label).join(', ');
    const budgetLabel    = STEPS[1].options.find(o => o.value === answers.budget)?.label || '—';
    const delaiLabel     = STEPS[2].options.find(o => o.value === answers.delai)?.label  || '—';

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  contact.name,
          from_email: contact.email,
          phone:      contact.phone  || 'Non renseigné',
          subject:    '🎯 Nouvelle Demande de Devis — KAMALA GROUP',
          message:    `
DEMANDE DE DEVIS
━━━━━━━━━━━━━━━━━━━━━━━
Services demandés : ${serviceLabels}
Budget estimé     : ${budgetLabel}
Délai             : ${delaiLabel}
━━━━━━━━━━━━━━━━━━━━━━━
Détails du projet :
${contact.details || 'Aucun détail fourni'}
━━━━━━━━━━━━━━━━━━━━━━━
Contact
Nom   : ${contact.name}
Email : ${contact.email}
Tél   : ${contact.phone || '—'}
          `.trim(),
          reply_to: contact.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  /* ── WhatsApp summary ── */
  const handleWhatsapp = () => {
    const contact      = answers.contact || {};
    const serviceLabels = (answers.services || []).map(v => STEPS[0].options.find(o => o.value === v)?.label).join(', ');
    const budgetLabel   = STEPS[1].options.find(o => o.value === answers.budget)?.label || '—';
    const delaiLabel    = STEPS[2].options.find(o => o.value === answers.delai)?.label  || '—';
    const msg = encodeURIComponent(
      `Bonjour KAMALA GROUP 👋\n\n*DEMANDE DE DEVIS*\n\n` +
      `📋 Services : ${serviceLabels}\n` +
      `💰 Budget : ${budgetLabel}\n` +
      `📅 Délai : ${delaiLabel}\n\n` +
      `👤 Nom : ${contact.name || '—'}\n` +
      `📧 Email : ${contact.email || '—'}\n` +
      `📞 Tél : ${contact.phone || '—'}\n\n` +
      `💬 Détails : ${contact.details || 'À préciser'}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <section id="devis" className="section-padding relative overflow-hidden" style={{ background: 'var(--kg-bg-alt)' }}>
      {/* Déco */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-kg-red/30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-kg-navy/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-kg-red/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8" ref={ref}>

        {/* Header section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-kg-red/30 bg-kg-red/8 mb-5"
          >
            <Sparkles size={13} className="text-kg-red" />
            <span className="section-label text-[9px]">Fonctionnalité Exclusive</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl font-bold mb-3"
          >
            Obtenez votre{' '}
            <span className="italic brand-text">devis gratuit</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: 'var(--kg-text-muted)' }}
          >
            Répondez à 4 questions simples — nous vous préparons une offre sur mesure en 24h.
          </motion.p>
        </div>

        {/* Wizard card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="border border-kg-border relative overflow-hidden" style={{ background: 'var(--kg-surface)' }}
        >
          {/* Top gradient */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-kg-navy via-kg-red to-kg-navy" />

          <div className="p-5 sm:p-8 md:p-12">

            {/* ── SUCCESS STATE ── */}
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-900/20 border-2 border-emerald-500/40 flex items-center justify-center">
                  <CheckCircle size={36} className="text-emerald-400" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">Demande envoyée !</h3>
                <p className="text-sm leading-relaxed max-w-sm mx-auto mb-8" style={{ color: 'var(--kg-text-muted)' }}>
                  Votre demande de devis a bien été reçue. Notre équipe vous contactera dans les <strong style={{ color: 'var(--kg-text)' }}>24 heures</strong> avec une offre personnalisée.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => { setSubmitted(false); setStep(0); setAnswers({}); setStatus(null); }}
                    className="btn-outline text-sm"
                  >
                    Faire une autre demande
                  </button>
                  <button onClick={handleWhatsapp} className="flex items-center gap-2 justify-center px-6 py-3 bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1ebe5d] transition-colors">
                    <FaWhatsapp size={16} />
                    Contacter sur WhatsApp
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Progress */}
                <ProgressBar current={step} total={STEPS.length} />

                {/* Step content */}
                <div className="min-h-[280px]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={SLIDE}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h3 className="font-display text-xl md:text-2xl font-bold mb-1.5" style={{ color: 'var(--kg-text)' }}>
                        {currentStep.question}
                      </h3>
                      <p className="text-sm mb-6" style={{ color: 'var(--kg-text-muted)' }}>{currentStep.sub}</p>

                      {/* Options ou form */}
                      {currentStep.type !== 'form' ? (
                        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                          {currentStep.options.map(opt => (
                            <OptionCard
                              key={opt.value}
                              option={opt}
                              selected={answers[currentStep.field]}
                              onClick={handleSelect}
                              multi={currentStep.type === 'multi'}
                            />
                          ))}
                        </div>
                      ) : (
                        <ContactStep
                          data={answers.contact || {}}
                          onChange={handleContactChange}
                          errors={contactErrors}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Error */}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-2.5 p-3 bg-kg-red/10 border border-kg-red/30 mt-4">
                    <AlertCircle size={15} className="text-kg-red flex-shrink-0" />
                    <p className="text-kg-red text-xs">Erreur d'envoi. Utilisez WhatsApp à la place.</p>
                  </motion.div>
                )}

                {/* Navigation */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-8 pt-6" style={{ borderTop: '1px solid var(--kg-border)' }}>
                  <button
                    onClick={goPrev}
                    disabled={step === 0}
                    className="flex items-center gap-1.5 px-3 sm:px-5 py-2.5 border text-xs sm:text-sm font-medium transition-all"
                    style={{
                      borderColor: step === 0 ? 'var(--kg-border)' : 'var(--kg-border-light)',
                      color: step === 0 ? 'var(--kg-text-faint)' : 'var(--kg-text-muted)',
                      cursor: step === 0 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <ArrowLeft size={15} />
                    Retour
                  </button>

                  <span className="text-xs font-mono" style={{ color: 'var(--kg-text-faint)' }}>
                    {step + 1} / {STEPS.length}
                  </span>

                  {step < STEPS.length - 1 ? (
                    <button
                      onClick={goNext}
                      disabled={!canNext()}
                      className={`flex items-center gap-1.5 px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                        canNext()
                          ? 'bg-gradient-to-r from-kg-navy to-kg-navy-light text-white hover:from-kg-red hover:to-kg-red-light hover:-translate-y-px'
                          : 'cursor-not-allowed'
                      }`}
                      style={!canNext() ? { background: 'var(--kg-border)', color: 'var(--kg-text-faint)' } : {}}
                    >
                      Suivant
                      <ArrowRight size={15} />
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      {/* Envoi WhatsApp de secours */}
                      <button
                        onClick={handleWhatsapp}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-sm font-semibold hover:bg-[#25D366] hover:text-white transition-all"
                      >
                        <FaWhatsapp size={15} />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </button>
                      {/* Envoi email */}
                      <button
                        onClick={handleSubmit}
                        disabled={status === 'sending'}
                        className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-px disabled:opacity-60"
                        style={{ background: 'linear-gradient(135deg, #1B2E6B, #2A4099)' }}
                      >
                        {status === 'sending' ? (
                          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Envoi...</>
                        ) : (
                          <>Envoyer <Send size={14} /></>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
