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

                {tips.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-lg">No health updates available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                            Read Full Article
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
