"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { addToCart } from "@/lib/cart";
import HealthHubSection from "@/components/HealthHubSection";
import { ArrowRight, CheckCircle, ShieldCheck, Truck, Clock, Upload, ChevronLeft, ChevronRight, FileHeart, Apple, Baby, Smile, Activity, Flower } from "lucide-react";
import ShareButton from "@/components/ShareButton";

// Interfaces
interface Product {
    _id: string;
    name: string;
    sellingPrice: number;
    actualPrice: number;
    discount: number;
    category: string;
    images?: string[];
    imageUrl?: string;
    stock?: number;
}

interface FeatureItemProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

interface CategoryCardProps {
    title: string;
    icon: React.ReactNode;
    color?: string;
    category?: string;
}

interface DealCardProps {
    tag?: string | null;
    title: string;
    price: number;
    oldPrice?: number | null;
    cat: string;
    img?: string;
    productId: string;
    stock?: number;
}

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [dealProducts, setDealProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Fetch featured products
        api.get('/products')
            .then(res => {
                setFeaturedProducts(res.data.slice(0, 4));
            })
            .catch(err => console.error("Failed to fetch products", err));

        // Fetch deal products
        api.get('/products/deals')
            .then(res => {
                setDealProducts(res.data);
            })
            .catch(err => console.error("Failed to fetch deals", err));
    }, []);

    return (
        <main className="bg-gradient-to-b from-blue-50/30 to-white min-h-screen pb-20">
            {/* 1. New Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 xl:px-8 mt-6">
                <div className="relative overflow-hidden rounded-[3rem] bg-blue-600 shadow-2xl border border-blue-500/20">
                    <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-400/20 blur-3xl" />

                    <div className="relative z-10 px-8 py-16 md:py-20 lg:px-16">
                        <div className="max-w-4xl">
                            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-black tracking-widest text-blue-600 uppercase bg-white rounded-full shadow-sm">
                                Flash Sale
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                                Your Health,<br />
                                <span className="opacity-90">Delivered Daily.</span>
                            </h1>
                            <p className="text-xl md:text-2xl font-medium text-blue-50/90 max-w-2xl leading-relaxed mb-8">
                                Search over certified medicines and health products. <br className="hidden md:block" />
                                Get Generic Medicine On Our Platform <span className="text-white font-bold">Apex Care.</span>
                            </p>


                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Trust Strip */}
            <section className="max-w-7xl mx-auto px-6 py-12 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <FeatureItem icon={<CheckCircle className="w-6 h-6 text-green-500" />} title="100% Genuine" desc="Products" />
                    <FeatureItem icon={<Truck className="w-6 h-6 text-blue-500" />} title="Fast Delivery" desc="Within 24 Hours" />
                    <FeatureItem icon={<ShieldCheck className="w-6 h-6 text-purple-500" />} title="Secure Payment" desc="100% Safe" />
                    <FeatureItem icon={<Clock className="w-6 h-6 text-orange-500" />} title="24/7 Support" desc="Expert Help" />
                </div>
            </section>

            {/* 3. Categories */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
                    <Link href="/medicines" className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <CategoryCard title="Tablets & Capsules" category="Tablets & Capsules" icon={<FileHeart className="w-8 h-8 text-blue-600" />} color="bg-blue-50" />
                    <CategoryCard title="Syrups & Liquids" category="Syrups & Liquids" icon={<Activity className="w-8 h-8 text-purple-600" />} color="bg-purple-50" />
                    <CategoryCard title="Ayurvedic" category="Ayurvedic" icon={<Flower className="w-8 h-8 text-emerald-600" />} color="bg-emerald-50" />
                    <CategoryCard title="Vitamins & Supplements" category="Vitamins & Supplements" icon={<Apple className="w-8 h-8 text-green-600" />} color="bg-green-50" />
                    <CategoryCard title="Baby Care" category="Baby Care" icon={<Baby className="w-8 h-8 text-pink-600" />} color="bg-pink-50" />
                    <CategoryCard title="Personal Care" category="Personal Care" icon={<Smile className="w-8 h-8 text-purple-600" />} color="bg-purple-50" />
                    <CategoryCard title="Medical Devices" category="Medical Devices" icon={<Activity className="w-8 h-8 text-orange-600" />} color="bg-orange-50" />
                    <CategoryCard title="Healthcare Devices" category="Healthcare Devices" icon={<Activity className="w-8 h-8 text-red-600" />} color="bg-red-50" />
                    <CategoryCard title="First Aid" category="First Aid" icon={<ShieldCheck className="w-8 h-8 text-red-600" />} color="bg-red-50" />
                </div>
            </section>

            {/* 4. Featured Products */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
                        <p className="text-gray-500 text-sm mt-1">Our most popular and highly-rated medical supplies</p>
                    </div>
                    <Link href="/medicines" className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.length > 0 ? (
                        featuredProducts.map((product) => (
                            <DealCard
                                key={product._id}
                                tag={product.discount > 0 ? `${product.discount}%` : null}
                                title={product.name}
                                price={product.sellingPrice}
                                oldPrice={product.discount > 0 ? product.actualPrice : null}
                                cat={product.category}
                                img={product.images?.[0] || product.imageUrl}
                                productId={product._id}
                                stock={product.stock}
                            />
                        ))
                    ) : (
                        <div className="col-span-4 text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                            <p className="text-gray-500">Loading featured products...</p>
                        </div>
                    )}
                </div>
            </section>

            {/* 5. Deals of the Day */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl font-bold text-gray-900">Deals of the Day</h2>
                        <div className="flex gap-2">
                            <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100"><ChevronLeft className="w-4 h-4" /></button>
                            <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {dealProducts.length > 0 ? (
                            dealProducts.map((product) => (
                                <DealCard
                                    key={product._id}
                                    tag={product.discount > 0 ? `${product.discount}%` : null}
                                    title={product.name}
                                    price={product.sellingPrice}
                                    oldPrice={product.discount > 0 ? product.actualPrice : null}
                                    cat={product.category}
                                    img={product.images?.[0] || product.imageUrl}
                                    productId={product._id}
                                    stock={product.stock}
                                />
                            ))
                        ) : (
                            // Fallback: No deals message
                            <div className="col-span-4 text-center py-12">
                                <p className="text-gray-500 text-lg">No deals available right now. Check back soon!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 5. Prescription Banner */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="bg-blue-500 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
                    {/* Content */}
                    <div className="relative z-10 max-w-lg">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Upload Prescription
                        </h2>
                        <p className="text-blue-100 text-lg mb-8">
                            Upload your prescription and we will deliver your medicines.
                        </p>
                        <Link href="/upload-prescription" className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors inline-flex items-center gap-2 shadow-sm">
                            <Upload className="w-5 h-5" /> Upload Now
                        </Link>
                    </div>

                    {/* Image/Illustration Side */}
                    <div className="relative z-10 mt-8 md:mt-0 flex items-center justify-center">
                        {/* Abstract prescription visual */}
                        <div className="w-64 h-48 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 transform rotate-3 flex flex-col gap-2">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white mb-2">
                                <FileHeart className="w-6 h-6" />
                            </div>
                            <div className="h-2 w-24 bg-white/40 rounded-full" />
                            <div className="h-2 w-32 bg-white/40 rounded-full" />
                            <div className="h-2 w-20 bg-white/40 rounded-full" />

                            <div className="mt-auto flex justify-end">
                                <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-white">
                                    <CheckCircle className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Background Circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                </div>
            </section>

            {/* 6. Health Hub */}
            <HealthHubSection />
        </main>
    );
}

// Components

function FeatureItem({ icon, title, desc }: FeatureItemProps) {
    return (
        <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
                <p className="text-xs text-gray-500">{desc}</p>
            </div>
        </div>
    )
}

function CategoryCard({ title, icon, color, category }: CategoryCardProps) {
    // If category is provided, link to medicines page with category filter
    const href = category ? `/medicines?category=${category}` : "/medicines";

    return (
        <Link href={href} className="flex flex-col items-center gap-3 group cursor-pointer">
            <div className={`w-20 h-20 md:w-24 md:h-24 ${color || 'bg-gray-50'} rounded-2xl flex items-center justify-center p-5 group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300`}>
                {icon}
            </div>
            <span className="font-bold text-gray-700 text-sm group-hover:text-blue-600">{title}</span>
        </Link>
    )
}

function DealCard({ tag, title, price, oldPrice, cat, img, productId, stock }: DealCardProps) {
    const router = useRouter(); // Initialize router

    return (
        <Link href={`/products/${productId}`}>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-xl hover:border-blue-100 transition-all group flex flex-col h-full cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                    {tag ? (
                        <span className="px-2 py-1 bg-red-500 text-white text-[10px] font-bold uppercase rounded-md shadow-sm">
                            -{tag}
                        </span>
                    ) : (
                        <div></div>
                    )}
                    <ShareButton
                        title={title}
                        text={`Check out ${title} on Apex Care!`}
                        url={`/products/${productId}`}
                    />
                </div>
                <div className="relative aspect-square bg-[#F8F5F2] rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                    {img ? (
                        <Image
                            src={img}
                            alt={title}
                            fill
                            className="object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform"
                            unoptimized
                        />
                    ) : (
                        <div className="text-gray-300 text-6xl">📦</div>
                    )}
                </div>

                <div className="flex-1 flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{cat}</span>
                    <h3 className="font-bold text-gray-900 text-sm leading-snug mb-3 line-clamp-2">{title}</h3>

                    <div className="mt-auto space-y-3">
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-gray-900">₹{price}</span>
                            {oldPrice && <span className="text-xs text-gray-400 line-through">₹{oldPrice}</span>}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    addToCart({
                                        productId,
                                        name: title,
                                        price,
                                        originalPrice: oldPrice || 0, // Ensure strictly number
                                        image: img || "",
                                        category: cat,
                                        stock: stock || 10
                                    });
                                }}
                                className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    addToCart({
                                        productId,
                                        name: title,
                                        price,
                                        originalPrice: oldPrice || 0,
                                        image: img || "",
                                        category: cat,
                                        stock: stock || 10
                                    });
                                    router.push('/checkout');
                                }}
                                className="flex-1 px-3 py-2 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}


