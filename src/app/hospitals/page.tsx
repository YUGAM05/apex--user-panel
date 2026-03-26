"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, Phone, Clock, CreditCard, Ambulance, ShieldCheck, Star, X, ChevronLeft, ChevronRight, User, CheckCircle, XCircle, Building } from 'lucide-react';
import api from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Doctor {
    name: string;
    specialization?: string;
    daysAvailable?: string[];
    timing?: string;
}

interface Hospital {
    _id: string;
    name: string;
    address: string;
    city: string;
    image: string;
    images?: string[];
    isOpen24Hours: boolean;
    consultationFee: number;
    governmentSchemes: string[];
    isOnlinePaymentAvailable: boolean;
    ambulanceContact: string;
    contactNumber?: string;
    phoneNumbers?: string[];
    description: string;
    rating: number;
    doctors?: Doctor[];
}

// ─── Slideshow component (auto-advances, arrows, dots) ───────────────────────
function ImageSlideshow({ images, alt, className = '' }: { images: string[]; alt: string; className?: string }) {
    const [idx, setIdx] = useState(0);
    const fallback = '/premium-hospital.png';

    const resolveSrc = (s?: string) => {
        if (!s) return fallback;
        if (s.startsWith('/uploads/')) return `http://localhost:5000${s}`;
        if (s.startsWith('http://') || s.startsWith('https://') || s.startsWith('data:')) return s;
        return fallback;
    };

    const prev = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); }, [images.length]);
    const next = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); }, [images.length]);

    // Auto-advance only if multiple images
    useEffect(() => {
        if (images.length <= 1) return;
        const t = setInterval(() => setIdx(i => (i + 1) % images.length), 4000);
        return () => clearInterval(t);
    }, [images.length]);

    const src = resolveSrc(images[idx]);

    return (
        <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={src}
                        alt={`${alt} – image ${idx + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallback; }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Only show controls if multiple images */}
            {images.length > 1 && (
                <>
                    <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 backdrop-blur-sm transition-colors z-10">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 backdrop-blur-sm transition-colors z-10">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    {/* Dot indicators */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? 'bg-white w-3' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                    {/* Image counter */}
                    <div className="absolute top-2 right-2 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm z-10">
                        {idx + 1}/{images.length}
                    </div>
                </>
            )}
        </div>
    );
}



// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HospitalsPage() {
    const router = useRouter();
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Hospital[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = React.useRef<HTMLDivElement>(null);

    const fallbackImage = '/premium-hospital.png';

    const resolveSrc = (s?: string) => {
        if (!s) return fallbackImage;
        if (s.startsWith('/uploads/')) return `http://localhost:5000${s}`;
        if (s.startsWith('http://') || s.startsWith('https://') || s.startsWith('data:')) return s;
        return fallbackImage;
    };

    // Build full image list for a hospital (primary first, then additional)
    const getImages = (h: Hospital): string[] => {
        if (h.images && h.images.length > 0) return h.images.map(resolveSrc);
        if (h.image) return [resolveSrc(h.image)];
        return [fallbackImage];
    };

    // Autocomplete
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.trim().length < 2) { setSuggestions([]); return; }
            try {
                const res = await api.get(`/hospitals/search?q=${searchTerm}`);
                setSuggestions(res.data);
            } catch { /* ignore */ }
        };
        const t = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(t);
    }, [searchTerm]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSuggestions(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    useEffect(() => { fetchHospitals(); }, []);

    const fetchHospitals = async () => {
        try {
            const res = await api.get('/hospitals');
            if (res.data.length === 0) {
                await api.post('/hospitals/seed');
                const r2 = await api.get('/hospitals');
                setHospitals(r2.data);
            } else {
                setHospitals(res.data);
            }
        } catch (err) {
            console.error('Failed to fetch hospitals', err);
        } finally {
            setLoading(false);
        }
    };

    const filtered = hospitals.filter(h =>
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const phoneList = (h: Hospital) =>
        (h.phoneNumbers && h.phoneNumbers.length > 0 ? h.phoneNumbers : h.contactNumber ? [h.contactNumber] : []).filter(Boolean);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Find Trusted Hospitals Near You</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Access detailed information about healthcare facilities, including emergency services, accepted schemes, and consultation costs.
                    </p>
                </div>

                {/* Search */}
                <div className="max-w-xl mx-auto mb-16 relative" ref={searchRef}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm hover:shadow-md transition-shadow"
                        placeholder="Search by hospital name or city..."
                        value={searchTerm}
                        onChange={e => { setSearchTerm(e.target.value); setShowSuggestions(true); }}
                        onFocus={() => setShowSuggestions(true)}
                    />
                    {showSuggestions && (suggestions.length > 0 || searchTerm.length >= 2) && (
                        <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[60] py-2">
                            {suggestions.length > 0 ? (
                                <>
                                    <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">Top Matches</div>
                                    {suggestions.map(h => (
                                        <button key={h._id} onClick={() => { setSearchTerm(h.name); setShowSuggestions(false); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left group">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden relative">
                                                <Image src={resolveSrc(h.images?.[0] ?? h.image)} alt={h.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-gray-900 text-sm truncate group-hover:text-blue-600">{h.name}</p>
                                                <div className="flex items-center text-[10px] text-gray-400 font-medium uppercase mt-0.5">
                                                    <MapPin className="w-2.5 h-2.5 mr-1" />{h.city}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-bold bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md">
                                                <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500" />{h.rating}
                                            </div>
                                        </button>
                                    ))}
                                </>
                            ) : (
                                <div className="px-4 py-6 text-center text-gray-400">
                                    <p className="text-sm font-medium">No hospitals found matching &quot;{searchTerm}&quot;</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                        {[1, 2, 3].map(i => <div key={i} className="bg-white rounded-2xl h-96 shadow-sm" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((hospital, index) => {
                            const imgs = getImages(hospital);
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}
                                    key={hospital._id}
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col cursor-pointer"
                                    onClick={() => router.push(`/hospitals/${hospital._id}`)}
                                >
                                    {/* Image / slideshow */}
                                    <div className="h-48 relative">
                                        <ImageSlideshow images={imgs} alt={hospital.name} className="h-full w-full" />
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm z-10">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-bold text-gray-800 text-sm">{hospital.rating}</span>
                                        </div>
                                        {hospital.isOpen24Hours && (
                                            <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm flex items-center gap-1 z-10">
                                                <Clock className="w-3 h-3" /> Open 24/7
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{hospital.name}</h3>
                                        <div className="flex items-center text-gray-500 text-sm mb-4">
                                            <MapPin className="w-4 h-4 mr-1 shrink-0" />{hospital.address}, {hospital.city}
                                        </div>
                                        <div className="mt-auto space-y-2">
                                            <div className="flex items-center justify-between text-sm border-t pt-3">
                                                <span className="text-gray-500 flex items-center gap-1">
                                                    <CreditCard className="w-4 h-4" /> Consultation
                                                </span>
                                                <span className="font-bold text-gray-900">₹{hospital.consultationFee} <span className="text-xs font-normal text-gray-400">/ Visit</span></span>
                                            </div>
                                            {phoneList(hospital).length > 0 && (
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500 flex items-center gap-1">
                                                        <Phone className="w-4 h-4" /> Contact
                                                    </span>
                                                    <a
                                                        href={`tel:${phoneList(hospital)[0]}`}
                                                        onClick={e => e.stopPropagation()}
                                                        className="font-semibold text-blue-600 hover:text-blue-800 transition-colors text-xs"
                                                    >
                                                        {phoneList(hospital)[0]}
                                                        {phoneList(hospital).length > 1 && (
                                                            <span className="ml-1 text-gray-400 font-normal">+{phoneList(hospital).length - 1} more</span>
                                                        )}
                                                    </a>
                                                </div>
                                            )}
                                            {hospital.doctors && hospital.doctors.length > 0 && (
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500 flex items-center gap-1">
                                                        <User className="w-4 h-4" /> Doctors
                                                    </span>
                                                    <span className="font-semibold text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
                                                        {hospital.doctors.length} Available
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Online Pay</span>
                                                <span className={`font-semibold text-xs px-2 py-0.5 rounded-full ${hospital.isOnlinePaymentAvailable ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                                                    {hospital.isOnlinePaymentAvailable ? 'Available' : 'Unavailable'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );
}
