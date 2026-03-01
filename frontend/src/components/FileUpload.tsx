"use client"
import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export default function FileUpload({ onUploadSuccess }: { onUploadSuccess: (data: any) => void }) {
    const [isUploading, setIsUploading] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)

    const processFile = async (file: File) => {
        if (!file.name.endsWith('.pdf')) {
            setError('Please upload a valid PDF file.')
            return
        }

        setIsUploading(true)
        setError(null)
        setFileName(file.name)

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) throw new Error('Upload failed')

            const data = await response.json()
            onUploadSuccess(data)
        } catch (err) {
            setError('System error: Failed to analyze paper. Check backend status.')
        } finally {
            setIsUploading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) processFile(file)
    }

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const onDragLeave = () => setIsDragging(false)

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) processFile(file)
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.005 }}
            className={`glass-morphism p-16 transition-all duration-500 border-2 border-dashed rounded-[2.5rem] relative overflow-hidden ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-[#004643]/10'
                }`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            {isDragging && (
                <motion.div
                    layoutId="drag-overlay"
                    className="absolute inset-0 bg-primary/5 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
            )}

            <div className="flex flex-col items-center justify-center text-center space-y-8 relative z-10">
                <motion.div
                    animate={isDragging ? { y: -10, scale: 1.1 } : { y: 0, scale: 1 }}
                    className={`p-8 rounded-[2rem] ${isDragging ? 'bg-primary text-white shadow-2xl' : 'bg-primary/5 text-primary'} transition-all duration-500 shadow-sm animate-float`}
                >
                    <Upload size={56} strokeWidth={1.5} />
                </motion.div>

                <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-primary leading-tight">
                        ANALYZE <br />
                        <span className="text-reveal italic">DOCUMENTS</span>
                    </h2>
                    <p className="text-[#2f4f4f] max-w-md font-medium text-lg leading-relaxed opacity-80">
                        Drag your research paper here for instant <br />
                        <span className="text-primary italic">technical synthesis & Presentation Generation</span>
                    </p>
                </div>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                />

                <div className="flex flex-col items-center gap-4">
                    <label htmlFor="fileInput" className="btn-wow cursor-pointer min-w-[240px] px-8 py-4 rounded-2xl shadow-xl">
                        {isUploading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Analyzing Document...
                            </>
                        ) : (
                            <>
                                <FileText size={20} />
                                Select PDF
                            </>
                        )}
                    </label>

                    <AnimatePresence>
                        {fileName && !error && !isUploading && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2 text-accent"
                            >
                                <CheckCircle2 size={16} />
                                <span className="text-sm font-medium">{fileName}</span>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2 text-red-400"
                            >
                                <AlertCircle size={16} />
                                <span className="text-sm font-medium">{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )
}
