"use client";
import { useState, useMemo, useEffect } from "react";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldCheck, AlertTriangle, CheckCircle, Plus, X, Pill, Activity,
    Sparkles, FileText, AlertCircle, Info, Search, Clock, Zap,
    Heart, Database, TrendingUp, Award, ChevronDown, ChevronUp, Download,
    ShieldAlert
} from "lucide-react";

type TabMode = 'interaction' | 'analysis';

// Common medications for autocomplete
const COMMON_MEDICATIONS = [
    "Paracetamol", "Ibuprofen", "Aspirin", "Amoxicillin", "Azithromycin",
    "Cetirizine", "Omeprazole", "Metformin", "Amlodipine", "Atenolol",
    "Diclofenac", "Naproxen", "Ciprofloxacin", "Doxycycline", "Loratadine",
    "Pantoprazole", "Metoclopramide", "Losartan", "Simvastatin", "Insulin",
    "Salbutamol", "Montelukast", "Prednisolone", "Sertraline", "Alprazolam"
];

export default function SafetyCheckerPage() {
    const [activeTab, setActiveTab] = useState<TabMode>('analysis');

    return (
        <div className="min-h-screen bg-white text-slate-900 px-4 md:px-6 py-2 md:py-3 relative overflow-hidden">


            <div className="max-w-7xl mx-auto relative z-10">
                {/* Enhanced Header */}
                <header className="mb-4 md:mb-6">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        {/* Trust Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500/10 to-blue-500/10 
                                     border border-teal-500/20 px-6 py-2.5 rounded-full mb-3 backdrop-blur-sm"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Heart className="w-5 h-5 text-teal-400 fill-teal-400/20" />
                            </motion.div>
                            <span className="text-teal-700 font-bold tracking-wide text-sm">
                                AI-Powered Medical Safety Analysis
                            </span>
                            <div className="h-4 w-px bg-teal-500/50" />
                            <span className="text-teal-600 text-xs font-medium">50+ Medications</span>
                        </motion.div>

                        {/* Main Title */}
                        <h1 className="text-4xl md:text-6xl font-bold mb-2 relative">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600">
                                AI Drug Safety Engine
                            </span>
                            <motion.div
                                className="absolute -top-2 -right-2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles className="w-8 h-8 text-yellow-400/50" />
                            </motion.div>
                        </h1>

                        <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto mb-3">
                            Comprehensive medication safety analysis with real-time interaction detection
                        </p>

                        {/* Stats Bar */}
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                            <StatBadge icon={Database} label="Database" value="50+" color="teal" />
                            <StatBadge icon={ShieldCheck} label="Checked" value="1000+" color="blue" />
                            <StatBadge icon={Award} label="Accuracy" value="99%" color="purple" />
                        </div>
                    </motion.div>
                </header>

                {/* Enhanced Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-3 mb-4 bg-white/80 backdrop-blur-xl p-2 rounded-2xl border border-slate-200 
                             max-w-2xl mx-auto shadow-lg shadow-slate-200/50"
                >
                    <TabButton
                        active={activeTab === 'analysis'}
                        onClick={() => setActiveTab('analysis')}
                        icon={Sparkles}
                        label="Drug Safety Analysis"
                    />
                    <TabButton
                        active={activeTab === 'interaction'}
                        onClick={() => setActiveTab('interaction')}
                        icon={ShieldCheck}
                        label="Interaction Checker"
                    />
                </motion.div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'analysis' ? (
                        <DrugAnalysisTab key="analysis" />
                    ) : (
                        <InteractionCheckerTab key="interaction" />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// Stat Badge Component
function StatBadge({ icon: Icon, label, value, color }: any) {
    const colors = {
        teal: 'text-teal-600 bg-teal-50 border-teal-200',
        blue: 'text-blue-600 bg-blue-50 border-blue-200',
        purple: 'text-purple-600 bg-purple-50 border-purple-200'
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-sm shadow-sm ${colors[color as keyof typeof colors]}`}
        >
            <Icon className="w-4 h-4" />
            <div className="text-left">
                <div className="text-xs opacity-70">{label}</div>
                <div className="text-sm font-bold">{value}</div>
            </div>
        </motion.div>
    );
}

// Tab Button Component
function TabButton({ active, onClick, icon: Icon, label }: any) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`flex-1 py-3 px-4 md:px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 relative overflow-hidden
                ${active
                    ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg shadow-teal-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
        >
            {active && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-600"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            <Icon className="w-5 h-5 relative z-10" />
            <span className="relative z-10 text-sm md:text-base">{label}</span>
        </motion.button>
    );
}

// Drug Safety Analysis Tab
function DrugAnalysisTab() {
    const [medicineName, setMedicineName] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Autocomplete suggestions
    const suggestions = useMemo(() => {
        if (!medicineName.trim() || medicineName.length < 2) return [];
        return COMMON_MEDICATIONS.filter(med =>
            med.toLowerCase().includes(medicineName.toLowerCase())
        ).slice(0, 5);
    }, [medicineName]);

    const analyzeSafety = async () => {
        if (!medicineName.trim() || !symptoms.trim()) {
            alert("Please enter both medicine name and symptoms");
            return;
        }

        setLoading(true);
        setResult(null);
        try {
            const res = await api.post("/safety/analyze", {
                medicineName: medicineName.trim(),
                symptoms: symptoms.trim()
            });
            setResult(res.data);
        } catch (error) {
            console.error(error);
            alert("Failed to analyze safety.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
        >
            {/* Input Section */}
            <div className="space-y-6">
                {/* Medicine Input with Autocomplete */}
                <GlassCard>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg">
                            <Pill className="w-5 h-5 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold">Medicine Name</h3>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            value={medicineName}
                            onChange={(e) => {
                                setMedicineName(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            placeholder="e.g. Paracetamol, Ibuprofen, Aspirin"
                            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 
                                     outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                                     text-lg transition-all placeholder:text-slate-400 shadow-sm"
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                        {/* Autocomplete Suggestions */}
                        {showSuggestions && suggestions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-white backdrop-blur-xl 
                                         border border-slate-200 rounded-xl overflow-hidden z-50 shadow-xl"
                            >
                                {suggestions.map((suggestion, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setMedicineName(suggestion);
                                            setShowSuggestions(false);
                                        }}
                                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors
                                                 border-b border-slate-100 last:border-0 flex items-center gap-2 text-slate-700"
                                    >
                                        <Pill className="w-4 h-4 text-blue-600" />
                                        <span>{suggestion}</span>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </div>
                    <p className="text-slate-500 text-sm mt-2 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" />
                        Enter the brand or generic name
                    </p>
                </GlassCard>

                {/* Symptoms Input */}
                <GlassCard>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg">
                            <Activity className="w-5 h-5 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold">Symptoms & Reason for Use</h3>
                    </div>

                    <textarea
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder="Describe your symptoms... e.g., 'I have a headache and mild fever' or 'I'm experiencing back pain'"
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 
                                 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                                 min-h-[140px] resize-none transition-all placeholder:text-slate-400 shadow-sm"
                    />
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-slate-500 text-sm flex items-center gap-1.5">
                            <Info className="w-3.5 h-3.5" />
                            Be specific about what you&apos;re experiencing
                        </p>
                        <span className="text-xs text-slate-500">{symptoms.length} characters</span>
                    </div>
                </GlassCard>

                {/* Analyze Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={analyzeSafety}
                    disabled={loading || !medicineName.trim() || !symptoms.trim()}
                    className="w-full bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 text-white font-bold 
                             py-4 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 
                             transition-all disabled:opacity-50 disabled:cursor-not-allowed 
                             flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {loading ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="relative z-10"
                            >
                                <Zap className="w-5 h-5" />
                            </motion.div>
                            <span className="relative z-10">Analyzing Safety...</span>
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5 relative z-10" />
                            <span className="relative z-10">Generate Safety Report</span>
                        </>
                    )}
                </motion.button>
            </div>

            {/* Results Section */}
            <div className="relative">
                <GlassCard className="min-h-[600px] relative">
                    {!result && !loading && (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-600 flex-col gap-4">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <FileText className="w-16 h-16 opacity-20" />
                            </motion.div>
                            <p className="text-center">Enter medicine and symptoms<br />to generate your safety report</p>
                        </div>
                    )}

                    {loading && <LoadingState />}

                    {result && <SafetyReport data={result} />}
                </GlassCard>
            </div>
        </motion.div>
    );
}

// Glass Card Component
function GlassCard({ children, className = "" }: any) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            className={`bg-white/90 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 
                      shadow-lg hover:shadow-xl hover:border-slate-300 transition-all ${className}`}
        >
            {children}
        </motion.div>
    );
}

// Loading State Component
function LoadingState() {
    return (
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-6">
            <div className="relative">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 border-4 border-teal-500/20 border-t-teal-500 rounded-full"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Heart className="w-8 h-8 text-teal-400 fill-teal-400/20" />
                </motion.div>
            </div>
            <div className="text-center">
                <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-teal-400 font-medium text-lg"
                >
                    Analyzing drug safety...
                </motion.p>
                <p className="text-slate-500 text-sm mt-2">
                    Checking interactions, dosages, and warnings
                </p>
            </div>
        </div>
    );
}

// Safety Report Component
function SafetyReport({ data }: { data: any }) {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['main']));

    const toggleSection = (section: string) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(section)) {
            newExpanded.delete(section);
        } else {
            newExpanded.add(section);
        }
        setExpandedSections(newExpanded);
    };

    const getSafetyConfig = (level: string) => {
        switch (level) {
            case 'safe':
                return {
                    icon: CheckCircle,
                    color: 'emerald',
                    bg: 'bg-emerald-500/10',
                    border: 'border-emerald-500/30',
                    text: 'text-emerald-600',
                    title: 'Safe to Use',
                    gradient: 'from-emerald-500 to-green-600'
                };
            case 'caution':
                return {
                    icon: AlertCircle,
                    color: 'yellow',
                    bg: 'bg-yellow-500/10',
                    border: 'border-yellow-500/30',
                    text: 'text-yellow-700',
                    title: 'Use with Caution',
                    gradient: 'from-yellow-500 to-amber-600'
                };
            case 'warning':
                return {
                    icon: AlertTriangle,
                    color: 'orange',
                    bg: 'bg-orange-500/10',
                    border: 'border-orange-500/30',
                    text: 'text-orange-600',
                    title: 'Consult Professional',
                    gradient: 'from-orange-500 to-red-600'
                };
            default:
                return {
                    icon: Info,
                    color: 'blue',
                    bg: 'bg-blue-500/10',
                    border: 'border-blue-500/30',
                    text: 'text-blue-600',
                    title: 'Information',
                    gradient: 'from-blue-500 to-cyan-600'
                };
        }
    };

    const config = getSafetyConfig(data.safetyLevel);
    const Icon = config.icon;

    // Download report function - PDF format
    const downloadReport = async () => {
        // Get user info from localStorage
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;

        try {
            // Dynamically import jsPDF to avoid SSR issues
            const jspdfModule = await import('jspdf');
            const jsPDF = jspdfModule.jsPDF || jspdfModule.default;
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 15;
            let yPosition = 15;

            // Helper to safely split text
            const safeSplitText = (text: string, maxWidth: number) => {
                if (!text) return [""];
                return doc.splitTextToSize(String(text), maxWidth);
            };

            // ============ BLUE HEADER ============
            doc.setFillColor(41, 128, 185); // Clinical Blue
            doc.rect(0, 0, pageWidth, 40, 'F');

            // Logo & Title
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text('APEX CARE', margin, 20);

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text('AI DRUG SAFETY ENGINE', margin, 28);
            doc.text('CLINICAL ANALYSIS REPORT', margin, 34);

            doc.setFontSize(8);
            doc.text(`Report ID: SR-${Date.now().toString().slice(-8)}`, pageWidth - margin, 20, { align: 'right' });
            doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - margin, 26, { align: 'right' });

            yPosition = 50;

            // ============ PATIENT INFO ============
            doc.setDrawColor(200, 200, 200);
            doc.setFillColor(245, 247, 250);
            doc.rect(margin, yPosition, pageWidth - 2 * margin, 25, 'FD');

            doc.setTextColor(41, 128, 185);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text('PATIENT INFORMATION', margin + 5, yPosition + 7);

            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.text(`Name: ${user?.name || 'Valued Patient'}`, margin + 5, yPosition + 15);
            doc.text(`Contact: ${user?.phone || user?.email || 'N/A'}`, margin + 5, yPosition + 21);
            doc.text(`Status: Electronic Verified`, pageWidth - margin - 5, yPosition + 15, { align: 'right' });

            yPosition += 35;

            // ============ MEDICATION OVERVIEW ============
            doc.setTextColor(41, 128, 185);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('MEDICATION OVERVIEW', margin, yPosition);
            yPosition += 8;

            doc.setTextColor(0, 0, 0);
            doc.setFontSize(10);
            doc.text(`Medicine: ${data.medicineName || 'N/A'}`, margin, yPosition);
            doc.text(`Generic: ${data.genericName || 'N/A'}`, margin + 80, yPosition);
            yPosition += 6;
            doc.text(`Category: ${data.category || 'N/A'}`, margin, yPosition);

            const safetyColor = config.title.includes('Safe') ? [16, 185, 129] :
                config.title.includes('Caution') ? [245, 158, 11] : [239, 68, 68];
            doc.setTextColor(safetyColor[0], safetyColor[1], safetyColor[2]);
            doc.text(`Safety Verdict: ${config.title}`, margin + 80, yPosition);

            yPosition += 12;

            // ============ MECHANISM OF ACTION ============
            doc.setTextColor(41, 128, 185);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text('MECHANISM OF ACTION', margin, yPosition);
            yPosition += 6;

            doc.setTextColor(80, 80, 80);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            const moaLines = safeSplitText(data.mechanismOfAction, pageWidth - 2 * margin);
            doc.text(moaLines, margin, yPosition);
            yPosition += (moaLines.length * 5) + 5;

            // ============ COMPATIBILITY ============
            doc.setTextColor(41, 128, 185);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text('SYMPTOM COMPATIBILITY', margin, yPosition);
            yPosition += 6;

            doc.setTextColor(0, 0, 0);
            const compLines = safeSplitText(data.appropriateFor, pageWidth - 2 * margin);
            doc.text(compLines, margin, yPosition);
            yPosition += (compLines.length * 5) + 10;

            // ============ DOSAGE & USAGE ============
            // Check if we need to add a new page
            if (yPosition > pageHeight - 60) {
                doc.addPage();
                yPosition = 20;
            }

            doc.setFillColor(41, 128, 185);
            doc.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.text('DOSAGE & USAGE INSTRUCTIONS', margin + 5, yPosition + 5.5);
            yPosition += 12;

            doc.setTextColor(0, 0, 0);
            if (data.dosageRecommendations) {
                doc.text(`• Adult: ${data.dosageRecommendations.adult || 'N/A'}`, margin + 5, yPosition);
                doc.text(`• Child: ${data.dosageRecommendations.child || 'N/A'}`, margin + 70, yPosition);
                doc.text(`• Frequency: ${data.dosageRecommendations.frequency || 'N/A'}`, margin + 130, yPosition);
                yPosition += 8;
            }

            if (data.usageInstructions && Array.isArray(data.usageInstructions)) {
                data.usageInstructions.forEach((inst: string) => {
                    const instLines = safeSplitText(`- ${inst}`, pageWidth - 2 * margin - 10);
                    doc.text(instLines, margin + 10, yPosition);
                    yPosition += (instLines.length * 5);
                });
            }
            yPosition += 5;

            // ============ CRITICAL PRECAUTIONS ============
            if (yPosition > pageHeight - 60) {
                doc.addPage();
                yPosition = 20;
            }

            doc.setTextColor(220, 38, 38);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text('CRITICAL PRECAUTIONS', margin, yPosition);
            yPosition += 6;

            if (data.criticalPrecautions && Array.isArray(data.criticalPrecautions)) {
                data.criticalPrecautions.forEach((prec: string) => {
                    const precLines = safeSplitText(`• ${prec}`, pageWidth - 2 * margin - 10);
                    doc.text(precLines, margin + 5, yPosition);
                    yPosition += (precLines.length * 5);
                });
            }
            yPosition += 8;

            // ============ LIFESTYLE ADVICE ============
            if (yPosition > pageHeight - 50) {
                doc.addPage();
                yPosition = 20;
            }

            doc.setTextColor(41, 128, 185);
            doc.text('HOSPITAL-GRADE LIFESTYLE ADVICE', margin, yPosition);
            yPosition += 6;
            doc.setTextColor(80, 80, 80);
            doc.setFont('helvetica', 'normal');

            if (data.lifestyleAdvice && Array.isArray(data.lifestyleAdvice)) {
                data.lifestyleAdvice.forEach((adv: string) => {
                    const advLines = safeSplitText(`• ${adv}`, pageWidth - 2 * margin - 5);
                    doc.text(advLines, margin + 5, yPosition);
                    yPosition += (advLines.length * 5);
                });
            }

            // ============ FOOTER DISCLAIMER ============
            doc.setDrawColor(200, 200, 200);
            // Always position at bottom of current page or bottom of new page if full
            const footerY = pageHeight - 35;
            if (yPosition > footerY) {
                doc.addPage();
            }

            doc.line(margin, footerY, pageWidth - margin, footerY);

            doc.setFontSize(7);
            doc.setTextColor(150, 150, 150);
            const discLines = safeSplitText(data.disclaimer, pageWidth - 2 * margin);
            doc.text(discLines, pageWidth / 2, pageHeight - 25, { align: 'center' });

            doc.setTextColor(41, 128, 185);
            doc.text('Apex Care Healthcare Systems • Digital Health Division', pageWidth / 2, pageHeight - 10, { align: 'center' });

            const safeName = data.medicineName ? data.medicineName.replace(/[^a-z0-9]/gi, '_') : 'Report';
            doc.save(`${safeName}_Safety_Report.pdf`);
        } catch (error) {
            console.error("Failed to generate PDF:", error);
            alert("Failed to generate PDF report. Please try again.");
        }
    };

    if (!data.found) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4 p-6"
            >
                <div className="text-center p-8 rounded-2xl border bg-slate-800/50 border-slate-600/30">
                    <Info className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-300 mb-2">Medication Not Found</h2>
                    <p className="text-slate-400">{data.message}</p>
                    <p className="text-slate-500 text-sm mt-4">{data.recommendation}</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar"
        >
            {/* Safety Verdict */}
            <motion.div
                className={`text-center p-6 rounded-2xl border ${config.bg} ${config.border} relative overflow-hidden`}
                whileHover={{ scale: 1.02 }}
            >
                <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-5`} />
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Icon className={`w-16 h-16 ${config.text} mx-auto mb-4`} />
                </motion.div>
                <h2 className={`text-3xl font-bold ${config.text} mb-2`}>{config.title}</h2>
                <p className="text-slate-800 text-lg font-semibold">{data.medicineName}</p>
                <p className="text-slate-600 text-sm mt-1">
                    {data.genericName} • {data.category}
                </p>
            </motion.div>

            {/* Symptom Mismatch Warning Banner */}
            {!data.isAppropriate && data.safetyLevel === 'warning' && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-2xl shadow-2xl border-2 border-red-500 relative overflow-hidden"
                >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)`
                    }} />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex-shrink-0"
                        >
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <AlertTriangle className="w-10 h-10 text-white" strokeWidth={2.5} />
                            </div>
                        </motion.div>

                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                <span>⚠️ Symptom Mismatch Warning</span>
                            </h3>
                            <p className="text-white/95 text-base leading-relaxed mb-3">
                                <strong>This medicine may not be suitable for your described symptoms.</strong> Using medication that doesn&apos;t match your condition can be ineffective or potentially harmful.
                            </p>
                            <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                                <p className="font-bold text-lg mb-1">🩺 Our Recommendation:</p>
                                <p className="text-white/95">
                                    Please <strong className="underline">consult a doctor or healthcare professional</strong> before taking this medication. They can properly diagnose your condition and recommend the most appropriate treatment.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}


            {/* Download Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadReport}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold 
                         py-3 px-6 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 
                         transition-all flex items-center justify-center gap-3 group"
            >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                <span>Download Safety Report</span>
            </motion.button>

            {/* Mechanism of Action */}
            <CollapsibleCard
                title="Mechanism of Action"
                icon={Search}
                color="blue"
                expanded={expandedSections.has('moa')}
                onToggle={() => toggleSection('moa')}
            >
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    <p className="text-sm text-slate-700 leading-relaxed italic">
                        {data.mechanismOfAction}
                    </p>
                </div>
            </CollapsibleCard>

            {/* Symptom Compatibility */}
            <CollapsibleCard
                title="Symptom Compatibility"
                icon={Activity}
                color="green"
                expanded={expandedSections.has('symptoms')}
                onToggle={() => toggleSection('symptoms')}
            >
                <div className={`p-4 rounded-xl border ${data.isAppropriate ? 'bg-emerald-50 border-emerald-100' : 'bg-orange-50 border-orange-100'}`}>
                    <p className={`text-sm font-medium ${data.isAppropriate ? 'text-emerald-700' : 'text-orange-700'}`}>
                        {data.appropriateFor}
                    </p>
                </div>
            </CollapsibleCard>

            {/* Dosage & Usage Instructions */}
            <CollapsibleCard
                title="Dosage & Usage"
                icon={Pill}
                color="blue"
                expanded={expandedSections.has('dosage')}
                onToggle={() => toggleSection('dosage')}
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <DosageItem label="Adult" value={data.dosageRecommendations?.adult} />
                        <DosageItem label="Child" value={data.dosageRecommendations?.child} />
                        <DosageItem label="Frequency" value={data.dosageRecommendations?.frequency} icon={Clock} />
                        <DosageItem label="Max Daily" value={data.dosageRecommendations?.maxDaily} warning />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Usage Instructions</h5>
                        <ul className="space-y-2">
                            {data.usageInstructions?.map((inst: string, i: number) => (
                                <li key={i} className="text-sm text-slate-600 flex gap-2">
                                    <span className="text-blue-500">•</span>
                                    {inst}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CollapsibleCard>

            {/* Critical Precautions */}
            <CollapsibleCard
                title="Critical Precautions"
                icon={AlertTriangle}
                color="red"
                expanded={expandedSections.has('precautions')}
                onToggle={() => toggleSection('precautions')}
            >
                <div className="space-y-3">
                    {data.criticalPrecautions?.map((prec: string, i: number) => (
                        <div key={i} className="flex gap-3 bg-red-50 p-3 rounded-xl border border-red-100 items-start">
                            <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
                            <p className="text-sm text-red-700 font-medium">{prec}</p>
                        </div>
                    ))}
                </div>
            </CollapsibleCard>

            {/* Side Effects & Lifestyle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CollapsibleCard
                    title="Side Effects"
                    icon={Info}
                    color="orange"
                    expanded={expandedSections.has('sideEffects')}
                    onToggle={() => toggleSection('sideEffects')}
                >
                    <div className="flex flex-wrap gap-2">
                        {data.sideEffects?.map((effect: string, i: number) => (
                            <span key={i} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-[10px] font-medium border border-orange-200">
                                {effect}
                            </span>
                        ))}
                    </div>
                </CollapsibleCard>

                <CollapsibleCard
                    title="Lifestyle Advice"
                    icon={Heart}
                    color="green"
                    expanded={expandedSections.has('lifestyle')}
                    onToggle={() => toggleSection('lifestyle')}
                >
                    <ul className="space-y-1.5">
                        {data.lifestyleAdvice?.map((adv: string, i: number) => (
                            <li key={i} className="text-[11px] text-emerald-800 flex gap-1.5 items-center">
                                <Sparkles className="w-3 h-3 text-emerald-500" />
                                {adv}
                            </li>
                        ))}
                    </ul>
                </CollapsibleCard>
            </div>

            {/* Interactions */}
            <CollapsibleCard
                title="Interactions"
                icon={ShieldCheck}
                color="purple"
                expanded={expandedSections.has('interactions')}
                onToggle={() => toggleSection('interactions')}
            >
                <p className="text-sm text-purple-800 bg-purple-50 p-3 rounded-xl border border-purple-100">
                    {data.interactions || 'No interactions identified.'}
                </p>
            </CollapsibleCard>

            {/* Disclaimer */}
            <div className="bg-slate-100 p-4 rounded-xl border border-slate-300 text-xs text-slate-600 italic">
                <Info className="w-4 h-4 inline mr-2" />
                {data.disclaimer}
            </div>
        </motion.div>
    );
}

// Dosage Item Component
function DosageItem({ label, value, icon: Icon, warning }: any) {
    return (
        <div className={`flex justify-between items-center p-3 rounded-lg ${warning ? 'bg-red-50 border border-red-200' : 'bg-slate-100'}`}>
            <span className="text-slate-700 flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />}
                {label}:
            </span>
            <span className={`font-semibold ${warning ? 'text-red-700' : 'text-slate-900'}`}>
                {value}
            </span>
        </div>
    );
}

// Collapsible Card Component
function CollapsibleCard({ title, icon: Icon, color, children, expanded, onToggle }: any) {
    const colors: any = {
        blue: 'border-blue-500/30 bg-blue-500/5',
        purple: 'border-purple-500/30 bg-purple-500/5',
        red: 'border-red-500/30 bg-red-500/5',
        orange: 'border-orange-500/30 bg-orange-500/5',
        green: 'border-emerald-500/30 bg-emerald-500/5'
    };

    const iconColors: any = {
        blue: 'text-blue-600',
        purple: 'text-purple-600',
        red: 'text-red-600',
        orange: 'text-orange-600',
        green: 'text-emerald-600'
    };

    return (
        <motion.div
            className={`rounded-xl border ${colors[color]} overflow-hidden`}
            whileHover={{ borderColor: `rgba(var(--${color}-500), 0.5)` }}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${iconColors[color]}`} />
                    <h4 className="font-semibold text-slate-800">{title}</h4>
                </div>
                <motion.div
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-5 h-5 text-slate-600" />
                </motion.div>
            </button>
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Interaction Checker Tab (Enhanced version)
function InteractionCheckerTab() {
    const [cartItems, setCartItems] = useState<string[]>([]);
    const [conditions, setConditions] = useState<string[]>([]);
    const [newItem, setNewItem] = useState("");
    const [newCondition, setNewCondition] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const addItem = () => {
        if (newItem.trim() && !cartItems.includes(newItem.trim())) {
            setCartItems([...cartItems, newItem.trim()]);
            setNewItem("");
        }
    };

    const addCondition = () => {
        if (newCondition.trim() && !conditions.includes(newCondition.trim())) {
            setConditions([...conditions, newCondition.trim()]);
            setNewCondition("");
        }
    };

    const checkSafety = async () => {
        setLoading(true);
        setResult(null);
        try {
            const formattedItems = cartItems.map(name => ({ name }));
            const res = await api.post("/safety/check", {
                cartItems: formattedItems,
                medicalConditions: conditions
            });
            setResult(res.data);
        } catch (error) {
            console.error(error);
            alert("Failed to analyze safety.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
            {/* Inputs Section */}
            <div className="space-y-6">
                {/* Medications Input */}
                <GlassCard>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg">
                            <Pill className="w-5 h-5 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold">Medications</h3>
                    </div>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            placeholder="e.g. Aspirin"
                            className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 
                                     outline-none focus:border-blue-500 transition-all shadow-sm"
                            onKeyDown={(e) => e.key === 'Enter' && addItem()}
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={addItem}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl 
                                     hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/20"
                        >
                            <Plus className="w-5 h-5" />
                        </motion.button>
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-[60px]">
                        {cartItems.map((item, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="bg-blue-500/20 text-blue-300 px-3 py-2 rounded-lg text-sm 
                                         flex items-center gap-2 border border-blue-500/30 group hover:bg-blue-500/30 transition-colors"
                            >
                                <Pill className="w-3.5 h-3.5" />
                                {item}
                                <button
                                    onClick={() => setCartItems(cartItems.filter((_, idx) => idx !== i))}
                                    className="hover:text-white transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </motion.span>
                        ))}
                        {cartItems.length === 0 && (
                            <span className="text-slate-500 italic text-sm py-2">No medications added yet</span>
                        )}
                    </div>
                </GlassCard>

                {/* Conditions Input */}
                <GlassCard>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg">
                            <Activity className="w-5 h-5 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold">Medical Conditions</h3>
                    </div>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={newCondition}
                            onChange={(e) => setNewCondition(e.target.value)}
                            placeholder="e.g. High Blood Pressure"
                            className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 
                                     outline-none focus:border-purple-500 transition-all shadow-sm"
                            onKeyDown={(e) => e.key === 'Enter' && addCondition()}
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={addCondition}
                            className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl 
                                     hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/20"
                        >
                            <Plus className="w-5 h-5" />
                        </motion.button>
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-[60px]">
                        {conditions.map((item, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-purple-500/20 text-purple-300 px-3 py-2 rounded-lg text-sm 
                                         flex items-center gap-2 border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                            >
                                <Activity className="w-3.5 h-3.5" />
                                {item}
                                <button
                                    onClick={() => setConditions(conditions.filter((_, idx) => idx !== i))}
                                    className="hover:text-white transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </motion.span>
                        ))}
                        {conditions.length === 0 && (
                            <span className="text-slate-500 italic text-sm py-2">No conditions added yet</span>
                        )}
                    </div>
                </GlassCard>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={checkSafety}
                    disabled={loading || (cartItems.length === 0 && conditions.length === 0)}
                    className="w-full bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 text-white font-bold 
                             py-4 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 
                             transition-all disabled:opacity-50 disabled:cursor-not-allowed 
                             flex items-center justify-center gap-3"
                >
                    {loading ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <Zap className="w-5 h-5" />
                            </motion.div>
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <ShieldCheck className="w-5 h-5" />
                            Analyze Safety Risks
                        </>
                    )}
                </motion.button>
            </div>

            {/* Results Section */}
            <GlassCard className="min-h-[500px] relative">
                {!result && !loading && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600 flex-col gap-4">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <ShieldCheck className="w-16 h-16 opacity-20" />
                        </motion.div>
                        <p className="text-center">Add medications and conditions<br />to check for interactions</p>
                    </div>
                )}

                {loading && <LoadingState />}

                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                    >
                        {/* Overall Status */}
                        <div className={`text-center p-6 rounded-2xl border relative overflow-hidden
                            ${result.isSafe
                                ? 'bg-emerald-500/10 border-emerald-500/30'
                                : 'bg-red-500/10 border-red-500/30'
                            }`}
                        >
                            {result.isSafe ? (
                                <>
                                    <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                                    <h2 className="text-3xl font-bold text-emerald-400 mb-2">Safe to Proceed</h2>
                                    <p className="text-emerald-300/80">No known interactions detected</p>
                                </>
                            ) : (
                                <>
                                    <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                                    <h2 className="text-3xl font-bold text-red-400 mb-2">Interaction Warning</h2>
                                    <p className="text-red-300/80">Potential health risks detected</p>
                                </>
                            )}

                            {/* Summary Stats */}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="bg-slate-900/50 p-3 rounded-lg">
                                    <div className="text-2xl font-bold text-white">{result.checkedMedications || 0}</div>
                                    <div className="text-xs text-slate-400">Medications</div>
                                </div>
                                <div className="bg-slate-900/50 p-3 rounded-lg">
                                    <div className="text-2xl font-bold text-white">{result.checkedConditions || 0}</div>
                                    <div className="text-xs text-slate-400">Conditions</div>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Warnings */}
                        {result.warnings && result.warnings.length > 0 && (
                            <div className="space-y-3">
                                <h4 className="font-semibold text-slate-300 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                                    Detailed Analysis
                                </h4>
                                {result.warnings.map((warn: string, i: number) => (
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        key={i}
                                        className={`flex gap-3 items-start p-4 rounded-xl border
                                            ${warn.includes('🚨')
                                                ? 'bg-red-950/30 border-red-500/30'
                                                : 'bg-orange-950/20 border-orange-500/20'
                                            }`}
                                    >
                                        <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5
                                            ${warn.includes('🚨') ? 'text-red-500' : 'text-orange-500'}
                                        `} />
                                        <p className={`text-sm leading-relaxed
                                            ${warn.includes('🚨') ? 'text-red-200' : 'text-orange-200'}
                                        `}>
                                            {warn}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </GlassCard>
        </motion.div>
    );
}
