"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard,
    Binary,
    CircuitBoard,
    ArrowUpCircle,
    FileDown,
    BrainCircuit,
    Cpu,
    Target,
    AlertCircle
} from 'lucide-react'

export default function AnalysisDashboard({ data }: { data: any }) {
    const [activeTab, setActiveTab] = useState('summary')

    const tabs = [
        { id: 'summary', label: 'Executive Summary', icon: LayoutDashboard },
        { id: 'methodology', label: 'Methodology Breakdown', icon: Cpu },
        { id: 'equations', label: 'Equation Intelligence', icon: Binary },
        { id: 'improvements', label: 'Optimization & Future', icon: ArrowUpCircle },
    ]

    const containerVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
    }

    const renderContent = () => {
        const analysis = data.analysis
        switch (activeTab) {
            case 'summary':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                        <section className="space-y-4">
                            <div className="flex items-center gap-2 text-primary">
                                <BrainCircuit size={24} />
                                <h3 className="text-xl font-bold">Abstract Context</h3>
                            </div>
                            <p className="text-text-muted leading-relaxed text-lg">
                                {analysis.abstract_summary}
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-2 text-primary">
                                <Target size={24} />
                                <h3 className="text-xl font-bold">Key Contributions</h3>
                            </div>
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.1 } }
                                }}
                                initial="hidden"
                                animate="visible"
                            >
                                {analysis.key_contributions.map((c: string, i: number) => (
                                    <motion.div
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, scale: 0.9, y: 10 },
                                            visible: { opacity: 1, scale: 1, y: 0 }
                                        }}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="p-5 bg-white rounded-2xl border border-border flex items-start gap-4 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all bg-gradient-to-br from-white to-[#F0EDE5]/20"
                                    >
                                        <div className="mt-1 h-3 w-3 rounded-full bg-accent shrink-0 shadow-sm" />
                                        <p className="text-sm font-semibold text-[#004643]/90 leading-snug">{c}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </section>
                    </motion.div>
                )
            case 'methodology':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                        <div className="flex items-center gap-2 text-primary mb-4">
                            <CircuitBoard size={24} />
                            <h3 className="text-xl font-bold">Step-by-Step Methodology</h3>
                        </div>
                        <div className="p-6 bg-slate-800/30 rounded-2xl border border-border leading-loose relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                            <p className="whitespace-pre-wrap text-text-muted italic">
                                "{analysis.methodology_explained}"
                            </p>
                        </div>
                    </motion.div>
                )
            case 'equations':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            {analysis.equation_analysis.map((eq: any, i: number) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 10 }}
                                    className="p-6 glass-card border-none bg-white/60 hover:bg-white/80 transition-all border-l-4 !border-l-primary"
                                >
                                    <div className="inline-block px-4 py-2 bg-primary text-white rounded-lg font-mono text-xl mb-4 shadow-sm">
                                        {eq.equation}
                                    </div>
                                    <div className="space-y-2">
                                        <p className="font-semibold text-primary">Purpose: <span className="font-normal text-text-muted">{eq.purpose}</span></p>
                                        <p className="font-bold text-primary">Mechanism: <span className="font-medium text-text-muted">{eq.simplified}</span></p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )
            case 'improvements':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
                                <AlertCircle size={20} /> Limitations
                            </h3>
                            <ul className="space-y-3">
                                {analysis.limitations.map((l: string, i: number) => (
                                    <li key={i} className="text-sm text-text-muted flex items-start gap-2">
                                        <span className="text-red-400">•</span> {l}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-accent flex items-center gap-2">
                                <ArrowUpCircle size={20} /> Improvements
                            </h3>
                            <ul className="space-y-3">
                                {analysis.improvement_suggestions.map((s: string, i: number) => (
                                    <li key={i} className="text-sm text-text-muted flex items-start gap-2">
                                        <span className="text-accent">•</span> {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )
            default:
                return null
        }
    }

    return (
        <div className="w-full space-y-8 pb-20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex overflow-x-auto pb-2 gap-8 no-scrollbar">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 whitespace-nowrap pb-2 transition-all ${activeTab === tab.id ? 'tab-active' : 'text-text-muted hover:text-primary'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`http://localhost:8000${data.pptx_url}`}
                    className="btn-wow px-8 py-3 rounded-xl shadow-lg !bg-none"
                    download
                >
                    <FileDown size={20} />
                    Download Slides
                </motion.a>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="glass-card p-10 min-h-[450px] shadow-2xl shadow-[#004643]/5 border border-[#004643]/10"
                >
                    {renderContent()}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
