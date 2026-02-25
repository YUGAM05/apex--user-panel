"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    AlertCircle,
    Stethoscope,
    Pill,
    HeartPulse,
    UserCheck,
    Scale,
    ShieldAlert,
    ArrowRight
} from 'lucide-react';

export default function TermsAndConditionsPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <main className="min-h-screen bg-white py-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-20 text-center">
                    <motion.div
                        {...fadeIn}
                        className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl text-white shadow-2xl mb-6"
                    >
                        <FileText className="w-8 h-8" />
                    </motion.div>
                    <motion.h1
                        {...fadeIn}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4"
                    >
                        Apex Care <span className="text-blue-600 italic">Terms & Conditions</span>
                    </motion.h1>
                    <div className="flex items-center justify-center gap-4">
                        <span className="h-px w-8 bg-slate-200" />
                        <motion.p
                            {...fadeIn}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 font-bold uppercase tracking-widest text-[10px]"
                        >
                            Effective Date: January 26, 2026
                        </motion.p>
                        <span className="h-px w-8 bg-slate-200" />
                    </div>
                </header>

                <div className="space-y-16">
                    {/* 1. Nature of the Platform */}
                    <motion.section
                        {...fadeIn}
                        className="relative p-8 md:p-12 bg-slate-50 border border-slate-100 rounded-[2.5rem] overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 italic">
                                01. Nature of the Platform
                            </h2>
                            <p className="text-slate-600 font-medium leading-relaxed mb-8">
                                Apex Care is a digital intermediary platform. We do not practice medicine, provide medical advice, or operate as a licensed blood bank. We provide a technology interface to connect users with:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <PlatformFeature icon={<Pill />} text="Licensed third-party pharmacies" />
                                <PlatformFeature icon={<Stethoscope />} text="Healthcare provider directory" />
                                <PlatformFeature icon={<HeartPulse />} text="Community blood donor network" />
                            </div>
                        </div>
                    </motion.section>

                    {/* 2. Medical Disclaimer */}
                    <motion.section
                        {...fadeIn}
                        className="bg-red-50 border border-red-100 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-500/20" />
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <AlertCircle className="w-8 h-8" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-black text-red-900 italic tracking-tight underline decoration-red-200 underline-offset-4">
                                    02. Medical Disclaimer
                                </h2>
                                <p className="text-red-800/80 font-bold leading-relaxed text-lg">
                                    Apex Care is NOT for medical emergencies. If you are experiencing a life-threatening situation, please contact 108 or visit the nearest emergency room immediately.
                                </p>
                                <p className="text-red-700/60 text-sm font-medium italic leading-relaxed">
                                    The information provided by our AI Health Assistant or our blog is for educational purposes and is not a substitute for professional medical consultation.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* 3. E-Pharmacy & Prescriptions */}
                    <motion.section {...fadeIn} className="space-y-8">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight px-4">03. E-Pharmacy & Prescriptions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <LawCard
                                title="Valid Prescription"
                                text="Orders for 'Schedule H' and 'Schedule X' drugs require a valid, legible prescription from an RMP."
                            />
                            <LawCard
                                title="Right to Reject"
                                text="Our partners reserve the right to reject orders with expired, altered, or suspicious prescriptions."
                            />
                            <LawCard
                                title="Substitution"
                                text="Medicines are not substituted unless explicitly requested by the user and permitted by the doctor."
                            />
                        </div>
                    </motion.section>

                    {/* 4. Blood Donor Network */}
                    <motion.section {...fadeIn} className="bg-gradient-to-br from-red-700 to-red-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-32 -mt-32" />

                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white">
                                    <HeartPulse className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-black italic tracking-tight">04. Blood Donor Network</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <h3 className="text-white font-black uppercase tracking-widest text-xs tracking-[0.2em] opacity-80">Non-Commercialization</h3>
                                    <p className="text-red-50 text-sm font-medium leading-relaxed italic">
                                        The sale or purchase of blood is a criminal offense in India. Apex Care is a voluntary, non-monetary platform. Any user found soliciting money for blood will be permanently banned and reported to the authorities.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-white font-black uppercase tracking-widest text-xs tracking-[0.2em] opacity-80">Donor Eligibility</h3>
                                    <p className="text-red-50 text-sm font-medium leading-relaxed italic">
                                        While we provide guidelines, the final medical eligibility of a donor is the sole responsibility of the blood bank or hospital where the donation occurs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* 5 & 6. Responsibilities & Liability */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* 5. User Responsibilities */}
                        <motion.section {...fadeIn} className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <UserCheck className="w-5 h-5 text-blue-600" /> 05. Responsibilities
                            </h2>
                            <ul className="space-y-4">
                                <ResponsibilityItem label="Accuracy" text="Agree to provide accurate identity and history." />
                                <ResponsibilityItem label="Age" text="Must be at least 18 years old to use services." />
                                <ResponsibilityItem label="Security" text="Responsible for login credential confidentiality." />
                            </ul>
                        </motion.section>

                        {/* 6. Limitation of Liability */}
                        <motion.section {...fadeIn} className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <Scale className="w-5 h-5 text-blue-600" /> 06. Liability
                            </h2>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-4">Shah Yugam (Founder) & Apex Care</p>
                            <ul className="space-y-4">
                                <li className="text-sm font-medium text-slate-500 italic flex items-start gap-3">
                                    <div className="w-1 h-1 rounded-full bg-slate-300 mt-2" />
                                    No liability for quality of 3rd-party pharmacy meds.
                                </li>
                                <li className="text-sm font-medium text-slate-500 italic flex items-start gap-3">
                                    <div className="w-1 h-1 rounded-full bg-slate-300 mt-2" />
                                    No liability for adverse reactions from medications.
                                </li>
                                <li className="text-sm font-medium text-slate-500 italic flex items-start gap-3">
                                    <div className="w-1 h-1 rounded-full bg-slate-300 mt-2" />
                                    No liability for inaccuracies in 3rd-party facility data.
                                </li>
                            </ul>
                        </motion.section>
                    </div>

                    {/* Footer Warning */}
                    <motion.div
                        {...fadeIn}
                        className="p-8 bg-slate-50 rounded-3xl border border-slate-200/50 text-center"
                    >
                        <p className="text-slate-500 font-bold text-sm italic">
                            By using Apex Care, you acknowledge that you have read, understood, and agreed to these terms.
                        </p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}

function PlatformFeature({ icon, text }: any) {
    return (
        <div className="flex flex-col items-center text-center gap-3">
            <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-blue-600">
                {icon}
            </div>
            <span className="text-xs font-bold text-slate-900 uppercase tracking-tighter leading-tight italic">{text}</span>
        </div>
    );
}

function LawCard({ title, text }: any) {
    return (
        <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex flex-col items-start gap-4 h-full group hover:border-blue-100 transition-colors">
            <div className="h-6 w-1 bg-blue-600 group-hover:h-8 transition-all" />
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-[11px]">{title}</h3>
            <p className="text-xs font-medium text-slate-500 italic leading-relaxed">{text}</p>
        </div>
    );
}

function ResponsibilityItem({ label, text }: any) {
    return (
        <li className="space-y-1">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{label}</span>
            <p className="text-sm font-bold text-slate-600 italic leading-snug">{text}</p>
        </li>
    );
}
