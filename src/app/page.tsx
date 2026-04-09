"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, ShieldCheck, Upload, FileHeart, MapPin, Activity, UserCheck, CreditCard, Landmark, Stethoscope, Briefcase, User, Heart } from "lucide-react";
import HealthHubSection from "@/components/HealthHubSection";

interface FeatureItemProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

export default function Home() {
    return (
        <main className="bg-gradient-to-b from-blue-50/30 to-white min-h-screen pb-20">
            {/* 1. Rotating Banner Component (Hero) */}
            <div className="pt-6">
                <RotatingBanner />
            </div>

            {/* 2. Trust Strip */}
            <section className="max-w-7xl mx-auto px-6 py-12 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <FeatureItem icon={<MapPin className="w-6 h-6 text-blue-500" />} title="Smart Area Matching" desc="Donor found near you instantly" />
                    <FeatureItem icon={<Activity className="w-6 h-6 text-red-500" />} title="24/7 Emergency Blood" desc="Round-the-clock donor network" />
                    <FeatureItem icon={<CreditCard className="w-6 h-6 text-emerald-500" />} title="Transparent Pricing" desc="No hidden charges, ever" />
                    <FeatureItem icon={<Landmark className="w-6 h-6 text-orange-500" />} title="Govt. Scheme Eligible" desc="Ayushman Bharat & more covered" />
                </div>
            </section>

            {/* 3. Health Hub */}
            <HealthHubSection />
        </main>
    );
}

// Components

function FeatureItem({ icon, title, desc }: FeatureItemProps) {
    return (
        <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
                <p className="text-xs text-gray-500">{desc}</p>
            </div>
        </div>
    )
}

const slides = [
    {
        id: "blood-1",
        tag: "Blood Bank",
        title: "Need blood urgently?",
        subtext: "Enter your blood group and area — we match you with a verified donor nearby in minutes.",
        buttonText: "Request blood now",
        buttonLink: "/blood-bank",
        icon: <MapPin className="w-10 h-10 md:w-16 md:h-16 text-white" strokeWidth={1.5} />,
        sideText: "15 min",
        sideSubText: "avg. match time",
        bgColor: "bg-blue-600", // Classic Pillora Blue
        circleBg: "bg-white/20"
    },
    {
        id: "hospital-1",
        tag: "Hospital",
        title: "Are you eligible for free treatment?",
        subtext: "Check which government schemes cover your treatment — Ayushman Bharat, PMJAY & more.",
        buttonText: "Check eligibility",
        buttonLink: "/hospitals",
        icon: <Briefcase className="w-10 h-10 md:w-16 md:h-16 text-white" strokeWidth={1.5} />,
        sideText: "50+",
        sideSubText: "schemes listed",
        bgColor: "bg-sky-700", // Vibrant Sky Blue
        circleBg: "bg-white/20"
    },
    {
        id: "hospital-2",
        tag: "Hospital",
        title: "Know your doctor before you visit",
        subtext: "Browse doctor profiles, specializations, visiting hours and consultation charges — all in one place.",
        buttonText: "Find a doctor",
        buttonLink: "/hospitals",
        icon: <User className="w-10 h-10 md:w-16 md:h-16 text-white" strokeWidth={1.5} />,
        sideText: "200+",
        sideSubText: "specialist doctors",
        bgColor: "bg-slate-800", // Premium Dark / Navy
        circleBg: "bg-white/20"
    },
    {
        id: "blood-2",
        tag: "Blood Bank",
        title: "Be someone's reason to live",
        subtext: "Register as a verified donor on Pillora. Your one donation can save up to 3 lives.",
        buttonText: "Become a donor",
        buttonLink: "/blood-bank",
        icon: <Heart className="w-10 h-10 md:w-16 md:h-16 text-white" strokeWidth={1.5} />,
        sideText: "10,000+",
        sideSubText: "donors registered",
        bgColor: "bg-indigo-600", // Rich Indigo Blue
        circleBg: "bg-white/20"
    }
];

function RotatingBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Rotate every 5 seconds
        return () => clearInterval(timer);
    }, []);

    const s = slides[currentSlide];

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 xl:px-8">
            <div className={`rounded-[2rem] md:rounded-[3rem] px-5 py-8 md:p-16 pb-14 md:pb-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden transition-colors duration-700 shadow-xl md:shadow-2xl ${s.bgColor}`}>
                {/* Content */}
                <div className="relative z-10 max-w-2xl w-full flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 mb-3 md:mb-6 text-xs md:text-sm font-bold text-white bg-white/20 rounded-full backdrop-blur-sm">
                        {s.tag}
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-6 leading-[1.15]">
                        {s.title}
                    </h2>
                    <p className="text-white/90 text-sm sm:text-base md:text-xl mb-6 md:mb-10 font-medium max-w-xl leading-relaxed">
                        {s.subtext}
                    </p>
                    <Link href={s.buttonLink} className="bg-white text-gray-900 px-6 py-3 md:px-8 md:py-3.5 rounded-xl font-bold text-sm md:text-base hover:bg-gray-50 transition-colors inline-block shadow-sm">
                        {s.buttonText}
                    </Link>
                </div>

                {/* Right Visual Side */}
                <div className="relative z-10 mt-8 md:mt-0 flex flex-col items-center justify-center shrink-0 md:mr-10 mb-4 md:mb-0">
                    <div className={`w-28 h-28 md:w-48 md:h-48 rounded-full ${s.circleBg} flex items-center justify-center mb-3 md:mb-6 transition-colors duration-700`}>
                        {s.icon}
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-4xl font-bold text-white mb-1 tracking-tight">{s.sideText}</div>
                        <div className="text-white/80 text-xs md:text-base font-medium">{s.sideSubText}</div>
                    </div>
                </div>

                {/* Dots Navigation */}
                <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-2.5 z-20">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-2 md:h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-6 md:w-8 bg-white' : 'w-2 md:w-2.5 bg-white/40 hover:bg-white/60'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
