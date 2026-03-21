// Force HMR Rebuild
"use client";
import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import {
    Clock, CheckCircle, XCircle, FileText, Calendar,
    ArrowRight, Eye, X, Bell, RefreshCw, MessageSquare
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Prescription {
    _id: string;
    rx_id?: string;
    imageUrl: string;
    status: 'pending' | 'approved' | 'rejected';
    admin_notes?: string;
    createdAt: string;
    valid_until?: string;
}

export default function MyPrescriptionsPage() {
    const router = useRouter();
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login?redirect=/my-prescriptions');
            return;
        }

        const fetchPrescriptions = async () => {
            try {
                const res = await api.get('/api/prescriptions/my');
                const mappedPrescriptions = res.data.map((p: any) => ({
                    ...p,
                    imageUrl: p.image_url
                        ? `http://localhost:5000/${p.image_url.replace(/\\/g, '/').replace(/^\//, '')}`
                        : '',
                    status: p.admin_status || 'pending',
                }));
                setPrescriptions(mappedPrescriptions);
            } catch (error) {
                console.error('Error fetching prescriptions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrescriptions();
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Prescriptions</h1>
                        <p className="text-gray-500 mt-1">Track the review status of your uploaded prescriptions</p>
                    </div>
                    <Link
                        href="/upload-prescription"
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-200"
                    >
                        <FileText className="w-5 h-5" /> Upload New
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                ) : prescriptions.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                            <FileText className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No prescriptions found</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            You haven&apos;t uploaded any prescriptions yet. Upload one now and our pharmacist will review it and contact you directly.
                        </p>
                        <Link href="/upload-prescription" className="text-blue-600 font-bold hover:underline">
                            Upload your first prescription
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {prescriptions.map((p) => (
                            <div
                                key={p._id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row gap-0">
                                    {/* Thumbnail */}
                                    <div
                                        className="w-full md:w-40 h-44 bg-gray-100 shrink-0 cursor-pointer group relative overflow-hidden"
                                        onClick={() => setSelectedImage(p.imageUrl)}
                                    >
                                        {p.imageUrl && p.imageUrl.endsWith('.pdf') ? (
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-red-50">
                                                <FileText className="w-12 h-12 text-red-400" />
                                                <span className="text-xs font-bold text-red-600">PDF</span>
                                            </div>
                                        ) : p.imageUrl ? (
                                            <>
                                                <img
                                                    src={p.imageUrl}
                                                    alt="Prescription"
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                                    <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <FileText className="w-10 h-10" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-6 flex flex-col justify-between">
                                        <div>
                                            {/* Top row */}
                                            <div className="flex justify-between items-start mb-3 gap-3 flex-wrap">
                                                <div>
                                                    <h3 className="font-black text-gray-900 text-base">
                                                        Prescription #{p._id.slice(-6).toUpperCase()}
                                                    </h3>
                                                    {p.rx_id && (
                                                        <p className="font-mono text-blue-600 text-sm font-bold">{p.rx_id}</p>
                                                    )}
                                                    <div className="flex items-center gap-1.5 text-sm text-gray-400 mt-1">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {new Date(p.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric', month: 'long', day: 'numeric',
                                                            hour: '2-digit', minute: '2-digit'
                                                        })}
                                                    </div>
                                                </div>
                                                <StatusBadge status={p.status} />
                                            </div>

                                            {/* Status-specific info panels */}
                                            {p.status === 'pending' && (
                                                <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 mb-3">
                                                    <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="text-sm font-bold text-amber-800 mb-0.5">Under Review</p>
                                                        <p className="text-xs text-amber-600 leading-relaxed">
                                                            Our pharmacist is reviewing your prescription. Once approved, our team will <strong>contact you directly</strong> to arrange your medicines.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {p.status === 'approved' && (
                                                <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-4 mb-3">
                                                    <Bell className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="text-sm font-bold text-green-800 mb-0.5">Prescription Verified ✓</p>
                                                        <p className="text-xs text-green-700 leading-relaxed">
                                                            Your prescription has been approved by our pharmacist. <strong>Our team will contact you directly</strong> to arrange delivery of your medicines.
                                                        </p>
                                                        {p.valid_until && (
                                                            <p className="text-xs text-green-600 mt-1 font-medium">
                                                                Valid until: {new Date(p.valid_until).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {p.status === 'rejected' && (
                                                <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4 mb-3">
                                                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="text-sm font-bold text-red-800 mb-0.5">Prescription Rejected</p>
                                                        <p className="text-xs text-red-600 leading-relaxed">
                                                            Unfortunately this prescription could not be verified. Please upload a clearer, valid prescription from a certified medical professional.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Admin Notes */}
                                            {p.admin_notes && (
                                                <div className="flex items-start gap-2 bg-gray-50 border border-gray-100 rounded-xl p-3">
                                                    <MessageSquare className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                                                    <div>
                                                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-0.5">Pharmacist Note</span>
                                                        <p className="text-sm text-gray-700">{p.admin_notes}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Bottom action */}
                                        <div className="pt-4 mt-3 border-t border-gray-50 flex justify-end">
                                            {p.status === 'rejected' ? (
                                                <Link
                                                    href="/upload-prescription"
                                                    className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors shadow-sm"
                                                >
                                                    <RefreshCw className="w-4 h-4" /> Re-upload Prescription
                                                </Link>
                                            ) : p.status === 'approved' ? (
                                                <Link
                                                    href="/medicines"
                                                    className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 transition-colors shadow-sm shadow-green-200"
                                                >
                                                    Browse Medicines <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            ) : (
                                                <span className="text-sm text-gray-400 italic flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5" /> Awaiting Pharmacist Review
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Full-screen Image / PDF Viewer Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative max-w-5xl max-h-[95vh] w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 bg-red-600 text-white p-2.5 rounded-full hover:bg-red-700 transition-colors z-10 shadow-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {selectedImage.endsWith('.pdf') ? (
                            <iframe
                                src={selectedImage}
                                className="w-full h-[90vh]"
                                title="Prescription PDF"
                            />
                        ) : (
                            <img
                                src={selectedImage}
                                alt="Prescription Full View"
                                className="w-full h-full object-contain max-h-[90vh]"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === 'approved') {
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                <CheckCircle className="w-3.5 h-3.5" /> Approved
            </span>
        );
    }
    if (status === 'rejected') {
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                <XCircle className="w-3.5 h-3.5" /> Rejected
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Pending Review
        </span>
    );
}
