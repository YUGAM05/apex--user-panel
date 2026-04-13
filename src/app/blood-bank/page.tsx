"use client";
import React, { useState, useEffect } from 'react';
import { Heart, Activity, MapPin, Droplet, User, Phone, CheckCircle, AlertOctagon, Clock, ShieldCheck, Siren, Info, Upload, FileIcon, Trash2, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BloodBankPage() {
    const [activeTab, setActiveTab] = useState<'donate' | 'request'>('donate');
    const [stats, setStats] = useState({ donors: 120, requests: 45, saved: 320 });
    const [userRequests, setUserRequests] = useState<any[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            if (params.get('tab') === 'request') {
                setActiveTab('request');
            }
        }
        
        const fetchUserRequests = async () => {
            try {
                const user = localStorage.getItem('user');
                if (user) {
                    const response = await api.get('/blood-bank/my-requests');
                    setUserRequests(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch user requests:', error);
            }
        };
        fetchUserRequests();
        const interval = setInterval(fetchUserRequests, 10000);
        return () => clearInterval(interval);
    }, []);

    const rejectedRequest = userRequests.find(r => r.aiVerificationStatus === 'Rejected');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <AnimatePresence>
                {rejectedRequest && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-red-600 text-white overflow-hidden sticky top-0 z-[60]"
                    >
                        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <AlertOctagon className="w-5 h-5 animate-pulse" />
                                <div className="text-sm">
                                    <span className="font-black uppercase tracking-wider mr-2">Action Required:</span>
                                    Your KYC for {rejectedRequest.patientName}&apos;s request was rejected. AI: &quot;{rejectedRequest.aiVerificationRemarks}&quot;
                                </div>
                            </div>
                            <Link
                                href="/my-blood-requests"
                                className="px-4 py-1.5 bg-white text-red-600 rounded-lg text-xs font-black uppercase hover:bg-red-50 transition-colors shrink-0"
                            >
                                Fix Document
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="bg-red-900 min-h-[400px] text-white pt-32 pb-48 px-4 relative overflow-hidden">
                <div
                    className="absolute inset-0 z-0 opacity-40 mix-blend-overlay scale-110"
                    style={{
                        backgroundImage: 'url("/premium-blood-bank-hero.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-red-600/50 via-transparent to-red-900/80 z-0" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-800 via-transparent to-red-800 z-0 opacity-60" />

                <div className="absolute bottom-24 left-0 w-full h-32 z-0 opacity-20 pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <motion.path
                            d="M0 50 L100 50 L120 20 L140 80 L160 50 L300 50 L320 10 L340 90 L360 50 L500 50 L520 20 L540 80 L560 50 L700 50 L720 10 L740 90 L760 50 L1000 50"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                        />
                    </svg>
                </div>

                <div className="absolute inset-0 z-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: "110%", x: `${10 + i * 15}%`, opacity: 0 }}
                            animate={{ y: "-10%", opacity: [0, 0.4, 0], rotate: [0, 45, -45, 0] }}
                            transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 1.5, ease: "easeInOut" }}
                            className="absolute"
                        >
                            {i % 2 === 0 ? <Droplet className="w-8 h-8 text-red-200" /> : <Heart className="w-6 h-6 text-red-300" />}
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-full px-8 py-2.5 mb-8 backdrop-blur-md shadow-xl"
                    >
                        <span className="relative flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
                        </span>
                        <span className="font-black text-sm tracking-[0.2em] uppercase">Live Blood Bank Network</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl font-light tracking-widest text-red-100 mb-12 italic"
                    >
                        Every second counts. Every drop saves.
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-10 md:gap-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-12 py-5 shadow-2xl"
                    >
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-xl md:text-2xl font-black text-white">85+</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            </div>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-red-200 font-bold">Donors Online</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-xl md:text-2xl font-black text-white">12</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                            </div>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-red-200 font-bold">Active Requests</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 -mt-24 mb-16 relative z-30 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-[40px] p-10 md:p-16 shadow-2xl shadow-red-900/10 border border-white"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black mb-6 leading-tight text-gray-900"
                    >
                        Be a Hero. <br className="hidden md:block" />
                        <span className="text-red-600">Save a Life.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                    >
                        Connect instantly with local donors or broadcast urgent requests. Your contribution creates a lifeline for those in need.
                    </motion.p>
                </motion.div>
            </div>

            <div className="flex-1 max-w-7xl mx-auto w-full px-4 mb-20 relative z-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100">
                            <div className="flex p-2 bg-gray-50/80">
                                <button
                                    onClick={() => setActiveTab('donate')}
                                    className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${activeTab === 'donate'
                                        ? 'bg-white text-red-600 shadow-md ring-1 ring-black/5'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Heart className={`w-5 h-5 ${activeTab === 'donate' ? 'fill-red-600' : ''}`} />
                                    Donate Blood
                                </button>
                                <button
                                    onClick={() => setActiveTab('request')}
                                    className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${activeTab === 'request'
                                        ? 'bg-white text-red-600 shadow-md ring-1 ring-black/5'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Siren className={`w-5 h-5 ${activeTab === 'request' ? 'text-red-600 animate-pulse' : ''}`} />
                                    Request Blood
                                </button>
                            </div>
                            <div className="p-8 md:p-10">
                                {activeTab === 'donate' ? <DonateForm /> : <RequestForm />}
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <BloodBankInfoSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}


function BloodBankInfoSidebar() {
    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-red-100 sticky top-24">
            <div className="bg-red-50 p-6 border-b border-red-100">
                <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-5 h-5 text-red-600" />
                    <h3 className="font-bold text-red-900 text-lg">Blood Bank Guidelines</h3>
                </div>
                <p className="text-red-600 text-xs">Essential information for our heroes & requesters</p>
            </div>
            <div className="p-6 space-y-6">
                <div>
                    <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                        <Heart className="w-4 h-4 text-red-500" /> For Donors
                    </h4>
                    <ul className="space-y-3">
                        <li className="flex gap-3 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                            <span>Age must be between <strong>18-60 years</strong>.</span>
                        </li>
                        <li className="flex gap-3 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                            <span>Weight should be above <strong>45kg</strong>.</span>
                        </li>
                        <li className="flex gap-3 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                            <span>Must be healthy and not suffering from cold/flu.</span>
                        </li>
                    </ul>
                </div>
                <div className="w-full h-px bg-red-50" />
                <div>
                    <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                        <Siren className="w-4 h-4 text-red-500" /> For Requests
                    </h4>
                    <ul className="space-y-3">
                        <li className="flex gap-3 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                            <span>Mark <strong>&quot;Critical Emergency&quot;</strong> only for life-threatening situations.</span>
                        </li>
                        <li className="flex gap-3 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                            <span>Provide accurate <strong>Hospital & Contact</strong> details for faster response.</span>
                        </li>
                        <li className="flex gap-3 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                            <span>Our automated system reaches out to donors within <strong>5km radius</strong>.</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="bg-red-900 p-5 text-center text-white">
                <p className="text-sm font-medium opacity-90 mb-2">Need direct assistance?</p>
                <a href="tel:+919429167856" className="inline-flex items-center justify-center gap-2 bg-white text-red-900 font-bold py-2 px-6 rounded-full text-sm hover:bg-red-50 transition-colors">
                    <Phone className="w-4 h-4" /> Call +91 9429167856
                </a>
            </div>
        </div>
    );
}


function CertificateView({
    name, registrationDate, certRef, onDownload, onReset
}: {
    name: string;
    registrationDate: string;
    certRef: React.RefObject<HTMLDivElement>;
    onDownload: () => void;
    onReset: () => void;
}) {
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [scale, setScale] = React.useState(1);

    React.useEffect(() => {
        const CERT_W = 860;
        const update = () => {
            if (wrapperRef.current) {
                const w = wrapperRef.current.offsetWidth;
                setScale(Math.min(1, w / CERT_W));
            }
        };
        update();
        const ro = new ResizeObserver(update);
        if (wrapperRef.current) ro.observe(wrapperRef.current);
        return () => ro.disconnect();
    }, []);

    const CERT_H = 600;
    const visibleHeight = Math.round(CERT_H * scale);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-6 w-full">

            {/* Success Banner */}
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-3 w-full">
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                <div>
                    <p className="font-bold text-green-900 text-sm">You&apos;re registered as a Donor!</p>
                    <p className="text-xs text-green-700">Your certificate is ready to download.</p>
                </div>
            </div>

            {/* Certificate Preview */}
            <div ref={wrapperRef} className="w-full flex justify-center overflow-hidden" style={{ height: `${visibleHeight}px` }}>
                <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center', width: '860px', flexShrink: 0 }}>
                    <div
                        ref={certRef}
                        style={{
                            width: '860px', height: '600px',
                            background: '#ffffff', position: 'relative', overflow: 'hidden',
                            fontFamily: 'Georgia, serif',
                            boxShadow: '0 8px 48px rgba(0,0,0,0.18)', borderRadius: '8px',
                        }}
                    >
                        {/* Blood drop watermark */}
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 1, opacity: 0.07 }}>
                            <svg width="280" height="320" viewBox="0 0 100 120" fill="#c0392b">
                                <path d="M50 5 C50 5,10 60,10 80 A40 40 0 0 0 90 80 C90 60,50 5,50 5Z" />
                            </svg>
                        </div>

                        {/* Logo top-left */}
                        <div style={{ position: 'absolute', top: '20px', left: '30px', zIndex: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/pillora-logo-new.png" alt="Pillora Logo" style={{ width: '75px', height: '75px', objectFit: 'contain' }} crossOrigin="anonymous" />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/pillora-text.png" alt="Pillora" style={{ height: '50px', width: 'auto' }} crossOrigin="anonymous" />
                            </div>
                        </div>

                        {/* Certificate heading */}
                        <div style={{ position: 'absolute', top: '105px', left: 0, right: 0, textAlign: 'center', zIndex: 10 }}>
                            <div style={{
                                fontFamily: '"Times New Roman", Times, serif',
                                fontWeight: 900,
                                fontSize: '54px',
                                color: '#111',
                                textTransform: 'uppercase',
                                lineHeight: '1.1',
                                letterSpacing: '2px',
                                wordSpacing: '12px',
                            }}>
                                CERTIFICATE
                            </div>
                            <div style={{
                                fontFamily: 'Arial, Helvetica, sans-serif',
                                fontSize: '14px',
                                color: '#444',
                                marginTop: '20px',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                                letterSpacing: '1px',
                                wordSpacing: '8px',
                            }}>
                                OF BLOOD DONOR REGISTRATION
                            </div>
                        </div>

                        {/* Presented to */}
                        <div style={{ position: 'absolute', top: '235px', left: 0, right: 0, textAlign: 'center', zIndex: 10 }}>
                            <div style={{
                                fontFamily: '"Times New Roman", Times, serif',
                                fontSize: '22px',
                                color: '#c0392b',
                                fontStyle: 'italic',
                                letterSpacing: '0.5px',
                                wordSpacing: '6px',
                            }}>
                                This Certificate is Presented to
                            </div>
                        </div>

                        {/* ✅ FIX: Donor name — OWN absolute div, no underline inside */}
                        <div style={{
                            position: 'absolute',
                            top: '278px',
                            left: 0,
                            right: 0,
                            textAlign: 'center',
                            zIndex: 10,
                        }}>
                            <span style={{
                                fontFamily: '"Times New Roman", Times, serif',
                                fontWeight: 900,
                                fontSize: '46px',
                                color: '#c0392b',
                                letterSpacing: '1px',
                                wordSpacing: '10px',
                            }}>
                                {name}
                            </span>
                        </div>

                        {/* ✅ FIX: Underline — COMPLETELY SEPARATE absolute div, top = 278 + font height(~55px) + gap(10px) = 343px */}
                        <div style={{
                            position: 'absolute',
                            top: '343px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '500px',
                            borderBottom: '1.5px solid #333',
                            zIndex: 10,
                        }} />

                        {/* Sub text */}
                        <div style={{ position: 'absolute', top: '370px', left: '100px', right: '100px', textAlign: 'center', zIndex: 10 }}>
                            <div style={{
                                fontFamily: '"Times New Roman", Times, serif',
                                fontSize: '16px',
                                color: '#333',
                                lineHeight: '1.7',
                                letterSpacing: '0.3px',
                                wordSpacing: '5px',
                            }}>
                                for registering as a blood donor and showing commitment to saving lives.
                                <br />
                                Thank you — We really appreciate your actions.
                            </div>
                        </div>

                        {/* Gold medal image */}
                        <div style={{ position: 'absolute', bottom: '35px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/gold-medal.png" alt="Award Medal" style={{ width: '95px', height: 'auto', display: 'block' }} crossOrigin="anonymous" />
                        </div>

                        {/* ✅ FIX: Date text — OWN absolute div */}
                        <div style={{
                            position: 'absolute',
                            bottom: '78px',
                            left: '65px',
                            zIndex: 10,
                        }}>
                            <span style={{
                                fontFamily: '"Times New Roman", Times, serif',
                                fontSize: '15px',
                                color: '#222',
                                letterSpacing: '0.5px',
                                wordSpacing: '4px',
                            }}>
                                {registrationDate}
                            </span>
                        </div>

                        {/* ✅ FIX: Date underline — COMPLETELY SEPARATE absolute div, below the date text */}
                        <div style={{
                            position: 'absolute',
                            bottom: '62px',
                            left: '65px',
                            width: '180px',
                            borderBottom: '1.5px solid #333',
                            zIndex: 10,
                        }} />

                        {/* Signature bottom-right */}
                        <div style={{ position: 'absolute', bottom: '40px', right: '75px', zIndex: 10, textAlign: 'center' }}>
                            <div style={{
                                fontFamily: 'Arial, Helvetica, sans-serif',
                                fontSize: '13px',
                                color: '#333',
                                fontWeight: 600,
                                letterSpacing: '0.5px',
                                wordSpacing: '4px',
                            }}>
                                Founder & CEO of Pillora
                            </div>
                            <svg width="110" height="40" viewBox="0 0 120 40" style={{ display: 'block', margin: '0 auto' }}>
                                <path d="M10 28 Q30 8 50 22 Q70 36 90 18 Q100 12 110 20" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                            <div style={{ borderBottom: '1.5px solid #000', margin: '4px auto 6px', width: '150px' }} />
                            <div style={{
                                fontFamily: 'Arial, Helvetica, sans-serif',
                                fontSize: '14px',
                                color: '#222',
                                fontWeight: 700,
                                letterSpacing: '1px',
                                wordSpacing: '5px',
                            }}>
                                Shah Yugam V
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm mt-4">
                <button onClick={onDownload} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-red-200 transition-all active:scale-95 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    Download Certificate
                </button>
                <button onClick={onReset} className="flex-1 text-gray-600 font-semibold hover:bg-gray-100 py-3.5 px-6 rounded-xl transition-colors border border-gray-200 w-full">
                    Register Another
                </button>
            </div>

        </motion.div>
    );
}

function DonateForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [registrationDate, setRegistrationDate] = useState('');
    const [formData, setFormData] = useState({
        name: '', age: '', gender: 'Male', bloodGroup: 'A+',
        phone: '', city: '', area: '', address: ''
    });
    const certRef = React.useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const user = localStorage.getItem('user');
        if (!user) {
            alert('Please login to register as a donor');
            router.push('/login?redirect=/blood-bank');
            return;
        }

        setLoading(true);
        try {
            await api.post('/blood-bank/donors', { ...formData, location: [0, 0] });
            const now = new Date();
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const day = now.getDate();
            const suffix = day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th';
            setRegistrationDate(`${months[now.getMonth()]}, ${day}${suffix} ${now.getFullYear()}`);
            setSuccess(true);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!certRef.current) return;
        try {
            const { default: html2canvas } = await import('html2canvas');
            const { default: jsPDF } = await import('jspdf');

            if (document.fonts) {
                await document.fonts.ready;
            }

            const canvas = await html2canvas(certRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width / 2, canvas.height / 2] });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
            pdf.save(`Pillora_Donor_Certificate_${formData.name.replace(/\s+/g, '_')}.pdf`);
        } catch (err) {
            console.error('PDF generation failed:', err);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    if (success) {
        return (
            <CertificateView
                name={formData.name}
                registrationDate={registrationDate}
                certRef={certRef}
                onDownload={handleDownload}
                onReset={() => window.location.reload()}
            />
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Donor Registration</h2>
                <p className="text-gray-500">Join our network of heroes saving lives in your city.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="md:col-span-2">
                    <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        <input name="name" required onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition-all" placeholder="Enter your full name" />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Blood Group</label>
                    <div className="relative">
                        <Droplet className="absolute left-3 top-3.5 w-5 h-5 text-red-500" />
                        <select name="bloodGroup" onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none appearance-none">
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Age</label>
                    <input name="age" type="number" min="18" max="60" required onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="18-60 years" />
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Gender</label>
                    <select name="gender" onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        <input name="phone" required onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="+91 98765 00000" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                    <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">City</label>
                    <input name="city" required onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="City" />
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Area / Locality</label>
                    <input name="area" required onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="Locality" />
                </div>
            </div>

            <div>
                <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Full Address</label>
                <textarea name="address" rows={2} required onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="House No, Street, Landmark" />
            </div>

            <div className="bg-red-50 p-5 rounded-2xl flex items-start gap-4 border border-red-100 shadow-sm shadow-red-50">
                <ShieldCheck className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-2">
                    <p className="text-sm text-red-900 font-bold leading-tight">Security & Transparency Notice</p>
                    <p className="text-xs text-red-700 leading-relaxed font-medium">
                        Your data will be securely saved in our donor network. When someone in your nearest area needs blood, your <strong>name and phone number</strong> will be shared with them to facilitate immediate assistance.
                    </p>
                    <p className="text-xs text-red-700 leading-relaxed font-medium">
                        To protect your privacy and prevent fraud, every requester is <strong>mandated to complete KYC verification</strong> (Aadhar Card or PAN Card) before your contact details are revealed.
                    </p>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
            >
                {loading ? 'Processing...' : 'Register as Donor'} <Heart className="w-5 h-5 fill-white" />
            </button>
        </form>
    );
}

function RequestForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        patientName: '', age: '', bloodGroup: 'A+', units: '1',
        hospitalAddress: '', area: '', city: '', contactNumber: '', isUrgent: false,
        kycDocumentType: 'Aadhar Card', kycDocumentId: '', kycDocumentImage: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, kycDocumentImage: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormData({ ...formData, kycDocumentImage: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const user = localStorage.getItem('user');
        if (!user) {
            alert('Please login to request blood services');
            router.push('/login?redirect=/blood-bank');
            return;
        }

        setLoading(true);
        try {
            await api.post('/blood-bank/requests', formData);
            setSuccess(true);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to submit request';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="text-center py-12">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <Siren className="w-12 h-12" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Broadcasted</h2>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                    We have notified donors in your vicinity. Our automated system is calling verified donors now.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Link href="/my-blood-requests" className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-gray-200 flex items-center gap-2">
                        <Activity className="w-5 h-5" /> Track Request Status
                    </Link>
                    <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-red-200">
                        Submit Another Request
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                    <Siren className="w-3 h-3" /> Emergency Service
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Request Blood</h2>
                <p className="text-gray-500">We will broadcast this request immediately.</p>
            </div>

            <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-4 hover:shadow-sm transition-shadow">
                <div className="flex-1">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                        <div className="relative flex items-center">
                            <input type="checkbox" name="isUrgent" checked={formData.isUrgent} onChange={handleChange} className="w-5 h-5 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                        </div>
                        <div>
                            <span className="font-bold text-red-900 block">Critical Emergency</span>
                            <span className="text-xs text-red-600 block">Mark this if immediate transfusion is needed</span>
                        </div>
                    </label>
                </div>
                <AlertOctagon className="w-8 h-8 text-red-500 opacity-50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="md:col-span-2 grid grid-cols-3 gap-6">
                    <div className="col-span-2">
                        <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Patient Name</label>
                        <input name="patientName" required onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="Patient Name" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Age</label>
                        <input name="age" type="number" required onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="Age" />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Blood Group Needed</label>
                    <div className="relative">
                        <Droplet className="absolute left-3 top-3.5 w-5 h-5 text-red-600" />
                        <select name="bloodGroup" onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none font-bold text-red-900">
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Units Needed</label>
                    <input name="units" type="number" min="1" required onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="Ex: 2" />
                </div>
            </div>

            <div>
                <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Hospital Name & Address</label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <textarea name="hospitalAddress" required onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="Room No, Hospital Name, Area..." />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                    <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">City</label>
                    <input name="city" required onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none" />
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Area / Locality</label>
                    <input name="area" required onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="e.g. Downtown" />
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Contact Person Number</label>
                    <input name="contactNumber" required onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="For coordination" />
                </div>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-blue-900">Mandatory KYC Verification</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Document Type</label>
                        <select name="kycDocumentType" required onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none">
                            <option value="Aadhar Card">Aadhar Card</option>
                            <option value="PAN Card">PAN Card</option>
                            <option value="Driving License">Driving License</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Aadhar Card Image</label>
                        {!formData.kycDocumentImage ? (
                            <div
                                onClick={() => document.getElementById('kyc-upload')?.click()}
                                className="w-full aspect-video border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-xs text-gray-500 font-medium">Click to upload Aadhar Card</span>
                                <input id="kyc-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                            </div>
                        ) : (
                            <div className="relative group rounded-xl overflow-hidden aspect-video border border-gray-200">
                                <img src={formData.kycDocumentImage} alt="KYC Document" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button type="button" onClick={removeImage} className="p-2 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors shadow-lg" title="Remove Image">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <p className="text-[10px] text-blue-600 mt-3 flex items-center gap-1">
                    <Info className="w-3 h-3" /> Your ID is only used for verification and is not shared with donors. Your KYC is just used for preventing fraud.
                </p>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2"
            >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Siren className="w-5 h-5" />}
                {loading ? 'Broadcasting...' : 'Broadcast Request'}
            </button>
        </form>
    );
}