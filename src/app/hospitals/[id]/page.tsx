"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Phone, Clock, CreditCard, Ambulance, ShieldCheck, Star, ChevronLeft, ChevronRight, User, CheckCircle, XCircle, Building, ArrowLeft } from 'lucide-react';
import api from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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

            {images.length > 1 && (
                <>
                    <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 backdrop-blur-sm transition-colors z-10">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 backdrop-blur-sm transition-colors z-10">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                                className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-white w-4' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function DetailRow({ icon, label, value, valueClass = 'font-semibold text-gray-900' }: { icon: React.ReactNode; label: string; value: React.ReactNode; valueClass?: string }) {
    return (
        <div className="flex items-start gap-4 p-4 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md transition-shadow">
            <div className="p-3 bg-blue-50 rounded-xl shadow-sm text-blue-600 shrink-0">{icon}</div>
            <div>
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                <div className={`mt-1 text-base ${valueClass}`}>{value}</div>
            </div>
        </div>
    );
}

export default function HospitalDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [hospital, setHospital] = useState<Hospital | null>(null);
    const [loading, setLoading] = useState(true);

    const fallbackImage = '/premium-hospital.png';
    const resolveSrc = (s?: string) => {
        if (!s) return fallbackImage;
        if (s.startsWith('/uploads/')) return `http://localhost:5000${s}`;
        if (s.startsWith('http://') || s.startsWith('https://') || s.startsWith('data:')) return s;
        return fallbackImage;
    };

    const getImages = (h: Hospital): string[] => {
        if (h.images && h.images.length > 0) return h.images.map(resolveSrc);
        if (h.image) return [resolveSrc(h.image)];
        return [fallbackImage];
    };

    const phoneList = (h: Hospital) =>
        (h.phoneNumbers && h.phoneNumbers.length > 0 ? h.phoneNumbers : h.contactNumber ? [h.contactNumber] : []).filter(Boolean);

    useEffect(() => {
        const fetchHospital = async () => {
            try {
                const res = await api.get(`/hospitals/${params.id}`);
                setHospital(res.data);
            } catch (err) {
                console.error('Failed to fetch hospital', err);
            } finally {
                setLoading(false);
            }
        };
        if (params.id) {
            fetchHospital();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!hospital) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Hospital not found</h2>
                <button onClick={() => router.push('/hospitals')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Go Back</button>
            </div>
        );
    }

    const imgs = getImages(hospital);
    const phones = phoneList(hospital);

    const processedDesc = hospital.description
        ? hospital.description
            .replace(/<strong>/gi, '<b>')
            .replace(/<\/strong>/gi, '</b>')
            .replace(/<\/b>(\s*:)/gi, '</b>$1<br/>')
            .replace(/([^>])\s*<b>/gi, '$1<br/><b>')
        : '';

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header / Slideshow */}
            <div className="relative h-80 md:h-[500px] w-full bg-black">
                <ImageSlideshow images={imgs} alt={hospital.name} className="h-full w-full opacity-90" />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

                {/* Back Button */}
                <button
                    onClick={() => router.push('/hospitals')}
                    className="absolute top-6 left-6 md:top-8 md:left-8 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg z-20"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium hidden sm:block">Back to Hospitals</span>
                </button>

                {/* Badges */}
                <div className="absolute top-6 right-6 md:top-8 md:right-8 flex flex-col items-end gap-3 z-20">
                    <span className="bg-white/95 backdrop-blur-md text-gray-900 px-4 py-2 rounded-2xl text-base font-bold shadow-lg flex items-center gap-1.5">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />{hospital.rating} Rating
                    </span>
                    {hospital.isOpen24Hours && (
                        <span className="bg-green-500/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-1.5 shadow-lg">
                            <Clock className="w-5 h-5" /> Open 24/7
                        </span>
                    )}
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 shadow-sm leading-tight">{hospital.name}</h1>
                        <div className="flex items-center gap-2 text-gray-200 text-sm md:text-base font-medium">
                            <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                            {hospital.address}, {hospital.city}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column (Details) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <DetailRow icon={<CreditCard size={24} />} label="Consultation Fee" value={`₹${hospital.consultationFee}`} />
                            <DetailRow icon={<Ambulance size={24} />} label="Ambulance Contact" value={hospital.ambulanceContact} valueClass="font-semibold text-red-600" />
                            <DetailRow
                                icon={<Clock size={24} />} label="Open 24/7"
                                value={hospital.isOpen24Hours
                                    ? <span className="flex items-center gap-1.5 text-green-600"><CheckCircle className="w-5 h-5" /> Yes</span>
                                    : <span className="flex items-center gap-1.5 text-red-500"><XCircle className="w-5 h-5" /> No</span>}
                            />
                            <DetailRow
                                icon={<CreditCard size={24} />} label="Online Payment"
                                value={hospital.isOnlinePaymentAvailable
                                    ? <span className="flex items-center gap-1.5 text-green-600"><CheckCircle className="w-5 h-5" /> Available</span>
                                    : <span className="flex items-center gap-1.5 text-red-500"><XCircle className="w-5 h-5" /> Not Available</span>}
                            />
                        </div>

                        {/* Description */}
                        {processedDesc && (
                            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Building className="w-5 h-5" /></span>
                                    About the Hospital
                                </h3>
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: processedDesc }}
                                        className="
                                            hospital-desc text-gray-700 text-[15px] leading-relaxed
                                            [&_p]:mb-3 [&_p:last-child]:mb-0
                                            [&_b]:font-semibold [&_b]:text-blue-800
                                            [&_i]:italic [&_u]:underline
                                            [&_br]:block [&_br]:mb-2
                                            [&_h1]:text-lg [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mb-3 [&_h1]:mt-4
                                            [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mb-2 [&_h2]:mt-3
                                            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ul]:space-y-1.5
                                            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3 [&_ol]:space-y-1.5
                                            [&_li]:text-gray-600
                                        "
                                    />
                                </div>
                            </div>
                        )}

                        {/* Doctors List */}
                        {hospital.doctors && hospital.doctors.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><User className="w-5 h-5" /></span>
                                        Available Doctors
                                    </h3>
                                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                                        {hospital.doctors.length} Doctor{hospital.doctors.length > 1 ? 's' : ''}
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    {hospital.doctors.map((doc, i) => (
                                        <div key={i} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 md:p-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                                {/* Doctor Name */}
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                                                        <User className="w-5 h-5 text-indigo-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Doctor</p>
                                                        <p className="font-bold text-gray-900 text-base">{doc.name}</p>
                                                    </div>
                                                </div>
                                                {/* Specialization */}
                                                {doc.specialization && (
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                                            <span className="text-purple-600 font-bold text-sm">Rx</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Spec.</p>
                                                            <span className="text-sm font-bold bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full inline-block">{doc.specialization}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {/* Timing */}
                                                {doc.timing && (
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                                            <Clock className="w-5 h-5 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Timing</p>
                                                            <p className="text-sm font-semibold text-gray-800">{doc.timing}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {/* Days */}
                                                {doc.daysAvailable && doc.daysAvailable.length > 0 && (
                                                    <div className="flex items-start gap-3 sm:col-span-2 lg:col-span-1">
                                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Days Available</p>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {doc.daysAvailable.map(d => (
                                                                    <span key={d} className="bg-green-100 text-green-800 border border-green-200 px-2 py-1 rounded-md text-xs font-bold">{d}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Phone className="w-5 h-5" /></span>
                                Contact Details
                            </h3>
                            
                            {phones.length > 0 ? (
                                <div className="space-y-4">
                                    {phones.map((ph, i) => (
                                        <a href={`tel:${ph}`} key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-colors group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                                    <Phone className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
                                                </div>
                                                <span className="font-semibold text-gray-800 group-hover:text-blue-700">{ph}</span>
                                            </div>
                                            {i === 0 && <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-full uppercase tracking-wider">Primary</span>}
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">No contact numbers available.</p>
                            )}

                            {/* Schemes Card */}
                            {hospital.governmentSchemes?.length > 0 && (
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                                        <ShieldCheck className="w-4 h-4" /> Accepted Schemes
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        {hospital.governmentSchemes.map((s, i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 text-blue-800 rounded-lg border border-blue-100">
                                                <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
                                                <span className="text-sm font-semibold">{s}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
