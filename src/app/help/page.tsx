"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    ShieldCheck,
    Zap,
    Lock,
    Target,
    Stethoscope,
    HeartPulse,
    BookOpen,
    ArrowRight
} from 'lucide-react';

export default function HelpCenterPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const coreFunctions = [
        {
            icon: <HeartPulse className="w-8 h-8" />,
            title: "The Real-Time Blood Registry",
            description: "At the heart of our Health Centre is a dedicated network designed to save lives through speed. We provide an accelerated pathway for users to connect with life-saving blood donors instantly via WhatsApp. To maintain the highest standards of safety and prevent fraudulent activity, we require KYC verification for all donors. This ensures that every match we deliver is verified, secure, and ready to help when every second counts."
        },
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: "Verified Medical Knowledge Base",
            description: "Knowledge is the first step to recovery. Our Health Centre features a library of medically-verified content, offering insights into health management, chronic disease care, and seasonal health alerts."
        },
    ];

    const trustPoints = [
        { icon: <ShieldCheck className="w-5 h-5" />, label: "Accuracy", detail: "Data is audited regularly by our medical operations team." },
        { icon: <Zap className="w-5 h-5" />, label: "Speed", detail: "Optimized search algorithms to reduce 'time-to-care'." },
        { icon: <Lock className="w-5 h-5" />, label: "Privacy", detail: "Bank-grade encryption for all patient-sensitive data." },
        { icon: <Target className="w-5 h-5" />, label: "Local Focus", detail: "Deeply integrated with the healthcare infrastructure of Gujarat." }
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] py-20 flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-slate-900/90" />
                    <img
                        src="/medical_hero_bg_1769443580457.png"
                        alt="Medical Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

                    <motion.h1
                        {...fadeIn}
                        className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 md:mb-8 tracking-tighter"
                    >
                        The Pillora <br className="hidden sm:block" />
                        <span className="text-blue-500 italic">Health Centre</span>
                    </motion.h1>
                    <motion.p
                        {...fadeIn}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-2xl font-medium text-slate-300 max-w-3xl mx-auto leading-relaxed px-4"
                    >
                        Where Technology Meets Clinical Excellence. <br className="hidden md:block" />
                        A comprehensive digital wellness ecosystem designed to empower your journey.
                    </motion.p>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-16 md:py-24 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 md:space-y-8 text-center lg:text-left"
                    >
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                            More than just a directory, <br className="hidden md:block" />
                            <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">your primary point of contact.</span>
                        </h2>
                        <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed">
                            The Pillora Health Centre is a comprehensive digital wellness ecosystem designed to empower users with verified medical resources, emergency coordination, and proactive health management. Our platform serves as your primary point of contact for navigating the complexities of modern healthcare.
                        </p>

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative p-8 md:p-12 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100"
                    >
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl" />
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-slate-100 rounded-full blur-2xl" />

                        <div className="relative z-10 space-y-6">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 italic tracking-tight underline decoration-blue-100 underline-offset-4">
                                Clinical Excellence & Trusted Networks
                            </h3>
                            <p className="text-slate-600 font-medium leading-relaxed italic">
                                &quot;Our health centre is more than a platform; it&apos;s a bridge to verified medical facilities. We collaborate with top-tier clinical institutions to ensure every data point and every service meets a standard of care that you can rely on during critical moments.&quot;
                            </p>
                            <div className="space-y-4 pt-4 border-t border-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                                    <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Verified Hospital Registry</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                                    <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Clinically-Audited Knowledge</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                                    <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Bank-Grade Encryption Standards</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Core Functions */}
            <section className="relative py-20 md:py-32 bg-white overflow-hidden border-y border-slate-100">
                {/* Background Decorations */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[80px] md:blur-[100px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[120px] translate-y-1/2" />

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12 md:mb-20">
                        <span className="text-blue-600 font-black uppercase tracking-widest text-xs">Innovation in Care</span>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-4 tracking-tight">Core Functions</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {coreFunctions.map((func, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-6 md:p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100/50 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500"
                            >
                                <div className="w-16 h-16 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                    {func.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 italic tracking-tight">{func.title}</h3>
                                <p className="text-slate-600 font-medium leading-relaxed">
                                    {func.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="py-20 md:py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[100px] -ml-64 -mb-64" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 text-center lg:text-left">
                            <span className="text-blue-600 font-black uppercase tracking-widest text-xs">Our Commitment</span>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-4 leading-[1.1] tracking-tighter">
                                Why Choose the <br className="hidden sm:block" />
                                <span className="text-blue-600 italic">Pillora Health Centre?</span>
                            </h2>
                            <p className="text-slate-500 font-medium mt-6 md:mt-8 text-base md:text-lg">
                                We combine medical expertise with cutting-edge technology to ensure your family&apos;s safety and well-being.
                            </p>
                        </div>

                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {trustPoints.map((point, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -10 }}
                                    className="p-6 md:p-8 bg-slate-50 border border-slate-100 rounded-3xl"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-blue-600">
                                            {point.icon}
                                        </div>
                                        <h4 className="font-black text-slate-900 uppercase tracking-widest text-[11px]">{point.label}</h4>
                                    </div>
                                    <p className="text-sm text-slate-500 font-bold leading-relaxed italic">
                                        {point.detail}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
