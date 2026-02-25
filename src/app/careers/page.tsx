"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    Truck,
    Droplets,
    Building2,
    ShieldAlert,
    UserCheck,
    ChevronRight,
    Briefcase,
    Globe2,
    Clock,
    ArrowRight
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

const roles = [
    {
        title: "E-Pharmacy Operations Manager",
        icon: <Truck className="w-6 h-6" />,
        color: "bg-blue-500",
        description: "Oversees the supply chain. They manage relationships with pharmaceutical wholesalers and retailers and ensure that medicine delivery is fast, accurate, and temperature-controlled.",
        tags: ["Supply Chain", "Logistics", "Full-Time"]
    },
    {
        title: "Real-Time Blood Registry Coordinator",
        icon: <Droplets className="w-6 h-6" />,
        color: "bg-red-500",
        description: "At the heart of our Health Centre is a dedicated network designed to save lives through speed. We provide an accelerated pathway for users to connect with life-saving blood donors instantly via WhatsApp. To maintain the highest standards of safety and prevent fraudulent activity, we require KYC verification for all donors. This ensures that every match we deliver is verified, secure, and ready to help when every second counts.",
        tags: ["Emergency", "Coordination", "24/7 Shift"]
    },
    {
        title: "Hospital Network Manager",
        icon: <Building2 className="w-6 h-6" />,
        color: "bg-amber-500",
        description: "The primary architect of our healthcare database, this role ensures every patient has access to life-saving information. They manage real-time onboarding for hospitals in Ahmedabad, with a core mission to verify the availability of Government Schemes (like Ayushman Bharat) and the exact extent of their coverage. By maintaining accurate data on specializations (Cancer, Surgery, etc.) and emergency contact numbers, they empower users to make informed financial and medical decisions.",
        tags: ["Partnerships", "Data", "On-Field"]
    },
    {
        title: "Regulatory & Compliance Specialist",
        icon: <ShieldAlert className="w-6 h-6" />,
        color: "bg-emerald-500",
        description: "Ensures Apex Care complies with Indian healthcare laws (like the Pharmacy Act and Data Privacy rules). They handle the 'paperwork' that keeps the digital platform legal.",
        tags: ["Legal", "Compliance", "Remote Optional"]
    },
    {
        title: "Patient Success Associate",
        icon: <UserCheck className="w-6 h-6" />,
        color: "bg-purple-500",
        description: "The 'Human Touch.' They handle complex user queries—like helping a family find a specific blood type in an emergency when the automated system needs human intervention.",
        tags: ["Support", "Patient Care", "Voice"]
    }
];

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 px-6 overflow-hidden bg-slate-900 text-white">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={fadeIn}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-400 uppercase bg-blue-400/10 rounded-full border border-blue-400/20">
                            Join the Mission
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
                            Build the Future of <br />
                            <span className="text-blue-500">Digital Healthcare</span>
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            Apex Care is more than just a platform; it&apos;s a movement to make healthcare accessible,
                            transparent, and fast for everyone.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Roles Section */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="text-center mb-16"
                    >
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="p-2 bg-blue-600 rounded-lg text-white">
                                    <Briefcase className="w-5 h-5" />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                                    Operations & Logistics Roles
                                </h2>
                            </div>
                            <p className="text-gray-500 max-w-2xl font-medium mx-auto text-lg leading-relaxed">
                                These roles manage the &quot;Movement&quot;—getting blood to patients, medicines to doorsteps, and hospitals onto the platform.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 gap-6"
                    >
                        {roles.map((role, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeIn}
                                className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-50 transition-colors" />

                                <div className="flex flex-col lg:flex-row lg:items-center gap-8 relative z-10">
                                    <div className={`w-16 h-16 ${role.color} rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform`}>
                                        {role.icon}
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            {role.tags.map((tag, tIdx) => (
                                                <span key={tIdx} className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {role.title}
                                        </h3>
                                        <p className="text-gray-500 leading-relaxed font-medium">
                                            {role.description}
                                        </p>
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
