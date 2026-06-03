import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, Cpu, FileJson, Layers, MessageSquare, ChevronLeft, ChevronRight, Monitor, UploadCloud, Activity, Check, Loader2, Play, FileText, Lock, Shield, Eye, Database, Terminal } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#090e17]/95 border border-white/10 p-3 rounded-xl font-mono text-[9px] sm:text-[10px] text-white space-y-1.5 backdrop-blur-md shadow-2xl">
        <p className="text-primary font-bold uppercase tracking-wider">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <p key={index} className="flex justify-between items-center gap-4">
              <span className="opacity-70 font-medium" style={{ color: entry.stroke || entry.color }}>{entry.name}:</span>
              <span className="font-black text-white">{entry.value}%</span>
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

import dashboardImg from "../assets/images/medxplain_dashboard_1780427418671.png";
import uploadImg from "../assets/images/medxplain_upload_1780427435453.png";
import analysisImg from "../assets/images/medxplain_analysis_1780427455490.png";
import pacsImg from "../assets/images/regenerated_image_1780487678516.png";

const projects = [
  {
    id: "medexplain",
    title: "MedXplain AI",
    tagline: "Bridging the gap between code and clinical care.",
    desc: "A comprehensive AI platform that simplifies complex medical reports for patients while providing high-fidelity clinical insights for doctors.",
    problem: "Medical reports are often indecipherable to patients, causing anxiety and delays in care.",
    solution: "A custom fine-tuned model that translates dense radiology jargon into empathetic, human-readable explanations.",
    features: ["OCR Extraction", "Jargon Simplification", "Multilingual Support", "Clinical Context Engine"],
    stats: { impact: "40% reduction", label: "in patient inquiry time" },
    icon: <MessageSquare className="w-12 h-12" />,
    image: dashboardImg,
    liveUrl: "https://reports-ai-ai.vercel.app/",
    chartMetrics: {
      title: "Model Accuracy & Reading Ease Score",
      description: "Evaluating medical terminology translation precision vs reading score index over 5 training phases.",
      xKey: "phase",
      line1Name: "Simplification Accuracy",
      line2Name: "Flesch Reading Ease",
    },
    chartData: [
      { phase: "Alpha Phase", accuracy: 68, readability: 35 },
      { phase: "Fine-tune I", accuracy: 78, readability: 52 },
      { phase: "Fine-tune II", accuracy: 88, readability: 71 },
      { phase: "RLHF Audit", accuracy: 94, readability: 84 },
      { phase: "Production v2.4", accuracy: 98, readability: 92 },
    ],
    screenshots: [
      {
        title: "Patient Dashboard",
        url: "https://medxplain.ai/dashboard",
        desc: "A HIPAA-compliant welcome space providing clinical summaries, interactive medical chat, and proactive wellness recommendations.",
        img: dashboardImg,
      },
      {
        title: "Report Processing",
        url: "https://medxplain.ai/analyze",
        desc: "Interactive optical character extraction system for health records, complete with a beautiful, intuitive drag-and-drop region.",
        img: uploadImg,
      },
      {
        title: "Clinical Analysis",
        url: "https://medxplain.ai/report/8v4s9",
        desc: "Fine-tuned AI translations pairing specific findings like disc bulges side-by-side with verified expert team pathways.",
        img: analysisImg,
      }
    ]
  },
  {
    id: "radai",
    title: "RadAI Workspace",
    tagline: "Intelligent Diagnostic PACS Console",
    desc: "AI-powered radiology workflow assistant for education, preliminary analysis, reporting support, and productivity.",
    problem: "Radiologists spend hours translating visual pathology into structured reports under high caseload strain.",
    solution: "A high-fidelity diagnostic console merging PACS visualizer overlays directly with standard-compliant report automation and active AI assistance.",
    features: ["PACS Web Viewer Overlays", "Live Copilot Chat Assistant", "STAT/URG Priority Triage", "One-click DICOM Alignment"],
    stats: { impact: "45% reduction", label: "in report turnaround" },
    icon: <Cpu className="w-12 h-12" />,
    image: pacsImg,
    liveUrl: "#",
    chartMetrics: {
      title: "Object Detection Sensitivity & Efficiency",
      description: "Comparison of neural model bounding box accuracy (mAP%) vs clinical workflow throughput improvement.",
      xKey: "volume",
      line1Name: "Detection Accuracy",
      line2Name: "Workflow Efficiency",
    },
    chartData: [
      { volume: "Day 1", accuracy: 72, efficiency: 40 },
      { volume: "Day 5", accuracy: 81, efficiency: 58 },
      { volume: "Day 10", accuracy: 89, efficiency: 74 },
      { volume: "Day 15", accuracy: 95, efficiency: 86 },
      { volume: "Day 20", accuracy: 99, efficiency: 95 },
    ],
    screenshots: [
      {
        title: "PACS Console Home",
        url: "https://pacs.radai.ai/dashboard",
        desc: "Secure workstation console offering active study uploads, HIPAA-compliant patient registers, and quick clinical template references.",
        img: pacsImg,
        customOverlay: "pacs_dashboard"
      },
      {
        title: "Loaded Viewport",
        url: "https://pacs.radai.ai/viewport",
        desc: "High-contrast sagittal magnetic resonance imaging scan of the spine, loaded and waiting for deep neural diagnostic alignment.",
        img: pacsImg,
        customOverlay: "pacs_evaluation"
      },
      {
        title: "Uplink Processing Pipeline",
        url: "https://pacs.radai.ai/pipeline",
        desc: "Automated neural scan line density sweep isolating anomalous radiopacity segments and computing certainty indexing dynamically.",
        img: pacsImg,
        customOverlay: "pacs_pipeline"
      },
      {
        title: "Neural Bounding Boxes",
        url: "https://pacs.radai.ai/detections",
        desc: "Precision bounding box annotations color-highlighting severe thoracic vertebral fractures and spinal compressive zones.",
        img: pacsImg,
        customOverlay: "pacs_detections"
      },
      {
        title: "Clinical Heatmap Analysis",
        url: "https://pacs.radai.ai/heatmap",
        desc: "Diagnostic heatmap overlays indicating localized compression pathologies side-by-side with structured clinical findings.",
        img: pacsImg,
        customOverlay: "pacs_heatmap"
      },
      {
        title: "Formal Interpretation Report",
        url: "https://pacs.radai.ai/report",
        desc: "Fully articulated radiology printout clinical document detailing technical techniques, findings, differentials, and consult priorities.",
        img: pacsImg,
        customOverlay: "pacs_report"
      }
    ]
  }
];

function ProjectRow({ project, index }: { project: any; index: number; key?: string }) {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const hasScreenshots = !!project.screenshots;

  const nextScreenshot = (screenshots: any[]) => {
    setActiveScreenIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevScreenshot = (screenshots: any[]) => {
    setActiveScreenIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="relative">
      <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-20 items-center`}>
        
        {/* Visual Side */}
        <motion.div 
          initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-3/5"
        >
          <div className="relative group/parent">
            <div className="absolute -inset-4 bg-primary/20 blur-[100px] opacity-0 group-hover/parent:opacity-40 transition-opacity duration-1000" />
            
            {hasScreenshots ? (
              /* INTERACTIVE BROWSER INTERFACE SHOWCASE */
              <div className="relative flex flex-col">
                {/* Browser Shell Frame */}
                <div className="glass rounded-[24px] overflow-hidden border border-white/10 shadow-2xl relative bg-[#090e17]/80 backdrop-blur-xl">
                  
                  {/* Browser Top Bar / Chrome */}
                  <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/60 block" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/60 block" />
                      <span className="w-3 h-3 rounded-full bg-green-500/60 block" />
                    </div>
                    
                    {/* Responsive Address Bar */}
                    <div className="bg-black/40 border border-white/5 px-4 py-1.5 rounded-lg text-[10px] font-mono text-white/50 tracking-wide w-1/2 max-w-[320px] text-center select-none flex items-center justify-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      {project.screenshots[activeScreenIndex].url}
                    </div>
                    
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    </div>
                  </div>

                  {/* Viewport content */}
                  <div className="relative aspect-[16/10] overflow-hidden group select-none bg-black/20">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={activeScreenIndex}
                        src={project.screenshots[activeScreenIndex].img} 
                        alt={project.screenshots[activeScreenIndex].title} 
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.015]"
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>

                    {/* Custom overlays matching user's screenshots */}
                    {project.screenshots[activeScreenIndex].customOverlay === "pacs_dashboard" && (
                      <div className="absolute inset-0 z-10 flex text-sans text-white select-none pointer-events-none text-left">
                        {/* Clinical Console Sidebar */}
                        <div className="hidden sm:flex flex-col justify-between w-48 bg-[#090e17]/95 border-r border-white/10 p-3 h-full font-sans">
                          <div>
                            <div className="flex items-center gap-1.5 text-xs font-black text-primary uppercase tracking-tight mb-5">
                              <Activity className="w-3.5 h-3.5 text-primary" />
                              Rad AI Copilot <span className="text-[8px] font-mono font-medium opacity-60">v4.2</span>
                            </div>
                            <div className="space-y-1 text-[10px] font-medium text-white/55">
                              <div className="bg-primary/10 text-primary px-2.5 py-1.5 rounded-lg flex items-center gap-2 mb-2 font-semibold">
                                <Monitor className="w-3 h-3 text-primary" /> Active Viewer
                              </div>
                              <div className="px-2.5 py-1.5 hover:text-white flex items-center gap-2"><Database className="w-3 h-3" /> Study Registry</div>
                              <div className="px-2.5 py-1.5 hover:text-white flex items-center gap-2"><FileText className="w-3 h-3" /> Patient Timeline</div>
                              <div className="px-2.5 py-1.5 hover:text-white flex items-center gap-2"><Shield className="w-3 h-3" /> HIPAA Integrity</div>
                              <div className="px-2.5 py-1.5 hover:text-white flex items-center gap-2"><Cpu className="w-3 h-3" /> Node Settings</div>
                            </div>
                          </div>
                          
                          <div className="space-y-1.5 pt-3 border-t border-white/5">
                            <div className="text-[8px] font-mono text-white/30 flex items-center gap-1">
                              <span className="w-1 h-1 bg-green-500 rounded-full" /> PACS SERVER: ONLINE
                            </div>
                            <div className="text-[8px] font-mono text-white/30 flex items-center gap-1">
                              <span className="w-1 h-1 bg-primary rounded-full animate-pulse" /> HIPAA CLOUD: SECURE
                            </div>
                          </div>
                        </div>

                        {/* Central Viewport & Right Panel */}
                        <div className="flex-1 flex flex-col md:flex-row relative bg-[#050912]/90 backdrop-blur-md">
                          {/* Central Upload Dropzone */}
                          <div className="flex-1 flex flex-col items-center justify-center p-6 border-r border-white/5 relative">
                            <div className="text-[8px] font-mono text-white/30 uppercase tracking-widest absolute top-3 left-4">
                              STAGE::UPLOAD_RESERVOIR_READY
                            </div>
                            <div className="w-full max-w-[260px] text-center border border-dashed border-white/10 rounded-2xl p-5 bg-black/40">
                              <UploadCloud className="w-8 h-8 text-primary/80 animate-pulse mb-2 mx-auto" />
                              <div className="text-xs font-bold text-white uppercase tracking-wide">Upload Clinical Scan</div>
                              <p className="text-[9px] text-white/40 leading-relaxed font-light mt-1">
                                Drag and drop radiography image or DICOM loop, or browse storage.
                              </p>
                              <div className="mt-3 py-1.5 px-3 bg-white/[0.02] border border-white/5 rounded-lg text-[8px] text-white/40 font-mono inline-block">
                                SUPPORTED: PACS_AET_104 | DICOM
                              </div>
                            </div>
                          </div>

                          {/* Right Evaluation Templates Sidebar */}
                          <div className="w-full md:w-56 p-4 flex flex-col justify-start bg-[#090e17]/40">
                            <div className="flex items-center gap-1 text-[9px] font-mono tracking-widest uppercase text-white/40 mb-3.5 pb-1 border-b border-white/5">
                              <Terminal className="w-3 h-3 text-primary" /> Evaluation Templates
                            </div>
                            
                            <div className="space-y-2">
                              <div className="bg-black/50 border border-white/5 rounded-xl p-2 flex items-center gap-2">
                                <div className="w-6 h-6 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-[10px] font-bold">PA</div>
                                <div>
                                  <div className="text-[9px] font-bold text-white leading-none">Chest: Cardiac Pleural</div>
                                  <span className="text-[7px] text-white/35 font-mono">Bilateral lung field scanning</span>
                                </div>
                              </div>

                              <div className="bg-black/50 border border-white/5 rounded-xl p-2 flex items-center gap-2">
                                <div className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-[10px] font-bold">AP</div>
                                <div>
                                  <div className="text-[9px] font-bold text-white leading-none">Skeletal: Hand AP</div>
                                  <span className="text-[7px] text-white/35 font-mono">Articular bone and borders</span>
                                </div>
                              </div>

                              <div className="bg-black/50 border border-white/5 rounded-xl p-2 flex items-center gap-2 opacity-50">
                                <div className="w-6 h-6 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 text-[10px] font-bold">PA</div>
                                <div>
                                  <div className="text-[9px] font-bold text-white leading-none">Joint: Shoulder Radiog...</div>
                                  <span className="text-[7px] text-white/35 font-mono">Clavicular articulation margins</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.screenshots[activeScreenIndex].customOverlay === "pacs_evaluation" && (
                      <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 pointer-events-none select-none text-sans text-left">
                        {/* Loaded File Info HUD Header */}
                        <div className="flex justify-between items-center bg-slate-950/90 backdrop-blur-md p-2.5 rounded-xl border border-white/10 font-mono text-[9px] sm:text-[10px] text-white/80 w-full">
                          <span className="flex items-center gap-1.5 font-bold text-white">
                            <FileText className="w-3.5 h-3.5 text-primary" /> A5C680D5-31A9-41BA-9E3C-B53FFE187F7A.jpg
                          </span>
                          <div className="flex gap-4">
                            <span className="opacity-40">2.71 MB • PACS STAGE</span>
                            <span className="font-semibold text-emerald-400 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> READY FOR AI EVALUATION
                            </span>
                          </div>
                        </div>

                        {/* CTA Begin AI Clinical Evaluation */}
                        <div className="w-full flex justify-center pb-12">
                          <Button 
                            className="h-12 sm:h-14 px-8 rounded-xl bg-primary text-black font-mono font-black border border-primary/20 text-xs uppercase tracking-wider shadow-lg shadow-primary/25 pointer-events-auto hover:bg-primary/90 flex items-center gap-2 animate-pulse"
                            onClick={() => {
                              // Auto transition to the next state (Pipeline)
                              setActiveScreenIndex(2);
                            }}
                          >
                            Begin AI Clinical Evaluation
                            <ArrowRight className="w-4 h-4 text-black font-black" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {project.screenshots[activeScreenIndex].customOverlay === "pacs_pipeline" && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center p-4 bg-[#050912]/80 backdrop-blur-sm select-none pointer-events-none text-sans text-left">
                        <div className="w-full max-w-lg bg-[#090e17]/95 border border-white/15 rounded-[24px] p-5 sm:p-7 shadow-2xl relative">
                          <span className="font-mono text-[8px] text-primary tracking-[0.25em] uppercase mb-1 block">DIAGNOSTIC PIPELINE STATUS</span>
                          <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight mb-4">Formulating formal clinical report parameters...</h4>

                          {/* Process Progress Bar */}
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-6">
                            <div className="h-full bg-primary rounded-full animate-marquee w-[85%] duration-1000" />
                          </div>

                          <div className="flex flex-col md:flex-row gap-6">
                            {/* CRT Integrity Animation Module */}
                            <div className="hidden sm:flex flex-col items-center justify-center p-4 bg-black/40 border border-white/5 rounded-xl w-36 text-center">
                              <div className="w-14 h-14 rounded-full border border-primary/25 bg-primary/5 flex items-center justify-center relative mb-2">
                                <Cpu className="w-6 h-6 text-primary animate-pulse" />
                                <div className="absolute inset-0 border border-dotted border-primary/40 rounded-full animate-spin duration-1000" />
                              </div>
                              <span className="font-mono text-[8px] text-primary uppercase font-black">CRT INTEGRITY ACTIVE</span>
                            </div>

                            {/* Checklist Steps */}
                            <div className="flex-1 font-mono text-[9px] sm:text-[10px] space-y-2 text-white/55">
                              <div className="flex items-start gap-1.5 text-emerald-400">
                                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <div>Initializing high resolution DICOM matrix array <span className="text-white/20 block text-[8px]">LOADING PIXEL ARRAY GRID...</span></div>
                              </div>
                              <div className="flex items-start gap-1.5 text-emerald-400">
                                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <div>Executing neural scan line sweep <span className="text-white/20 block text-[8px]">VERIFYING ALIGNMENTS...</span></div>
                              </div>
                              <div className="flex items-start gap-1.5 text-emerald-400">
                                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <div>Isolating anomalous radiopacity boundaries <span className="text-white/20 block text-[8px]">SCANNING GRADIENTS...</span></div>
                              </div>
                              <div className="flex items-start gap-1.5 text-emerald-400">
                                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <div>Calibrating diagnostic certainty indexes <span className="text-white/20 block text-[8px]">COMPARING WITH CASE BASES...</span></div>
                              </div>
                              <div className="flex items-start gap-1.5 text-primary font-black animate-pulse">
                                <Loader2 className="w-3.5 h-3.5 text-primary animate-spin shrink-0" />
                                <div>Formulating formal clinical report parameters <span className="text-primary/40 block text-[8px]">ASSEMBLING STRUCTURED DATA...</span></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.screenshots[activeScreenIndex].customOverlay === "pacs_detections" && (
                      <div className="absolute inset-0 z-10 flex text-left text-sans pointer-events-none select-none">
                        {/* Anatomical Bounding Overlay (Left relative zone on scan image) */}
                        <div className="flex-1 relative p-4 flex flex-col justify-between font-mono">
                          <div className="flex justify-between items-center text-[9px] text-primary bg-black/85 backdrop-blur-md p-2 rounded-lg border border-white/10 w-fit">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                              AUTODETECT ACTIVE
                            </span>
                          </div>

                          {/* Spinal Pathology Highlights */}
                          <div className="absolute top-[28%] left-[24%] border-2 border-red-500 bg-black/80 backdrop-blur-sm p-2 rounded-lg max-w-[170px] shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse">
                            <span className="block text-[8px] font-black uppercase text-red-500 leading-tight">Severe Thoracic</span>
                            <span className="block text-[8px] font-black uppercase text-red-500 leading-tight">Vertebral Compression</span>
                            <span className="block text-[8px] font-black uppercase text-red-500 leading-tight mb-1">Fracture [T7/T8]</span>
                            <Badge className="bg-red-500/20 text-red-500 border border-red-500/30 text-[8px] font-bold px-1 py-0 rounded">Cert: 95%</Badge>
                          </div>

                          <div className="absolute top-[48%] left-[34%] border-2 border-amber-500 bg-black/80 backdrop-blur-sm p-2 rounded-lg max-w-[170px] shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulseDelay">
                            <span className="block text-[8px] font-black uppercase text-amber-500 leading-tight">Severe Spinal</span>
                            <span className="block text-[8px] font-black uppercase text-amber-500 leading-tight mb-1">Cord Compression</span>
                            <Badge className="bg-amber-500/20 text-amber-500 border border-amber-500/30 text-[8px] font-bold px-1 py-0 rounded">Cert: 98%</Badge>
                          </div>

                          <div className="flex justify-between items-end text-[8px] text-white/50 bg-black/80 backdrop-blur-sm p-2 rounded-lg border border-white/10 w-fit">
                            <span>MODALITY: SAGITTAL_T2_MRI_SPINE</span>
                          </div>
                        </div>

                        {/* Structured Clinic Drawer (Right segment) */}
                        <div className="w-64 sm:w-80 bg-slate-950/95 border-l border-white/15 h-full p-4 flex flex-col justify-start relative text-sans overflow-hidden">
                          <div className="flex justify-between items-center pb-2 border-b border-white/5">
                            <div>
                              <span className="text-[8px] font-mono tracking-widest uppercase text-white/35">Diagnostic Case Report</span>
                              <h5 className="text-xs font-black text-white uppercase tracking-tight">Clinical Radiology Report</h5>
                            </div>
                            <Badge className="bg-red-500/20 text-red-500 border border-red-500/30 text-[8px] font-mono tracking-widest">Urg: STAT</Badge>
                          </div>

                          <div className="space-y-3.5 mt-3 text-[10px] leading-relaxed max-h-[85%] overflow-y-auto pr-1">
                            <div>
                              <span className="block text-[8px] font-mono text-white/30 uppercase tracking-widest mb-0.5">Study Type & Technique</span>
                              <p className="text-white/70 font-light">Sagittal T2-weighted magnetic resonance imaging (MRI) of the thoracic spine.</p>
                            </div>

                            <div>
                              <span className="block text-[8px] font-mono text-white/30 uppercase tracking-widest mb-0.5">Clinical Findings</span>
                              <ul className="list-disc pl-3 text-white/50 font-light space-y-1">
                                <li>Severe loss of anterior/posterior thoracic vertebral body height (likely T7 or T8).</li>
                                <li>Posterior retropulsion of vertebral fragments narrowing the canal.</li>
                                <li>Abnormal T2 high signal edema in the spinal canal cord.</li>
                              </ul>
                            </div>

                            <div>
                              <span className="block text-[8px] font-mono text-white/30 uppercase tracking-widest mb-0.5">Differentials</span>
                              <ol className="list-decimal pl-3 text-white/50 font-light space-y-0.5">
                                <li>Pathologic Fracture (metastatic risk)</li>
                                <li>Severe osteoporotic fracture</li>
                                <li>Acute burst collapse</li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.screenshots[activeScreenIndex].customOverlay === "pacs_heatmap" && (
                      <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 pointer-events-none select-none text-sans text-left">
                        {/* Heatmap overlay (absolute focal orange glow centered over spine compression fracture) */}
                        <div className="absolute top-[40%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-radial from-red-600/35 via-amber-500/10 to-transparent blur-xl pointer-events-none animate-pulse" />

                        {/* Top report header */}
                        <div className="flex justify-between items-center bg-[#090e17]/95 border border-white/10 p-2.5 rounded-xl text-sans w-full shadow-lg">
                          <div>
                            <span className="font-mono text-[8px] text-primary tracking-widest block uppercase">RAD AI - CLINICAL REPORT</span>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wide">Diagnostic Visualization (Heatmap Focus)</h4>
                          </div>
                          <Badge variant="outline" className="text-[8px] font-mono text-emerald-400 border-emerald-500/25 bg-emerald-500/5 uppercase">Node Level-1 Certified</Badge>
                        </div>

                        {/* Pathology list overlay block at the bottom */}
                        <div className="bg-slate-950/95 border border-white/12 rounded-xl p-3 max-w-lg mb-8 shadow-2xl relative font-sans space-y-2 mt-auto">
                          <div className="text-[8px] font-mono tracking-widest uppercase text-white/40 pb-1 border-b border-white/5">STRUCTURED PATHOLOGIES DETECTED</div>
                          
                          <div className="space-y-2 text-[10px]">
                            <div className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                              <div>
                                <span className="font-bold text-red-400 block uppercase leading-tight text-[9px]">1. Severe Thoracic Vertebral Compression Fracture</span>
                                <span className="text-white/35 font-mono text-[8px]">STAT/Critical | Cert: 95% | Zone: Mid-thoracic vertebral spine body (T7 or T8)</span>
                                <p className="text-white/50 leading-relaxed font-light mt-0.5">Near-complete vertebral height collapse with retropulsion into the spinal cord canal.</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                              <div>
                                <span className="font-bold text-amber-400 block uppercase leading-tight text-[9px]">2. Severe Spinal Cord Compression</span>
                                <span className="text-white/35 font-mono text-[8px]">STAT/Critical | Cert: 98% | Zone: Thoracic spinal canal alignment cord</span>
                                <p className="text-white/50 leading-relaxed font-light mt-0.5">Severe canal narrowing secondary to fracture retropulsion with high signal myelopathy cord edema.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.screenshots[activeScreenIndex].customOverlay === "pacs_report" && (
                      <div className="absolute inset-0 z-10 p-5 bg-[#fafcfd] text-slate-800 select-none overflow-y-auto pointer-events-none text-left font-serif shadow-inner">
                        <div className="max-w-2xl mx-auto space-y-4 pb-6 mt-2">
                          {/* Diagnostic report clinical typography */}
                          <div className="border-b-2 border-slate-900 pb-3 text-center">
                            <h3 className="text-lg font-black tracking-tight uppercase text-slate-900 font-sans">Formal Radiological Interpretation</h3>
                            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block font-bold"># Clinical Radiology Report</span>
                          </div>

                          <div className="space-y-1 text-[11px] font-sans pb-3.5 border-b border-slate-200">
                            <div><strong className="text-slate-900">Study Type:</strong> Sagittal T2-weighted magnetic resonance imaging (MRI) of thoracic spine.</div>
                            <div><strong className="text-slate-900">Study Date:</strong> 06/03/2026 17:01 PM</div>
                            <div><strong className="text-slate-900">Device Modality:</strong> RAD AI PACS Cloud v4.2</div>
                          </div>

                          <div className="text-[11px] leading-relaxed space-y-3 font-serif text-slate-700">
                            <div>
                              <h5 className="font-sans text-[10px] uppercase font-black tracking-wider text-slate-900 mb-0.5">Clinical Findings</h5>
                              <ul className="list-disc pl-4 space-y-1">
                                <li>
                                  <strong className="text-slate-950 font-bold">Vertebral Column:</strong> Near-complete loss of vertebral height in the mid-thoracic body (T7 or T8 likely), presenting a distinct vertebra plana compression wedge.
                                </li>
                                <li>
                                  <strong className="text-slate-950 font-bold">Spinal Canal & Cord:</strong> Posterior retropulsion of bone fragments compressing the focal spinal cord canal. T2 cord high intensity signal is observed, indicating localized myelopathy and cord edema.
                                </li>
                                <li>
                                  <strong className="text-slate-950 font-bold">Other Segments:</strong> Remaining lumbar alignments demonstrate stable disc height with typical endplate changes.
                                </li>
                              </ul>
                            </div>

                            <div>
                              <h5 className="font-sans text-[10px] uppercase font-black tracking-wider text-slate-900 mb-0.5">Differential Diagnoses</h5>
                              <ol className="list-decimal pl-4 space-y-0.5">
                                <li><strong className="text-slate-950 font-bold">Pathologic Fracture:</strong> Strongly suspect underlying neoplastic processes (metastases / myeloma risk) or infectious etiologies.</li>
                                <li><strong className="text-slate-950 font-bold">Severe Osteoporotic Collapse:</strong> Highly progressive fracture given bone density markers.</li>
                                <li><strong className="text-slate-950 font-bold">Acute Traumatic burst fracture.</strong> </li>
                              </ol>
                            </div>

                            <div className="bg-red-50 border border-red-100 rounded-xl p-3.5 mt-2 text-red-950 font-sans text-[10px]">
                              <strong className="text-red-900 uppercase font-black tracking-wider block mb-0.5">Urgent Recommendations</strong>
                              STAT Neurosurgical & Orthopedic Spine consultations are highly advised secondary to critical cord compression. Urgent contrast-enhanced spinal MRI is encouraged.
                            </div>
                          </div>

                          <div className="text-[9px] font-sans text-slate-400 text-center uppercase tracking-widest pt-3 border-t border-slate-100">
                            Diagnostic Assist Interpretation Only. Final treatment under direct board-certified physician.
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Hover Overlay Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />

                    {/* Interactive Arrow Controls */}
                    <button 
                      onClick={() => prevScreenshot(project.screenshots)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass border border-white/10 hover:border-primary/40 text-white/70 hover:text-white transition-all scale-90 hover:scale-100 opacity-0 group-hover:opacity-100 z-20"
                      aria-label="Previous Screenshot"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => nextScreenshot(project.screenshots)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass border border-white/10 hover:border-primary/40 text-white/70 hover:text-white transition-all scale-90 hover:scale-100 opacity-0 group-hover:opacity-100 z-20"
                      aria-label="Next Screenshot"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Mini Context Badge */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
                      <div className="max-w-md">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-primary font-semibold block mb-1">
                          Screenshot {activeScreenIndex + 1} of {project.screenshots.length}
                        </span>
                        <h4 className="text-lg font-bold text-white capitalize">{project.screenshots[activeScreenIndex].title}</h4>
                        <p className="text-xs text-white/60 font-light line-clamp-1 mt-0.5">
                          {project.screenshots[activeScreenIndex].desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Screenshot Selector Tabs */}
                <div className={`grid ${project.screenshots.length > 3 ? 'grid-cols-3 sm:grid-cols-6' : 'grid-cols-3'} gap-3 mt-4`}>
                  {project.screenshots.map((screen: any, sIdx: number) => {
                    const isActive = sIdx === activeScreenIndex;
                    return (
                      <button
                        key={sIdx}
                        onClick={() => setActiveScreenIndex(sIdx)}
                        className={`p-3.5 rounded-xl border transition-all text-left relative flex flex-col justify-between overflow-hidden group ${
                          isActive 
                            ? "bg-primary/5 border-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.05)]" 
                            : "bg-white/[0.01] border-white/5 hover:border-white/15"
                        }`}
                      >
                        {isActive && (
                          <motion.div 
                            layoutId={`activeIndicator-${project.id}`}
                            className="absolute inset-x-0 top-0 h-[2px] bg-primary"
                          />
                        )}
                        <span className={`font-mono text-[9px] uppercase tracking-widest block transition-colors duration-300 ${
                          isActive ? "text-primary" : "text-white/30 group-hover:text-white/55"
                        }`}>
                          0{sIdx + 1} // PROTOCOL
                        </span>
                        <span className={`text-xs font-semibold uppercase mt-1 tracking-wide transition-colors duration-300 ${
                          isActive ? "text-white" : "text-white/50 group-hover:text-white/80"
                        }`}>
                          {screen.title.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Standard Project Visual Layout */
              <div className="glass rounded-[32px] overflow-hidden aspect-video relative border-primary/20">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale-[0.2] brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                
                {/* Floating UI Simulation */}
                <div className="absolute top-10 right-10 flex flex-col gap-4 animate-float">
                  <div className="glass p-4 rounded-2xl border-white/10 backdrop-blur-3xl">
                    <Cpu className="w-6 h-6 text-primary mb-2" />
                    <div className="w-20 h-2 bg-primary/20 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ x: [-80, 80] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="h-full w-20 bg-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Content Side */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
           className="w-full lg:w-2/5 space-y-10"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
              {project.icon}
            </div>
            <div>
              <h3 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter">{project.title}</h3>
              <p className="font-mono-ui uppercase text-primary/60 tracking-widest">{project.tagline}</p>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-light">
            {project.desc}
          </p>

          <div className="grid grid-cols-2 gap-8 py-10 border-y border-white/5">
            <div>
              <span className="text-3xl md:text-5xl font-display font-black text-primary">{project.stats.impact}</span>
              <p className="text-xs uppercase font-mono tracking-widest text-white/30">{project.stats.label}</p>
            </div>
            <div className="flex flex-col gap-2">
               {project.features.slice(0, 4).map((f: string) => (
                 <div key={f} className="flex items-center gap-3 text-sm text-white/60">
                   <CheckCircle2 className="w-3 h-3 text-primary" /> {f}
                 </div>
               ))}
            </div>
          </div>

          {/* System Telemetry Chart */}
          <div className="space-y-4 bg-white/[0.01] border border-white/5 rounded-2xl p-5">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-[9px] font-mono-ui uppercase tracking-[0.2em] text-primary font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-primary animate-pulse" /> telemetry // accuracy & efficiency metrics
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-mono tracking-widest px-2 py-0.5 rounded">
                LIVE METRICS
              </span>
            </div>
            
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white uppercase tracking-tight">{project.chartMetrics.title}</h4>
              <p className="text-[10px] text-white/40 leading-relaxed font-light">
                {project.chartMetrics.description}
              </p>
            </div>

            <div className="h-32 w-full pt-1 relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={project.chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`grad_acc_${project.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id={`grad_sec_${project.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey={project.chartMetrics.xKey} 
                    stroke="rgba(255, 255, 255, 0.1)" 
                    tick={{ fill: 'rgba(255, 255, 255, 0.3)', fontSize: 7, fontFamily: 'monospace' }}
                    dy={5}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    stroke="rgba(255, 255, 255, 0.1)" 
                    tick={{ fill: 'rgba(255, 255, 255, 0.3)', fontSize: 7, fontFamily: 'monospace' }}
                    dx={-5}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="accuracy" 
                    name={project.chartMetrics.line1Name} 
                    stroke="#10b981" 
                    strokeWidth={1.5}
                    fillOpacity={1} 
                    fill={`url(#grad_acc_${project.id})`} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey={project.id === "medexplain" ? "readability" : "efficiency"} 
                    name={project.chartMetrics.line2Name} 
                    stroke="#f59e0b" 
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fillOpacity={1} 
                    fill={`url(#grad_sec_${project.id})`} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex gap-6">
            <Button className="h-16 px-10 rounded-xl primary-gradient tactile-button">View Module Details</Button>
            <a 
              href={project.liveUrl} 
              target={project.liveUrl !== "#" ? "_blank" : undefined} 
              rel="noopener noreferrer"
              className={`${buttonVariants({ variant: "outline" })} h-16 px-10 rounded-xl glass tactile-button inline-flex items-center justify-center`}
            >
              Live Environment
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative border-t border-white/5 bg-[#050912]">
      <div className="container mx-auto px-6">
        
        {/* Title Block with Wibify minimalist layout */}
        <div className="mb-20 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-12 border-b border-white/5">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.35em] block mb-3">
              Core Modules // Technical Systems
            </span>
            <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
              Intelligence Systems
            </h2>
          </div>
          <p className="text-sm md:text-base font-light text-white/40 max-w-sm font-sans tracking-wide">
            Clinical artificial intelligence applications, deep parsing architectures, and diagnostics engines calibrated for low-latency workflow automation.
          </p>
        </div>

        <div className="space-y-40">
          {projects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
