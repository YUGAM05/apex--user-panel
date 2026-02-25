"use client";
import React, { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, ShieldCheck, Clock, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function UploadPrescriptionPage() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [notes, setNotes] = useState('');
    const [base64Image, setBase64Image] = useState<string | null>(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            // Encode the redirect URL properly
            router.push('/login?redirect=' + encodeURIComponent('/upload-prescription'));
        }
    }, [router]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = (file: File) => {
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64Image(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!base64Image) return;

        setUploading(true);
        try {
            console.log('Uploading prescription...');
            const response = await api.post('/prescriptions', {
                imageUrl: base64Image,
                notes: notes
            });
            console.log('Upload response:', response.data);
            setSuccess(true);
        } catch (error: any) {
            console.error('Upload failed:', error);
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);

            const errorMessage = error.response?.data?.message || error.message || 'Failed to upload prescription. Please try again.';
            alert(errorMessage);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8">
            <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                {/* Left Side - Info Panel */}
                <div className="md:w-5/12 bg-blue-600 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-6">How it works</h2>
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                                    <Upload className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">1. Upload Prescription</h3>
                                    <p className="text-blue-100 text-sm">Upload a clear photo of your doctor&apos;s prescription.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">2. Verification</h3>
                                    <p className="text-blue-100 text-sm">Our pharmacists verify the validity of your prescription.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                                    <Truck className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">3. Delivery</h3>
                                    <p className="text-blue-100 text-sm">We pack and deliver your medicines to your doorstep.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-12 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                        <div className="flex items-center gap-3 mb-2">
                            <Clock className="w-5 h-5" />
                            <span className="font-bold">Fast Processing</span>
                        </div>
                        <p className="text-xs text-blue-100">
                            Most prescriptions are verified within 15 minutes during business hours.
                        </p>
                    </div>

                    {/* Decor circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                </div>

                {/* Right Side - Form */}
                <div className="md:w-7/12 p-8 md:p-12 bg-white relative">
                    {!success ? (
                        <div className="h-full flex flex-col">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Prescription</h1>
                            <p className="text-gray-500 mb-8">Please ensure the patient name and doctor details are visible.</p>

                            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                                <div
                                    className={`flex-1 border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[250px] ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => document.getElementById('file-upload')?.click()}
                                >
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*,.pdf"
                                        onChange={handleFileChange}
                                    />

                                    {file ? (
                                        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                                                <FileText className="w-8 h-8" />
                                            </div>
                                            <p className="font-bold text-gray-900 text-lg mb-1">{file.name}</p>
                                            <p className="text-sm text-gray-500 mb-4">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setFile(null);
                                                    setBase64Image(null);
                                                }}
                                                className="text-sm text-red-500 hover:text-red-700 font-bold bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                                            >
                                                Change File
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <Upload className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold text-gray-900">Click to upload</p>
                                                <p className="text-sm text-gray-400 mt-1">or drag and drop here</p>
                                            </div>
                                            <p className="text-xs text-gray-400 pt-4">Supported formats: JPG, PNG, PDF</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Add a Note (Optional)</label>
                                    <textarea
                                        rows={2}
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-3 text-sm"
                                        placeholder="E.g. I need only 10 tablets of Paracetamol..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!file || uploading}
                                    className={`mt-6 w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg ${!file || uploading ? 'bg-gray-300 cursor-not-allowed shadow-none' : 'bg-gray-900 hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]'
                                        }`}
                                >
                                    {uploading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </div>
                                    ) : (
                                        <>Submit Application <ShieldCheck className="w-5 h-5" /></>
                                    )}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="w-28 h-28 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-green-200 shadow-xl"
                            >
                                <CheckCircle className="w-14 h-14" />
                            </motion.div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Received!</h2>
                            <p className="text-gray-500 mb-8 max-w-sm text-lg">
                                Your prescription has been securely uploaded. We will notify you once the pharmacist reviews it.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="bg-gray-100 text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Back Home
                                </button>
                                <button
                                    onClick={() => window.location.href = '/my-prescriptions'}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                                >
                                    Track Status
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
