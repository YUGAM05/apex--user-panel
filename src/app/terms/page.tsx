"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    AlertCircle,
    Stethoscope,
    HeartPulse,
    UserCheck,
    Scale,
    ShieldAlert,
    ArrowRight,
    Gavel,
    Info,
    Smartphone,
    Mail,
    Zap,
    Scale as ScaleIcon,
    ShieldCheck,
    Droplets
} from 'lucide-react';

export default function TermsAndConditionsPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <main className="min-h-screen bg-slate-50 py-20 px-6 font-sans">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="mb-20 text-center">
                    <motion.div
                        {...fadeIn}
                        className="inline-flex items-center justify-center w-20 h-20 bg-slate-900 rounded-[2rem] text-white shadow-2xl mb-8"
                    >
                        <FileText className="w-10 h-10" />
                    </motion.div>
                    <motion.h1
                        {...fadeIn}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4"
                    >
                        Pillora <span className="text-blue-600 italic">Terms & Conditions</span>
                    </motion.h1>
                    <div className="flex items-center justify-center gap-4">
                        <span className="h-px w-12 bg-slate-200" />
                        <motion.p
                            {...fadeIn}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]"
                        >
                            Effective Date: April 2026
                        </motion.p>
                        <span className="h-px w-12 bg-slate-200" />
                    </div>
                </header>

                <div className="space-y-12 pb-32">
                    {/* 01. Nature of the Platform */}
                    <motion.section
                        {...fadeIn}
                        className="relative p-8 md:p-12 bg-white border border-slate-100 rounded-[3rem] shadow-xl shadow-slate-200/50 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-[80px] -mr-32 -mt-32 opacity-40" />
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4 italic underline decoration-blue-100 underline-offset-8">
                                <span className="text-blue-600 not-italic">01.</span> Nature of the Platform
                            </h2>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10">
                                Pillora is a digital intermediary platform. We do not practice medicine, provide medical advice, or operate as a licensed blood storage facility. We provide a technology interface to connect users with:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FeatureItem icon={<Droplets className="w-5 h-5" />} title="Blood Connect" text="A community blood donor network through our technology service." />
                                <FeatureItem icon={<Smartphone className="w-5 h-5" />} title="Hospital Aggregator" text="Providing verified healthcare facility data and aggregator services." />
                            </div>
                        </div>
                    </motion.section>

                    {/* 02. Medical Disclaimer */}
                    <motion.section
                        {...fadeIn}
                        className="bg-red-600 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-red-200"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800" />
                        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl flex items-center justify-center flex-shrink-0 animate-pulse">
                                <AlertCircle className="w-10 h-10" />
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-3xl font-black italic tracking-tight">02. Medical Disclaimer</h2>
                                <p className="text-xl font-bold leading-relaxed">
                                    Pillora is NOT a substitute for emergency medical services. If you are experiencing a life-threatening situation, please contact 108 or visit the nearest emergency room immediately.
                                </p>
                                <p className="text-red-100 font-medium italic opacity-80 border-t border-white/10 pt-6">
                                    Information provided on this platform — including hospital details, doctor availability, and pricing — is for informational purposes only and does not constitute medical advice.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* 03. Blood Connect - Donor Terms */}
                    <motion.section {...fadeIn} className="space-y-8">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight px-4 flex items-center gap-4">
                            <span className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-sm">03</span>
                            Blood Connect — Donor Terms
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <PolicyCard 
                                title="Non-Commercialization"
                                content="The sale or purchase of blood is a criminal offense in India. Pillora is strictly non-monetary. Any solicitation will result in a permanent ban and legal report."
                                color="border-red-100 shadow-red-50"
                            />
                            <PolicyCard 
                                title="Donor Eligibility"
                                content="By registering, you confirm you are at least 18 years old and providing truthful information while voluntarily consenting to join the Blood Connect network."
                                color="border-slate-100 shadow-slate-100"
                            />
                            <PolicyCard 
                                title="Data Sharing"
                                content="Contact details are shared only with KYC-verified recipients matching your blood group and area. You may request removal at any time via support."
                                color="border-slate-100 shadow-slate-100"
                            />
                        </div>
                    </motion.section>

                    {/* 04. Blood Connect - Recipient Terms */}
                    <motion.section {...fadeIn} className="bg-slate-900 text-white rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-blue-900/20">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -mr-48 -mt-48" />
                        <div className="relative z-10 space-y-12">
                            <h2 className="text-3xl font-black italic tracking-tight flex items-center gap-4">
                                <span className="text-blue-500 not-italic">04.</span> Blood Connect — Recipient Terms
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-6 p-8 bg-white/5 border border-white/10 rounded-3xl">
                                    <h3 className="text-xl font-black flex items-center gap-3">
                                        <ShieldCheck className="w-6 h-6 text-blue-500" /> Mandatory KYC
                                    </h3>
                                    <p className="text-slate-400 font-medium leading-relaxed italic text-sm">
                                        All recipients must complete Aadhaar-based KYC. By submitting, you consent to Pillora processing Aadhaar data per Aadhaar Act 2016 and DPDP Act 2023. Fraudulent Aadhaar usage is a criminal offense.
                                    </p>
                                </div>
                                <div className="space-y-6 p-8 bg-white/5 border border-white/10 rounded-3xl">
                                    <h3 className="text-xl font-black flex items-center gap-3">
                                        <UserCheck className="w-6 h-6 text-blue-500" /> Usage Policy
                                    </h3>
                                    <p className="text-slate-400 font-medium leading-relaxed italic text-sm">
                                        Donor information shared via a verified match is strictly for arranging blood donation. Harassment, spam, or commercial use is prohibited and will result in legal action.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* 05. Hospital Information Terms */}
                    <motion.section {...fadeIn} className="bg-white p-10 md:p-16 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                        <h2 className="text-3xl font-black text-slate-900 mb-8 italic tracking-tight">
                            <span className="text-blue-500 not-italic italic">05.</span> Hospital Information Terms
                        </h2>
                        <div className="space-y-8">
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <h3 className="font-black text-slate-900 mb-4 uppercase tracking-widest text-xs">Nature of Information</h3>
                                <p className="text-slate-500 font-medium italic leading-relaxed text-sm">
                                    Pillora aggregates information provided by hospital partners. While verified at listing, data like pricing and availability are subject to change. Pillora does not guarantee 100% accuracy of third-party data at all times.
                                </p>
                            </div>
                            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                                <h3 className="font-black text-blue-900 mb-4 uppercase tracking-widest text-xs">No Appointment Guarantee</h3>
                                <p className="text-blue-800/70 font-bold italic leading-relaxed text-sm">
                                    Listing on Pillora does not constitute a booking or appointment confirmation. Our platform provides information to facilitate informed decision-making only.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* 06 & 07 User Responsibilities & Liability */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.section {...fadeIn} className="p-10 bg-slate-900 text-white rounded-[3rem] shadow-xl overflow-hidden relative group">
                            <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                            <h2 className="text-2xl font-black mb-8 italic">06. Responsibilities</h2>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-sm font-medium text-slate-400"><Info className="w-4 h-4 text-blue-500" /> Provide accurate and truthful info</li>
                                <li className="flex items-center gap-3 text-sm font-medium text-slate-400"><Info className="w-4 h-4 text-blue-500" /> Be at least 18 years of age</li>
                                <li className="flex items-center gap-3 text-sm font-medium text-slate-400"><Info className="w-4 h-4 text-blue-500" /> No fraudulent/illegal usage</li>
                                <li className="flex items-center gap-3 text-sm font-medium text-slate-400"><Info className="w-4 h-4 text-blue-500" /> Keep credentials secure</li>
                            </ul>
                        </motion.section>

                        <motion.section {...fadeIn} className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-xl shadow-slate-200/50">
                            <h2 className="text-2xl font-black text-slate-900 mb-8 italic">07. Liability</h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4">Shah Yugam & Pillora Network</p>
                            <p className="text-sm font-medium text-slate-500 italic leading-relaxed mb-6">
                                We are not liable for donor medical eligibility, hospital data inaccuracies, or medical outcomes. Pillora facilitates clinical connection only.
                            </p>
                            <div className="p-4 bg-slate-50 rounded-2xl text-[10px] font-bold text-slate-400 leading-relaxed italic">
                                Final eligibility is at the discretion of the donating facility.
                            </div>
                        </motion.section>
                    </div>

                    {/* 08 Governing Law */}
                    <motion.section {...fadeIn} className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                        <h2 className="text-2xl font-black text-slate-900 mb-10 italic tracking-tight uppercase">08. Governing Law</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {["IT Act 2000", "DPDP Act 2023", "Aadhaar Act 2016", "Drugs Act 1940"].map((law) => (
                                <div key={law} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <Gavel className="w-4 h-4 text-slate-400" />
                                    <span className="font-bold text-slate-900 text-xs">{law}</span>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* 09 Contact */}
                    <motion.section {...fadeIn} className="bg-blue-600 text-white p-12 rounded-[3rem] text-center shadow-2xl shadow-blue-200">
                        <h2 className="text-3xl font-black mb-6 tracking-tight uppercase">09. Contact Us</h2>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                            <div className="flex items-center gap-3 text-xl font-black">
                                <Mail className="w-6 h-6 border-b-2 border-white pb-1" />
                                shahyugam037@gmail.com
                            </div>
                            <div className="px-8 py-3 bg-white/10 border border-white/20 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] backdrop-blur-md">
                                RESPONSE WITHIN 24 HOURS <Zap className="w-3 h-3 fill-current ml-2 inline" />
                            </div>
                        </div>
                    </motion.section>

                    <motion.div {...fadeIn} className="text-center pt-8">
                        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[11px] mb-4">
                            By using Pillora, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
                        </p>
                        <div className="w-24 h-1 bg-slate-200 mx-auto rounded-full" />
                    </motion.div>
                </div>
            </div>
        </main>
    );
}

function FeatureItem({ icon, title, text }: any) {
    return (
        <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100/50">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 flex-shrink-0">
                {icon}
            </div>
            <div>
                <h4 className="font-black text-slate-900 text-sm mb-1">{title}</h4>
                <p className="text-[11px] font-medium text-slate-500 italic leading-snug">{text}</p>
            </div>
        </div>
    );
}

function PolicyCard({ title, content, color }: any) {
    return (
        <div className={`p-8 bg-white border-2 ${color} rounded-[2.5rem] shadow-xl hover:scale-[1.02] transition-transform h-full`}>
            <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-[0.1em]">{title}</h3>
            <p className="text-xs font-medium text-slate-500 italic leading-relaxed">{content}</p>
        </div>
    );
}
