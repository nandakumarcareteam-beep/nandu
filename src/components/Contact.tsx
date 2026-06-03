import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Linkedin, Github, Globe, CheckCircle2, Terminal, ArrowRight, ArrowLeft, Send, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [role, setRole] = useState("Radiologist");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) {
      alert("Please populate all required terminal fields (Name, Email, Message).");
      return;
    }

    setIsSubmitting(true);

    // Simulate clinical uplink transmit handshake
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Pre-compile the mailto content with formal medical-inquiry alignment
      const subject = encodeURIComponent(`Viziorad Clinical Lead // Inquiry from ${fullName}`);
      const body = encodeURIComponent(
        `--- CLINICAL INTAKE DIRECTIVE SUBMITTED ---\n\n` +
        `IDENTIFIER: ${fullName}\n` +
        `CONTACT DIRECTORY: ${email}\n` +
        `ORGANIZATION / INSTITUTION: ${institution || "N/A"}\n` +
        `PROFESSIONAL ROLE: ${role}\n` +
        `MESSAGE BODY:\n${message}\n\n` +
        `-------------------------------------------\n` +
        `Transmitted via Viziorad Clinical Portal | Secure Link Ready.`
      );

      // Launch the direct mail communication
      window.location.href = `mailto:nandakumar.careteam@gmail.com?subject=${subject}&body=${body}`;
    }, 1200);
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setInstitution("");
    setRole("Radiologist");
    setMessage("");
    setSubmitSuccess(false);
    setShowForm(false);
  };

  return (
    <section id="connect" className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden bg-[#050912] border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[140px] -z-10" />

      <div className="container mx-auto px-6 max-w-4xl">
        <AnimatePresence mode="wait">
          {!showForm ? (
            /* STATE 1: WELCOME CALL TO ACTION */
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center relative z-10"
            >
              <span className="font-mono text-[10px] text-primary uppercase tracking-[0.35em] block mb-4">
                Uplink // Transmission Ready
              </span>
              
              <h2 className="text-4xl md:text-[8rem] font-display font-black text-white mb-10 tracking-tighter leading-none uppercase">
                Let’s Build <br />
                The Future of Care
              </h2>
              
              <p className="text-base md:text-xl text-white/40 mb-16 max-w-2xl mx-auto leading-relaxed font-light tracking-wide px-4 font-sans">
                Whether you are a medical provider, an engineer, or a clinical researcher—let's synchronize our vision for an automated, low-latency healthcare engine.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6 items-center max-w-2xl mx-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto rounded-xl px-8 h-16 text-xs font-semibold uppercase tracking-wider font-mono bg-primary text-black hover:bg-primary/95 transition-all duration-300 group inline-flex items-center justify-center shadow-lg shadow-primary/15"
                  onClick={() => setShowForm(true)}
                >
                  <Sparkles className="mr-2 w-4 h-4 text-black animate-pulse" />
                  Initialize Contact
                </Button>

                <a 
                  href="https://wa.me/918921691578?text=Hello%20Nandakumar,%20I'm%20interested%20in%20your%20clinical%20radiology%20solutions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto rounded-xl px-8 h-16 text-xs font-semibold uppercase tracking-wider font-mono border border-emerald-500/30 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 animate-pulse" />
                  Chat with Me
                </a>
                
                <div className="flex gap-4">
                  {[
                    { icon: <MessageCircle className="w-5 h-5" />, link: "https://wa.me/918921691578" },
                    { icon: <Linkedin className="w-5 h-5" />, link: "https://www.linkedin.com/in/nandakumar-kt-903b741b8/" }
                  ].map((social, i) => (
                    <a 
                      key={i}
                      href={social.link}
                      target={social.link !== "#" ? "_blank" : undefined}
                      rel={social.link !== "#" ? "noopener noreferrer" : undefined}
                      className="rounded-xl w-16 h-16 bg-white/[0.01] hover:bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : !submitSuccess ? (
            /* STATE 2: INTERACTIVE MEDICAL LEAD FORM */
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.97, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass border border-white/10 rounded-[32px] p-6 md:p-12 relative bg-[#090e17]/80 backdrop-blur-2xl shadow-2xl z-20"
            >
              {/* Form HUD Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-white/5 mb-8 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-wider">
                    <Terminal className="w-3.5 h-3.5 animate-pulse" />
                    Secure Uplink Channel v2.4
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-black text-white uppercase mt-1 tracking-tight">Clinical Intake Portal</h3>
                  <p className="text-xs text-white/40 mt-1 font-mono">
                    Prefer direct chat?{" "}
                    <a 
                      href="https://wa.me/918921691578?text=Hello%20Nandakumar,%20I'm%20interested%20in%20your%20clinical%20radiology%20solutions."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      <MessageCircle className="w-3 h-3 text-emerald-400 animate-pulse" /> Connect via WhatsApp (+91 89216 91578)
                    </a>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-xs font-mono text-white/40 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Cancel Connection
                </button>
              </div>

              {/* Lead Inquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50">
                      Identifer Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Dr./Prof./Mr./Ms."
                      className="w-full h-14 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white/90 placeholder:text-white/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-all font-sans"
                    />
                  </div>

                  {/* Contact Email */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50">
                      Terminal Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@institution.com"
                      className="w-full h-14 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white/90 placeholder:text-white/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Institution/Affiliation */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50">
                      Hospital / Institution / Entity
                    </label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="Primary affiliation"
                      className="w-full h-14 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white/90 placeholder:text-white/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-all font-sans"
                    />
                  </div>

                  {/* Professional Classification Domain Option */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50">
                      Clinical Classification
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full h-14 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white/90 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-all font-sans appearance-none cursor-pointer"
                    >
                      <option value="Radiologist" className="bg-[#090e17]">Radiology Specialist</option>
                      <option value="Medical Provider" className="bg-[#090e17]">Clinical Lead / Medical Provider</option>
                      <option value="Researcher" className="bg-[#090e17]">Academic Researcher</option>
                      <option value="Developer" className="bg-[#090e17]">AI System Developer / Engineer</option>
                      <option value="Other" className="bg-[#090e17]">Strategic Partner / Other</option>
                    </select>
                  </div>
                </div>

                {/* Directive Message */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50">
                    Operation Directive / Inquiries <span className="text-primary">*</span>
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Describe your inquiry, PACS integration parameters, or diagnostic workflow optimization needs..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white/90 placeholder:text-white/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-all font-sans resize-none"
                  />
                </div>

                {/* Security Footer Notice and Submit */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-white/5 gap-4">
                  <div className="text-[10px] font-mono text-white/30 text-center sm:text-left">
                    SYSTEM DIRECTIVE: Leads will be archived and instantly transmitted to <span className="text-primary/70">nandakumar.careteam@gmail.com</span>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto rounded-xl px-8 h-14 text-xs font-semibold uppercase tracking-wider font-mono bg-primary text-black hover:bg-primary/90 transition-all duration-300 inline-flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Transmit Lead
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            /* STATE 3: FULL CHECKPOINT TERMINAL DIALOG SUCCESS */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="glass border border-emerald-500/30 rounded-[32px] p-6 md:p-12 text-center bg-[#090e17]/90 backdrop-blur-2xl shadow-xl max-w-2xl mx-auto relative z-20"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8 animate-pulse" />
                </div>
              </div>

              <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-[0.35em] block mb-2">
                TRANSMISSION ROUTED SECURELY
              </span>
              
              <h3 className="text-3xl font-display font-black text-white uppercase mb-4 tracking-tight">Lead Transmitted</h3>
              
              <p className="text-sm text-white/50 mb-8 leading-relaxed max-w-md mx-auto font-sans">
                The secure clinical uplink handshake completed. Inquiry data has been packed and prepared for routing to <strong className="text-emerald-400 font-semibold">nandakumar.careteam@gmail.com</strong>.
              </p>

              {/* Mock System Diagnostic Output detailing submission parameters */}
              <div className="bg-black/50 border border-white/5 rounded-xl p-5 mb-8 text-left font-mono text-[11px] text-white/40 space-y-2.5 max-w-md mx-auto">
                <div className="text-primary font-bold border-b border-white/5 pb-1 uppercase text-[9px] tracking-wider">UPLINK METADATA INTAKE LOG</div>
                <div><span className="text-white/20">TARGET_MAIL :</span> nandakumar.careteam@gmail.com</div>
                <div><span className="text-white/20">IDENTIFIER  :</span> {fullName}</div>
                <div><span className="text-white/20">CLASSIFY    :</span> {role}</div>
                <div><span className="text-white/20">ENTITY_REF  :</span> {institution || "N/A"}</div>
                <div><span className="text-white/20">STATUS      :</span> DELIVERING VIA MAILTO GATEWAY</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="rounded-xl h-12 font-mono text-xs uppercase border-white/10 text-white/70 hover:bg-white/5"
                >
                  Submit Another Lead
                </Button>
                
                <a
                  href={`mailto:nandakumar.careteam@gmail.com?subject=Inquiry&body=Ref: ${encodeURIComponent(fullName)}`}
                  className="rounded-xl px-6 h-12 text-xs font-mono uppercase bg-primary text-black hover:bg-primary/95 inline-flex items-center justify-center font-bold"
                >
                  Open Client Panel
                </a>

                <a
                  href="https://wa.me/918921691578?text=Hello%20Nandakumar,%20I've%20submitted%20the%20intake%20form.%20Let's%20connect."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl px-6 h-12 text-xs font-mono uppercase bg-emerald-500 text-black hover:bg-[#075e54] hover:text-white inline-flex items-center justify-center font-bold gap-1 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Direct
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

