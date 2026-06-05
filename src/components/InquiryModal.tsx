/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Sparkles, Send, Sparkle, AlertCircle } from 'lucide-react';
import { PortfolioCategory, Inquiry } from '../types';

interface InquiryModalProps {
  onClose: () => void;
  onSubmitInquiry: (inquiry: Omit<Inquiry, 'id' | 'status' | 'submittedAt'>) => void;
  initialCategory?: PortfolioCategory | 'custom';
}

export default function InquiryModal({ onClose, onSubmitInquiry, initialCategory = 'custom' }: InquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<PortfolioCategory | 'custom'>(initialCategory || 'custom');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [aestheticNotes, setAestheticNotes] = useState('');
  const [lightingPreference, setLightingPreference] = useState<'dawn' | 'golden_hour' | 'liquid_glass' | 'cinematic_dark' | 'any'>('liquid_glass');
  
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !email || !eventDate || !location) {
      setErrorMsg('Please specify your name, email, event date, and location to finalize.');
      return;
    }

    // Submit inquiry parameters
    onSubmitInquiry({
      name,
      email,
      phone,
      serviceType,
      eventDate,
      location,
      aestheticNotes,
      lightingPreference
    });

    setSubmitted(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.95 }}
        className="w-full max-w-2xl bg-brand-background rounded-2xl overflow-hidden border border-brand-primary/10 shadow-2xl relative text-on-background"
      >
        {/* Header Block */}
        <div className="px-6 md:px-10 py-6 border-b border-brand-primary/10 flex justify-between items-center bg-[#efeeeb]/50">
          <div>
            <span className="font-label text-[10px] tracking-widest text-[#715b3e] uppercase font-bold flex items-center gap-1.5">
              <Sparkle className="w-3.5 h-3.5 text-[#dac587] fill-[#dac587]" />
              <span>Bespoke Consultation</span>
            </span>
            <h2 className="font-serif text-2xl text-brand-primary font-medium mt-1">
              Bespoke Production Inquiry
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 text-brand-primary/70 hover:text-brand-primary hover:bg-brand-primary/5 rounded-full transition-colors active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form 
              key="form"
              onSubmit={handleSubmit}
              className="p-6 md:p-10 flex flex-col gap-5 max-h-[75vh] overflow-y-auto"
            >
              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-50 text-red-800 text-xs flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Grid 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label text-[10px] text-[#7d7669] uppercase font-bold tracking-wider">
                    Your Full Name *
                  </label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Alexandra Sterling"
                    className="p-3 rounded-lg border border-brand-primary/10 focus:border-brand-primary bg-white text-sm outline-none transition-all focus:ring-1 focus:ring-brand-primary/20"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label text-[10px] text-[#7d7669] uppercase font-bold tracking-wider">
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g., alexandra@luxuryestate.com"
                    className="p-3 rounded-lg border border-brand-primary/10 focus:border-brand-primary bg-white text-sm outline-none transition-all focus:ring-1 focus:ring-brand-primary/20"
                    required
                  />
                </div>
              </div>

              {/* Grid 2: Call phone and service select */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label text-[10px] text-[#7d7669] uppercase font-bold tracking-wider">
                    Contact Phone (Optional)
                  </label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g., +1 (555) 019-2834"
                    className="p-3 rounded-lg border border-brand-primary/10 focus:border-brand-primary bg-white text-sm outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label text-[10px] text-[#7d7669] uppercase font-bold tracking-wider">
                    Commission Category
                  </label>
                  <select 
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value as PortfolioCategory | 'custom')}
                    className="p-3 rounded-lg border border-brand-primary/10 focus:border-brand-primary bg-white text-sm outline-none transition-all ring-0"
                  >
                    <option value="weddings">Wedding Storyboarding & Photography</option>
                    <option value="products">Product Macro Refraction Studio</option>
                    <option value="cinematography">Celluloid Film & Cinematography</option>
                    <option value="custom">Creative Hybrid Custom Commission</option>
                  </select>
                </div>
              </div>

              {/* Grid 3: Date and shoot location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label text-[10px] text-[#7d7669] uppercase font-bold tracking-wider flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#dac587]" />
                    <span>Preferred Date *</span>
                  </label>
                  <input 
                    type="date" 
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="p-3 rounded-lg border border-brand-primary/10 focus:border-brand-primary bg-white text-sm outline-none transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label text-[10px] text-[#7d7669] uppercase font-bold tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#dac587]" />
                    <span>Shoot Location / Destination *</span>
                  </label>
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Udaipur Palace or Studio Studio"
                    className="p-3 rounded-lg border border-brand-primary/10 focus:border-brand-primary bg-white text-sm outline-none transition-all REQUIRED"
                    required
                  />
                </div>
              </div>

              {/* Section 4: Lighting Strategy */}
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] text-[#7d7669] uppercase font-bold tracking-wider">
                  Preferred Lighting Configuration
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                  {[
                    { val: 'liquid_glass', label: 'Liquid Glass (High Refraction)' },
                    { val: 'golden_hour', label: 'Sunset Glow (Golden Warm)' },
                    { val: 'dawn', label: 'Ethereal Dawn (Soft Diffused)' },
                    { val: 'cinematic_dark', label: 'Chiaroscuro (Deep Shadows)' },
                    { val: 'any', label: 'Creative Trust (Director Choice)' }
                  ].map((lamp) => {
                    const isSel = lightingPreference === lamp.val;
                    return (
                      <div 
                        key={lamp.val}
                        onClick={() => setLightingPreference(lamp.val as any)}
                        className={`p-2.5 rounded-lg border text-center cursor-pointer transition-all ${
                          isSel 
                            ? 'bg-brand-primary-container/20 border-brand-primary text-brand-primary font-medium' 
                            : 'bg-white border-brand-primary/15 hovered:bg-brand-primary/5 text-[#4b463a] text-xs'
                        }`}
                      >
                        <span className="text-[11px] block truncate">{lamp.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 5: Aesthetic notes */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label text-[10px] text-[#7d7669] uppercase font-bold tracking-wider">
                  Intimate Aesthetic Aspirations & Remarks
                </label>
                <textarea 
                  rows={3}
                  value={aestheticNotes}
                  onChange={(e) => setAestheticNotes(e.target.value)}
                  placeholder="Describe the mood, texture parameters, fabric elements, and desired pacing. Help us envision your story before we align camera models."
                  className="p-3 rounded-lg border border-brand-primary/10 focus:border-brand-primary bg-white text-sm outline-none transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-brand-primary/10 flex items-center justify-between">
                <span className="font-sans text-[10px] text-[#7d7669] max-w-[280px] leading-snug">
                  * Submission commits initial production slots. All variables remain customizable during physical workshops.
                </span>
                <button 
                  type="submit"
                  className="font-label text-xs tracking-wider bg-brand-primary text-white hover:bg-brand-secondary py-3.5 px-6 rounded-full uppercase font-bold flex items-center gap-2 shadow hover:shadow-brand-secondary/25 transition-all outline-none"
                >
                  <span>Submit Commission</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 text-center flex flex-col items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-brand-primary-container/20 border border-brand-primary/20 flex items-center justify-center text-brand-primary animate-bounce">
                <Sparkles className="w-8 h-8 text-[#dac587]" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-brand-primary mb-2">Inquiry Lodged in Gold.</h3>
                <p className="font-sans text-sm text-[#4b463a] max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-brand-primary">{name}</span>. Your aesthetic outline has been logged inside our master register. Our production lead will reach out to schedule a cinematic review.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#efeeeb]/50 border border-brand-primary/10 text-xs text-left text-[#4b463a] max-w-md">
                <div className="font-label uppercase font-bold text-[#715b3e] mb-1">Details Summary:</div>
                <div><span className="font-semibold">Category:</span> {serviceType}</div>
                <div><span className="font-semibold">Target Date:</span> {eventDate}</div>
                <div><span className="font-semibold">Location:</span> {location}</div>
                <div><span className="font-semibold">Selected Light:</span> {lightingPreference.replace('_', ' ')}</div>
              </div>

              <button 
                onClick={onClose}
                className="font-label text-xs tracking-wider bg-brand-primary text-white hover:bg-brand-secondary px-8 py-3.5 rounded-full uppercase font-bold transition-all shadow mt-2"
              >
                Close Window
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
