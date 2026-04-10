"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Loader2 } from 'lucide-react';

interface HealthTip {
    _id: string;
    title: string;
    description: string;
    date: string;
    imageUrl?: string;
}

export default function HealthHubPage() {
    const [tips, setTips] = useState<HealthTip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/health-hub`);
                setTips(response.data);
            } catch (error) {
                console.error('Error fetching tips:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTips();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Health Hub</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay informed with the latest medical news, health tips, and wellness advice from our experts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Featured Static Health Tips */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full cursor-pointer hover:border-blue-200">
                        <div className="relative h-48 w-full bg-gray-100">
                            <img src="/tip1.png" alt="Hydration is Key" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-3">
                                <Calendar className="w-4 h-4" /> Today
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">Hydration is Key</h3>
                            <p className="text-gray-600 line-clamp-3 mb-4 flex-1">
                                Starting your day with a glass of warm water helps kickstart your metabolism and flushes out toxins from your body.
                            </p>
                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                                Read Full Article &rarr;
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full cursor-pointer hover:border-blue-200">
                        <div className="relative h-48 w-full bg-gray-100">
                            <img src="/tip2.png" alt="Eat the Rainbow" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium mb-3">
                                <Calendar className="w-4 h-4" /> Yesterday
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">Eat the Rainbow</h3>
                            <p className="text-gray-600 line-clamp-3 mb-4 flex-1">
                                Incorporate a variety of colorful fruits and vegetables into your meals to ensure you get a wide spectrum of essential vitamins.
                            </p>
                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-emerald-600 font-semibold group-hover:text-emerald-700">
                                Read Full Article &rarr;
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Tips from DB */}
                    {tips.map((tip) => (
                        <Link href={`/health-hub/${tip._id}`} key={tip._id} className="block h-full">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full cursor-pointer hover:border-blue-200">
                                {tip.imageUrl && (
                                    <div className="relative h-48 w-full bg-gray-100">
                                        <img
                                            src={tip.imageUrl}
                                            alt={tip.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-3">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(tip.date).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {tip.title}
                                    </h3>
                                    <p className="text-gray-600 line-clamp-3 mb-4 flex-1">
                                        {tip.description}
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                                        Read Full Article &rarr;
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
