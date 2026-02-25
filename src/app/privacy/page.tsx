"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Activity, MapPin, UserCheck, Scale, Info } from 'lucide-react';

export default function PrivacyPolicyPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <main className="min-h-screen bg-slate-50 py-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-16 text-center">
                    <motion.div
                        {...fadeIn}
                        className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-100 mb-6"
                    >
                        <Shield className="w-8 h-8" />
                    </motion.div>
                    <motion.h1
                        {...fadeIn}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4"
                    >
                        Apex Care <span className="text-blue-600 italic">Privacy Policy</span>
                    </motion.h1>
                    <motion.p
                        {...fadeIn}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 font-bold uppercase tracking-widest text-xs"
                    >
                        Last Updated: January 2026
                    </motion.p>
                </header>

                <div className="space-y-12">
                    {/* Introduction */}
                    <motion.section
                        {...fadeIn}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Info className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900">Overview</h2>
                        </div>
                        <p className="text-slate-600 font-medium leading-relaxed">
                            At Apex Care, we recognize the sensitivity of your health information. Our privacy framework is built to ensure that your medical journey remains confidential, secure, and under your control. We only process data that is essential for delivering clinical excellence and emergency support.
                        </p>
                    </motion.section>

                    {/* 1. Data We Collect */}
                    <motion.section
                        {...fadeIn}
                        transition={{ delay: 0.4 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-4 px-4 text-center sm:text-left">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">1. Data We Collect</h2>
                        </div>
                        <p className="text-slate-500 font-medium px-4 mb-4 text-center sm:text-left">
                            We only collect data that is strictly necessary to provide our healthcare services.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                            <DataCard
                                icon={<Activity className="w-6 h-6" />}
                                title="Health Data"
                                content="Medical prescriptions, blood group, medication history, and lab reports."
                            />
                            <DataCard
                                icon={<MapPin className="w-6 h-6" />}
                                title="Location Data"
                                content="Real-time GPS to help you find the nearest hospital or blood donor."
                            />
                            <DataCard
                                icon={<Lock className="w-6 h-6" />}
                                title="Technical Data"
                                content="IP address and device ID to ensure secure access to your medical records."
                            />
                        </div>
                    </motion.section>

                    {/* 2. Purpose of Processing */}
                    <motion.section
                        {...fadeIn}
                        transition={{ delay: 0.5 }}
                        className="bg-white border border-slate-100 p-8 md:p-12 rounded-[2.5rem] shadow-sm overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -mr-32 -mt-32" />

                        <div className="relative z-10 space-y-8">
                            <h2 className="text-3xl font-black italic tracking-tight text-slate-900">2. Purpose of Processing</h2>
                            <p className="text-slate-500 font-medium leading-relaxed">Your data is used specifically for:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <PurposeItem title="E-Pharmacy" text="Verifying and fulfilling your medicine orders." />
                                <PurposeItem title="Emergency Services" text="Connecting blood seekers with matching donors in real-time." />
                                <PurposeItem title="Hospital Directory" text="Helping you navigate to verified healthcare facilities." />
                                <PurposeItem title="AI Assistance" text="Providing 24/7 guidance through our smart health bot." />
                            </div>
                        </div>
                    </motion.section>

                    {/* 3. Sharing with Third Parties */}
                    <motion.section
                        {...fadeIn}
                        transition={{ delay: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-4 px-4">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">5. Sharing with Third Parties</h2>
                        </div>
                        <p className="text-slate-500 font-medium px-4 mb-4">We only share your data with:</p>

                        <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[500px]">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Recipient</th>
                                        <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Purpose</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <SharingRow icon={<UserCheck className="w-4 h-4" />} recipient="Registered Pharmacists" purpose="To verify your prescriptions." />
                                    <SharingRow icon={<Activity className="w-4 h-4" />} recipient="Verified Hospitals" purpose="Only when you initiate an appointment or emergency request." />
                                    <SharingRow icon={<Scale className="w-4 h-4" />} recipient="Government Authorities" purpose="Only if required under the DPDP Act for public health emergencies." />
                                </tbody>
                            </table>
                        </div>
                    </motion.section>

                    {/* Footer Note */}
                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.7 }}
                        className="text-center pt-8 md:pt-12 pb-16 md:pb-24"
                    >
                        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
                            Your Health. Your Data. Our Priority.
                        </p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}

function DataCard({ icon, title, content }: any) {
    return (
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all text-center md:text-left flex flex-col items-center md:items-start h-full">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="font-black text-slate-900 mb-3 uppercase tracking-widest text-xs">{title}</h3>
            <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
                {content}
            </p>
        </div>
    );
}

function PurposeItem({ title, text }: any) {
    return (
        <div className="space-y-2 p-6 bg-slate-50 rounded-2xl border border-slate-100/50">
            <h4 className="text-blue-600 font-black tracking-tight text-lg italic">{title}</h4>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">{text}</p>
        </div>
    );
}

function SharingRow({ icon, recipient, purpose }: any) {
    return (
        <tr className="group transition-colors">
            <td className="px-8 py-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {icon}
                    </div>
                    <span className="font-bold text-slate-900">{recipient}</span>
                </div>
            </td>
            <td className="px-8 py-6 italic font-medium text-slate-500">{purpose}</td>
        </tr>
    );
}
