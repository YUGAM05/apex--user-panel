"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Store,
    Hospital,
    Heart,
    ChevronRight,
    CheckCircle2,
    LayoutDashboard,
    ShieldCheck,
    Truck,
    Search,
    Stethoscope,
    Database,
    Zap,
    Scale
} from 'lucide-react';

export default function PartnersPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const partnerTypes = [
        {
            icon: <Hospital className="w-8 h-8" />,
            title: "For Hospitals & Clinics (Directory Partners)",
            subtitle: "Be the First Choice in Emergencies",
            description: "Ensure your facility is visible when it matters most. List your hospital in our directory to help patients find you based on specialty and real-time bed availability.",
            benefits: [
                { icon: <Search className="w-4 h-4" />, label: "Visibility", text: "Get listed in our 'Smart Search' for specialized treatments." },
                { icon: <Stethoscope className="w-4 h-4" />, label: "Emergency Coordination", text: "Streamline patient arrivals through our integrated hospital locator." },
                { icon: <Database className="w-4 h-4" />, label: "Verified Data", text: "Control your facility’s profile, contact info, and department listings." }
            ],
            color: "indigo"
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "For Blood Banks & NGOs (Impact Partners)",
            subtitle: "Zero-Gap Blood Coordination",
            description: "Connect your donor database with our real-time request system. We help you bridge the gap between voluntary donors and those in urgent need.",
            benefits: [
                { icon: <Users className="w-4 h-4" />, label: "Donor Mobilization", text: "Post requirements for specific blood types during shortages." },
                { icon: <Zap className="w-4 h-4" />, label: "Efficient Matching", text: "Reduce the time spent on manual coordination." },
                { icon: <Scale className="w-4 h-4" />, label: "Compliance", text: "Our platform adheres strictly to the National Blood Policy for non-commercial donation." }
            ],
            color: "red"
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-24 pb-20 px-6 overflow-hidden bg-slate-50">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] -z-10 -mt-48" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.span
                        {...fadeIn}
                        className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 border border-blue-600/20 rounded-full bg-blue-50"
                    >
                        Partner with Pillora
                    </motion.span>
                    <motion.h1
                        {...fadeIn}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-tight"
                    >
                        Join India’s Growing <br />
                        <span className="text-blue-600 italic">HealthTech Ecosystem</span>
                    </motion.h1>
                    <motion.p
                        {...fadeIn}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto"
                    >
                        At Pillora, we are on a mission to make healthcare accessible, transparent, and immediate. We don’t work alone—we build through collaboration.
                    </motion.p>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-20 px-6 border-y border-slate-100">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-xl md:text-2xl font-bold text-slate-800 italic leading-relaxed">
                        &quot;Whether you are a multi-specialty hospital or a dedicated blood bank, partnering with Pillora means joining a tech-driven movement that prioritizes patient lives.&quot;
                    </p>
                </div>
            </section>

            {/* Partner Sections */}
            <section className="py-24 px-6 space-y-32">
                {partnerTypes.map((type, idx) => (
                    <div key={idx} className="max-w-7xl mx-auto">
                        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 items-start ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                            {/* Content */}
                            <motion.div
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-last' : 'lg:order-first'}`}
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-${type.color}-600 text-white shadow-xl shadow-${type.color}-200`}>
                                    {type.icon}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                                    {type.title}
                                </h2>
                                <h3 className={`text-xl font-black italic mb-6 text-${type.color}-600`}>
                                    {type.subtitle}
                                </h3>
                                <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                                    {type.description}
                                </p>
                                <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 uppercase tracking-widest text-xs">
                                    Become a Partner <ChevronRight className="w-4 h-4" />
                                </button>
                            </motion.div>

                            {/* Benefits Cards */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="lg:col-span-1"
                            />

                            <motion.div
                                initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="lg:col-span-6 space-y-4"
                            >
                                {type.benefits.map((benefit, bIdx) => (
                                    <div key={bIdx} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex items-start gap-6">
                                        <div className={`w-12 h-12 rounded-xl bg-${type.color}-50 text-${type.color}-600 flex items-center justify-center flex-shrink-0 group-hover:bg-${type.color}-600 group-hover:text-white transition-colors`}>
                                            {benefit.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-900 uppercase tracking-[0.1em] text-xs mb-2">
                                                {benefit.label}
                                            </h4>
                                            <p className="text-sm font-medium text-slate-500 italic leading-relaxed">
                                                {benefit.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-100/5 rounded-full blur-[80px] -ml-32 -mb-32" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
                        Ready to Build the <br />
                        <span className="text-blue-500 italic text-6xl">Future of Health?</span>
                    </h2>
                    <p className="text-slate-400 font-medium mb-12 text-lg italic">
                        Join our network and start making a difference today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl shadow-black/20 uppercase tracking-widest text-xs">
                            Start Collaboration
                        </button>
                        <button className="w-full sm:w-auto px-10 py-5 bg-slate-800 text-white font-black rounded-2xl border border-white/10 hover:bg-slate-700 transition-all uppercase tracking-widest text-xs">
                            Contact Partnerships
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
