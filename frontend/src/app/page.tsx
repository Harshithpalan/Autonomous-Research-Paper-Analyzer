"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FileUpload from '@/components/FileUpload'
import AnalysisDashboard from '@/components/AnalysisDashboard'
import { Sparkles, ArrowLeft } from 'lucide-react'

export default function Home() {
  const [analysisData, setAnalysisData] = useState<any>(null)

  return (
    <div className="relative overflow-hidden">
      {/* Cinematic Animated Background */}
      <div className="absolute inset-0 -z-20 bg-[#F0EDE5] overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-[#004643]/5 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 120, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-[#d4a373]/10 blur-[100px] rounded-full"
        />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#004643 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
        />
      </div>

      <main className="min-h-screen p-6 md:p-12 lg:p-20 max-w-7xl mx-auto flex flex-col items-center">
        <motion.header
          className="mb-16 text-center space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.3 }
            }
          }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#004643]/5 border border-[#004643]/10 text-sm font-semibold text-[#004643] mb-4 shadow-sm"
          >
            <Sparkles size={14} className="text-[#004643]" />
            <span>Excellence in Academic Synthesis</span>
          </motion.div>

          <div className="space-y-2">
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-6xl md:text-8xl font-black tracking-tighter text-[#004643] leading-[0.9]"
            >
              AUTONOMOUS <br />
              <span className="gradient-text italic">RESEARCH</span>
            </motion.h1>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-4xl md:text-6xl font-light tracking-tight text-[#004643]/80"
            >
              PAPER ANALYZER
            </motion.h2>
          </div>

          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="text-[#2f4f4f] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium opacity-80"
          >
            Distilling complex technical documents into structured insights, visual presentations, and mathematical clarity.
          </motion.p>
        </motion.header>

        <div className="w-full max-w-5xl">
          <AnimatePresence mode="wait">
            {!analysisData ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <FileUpload onUploadSuccess={setAnalysisData} />
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="space-y-6"
              >
                <button
                  onClick={() => setAnalysisData(null)}
                  className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/50 border border-[#004643]/10 text-primary font-bold hover:bg-white transition-all shadow-sm"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <span>Explore New Insights</span>
                </button>
                <AnalysisDashboard data={analysisData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="mt-24 py-12 border-t border-border w-full text-center space-y-4">
          <div className="flex justify-center gap-8 text-sm text-text-muted font-medium">
            <span>Precise Extraction</span>
            <span>LLM Intelligence</span>
            <span>Auto-Slides</span>
          </div>
          <p className="text-sm text-slate-500">
            &copy; 2026 Autonomous Research Labs • Built for 2028 Academic Standards
          </p>
        </footer>
      </main>
    </div>
  )
}
