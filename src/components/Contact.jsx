import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import { useTheme } from '../context/ThemeContext';

// ─────────────────────────────────────────────────────────────
//  🔧 CONFIGURATION EMAILJS — modifie ces 3 valeurs
//  Tuto complet en bas de ce fichier
// ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_XXXXXXX';   // ← ton Service ID
const EMAILJS_TEMPLATE_ID = 'template_XXXXXXX';  // ← ton Template ID
const EMAILJS_PUBLIC_KEY  = 'XXXXXXXXXXXX';       // ← ta Public Key
// ─────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "22945036838"; // ← ton numéro WhatsApp

const info = [
  { icon: Phone,  label: 'Téléphone', value: '+229 94 50 36 83',    href: 'tel:+22945036838' },
  { icon: Mail,   label: 'Email',     value: 'contact@kamalagroup.bj', href: 'mailto:contact@kamalagroup.bj' },
  { icon: MapPin, label: 'Adresse',   value: 'Abomey-Calavi, Bénin', href: '#' },
];

const socials = [
  { icon: FaFacebookF, label: 'Facebook',  href: 'https://facebook.com' },
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    green: true,
  },
];

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { isDark } = useTheme();

  const [form,    setForm]    = useState({ name: '', email: '', phone: '', message: '', subject: '' });
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState(null); // 'success' | 'error'
  const [loading, setLoading] = useState(false);

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Nom requis';
    if (!form.email.trim())   e.email   = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide';
    if (!form.message.trim()) e.message = 'Message requis';
    return e;
  };

  /* ── Soumission → EmailJS ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
      // EmailJS envoie les données du formulaire à ton adresse email configurée
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name,
          from_email:   form.email,
          phone:        form.phone || 'Non renseigné',
          subject:      form.subject || 'Demande générale',
          message:      form.message,
          reply_to:     form.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '', subject: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 6000);
    }
  };

  const set = (f, v) => {
    setForm(p => ({ ...p, [f]: v }));
    if (errors[f]) setErrors(p => ({ ...p, [f]: null }));
  };

  const subjects = [
    'Événementiel',
    'Production Artistique',
    'Management d\'Artiste',
    'Booking',
    'Communication Digitale',
    'Formation',
    'Autre',
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden" style={{ background: 'var(--kg-bg)' }}>
      <div className="absolute top-0 left-0 w-72 h-72 bg-kg-navy/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-64 bg-kg-red/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8" ref={ref}>

        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }} className="section-label block mb-3"
          >
            Parlons de Votre Projet
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl font-bold"
            style={{ color: 'var(--kg-text)' }}
          >
            Contactez-<span className="italic brand-text">nous</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="text-sm mt-3 max-w-md mx-auto"
            style={{ color: 'var(--kg-text-muted)' }}
          >
            Remplissez le formulaire ci-dessous — votre message arrivera directement dans notre boîte mail.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* ── Gauche : infos + map ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Infos */}
            <div className="space-y-3">
              {info.map((item, i) => (
                <a key={i} href={item.href}
                  className="flex items-center gap-4 p-4 border hover:border-kg-navy/50 transition-all duration-300 group"
                  style={{ background: 'var(--kg-surface)', borderColor: 'var(--kg-border)' }}
                >
                  <div className="w-11 h-11 border flex items-center justify-center flex-shrink-0 group-hover:bg-kg-navy group-hover:border-kg-navy transition-all duration-300"
                    style={{ borderColor: 'var(--kg-border-light)' }}>
                    <item.icon size={17} className="text-kg-navy-pale group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="section-label text-[8px] mb-0.5">{item.label}</div>
                    <div className="text-sm font-medium" style={{ color: 'var(--kg-text)' }}>{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Réseaux */}
            <div>
              <span className="section-label block mb-3">Réseaux Sociaux</span>
              <div className="flex gap-2 flex-wrap">
                {socials.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2.5 border transition-all duration-300 group text-sm ${
                      s.green
                        ? 'bg-[#25D366]/10 border-[#25D366]/30 hover:bg-[#25D366] hover:border-[#25D366]'
                        : 'hover:border-kg-navy/50 hover:bg-kg-navy/10'
                    }`}
                    style={!s.green ? { background: 'var(--kg-surface)', borderColor: 'var(--kg-border)' } : {}}
                  >
                    <s.icon size={13} className={`transition-colors ${s.green ? 'text-[#25D366] group-hover:text-white' : 'text-kg-navy-pale'}`}
                      style={!s.green ? { color: 'var(--kg-text-muted)' } : {}} />
                    <span className={`text-xs transition-colors ${s.green ? 'text-[#25D366] group-hover:text-white' : ''}`}
                      style={!s.green ? { color: 'var(--kg-text-muted)' } : {}}>
                      {s.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="flex-1 min-h-[220px] overflow-hidden border" style={{ borderColor: 'var(--kg-border)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63341.99!2d2.3293!3d6.4486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023393f1a6c4c8d%3A0x0!2sAbomey-Calavi%2C%20B%C3%A9nin!5e0!3m2!1sfr!2sbj!4v1718000000000"
                width="100%" height="100%"
                style={{
                  border: 0,
                  filter: isDark ? 'grayscale(0.6) invert(0.85) hue-rotate(200deg)' : 'grayscale(0.3)',
                  minHeight: '220px',
                }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Kamala Group — Abomey-Calavi, Bénin"
              />
            </div>
          </motion.div>

          {/* ── Droite : formulaire ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="border p-8 md:p-10 relative overflow-hidden" style={{ background: 'var(--kg-surface)', borderColor: 'var(--kg-border)' }}>
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-kg-navy via-kg-red to-kg-navy" />

              <h3 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--kg-text)' }}>Envoyez-nous un message</h3>
              <p className="text-sm mb-7" style={{ color: 'var(--kg-text-muted)' }}>
                Notre équipe vous répond dans les <strong style={{ color: 'var(--kg-text)' }}>24 heures</strong>.
              </p>

              {/* Status feedback */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-start gap-3 p-4 bg-emerald-900/20 border border-emerald-500/30 mb-6"
                  >
                    <CheckCircle size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-emerald-300 text-sm font-semibold">Message envoyé avec succès !</p>
                      <p className="text-emerald-400/70 text-xs mt-0.5">Nous vous répondrons dans les 24 heures. Merci !</p>
                    </div>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-start gap-3 p-4 bg-kg-red/10 border border-kg-red/30 mb-6"
                  >
                    <AlertCircle size={18} className="text-kg-red flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-kg-red text-sm font-semibold">Erreur d'envoi</p>
                      <p className="text-kg-red/70 text-xs mt-0.5">
                        Vérifiez vos clés EmailJS ou contactez-nous directement sur WhatsApp.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* Nom + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    ['name',  'Nom complet *',  'Votre nom complet', 'text'],
                    ['email', 'Email *',         'votre@email.com',  'email'],
                  ].map(([f, l, p, t]) => (
                    <div key={f}>
                      <label className="section-label text-[9px] block mb-2">{l}</label>
                      <input
                        type={t} value={form[f]} onChange={e => set(f, e.target.value)} placeholder={p}
                        className={`w-full border px-4 py-3.5 text-sm focus:outline-none focus:border-kg-navy transition-colors ${
                          errors[f] ? 'border-kg-red/50' : ''
                        }`}
                        style={{ background: 'var(--kg-bg)', color: 'var(--kg-text)', borderColor: errors[f] ? undefined : 'var(--kg-border)' }}
                      />
                      {errors[f] && <p className="text-kg-red text-[10px] mt-1.5">{errors[f]}</p>}
                    </div>
                  ))}
                </div>

                {/* Téléphone + Sujet */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="section-label text-[9px] block mb-2">Téléphone</label>
                    <input
                      type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                      placeholder="+229 97 00 00 00"
                      className="w-full border px-4 py-3.5 text-sm focus:outline-none focus:border-kg-navy transition-colors"
                      style={{ background: 'var(--kg-bg)', color: 'var(--kg-text)', borderColor: 'var(--kg-border)' }}
                    />
                  </div>
                  <div>
                    <label className="section-label text-[9px] block mb-2">Sujet</label>
                    <select
                      value={form.subject} onChange={e => set('subject', e.target.value)}
                      className="w-full border px-4 py-3.5 text-sm focus:outline-none focus:border-kg-navy transition-colors appearance-none cursor-pointer"
                      style={{ background: 'var(--kg-bg)', color: 'var(--kg-text)', borderColor: 'var(--kg-border)' }}
                    >
                      <option value="">Sélectionner...</option>
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="section-label text-[9px] block mb-2">Message *</label>
                  <textarea
                    value={form.message} onChange={e => set('message', e.target.value)}
                    placeholder="Décrivez votre projet, événement ou demande en détail..."
                    rows={5}
                    className={`w-full border px-4 py-3.5 text-sm focus:outline-none focus:border-kg-navy transition-colors resize-none ${
                      errors.message ? 'border-kg-red/50' : ''
                    }`}
                    style={{ background: 'var(--kg-bg)', color: 'var(--kg-text)', borderColor: errors.message ? undefined : 'var(--kg-border)' }}
                  />
                  {errors.message && <p className="text-kg-red text-[10px] mt-1.5">{errors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit" disabled={loading}
                  className="btn-primary w-full justify-center py-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le Message
                      <Send size={15} />
                    </>
                  )}
                </button>

                <p className="text-center text-[10px]" style={{ color: 'var(--kg-text-faint)' }}>
                  En envoyant ce formulaire, vous acceptez d'être contacté par KAMALA GROUP.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
