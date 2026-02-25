"use client";
import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Clock, CheckCircle, XCircle, FileText, Calendar, ArrowRight, Eye, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Prescription {
    _id: string;
    imageUrl: string;
    status: 'pending' | 'verified' | 'rejected';
    notes?: string;
    createdAt: string;
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
                const res = await api.get('/prescriptions/my');
                setPrescriptions(res.data);
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
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Prescriptions</h1>
                        <p className="text-gray-500 mt-1">Track the status of your uploaded prescriptions</p>
                    </div>
                    <Link href="/upload-prescription" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-200">
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
                            You haven&apos;t uploaded any prescriptions yet. Upload one now to get your medicines delivered.
                        </p>
                        <Link href="/upload-prescription" className="text-blue-600 font-bold hover:underline">
                            Upload your first prescription
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {prescriptions.map((p) => (
                            <div key={p._id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6">
                                {/* Thumbnail - PDF or Image */}
                                <div
                                    className="w-full md:w-40 h-40 bg-gray-100 rounded-xl overflow-hidden shrink-0 cursor-pointer group relative"
                                    onClick={() => setSelectedImage(p.imageUrl)}
                                >
                                    {p.imageUrl.includes('application/pdf') || p.imageUrl.endsWith('.pdf') ? (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                            <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-xs font-bold text-gray-700">PDF</span>
                                        </div>
                                    ) : (
                                        <>
                                            <img src={p.imageUrl} alt="Prescription" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(p.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric', month: 'long', day: 'numeric',
                                                    hour: '2-digit', minute: '2-digit'
                                                })}
                                            </div>
                                            <StatusBadge status={p.status} />
                                        </div>

                                        <div className="mb-4">
                                            <h3 className="font-bold text-gray-900 mb-1">Prescription #{p._id.slice(-6)}</h3>
                                            {p.notes ? (
                                                <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                    <span className="font-semibold text-xs uppercase text-gray-400 block mb-1">Your Note</span>
                                                    {p.notes}
                                                </p>
                                            ) : (
                                                <p className="text-gray-400 italic text-sm">No notes added</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions based on status */}
                                    <div className="pt-4 border-t border-gray-50 flex justify-end">
                                        {p.status === 'verified' ? (
                                            <Link href="/medicines" className="bg-green-600 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm shadow-green-200">
                                                Buy Medicines <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        ) : p.status === 'rejected' ? (
                                            <Link href="/upload-prescription" className="text-red-500 font-bold text-sm hover:underline flex items-center gap-1">
                                                Re-upload Prescription
                                            </Link>
                                        ) : (
                                            <span className="text-sm text-gray-400 italic flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> Awaiting Pharmacist Review
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* File Viewer Modal - Supports both images and PDFs */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
                    <div className="relative max-w-6xl max-h-[95vh] w-full bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors z-10 shadow-lg"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Check if it's a PDF or image */}
                        {selectedImage.includes('application/pdf') || selectedImage.endsWith('.pdf') ? (
                            <div className="w-full h-[90vh]">
                                <iframe
                                    src={selectedImage}
                                    className="w-full h-full"
                                    title="Prescription PDF"
                                />
                            </div>
                        ) : (
                            <img src={selectedImage} alt="Prescription Full View" className="w-full h-full object-contain max-h-[90vh]" />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === 'verified') {
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                <CheckCircle className="w-3.5 h-3.5" /> Verified
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
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">
            <Clock className="w-3.5 h-3.5" /> Pending Review
        </span>
    );
}
