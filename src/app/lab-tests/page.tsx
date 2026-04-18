"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, ArrowRight, Microscope, Dna } from 'lucide-react';
import Link from 'next/link';

export default function LabTestsComingSoon() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50/50 p-6 relative overflow-hidden">

            {/* Background elements */}
            <div className="absolute top-20 left-10 opacity-20">
                <Dna className="w-24 h-24 text-blue-300" />
            </div>
            <div className="absolute bottom-20 right-10 opacity-20 delay-700">
                <Microscope className="w-32 h-32 text-indigo-300" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-2xl relative z-10"
            >
                <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-100/50 relative group">
                        <div className="absolute inset-0 bg-blue-200 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                        <Beaker className="w-12 h-12 text-blue-600 relative z-10" />
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4">
                    Coming <span className="text-blue-600">Soon</span>
                </h1>

                <p className="text-xl text-slate-500 font-medium mb-12 max-w-lg mx-auto leading-relaxed">
                    We are building a comprehensive Diagnostic & Lab Test ecosystem.
                    <br />
                    Professional healthcare checks at your doorstep.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 shadow-xl hover:shadow-2xl hover:bg-slate-800 transition-all"
                        >
                            Back to Home <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </div>


            </motion.div>
        </div>
    );
}
