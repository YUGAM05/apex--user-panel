"use client";
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Clock, CreditCard, Building, Ambulance, ShieldCheck, Star, Navigation, X } from 'lucide-react';
import api from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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
    description: string;
    rating: number;
}

export default function HospitalsPage() {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Hospital[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = React.useRef<HTMLDivElement>(null);

    const fallbackImage = '/premium-hospital.png';

    // Autocomplete logic
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.trim().length < 2) {
                setSuggestions([]);
                return;
            }
            try {
                const res = await api.get(`/hospitals/search?q=${searchTerm}`);
                setSuggestions(res.data);
            } catch (err) {
                console.error("Hospital autocomplete error:", err);
            }
        };

        const timer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const resolveSrc = (s?: string) => {
        if (!s) return fallbackImage;
        if (s.startsWith('/uploads/')) return `http://localhost:5000${s}`;
        if (s.startsWith('http://') || s.startsWith('https://') || s.startsWith('data:')) return s;
        return fallbackImage;
    };

    useEffect(() => {
        fetchHospitals();
    }, []);

    const fetchHospitals = async () => {
        try {
            // First try to seed if empty (development only trick)
            const seedRes = await api.get('/hospitals');
            if (seedRes.data.length === 0) {
                await api.post('/hospitals/seed');
                const res = await api.get('/hospitals');
                setHospitals(res.data);
            } else {
                setHospitals(seedRes.data);
            }
        } catch (error) {
            console.error('Failed to fetch hospitals', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredHospitals = hospitals.filter(h =>
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                        Find Trusted Hospitals Near You
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Access detailed information about healthcare facilities, including emergency services, accepting schemes, and costs.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-16 relative" ref={searchRef}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-full leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-shadow hover:shadow-md"
                        placeholder="Search by hospital name or city..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                    />

                    {/* Autocomplete Suggestions */}
                    {showSuggestions && (suggestions.length > 0 || (searchTerm.length >= 2 && !suggestions.length)) && (
                        <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[60] py-2">
                            {suggestions.length > 0 ? (
                                <>
                                    <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">
                                        Top Matches
                                    </div>
                                    {suggestions.map((h) => (
                                        <button
                                            key={h._id}
                                            onClick={() => {
                                                setSearchTerm(h.name);
                                                setShowSuggestions(false);
                                                // setSelectedHospital(h); // Option to open modal directly
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left group"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden relative">
                                                <Image
                                                    src={resolveSrc(h.images?.[0] ?? h.image)}
                                                    alt={h.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-gray-900 text-sm truncate group-hover:text-blue-600 transition-colors">{h.name}</p>
                                                <div className="flex items-center text-[10px] text-gray-400 font-medium uppercase mt-0.5">
                                                    <MapPin className="w-2.5 h-2.5 mr-1" />
                                                    {h.city}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-bold bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md">
                                                <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500" />
                                                {h.rating}
                                            </div>
                                        </button>
                                    ))}
                                </>
                            ) : searchTerm.length >= 2 ? (
                                <div className="px-4 py-6 text-center text-gray-400">
                                    <p className="text-sm font-medium">No hospitals found matching &quot;{searchTerm}&quot;</p>
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-2xl h-96 shadow-sm"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredHospitals.map((hospital, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={hospital._id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
                            >
                                <div
                                    className="h-48 relative cursor-pointer"
                                    onClick={() => setSelectedHospital(hospital)}
                                >
                                    <Image
                                        src={resolveSrc(hospital.images?.[0] ?? hospital.image)}
                                        alt={hospital.name}
                                        fill
                                        className="object-cover"
                                        onError={(e) => {
                                            const t = e.currentTarget as HTMLImageElement;
                                            t.onerror = null;
                                            t.src = fallbackImage;
                                        }}
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-bold text-gray-800 text-sm">{hospital.rating}</span>
                                    </div>
                                    {hospital.isOpen24Hours && (
                                        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> Open 24/7
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{hospital.name}</h3>
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            {hospital.address}, {hospital.city}
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-6 flex-1">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                                <ShieldCheck className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase">Govt. Schemes</p>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {hospital.governmentSchemes.map(s => (
                                                        <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between py-2 border-t border-b border-gray-50">
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">Online Pay:</span>
                                                <span className={`text-sm font-semibold ${hospital.isOnlinePaymentAvailable ? 'text-green-600' : 'text-red-500'}`}>
                                                    {hospital.isOnlinePaymentAvailable ? 'Available' : 'Unavailable'}
                                                </span>
                                            </div>
                                            <div className="text-sm font-bold text-gray-900">
                                                ₹{hospital.consultationFee} <span className="text-xs font-normal text-gray-500">/ Visit</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </motion.div>
                        ))}
                    </div>
                )}

                <AnimatePresence>
                    {selectedHospital && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                            onClick={() => setSelectedHospital(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            >
                                <div className="relative h-64 md:h-80">
                                    <Image
                                        src={resolveSrc(selectedHospital.images?.[0] ?? selectedHospital.image)}
                                        alt={selectedHospital.name}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                    <button
                                        onClick={() => setSelectedHospital(null)}
                                        className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-sm inline-flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            {selectedHospital.rating}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 space-y-6">
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedHospital.name}</h2>
                                        <div className="flex items-center text-gray-500">
                                            <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                                            {selectedHospital.address}, {selectedHospital.city}
                                        </div>
                                    </div>

                                    <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">About the Hospital</h3>
                                        <p>{selectedHospital.description || "No detailed description available."}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl">
                                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                                <CreditCard size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase">Consultation</p>
                                                <p className="font-bold text-gray-900">₹{selectedHospital.consultationFee}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-red-50/50 rounded-xl">
                                            <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                                <Ambulance size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase">Emergency</p>
                                                <p className="font-bold text-gray-900">{selectedHospital.ambulanceContact}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div >
    );
}
