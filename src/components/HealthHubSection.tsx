"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Calendar, ArrowRight, Activity } from 'lucide-react';

interface HealthTip {
    _id: string;
    title: string;
    description: string;
    date: string;
    imageUrl?: string;
}

export default function HealthHubSection() {
    const [tips, setTips] = useState<HealthTip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTips = async () => {
            try {
                // Fetch all tips (controller sorts by date desc), then take slice
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/health-hub`);
                setTips(response.data.slice(0, 3)); // Take only top 3
            } catch (error) {
                console.error('Error fetching tips:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTips();
    }, []);

    if (!loading && tips.length === 0) return null; // Don't show section if no tips

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Health Hub</h2>
                        <p className="mt-2 text-gray-600">Latest medical news and daily health tips</p>
                    </div>
                    <Link
                        href="/health-hub"
                        className="hidden sm:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    >
                        View All
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-50 rounded-2xl h-80 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tips.map((tip) => (
                            <Link
                                href="/health-hub"
                                key={tip._id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full"
                            >
                                <div className="relative h-48 w-full bg-blue-50 overflow-hidden">
                                    {tip.imageUrl ? (
                                        <img
                                            src={tip.imageUrl}
                                            alt={tip.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-blue-200">
                                            <Activity className="w-12 h-12" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(tip.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {tip.title}
                                    </h3>
                                    <p className="text-gray-600 line-clamp-2 text-sm flex-1">
                                        {tip.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="mt-8 text-center sm:hidden">
                    <Link
                        href="/health-hub"
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    >
                        View All
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
