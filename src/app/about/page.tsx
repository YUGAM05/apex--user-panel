"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Cpu, GraduationCap, Code2, HeartPulse, Building2, Droplets } from "lucide-react";

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
        <main className="min-h-screen bg-white">
            {/* 1. Hero Section */}
            <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={fadeIn}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-600 uppercase bg-blue-100 rounded-full">
                            Our Mission
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
                            Revolutionizing the <span className="text-blue-600">Digital Healthcare</span> Ecosystem
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed mb-10">
                            Apex Care is an integrated HealthTech platform designed to simplify the complexities of modern medical needs.
                            We provide a unified digital environment that connects users to essential pharmacy services, emergency blood supplies, and localized hospital data.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Core Philosophy */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white p-12 rounded-[3rem] shadow-xl border border-blue-100"
                    >
                        <HeartPulse className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
                            Information Saves Lives
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed italic">
                            &quot;Our platform is built on the principle that information saves lives.
                            By digitizing the healthcare journey, we reduce the time spent searching for resources and increase the time spent on recovery.&quot;
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 3. The Apex Pillars */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-black text-gray-900">The Apex Pillars</h2>
                        <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full" />
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {/* Pillar 1 */}
                        <motion.div variants={fadeIn} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Integrity in Medicine</h3>
                            <p className="text-gray-500 leading-relaxed">
                                We aim to provide a transparent e-pharmacy experience where users can manage their health requirements with full confidence in the data provided.
                            </p>
                        </motion.div>

                        {/* Pillar 2 */}
                        <motion.div variants={fadeIn} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Emergency Responsiveness</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Our real-time Blood Bank and Hospital Directory modules are designed for high-pressure situations, ensuring critical information is never more than a few seconds away.
                            </p>
                        </motion.div>

                        {/* Pillar 3 */}
                        <motion.div variants={fadeIn} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <Cpu className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Technological Precision</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Built with a modern full-stack architecture, Apex Care utilizes AI-driven assistance to provide personalized guidance and efficient data retrieval.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 4. Project Leadership */}
            <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] -ml-48 -mb-48" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative w-full aspect-square md:w-[500px] md:h-[500px] mx-auto group">
                                <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl -rotate-3 border border-white/20" />
                                <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white/10">
                                    <Image
                                        src="/yugam-shah.jpg"
                                        alt="Shah Yugam - Founder"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-blue-600 p-6 rounded-2xl shadow-2xl">
                                    <p className="text-2xl font-black">Shah Yugam</p>
                                    <p className="text-blue-100 text-sm font-medium">Full-Stack Developer</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl md:text-5xl font-black leading-tight">
                                Project Leadership & <br />
                                <span className="text-blue-500">Development</span>
                            </h2>
                            <p className="text-lg text-slate-400 leading-relaxed">
                                Apex Care is the flagship project of Shah Yugam, a Full-Stack Developer specializing in HealthTech solutions.
                                Currently a technologist at LJ University, Yugam combines a rigorous academic background in software engineering with a deep-seated understanding of the pharmaceutical industry.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                                    <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-black">Affiliation</p>
                                        <p className="font-bold">LJ University</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                                    <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-500">
                                        <Code2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-black">Expertise</p>
                                        <p className="font-bold">Full-Stack Development</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-slate-500 italic border-l-2 border-blue-500 pl-4">
                                The development of Apex Care is driven by a commitment to the 2024–2028 vision of smarter, faster, and more accessible healthcare for all.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 5. Health Ecosystem Flow */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-blue-50/50 p-12 rounded-[3.5rem] border border-blue-100">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-gray-900">Digital Ecosystem</h3>
                            <p className="text-gray-600 max-w-md">Our integrated network ensures seamless data flow between all critical healthcare services.</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6">
                            {[
                                { name: "E-Pharmacy", icon: <Building2 className="w-6 h-6" /> },
                                { name: "Blood Bank", icon: <Droplets className="w-6 h-6" /> },
                                { name: "Hospitals", icon: <Building2 className="w-6 h-6" /> },
                                { name: "Diagnostics", icon: <HeartPulse className="w-6 h-6" /> }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-blue-50">
                                    <div className="text-blue-600">{item.icon}</div>
                                    <span className="font-bold text-gray-700 text-sm">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
