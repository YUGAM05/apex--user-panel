"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
    ShieldCheck, 
    Zap, 
    Cpu, 
    GraduationCap, 
    Code2, 
    HeartPulse, 
    Building2, 
    Droplets, 
    Sparkles, 
    Quote, 
    Hospital, 
    ShieldAlert, 
    Users, 
    Target, 
    Lock, 
    Eye,
    CheckCircle2,
    Shield
} from "lucide-react";

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
        <main className="min-h-screen bg-white selection:bg-rose-100 selection:text-rose-900">
            {/* 1. Hero Section */}
            <section className="relative py-16 md:py-20 px-6 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-50 via-white to-transparent">
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
                        className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-rose-400/10 rounded-full blur-[140px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, -45, 0],
                            x: [0, -40, 0],
                            y: [0, 60, 0]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[140px]"
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
                            className="inline-flex items-center gap-2 px-5 py-2 mb-6 text-xs font-black tracking-[0.2em] text-rose-700 uppercase bg-rose-600/10 border border-rose-600/20 rounded-full backdrop-blur-md"
                        >
                            <Sparkles className="w-4 h-4" />
                            About Us — Pillora
                        </motion.div>
                        <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-6 leading-tight tracking-tighter">
                            Digitizing Healthcare <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-red-600 to-rose-700">Access in India</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8 max-w-3xl mx-auto font-medium">
                            Ensuring life-saving resources are never more than a few taps away through Blood Connect and Hospital Information Services.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Who We Are & Leadership */}
            <section className="py-24 px-4 relative bg-slate-50 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="w-full lg:w-1/2 relative"
                        >
                            <div className="relative aspect-square max-w-[500px] mx-auto group">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-rose-500 to-rose-700 rounded-[3rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
                                <div className="relative h-full w-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl">
                                    <Image
                                        src="/yugam-shah.jpg"
                                        alt="Yugam Shah - Founder of Pillora"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                        <p className="text-white font-black text-2xl">Yugam Shah</p>
                                        <p className="text-rose-400 font-bold uppercase tracking-widest text-sm">Founder & CEO</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="w-full lg:w-1/2 space-y-10">
                            <div>
                                <h2 className="text-4xl font-black text-slate-900 mb-6 flex items-center gap-4">
                                    <Users className="w-10 h-10 text-rose-600" />
                                    Who We Are
                                </h2>
                                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                                    Pillora is a HealthTech platform founded and led by Yugam Shah, built to digitize the foundational layers of healthcare access in India. We are a healthcare coordination platform focused on two critical pillars: 
                                    <span className="text-rose-600 font-bold"> Blood Connect</span> and <span className="text-blue-600 font-bold"> Hospital Information Services</span> — ensuring life-saving resources are never more than a few taps away.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full -mr-16 -mt-16 blur-xl" />
                                <h3 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-4">
                                    <Target className="w-8 h-8 text-rose-600" />
                                    Our Mission
                                </h3>
                                <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-rose-600 pl-6">
                                    &quot;In healthcare, a five-minute delay or a piece of wrong information can change everything. Pillora exists to eliminate that gap — giving patients, families, and caregivers fast, verified, and reliable access to critical medical resources.&quot;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. What We Do - Blood Connect */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-rose-700 uppercase bg-rose-50 rounded-full"
                        >
                            <Droplets className="w-4 h-4" />
                            Blood Connect Services
                        </motion.div>
                        <h2 className="text-5xl font-black text-slate-900">Blood Connect</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-10 rounded-[3rem] bg-rose-50 border border-rose-100"
                        >
                            <h3 className="text-2xl font-black text-rose-900 mb-6">For Donors</h3>
                            <ul className="space-y-4">
                                {[
                                    "Register with personal & contact details",
                                    "Information kept private until verified match",
                                    "Geographic proximity matching",
                                    "Safe and efficient donor-patient connection"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <CheckCircle2 className="w-6 h-6 text-rose-600 shrink-0 mt-1" />
                                        <span className="text-slate-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-10 rounded-[3rem] bg-red-50 border border-red-100"
                        >
                            <h3 className="text-2xl font-black text-red-900 mb-6">For Recipients</h3>
                            <ul className="space-y-4">
                                {[
                                    "Submit detailed blood requests",
                                    "Mandatory KYC verification (Aadhaar)",
                                    "AI-powered Aadhaar validation",
                                    "Automatic SMS confirmation upon approval"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <CheckCircle2 className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                                        <span className="text-slate-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Security Sub-section */}
                    <div className="mt-16 bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/20 rounded-full blur-[100px] -mr-40 -mt-40" />
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
                                    <Lock className="w-10 h-10 text-rose-500" />
                                    Security & Transparency
                                </h3>
                                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                    Donor data is stored securely within our verified donor network. A donor&apos;s name and phone number are only shared with a recipient when that recipient has completed full KYC verification and is located in the donor&apos;s nearest area.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                                    <h4 className="font-bold text-rose-400 mb-2 uppercase tracking-wider text-sm">Masked Data Storage</h4>
                                    <p className="text-slate-200">Aadhaar numbers are saved as <span className="font-mono text-rose-300">**** **** **XX</span>. Only the last 2 digits are visible to admins, ensuring identity protection.</p>
                                </div>
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                                    <h4 className="font-bold text-rose-400 mb-2 uppercase tracking-wider text-sm">Legitimate Connections</h4>
                                    <p className="text-slate-200">KYC ensures every connection is legitimate, local, and necessary. We have zero tolerance for misuse of donor data.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Hospital Information Services */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="w-full lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 rounded-full"
                            >
                                <Hospital className="w-4 h-4" />
                                Centralized Aggregator
                            </motion.div>
                            <h2 className="text-5xl font-black text-slate-900 mb-8">Hospital <br /><span className="text-blue-600">Information Services</span></h2>
                            <p className="text-xl text-slate-600 leading-relaxed mb-10 font-medium">
                                Pillora is building a centralized hospital aggregator that helps patients search, compare, and choose the right healthcare facility — <span className="font-bold text-slate-900 italic underline decoration-blue-500 decoration-2">without making a single phone call.</span>
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Doctor profiles & specializations",
                                    "Availability schedules & slots",
                                    "Transparent pricing & fees",
                                    "Government scheme coverage",
                                    "Facilities & specialty units",
                                    "Emergency service status"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                                        <span className="text-slate-800 font-bold text-sm tracking-tight">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-6">
                            <motion.div whileHover={{ y: -10 }} className="pt-12">
                                <HospitalCard title="Ayushman Bharat" desc="Verified coverage and benefits for govt schemes." icon={Shield} color="blue" />
                            </motion.div>
                            <motion.div whileHover={{ y: -10 }}>
                                <HospitalCard title="Specialized Units" desc="Detailed mapping of ICU, OT, and specialized units." icon={Cpu} color="indigo" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. How We Are Built Differently (Table Section) */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-black text-slate-900 mb-4">Built Differently</h2>
                        <div className="h-2 w-24 bg-rose-600 mx-auto rounded-full" />
                    </div>

                    <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-900 text-white">
                                    <th className="px-8 py-6 text-xl font-black">Principle</th>
                                    <th className="px-8 py-6 text-xl font-black">What It Means for You</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { p: "KYC-Verified Safety", m: "Only verified recipients access donor information" },
                                    { p: "Privacy by Design", m: "Donor details are shared only on confirmed matches" },
                                    { p: "Masked Data Storage", m: "Aadhaar numbers stored as **** **** **XX — never in full" },
                                    { p: "Verified Data", m: "Zero tolerance for inaccuracies in hospital or donor records" },
                                    { p: "Speed", m: "Platform responses at enterprise speed — because emergencies don't wait" }
                                ].map((row, i) => (
                                    <motion.tr 
                                        key={i}
                                        whileHover={{ backgroundColor: "rgba(241, 245, 249, 0.5)" }}
                                        className="transition-colors"
                                    >
                                        <td className="px-8 py-6 font-black text-rose-600">{row.p}</td>
                                        <td className="px-8 py-6 text-slate-600 font-medium">{row.m}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 6. Our Vision */}
            <section className="py-32 px-6 bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />
                
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-xs font-black tracking-[0.3em] text-rose-500 uppercase bg-rose-500/10 border border-rose-500/20 rounded-full"
                    >
                        <Eye className="w-4 h-4" />
                        Our Vision
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black mb-10 leading-tight">
                        The Connected <br />
                        <span className="text-rose-500">Health Grid of India</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light mb-12">
                        By 2028, Pillora aims to be a real-time network where Blood Connect and specialist availability are all synchronized in one place, accessible to anyone, anywhere, in moments.
                    </p>
                    <div className="flex items-center justify-center gap-4 text-rose-500 font-black tracking-widest uppercase">
                        <div className="h-px w-12 bg-rose-500/50" />
                        Mission 2028
                        <div className="h-px w-12 bg-rose-500/50" />
                    </div>
                </div>
            </section>
        </main>
    );
}

function HospitalCard({ title, desc, icon: Icon, color }: any) {
    const colorClasses: any = {
        blue: "text-blue-600 bg-blue-50 border-blue-100",
        indigo: "text-indigo-600 bg-indigo-50 border-indigo-100"
    };

    return (
        <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl h-full flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${colorClasses[color]}`}>
                <Icon className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-black text-slate-900 mb-4">{title}</h4>
            <p className="text-slate-500 font-medium text-sm leading-relaxed">{desc}</p>
        </div>
    );
}