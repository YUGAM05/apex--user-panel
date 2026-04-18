"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    Droplets,
    Building2,
    Users,
    Globe,
    Zap,
    Mail,
    Rocket,
    Code2,
    HeartPulse,
    Search,
    Clock,
    Sparkles,
    ArrowRight,
    MapPin
} from 'lucide-react';

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

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-white selection:bg-rose-100 selection:text-rose-900">
            {/* 1. Hero Section */}
            <section className="relative py-16 md:py-20 px-6 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-50 via-white to-transparent">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                            x: [0, 50, 0],
                            y: [0, 30, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-rose-400/10 rounded-full blur-[140px]"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={fadeIn}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-5 py-2 mb-6 text-xs font-black tracking-[0.2em] text-rose-700 uppercase bg-rose-600/10 border border-rose-600/20 rounded-full backdrop-blur-md"
                        >
                            <Sparkles className="w-4 h-4" />
                            Careers — Pillora
                        </motion.div>
                        <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-6 leading-tight tracking-tighter">
                            Build the Future of <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 font-black">Digital Healthcare</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-bold max-w-2xl mx-auto">
                            Pillora is more than just a platform — it&apos;s a movement to make healthcare accessible, transparent, and fast for everyone in India.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Where We Are Right Now */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="w-full lg:w-1/2 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-black tracking-widest text-slate-500 uppercase bg-white border border-slate-200 rounded-full shadow-sm"
                            >
                                <Zap className="w-4 h-4 text-rose-500" />
                                Current State
                            </motion.div>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                                Where We Are <br /><span className="text-rose-600">Right Now</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                Pillora is currently a lean, technology-driven platform. Our Blood Connect service is powered by AI-based KYC verification and automated donor-recipient matching. Our Hospital Information Service is built to give patients instant, self-serve access to critical healthcare data — <span className="text-slate-900 font-bold">all with minimal human intervention by design.</span>
                            </p>
                            <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50">
                                <p className="text-slate-900 font-black text-lg flex items-center gap-3">
                                    <Rocket className="w-6 h-6 text-rose-600" />
                                    This is our strength.
                                </p>
                                <p className="text-slate-500 mt-2 font-medium">
                                    We build systems that work at scale, without needing a large team behind them.
                                </p>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card
                                icon={Droplets}
                                title="Blood Connect"
                                desc="Powered by AI-based KYC and automated matching."
                                color="rose"
                            />
                            <Card
                                icon={Building2}
                                title="Hospital Services"
                                desc="Instant access to critical healthcare data."
                                color="blue"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Where We Are Going */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-black tracking-widest text-rose-700 uppercase bg-rose-50 rounded-full"
                        >
                            <Globe className="w-4 h-4" />
                            Our Expansion
                        </motion.div>
                        <h2 className="text-5xl font-black text-slate-900 mb-8">Where We Are Going</h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-medium">
                            As Pillora expands city by city across India, we will need passionate people who share our mission — to make life-saving information and resources accessible to every Indian, instantly and reliably.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Healthcare Ops", desc: "Coordination & clinical logic", icon: HeartPulse, color: "rose" },
                            { title: "Hospital Mgmt", desc: "Partnerships & data integrity", icon: Building2, color: "blue" },
                            { title: "Patient Support", desc: "Community & advocacy", icon: Users, color: "indigo" },
                            { title: "Tech & Product", desc: "Development & engineering", icon: Code2, color: "purple" }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] text-center group transition-colors hover:border-rose-200"
                            >
                                <div className={`w-14 h-14 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-white shadow-lg text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-black text-slate-900 mb-2">{item.title}</h4>
                                <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. No Open Positions & Contact */}
            <section className="py-32 px-6 bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -ml-64 -mb-64" />
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-xs font-black tracking-[0.3em] text-slate-400 uppercase bg-white/5 border border-white/10 rounded-full"
                    >
                        <Clock className="w-4 h-4" />
                        Current Status
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight tracking-tight">
                        No Open Positions <br />
                        <span className="text-rose-500">Right Now</span>
                    </h2>
                    <p className="text-xl text-slate-400 leading-relaxed font-light mb-12">
                        We don&apos;t have any active openings at the moment — but if you believe in what we&apos;re building and want to be part of it when we scale, we&apos;d love to hear from you.
                    </p>

                    <div className="group relative inline-block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 to-rose-700 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                        <a
                            href="mailto:shahyugam037@gmail.com"
                            className="relative flex items-center gap-4 px-10 py-6 bg-white text-slate-900 rounded-2xl font-black text-xl shadow-2xl transition-transform hover:scale-105"
                        >
                            <Mail className="w-7 h-7 text-rose-600" />
                            Drop us a note at shahyugam037@gmail.com
                        </a>
                    </div>
                    
                    <p className="mt-10 text-rose-500 font-black tracking-[0.2em] uppercase text-xs">
                        We read every message.
                    </p>
                </div>
            </section>
        </main>
    );
}

function Card({ icon: Icon, title, desc, color }: any) {
    const themes: any = {
        rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
        blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
    };
    const theme = themes[color];

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className={`p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center`}
        >
            <div className={`w-16 h-16 ${theme.bg} ${theme.text} rounded-2xl flex items-center justify-center mb-8`}>
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
        </motion.div>
    );
}