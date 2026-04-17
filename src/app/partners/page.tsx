"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Hospital,
    Heart,
    ChevronRight,
    CheckCircle2,
    ShieldCheck,
    Search,
    Stethoscope,
    Database,
    Zap,
    Mail,
    ArrowRight,
    Lock,
    Shield,
    Globe
} from 'lucide-react';

export default function PartnersPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const hospitalList = [
        "Doctor profiles — names, specializations, qualifications, and experience",
        "Doctor availability schedules — date and time slots for consultations",
        "Transparent pricing — consultation fees, surgery charges, and treatment costs",
        "Government scheme coverage — Ayushman Bharat and state schemes",
        "Facilities & departments — ICU, OT, emergency services, and specialized units"
    ];

    const hospitalBenefits = [
        { title: "Visibility", description: "Appear in patient searches filtered by specialty, city, and area." },
        { title: "Trust", description: "A verified listing signals credibility to patients and families." },
        { title: "Control", description: "Your profile, your data — updated whenever your information changes." },
        { title: "Reach", description: "Connect with patients actively searching for your facility's services." }
    ];

    const ngoSteps = [
        "Share your existing voluntary donor database with Pillora",
        "Consent-based opt-in invitation sent via SMS to each donor",
        "Confirmed donors added to Blood Connect with full details",
        "Automatic matching and connection whenever a KYC-verified recipient needs blood"
    ];

    const ngoBenefits = [
        { title: "Greater Impact", description: "Turn a static list into an active, life-saving network." },
        { title: "Zero Manual Effort", description: "Matching and communication are handled by the platform." },
        { title: "Privacy & Safety", description: "Details shared only after Aadhaar-based KYC verification." },
        { title: "Compliance", description: "Strict adherence to non-commercial, voluntary donation principles." }
    ];

    return (
        <main className="min-h-screen bg-white font-sans">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-slate-50">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] -z-10 -mt-48" />
                
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.span
                        {...fadeIn}
                        className="inline-block px-4 py-1.5 mb-8 text-[11px] font-black uppercase tracking-[0.3em] text-blue-600 border border-blue-600/20 rounded-full bg-blue-50/50 backdrop-blur-sm"
                    >
                        Partner with Pillora
                    </motion.span>
                    <motion.h1
                        {...fadeIn}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1]"
                    >
                        Join India's Growing <br />
                        <span className="text-blue-600 italic">HealthTech Ecosystem</span>
                    </motion.h1>
                    <motion.p
                        {...fadeIn}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto italic"
                    >
                        At Pillora, we are on a mission to make healthcare accessible, transparent, and immediate. We don't work alone — we build through collaboration.
                    </motion.p>
                </div>
            </section>

            {/* Core Mission Sub-Hero */}
            <section className="py-16 px-6 bg-white border-b border-slate-100">
                <div className="max-w-4xl mx-auto">
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-lg md:text-xl text-slate-600 text-center leading-relaxed"
                    >
                        Every hospital that lists with us and every NGO that shares their donor network brings us one step closer to a healthcare system that works for everyone.
                    </motion.p>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-24 px-6 bg-slate-50/50">
                <div className="max-w-5xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-12 md:p-16 rounded-[40px] bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
                        <p className="text-2xl md:text-3xl font-bold text-slate-800 italic leading-snug text-center relative z-10">
                            "Whether you are a multi-specialty hospital, a clinic, a diagnostic center, or a voluntary blood donor organization — partnering with Pillora means being part of a tech-driven movement that prioritizes patient lives."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* For Hospitals & Clinics */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-8 shadow-xl shadow-blue-200">
                                <Hospital className="w-8 h-8" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                                For Hospitals & Clinics
                            </h2>
                            <h3 className="text-2xl font-bold text-blue-600 mb-8 italic">
                                Be the First Choice When Patients Search
                            </h3>
                            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
                                When a patient or their family is looking for the right hospital, Pillora is where they come. Make sure your facility is visible, accurate, and trustworthy on our platform.
                            </p>

                            <div className="space-y-4 mb-12">
                                <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-6">What we list for your hospital:</h4>
                                {hospitalList.map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="mt-1.5 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                                        </div>
                                        <p className="text-slate-600 font-medium">{item}</p>
                                    </div>
                                ))}
                            </div>
                            
                            <a href="mailto:partners@pillora.in" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 uppercase tracking-widest text-xs">
                                Contact Partnerships <ChevronRight className="w-4 h-4" />
                            </a>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {hospitalBenefits.map((benefit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-blue-100 transition-all duration-500"
                                >
                                    <h4 className="text-xl font-black text-slate-900 mb-3">{benefit.title}</h4>
                                    <p className="text-slate-500 font-medium leading-relaxed text-sm italic">{benefit.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* NGOs Section */}
            <section className="py-32 px-6 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] -mr-48 -mt-48" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 grid grid-cols-1 gap-6">
                            {ngoBenefits.map((benefit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500"
                                >
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-red-600/20 flex items-center justify-center text-red-500">
                                            {i === 0 && <Zap className="w-5 h-5" />}
                                            {i === 1 && <Users className="w-5 h-5" />}
                                            {i === 2 && <ShieldCheck className="w-5 h-5" />}
                                            {i === 3 && <Globe className="w-5 h-5" />}
                                        </div>
                                        <h4 className="text-xl font-black">{benefit.title}</h4>
                                    </div>
                                    <p className="text-slate-400 font-medium leading-relaxed italic">{benefit.description}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center text-white mb-8 shadow-xl shadow-red-900/50">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                                For NGOs & Voluntary <br />
                                Blood Donor Organizations
                            </h2>
                            <h3 className="text-2xl font-bold text-red-500 mb-8 italic">
                                Expand Your Impact Through Blood Connect
                            </h3>
                            <p className="text-lg text-slate-300 mb-10 leading-relaxed font-medium">
                                If your organization has an existing database of voluntary blood donors, partnering with Pillora means your donors can save more lives — automatically, without any manual coordination on your end.
                            </p>

                            <div className="space-y-6 mb-12">
                                <h4 className="font-black text-white uppercase tracking-widest text-xs mb-2">How the partnership works:</h4>
                                {ngoSteps.map((step, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center flex-shrink-0 text-[10px] font-black">
                                            {i + 1}
                                        </div>
                                        <p className="text-slate-300 font-medium">{step}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 italic text-sm text-slate-400">
                                <span className="text-red-500 font-bold uppercase tracking-widest text-[10px] block mb-2">Important Note</span>
                                Pillora's opt-in process ensures every donor from your database has explicitly consented to being part of the Blood Connect network before their information is used. Donor privacy and consent are non-negotiable.
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                            Why Partner with Pillora?
                        </h2>
                        <p className="text-slate-500 font-medium text-lg">A collaboration designed for maximum community impact.</p>
                    </div>

                    <div className="overflow-hidden rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-200/50">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="px-8 py-6 font-black text-slate-900 uppercase tracking-widest text-xs border-b border-slate-100">What You Bring</th>
                                    <th className="px-8 py-6 font-black text-blue-600 uppercase tracking-widest text-xs border-b border-slate-100">What Pillora Brings</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <td className="px-8 py-6 text-slate-700 font-semibold italic">Hospital profile & data</td>
                                    <td className="px-8 py-6 text-slate-600 font-medium">Verified listing reaching patients across your city</td>
                                </tr>
                                <tr>
                                    <td className="px-8 py-6 text-slate-700 font-semibold italic">NGO donor database</td>
                                    <td className="px-8 py-6 text-slate-600 font-medium">Automated matching, KYC verification & privacy protection</td>
                                </tr>
                                <tr>
                                    <td className="px-8 py-6 text-slate-700 font-semibold italic">Trust in your community</td>
                                    <td className="px-8 py-6 text-slate-600 font-medium">Technology that scales your impact</td>
                                </tr>
                                <tr>
                                    <td className="px-8 py-6 text-slate-700 font-semibold italic">Healthcare expertise</td>
                                    <td className="px-8 py-6 text-slate-600 font-medium">A platform built to make that expertise accessible to all</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* How to Partner CTA */}
            <section className="py-24 px-6 bg-blue-600 text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-black mb-6 tracking-tight">How to Partner with Us</h2>
                    <p className="text-xl text-blue-100 mb-10 font-medium">Getting started is simple. Reach out to our partnerships team and we will take it from there.</p>
                    
                    <div className="inline-flex flex-col md:flex-row items-center gap-6 p-2 bg-white/10 rounded-[32px] border border-white/20 backdrop-blur-md">
                        <div className="px-8 py-4 flex items-center gap-3">
                            <Mail className="w-5 h-5 text-blue-200" />
                            <span className="font-bold text-lg">partners@pillora.in</span>
                        </div>
                        <div className="px-8 py-4 bg-white text-blue-600 rounded-[28px] font-black uppercase tracking-widest text-xs flex items-center gap-2">
                           Response within 24 hours <Zap className="w-3 h-3 fill-current" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-6 bg-slate-50 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] -mr-48 -mb-48 opacity-60" />
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter">
                        Ready to Build the <br />
                        <span className="text-blue-600 italic">Future of Health?</span>
                    </h2>
                    <p className="text-slate-600 font-medium mb-12 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        Join our growing network of hospitals, clinics, and donor organizations. Together, we can ensure that no patient is left searching when every second counts.
                    </p>
                    
                    <a 
                        href="mailto:shahyugam037@gmail.com"
                        className="group flex flex-col items-center gap-4 no-underline"
                    >
                        <div className="px-12 py-6 bg-slate-900 text-white font-black rounded-[32px] hover:bg-blue-600 transition-all shadow-2xl shadow-slate-300 uppercase tracking-[0.2em] text-sm flex items-center gap-3">
                            Join the Network <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <span className="text-slate-500 font-bold italic text-sm">📩 shahyugam037@gmail.com</span>
                    </a>
                </div>
            </section>
        </main>
    );
}
