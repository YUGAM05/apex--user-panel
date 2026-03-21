"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Cpu, GraduationCap, Code2, HeartPulse, Building2, Droplets, Sparkles, Quote, Hospital, ShieldAlert } from "lucide-react";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
            {/* 1. Ultra-Modern Hero Section */}
            <section className="relative py-28 md:py-40 px-6 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-transparent">
                {/* Dynamic Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                            x: [0, 50, 0],
                            y: [0, 30, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[140px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, -45, 0],
                            x: [0, -40, 0],
                            y: [0, 60, 0]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-[140px]"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={fadeIn}
                        className="text-center max-w-5xl mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-xs font-black tracking-[0.2em] text-blue-700 uppercase bg-blue-600/10 border border-blue-600/20 rounded-full backdrop-blur-md"
                        >
                            <Sparkles className="w-4 h-4" />
                            Our Global Mission
                        </motion.div>
                        <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-10 leading-tight tracking-tighter">
                            Bridging the Gap in <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Digital Healthcare</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-12 max-w-3xl mx-auto font-medium">
                            Apex Care is not just a pharmacy; it&apos;s a fully integrated HealthTech ecosystem designed to provide seamless access to critical medical resources.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl shadow-slate-900/20 flex items-center gap-3"
                            >
                                <HeartPulse className="w-5 h-5 text-blue-400" />
                                Patient-First Approach
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold shadow-xl flex items-center gap-3"
                            >
                                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                Verified Accuracy
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Glassmorphism Vision Section */}
            <section className="py-24 px-6 relative bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-[3rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
                            <div className="relative bg-white/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/50 shadow-2xl overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-xl" />
                                <Quote className="w-12 h-12 text-blue-600/30 mb-6" />
                                <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
                                    Why Clarity <br />
                                    Is Critical.
                                </h2>
                                <p className="text-xl text-slate-600 leading-relaxed italic font-medium">
                                    &quot;In healthcare, a five-minute delay or misinformation can change everything. We built Apex Care to ensure that access to life-saving data is as fast as the blink of an eye.&quot;
                                </p>
                                <div className="mt-8 flex items-center gap-4">
                                    <div className="h-0.5 w-12 bg-blue-600 rounded-full" />
                                    <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Our Vision 2028</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex gap-6 items-start"
                            >
                                <div className="shrink-0 w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                                    <Droplets className="w-7 h-7" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">Live Response Network</h4>
                                    <p className="text-slate-500">Real-time tracking of blood inventory and emergency hospital beds across the city.</p>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="flex gap-6 items-start"
                            >
                                <div className="shrink-0 w-14 h-14 bg-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                    <Cpu className="w-7 h-7" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">AI Safety Engine</h4>
                                    <p className="text-slate-500">Sophisticated interaction checking developed with verified clinical data points.</p>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex gap-6 items-start"
                            >
                                <div className="shrink-0 w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                    <ShieldCheck className="w-7 h-7" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">Verified Pharmacy</h4>
                                    <p className="text-slate-500">Connecting patients with verified local sellers for genuine pharmaceutical care.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. The Pillars section - Polished */}
            <section className="py-28 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl font-black text-slate-900 mb-4"
                        >
                            The Apex Foundation
                        </motion.h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 80 }}
                            className="h-2 bg-blue-600 mx-auto rounded-full"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <PillarCard
                            icon={ShieldCheck}
                            title="Pure Integrity"
                            color="blue"
                            desc="We maintain a zero-tolerance policy for substandard medications and data inaccuracies."
                        />
                        <PillarCard
                            icon={Zap}
                            title="Lightning Logic"
                            color="red"
                            desc="Our platform responds at enterprise speeds, essential for clinical decision support."
                        />
                        <PillarCard
                            icon={GraduationCap}
                            title="Medical IQ"
                            color="purple"
                            desc="Leveraging deeper clinical insights to educate and protect our users throughout their journey."
                        />
                    </div>
                </div>
            </section>

            {/* 4. Leadership - Premium Dark Section */}
            <section className="py-32 px-6 bg-slate-950 text-white relative overflow-hidden">
                {/* Visual Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -ml-64 -mb-64" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative flex-shrink-0"
                        >
                            <div className="relative w-80 h-80 md:w-[480px] md:h-[480px]">
                                <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-6 opacity-20 blur-xl" />
                                <div className="absolute inset-x-[-10%] bottom-[-10%] h-[120%] bg-gradient-to-t from-slate-950 via-transparent to-transparent z-20 pointer-events-none" />
                                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/20 shadow-2xl group">
                                    <Image
                                        src="/yugam-shah.jpg"
                                        alt="Shah Yugam - Architect"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        style={{ objectPosition: 'top center' }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                {/* Floating Badge */}
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute -right-8 bottom-1/3 bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-2xl z-30"
                                >
                                    <Code2 className="w-8 h-8 text-blue-400 mb-2" />
                                    <p className="text-xs font-black uppercase tracking-widest text-white/60">Lead Architect</p>
                                    <p className="font-bold text-lg">Shah Yugam</p>
                                </motion.div>
                            </div>
                        </motion.div>

                        <div className="flex-1 space-y-10">
                            <div>
                                <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                                    Engineering the <br />
                                    <span className="text-blue-500">Future of Care</span>
                                </h2>
                                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-light">
                                    Apex Care is the culmination of a vision to digitize the foundational layers of healthcare.
                                    Led by Shah Yugam, a software engineer with deep roots in HealthTech systems, the project represents a merger of code and medical protocol.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-blue-600/20 group-hover:border-blue-500/50 transition-all">
                                            <Building2 className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <span className="text-lg font-bold">LJ University Technologist</span>
                                    </div>
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-purple-600/20 group-hover:border-purple-500/50 transition-all">
                                            <Code2 className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <span className="text-lg font-bold">Full-Stack Precision</span>
                                    </div>
                                </div>
                                <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                                    <p className="text-sm text-slate-500 font-bold uppercase mb-4 tracking-widest">Philosophy</p>
                                    <p className="text-slate-300 italic">
                                        &quot;Software should be as reliable as a prescription. In pharmacy tech, there is no room for error.&quot;
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 pt-4">
                                <span className="text-sm font-black uppercase tracking-[0.3em] text-blue-500">2024–2028 Vision</span>
                                <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Modern Ecosystem Network */}
            <section className="py-24 px-6 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="bg-slate-50 p-12 md:p-20 rounded-[4rem] border border-slate-200 relative overflow-hidden">
                        {/* Abstract background graphics */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                            </svg>
                        </div>

                        <div className="flex flex-col lg:flex-row items-center gap-20">
                            <div className="flex-1 space-y-6">
                                <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                                    The Connected <br />Health Grid
                                </h3>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    Our platform acts as the central nervous system for your medical needs, ensuring that whether you need a rare medicine or an emergency bed, the data is synchronized.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-2xl shadow-blue-500/30"
                                >
                                    Explore the Cloud
                                </motion.button>
                            </div>

                            <div className="flex-1 grid grid-cols-2 gap-6 relative">
                                <EcosystemNode icon={Building2} label="E-Pharmacy" active />
                                <EcosystemNode icon={Droplets} label="Blood Bank" />
                                <EcosystemNode icon={Hospital} label="Hospitals" />
                                <EcosystemNode icon={ShieldAlert} label="Diagnostics" />

                                {/* Connecting lines Simulation */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.8)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

// Sub-components for cleaner structure
function PillarCard({ icon: Icon, title, desc, color }: any) {
    const colorMap: any = {
        blue: { bg: 'bg-blue-600', shadow: 'shadow-blue-500/20', light: 'bg-blue-50', text: 'text-blue-600' },
        red: { bg: 'bg-rose-600', shadow: 'shadow-rose-500/20', light: 'bg-rose-50', text: 'text-rose-600' },
        purple: { bg: 'bg-indigo-600', shadow: 'shadow-indigo-500/20', light: 'bg-indigo-50', text: 'text-indigo-600' }
    };

    const theme = colorMap[color];

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group relative bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden"
        >
            <div className={`absolute top-0 right-0 w-32 h-32 ${theme.bg} opacity-0 group-hover:opacity-[0.03] rounded-full -mr-16 -mt-16 transition-opacity`} />
            <div className={`w-16 h-16 ${theme.light} rounded-2xl flex items-center justify-center ${theme.text} mb-8 transition-colors group-hover:${theme.bg} group-hover:text-white`}>
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium">{desc}</p>
        </motion.div>
    );
}

function EcosystemNode({ icon: Icon, label, active }: any) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`flex flex-col items-center justify-center gap-4 p-8 rounded-3xl border ${active ? 'bg-white border-blue-500 shadow-2xl shadow-blue-500/10' : 'bg-white/50 border-slate-200'} backdrop-blur-sm transition-all`}
        >
            <div className={`${active ? 'text-blue-600' : 'text-slate-400'}`}>
                <Icon className="w-10 h-10" />
            </div>
            <span className={`font-black text-sm uppercase tracking-widest ${active ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
        </motion.div>
    );
}
