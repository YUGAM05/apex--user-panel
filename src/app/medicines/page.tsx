"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { addToCart } from "@/lib/cart";
import { Search, ShoppingCart, Star, Filter, X, Share2 } from "lucide-react";
import ShareButton from "@/components/ShareButton";

interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    actualPrice: number;
    sellingPrice: number;
    discount: number;
    stock: number;
    manufacturer: string;
    imageUrl?: string;
    images?: string[];
}

export default function MedicinesPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const categories = ["All", "Tablets & Capsules", "Syrups & Liquids", "Ayurvedic", "Vitamins & Supplements", "Baby Care", "Personal Care", "Medical Devices", "Healthcare Devices", "First Aid"];

    useEffect(() => {
        // Check if there's a category in the URL query params
        const params = new URLSearchParams(window.location.search);
        const categoryParam = params.get("category");
        const searchParam = params.get("search");

        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }

        if (searchParam) {
            setSearchQuery(searchParam);
        }

        // Fetch all approved products
        api.get("/products")
            .then((res) => {
                console.log("Loaded products:", res.data.length);
                res.data.forEach((p: any) => {
                    console.log(`- ${p.name}: Category = "${p.category}"`);
                });
                setProducts(res.data);
                setFilteredProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch products", err);
                setLoading(false);
            });
    }, []);


    // Filter products based on search and category
    useEffect(() => {
        let filtered = products;

        // Filter by category
        if (selectedCategory !== "All") {
            filtered = filtered.filter((p) => {
                // Normalize both values for comparison (trim and handle special chars)
                const productCategory = (p.category || "").trim();
                const filterCategory = selectedCategory.trim();

                // Debug log
                if (productCategory && filterCategory) {
                    console.log(`Comparing: "${productCategory}" === "${filterCategory}"`, productCategory === filterCategory);
                }

                return productCategory === filterCategory;
            });

            console.log(`Filtered ${filtered.length} products for category "${selectedCategory}"`);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.description?.toLowerCase().includes(query) ||
                    p.manufacturer?.toLowerCase().includes(query)
            );
        }

        setFilteredProducts(filtered);
    }, [searchQuery, selectedCategory, products]);

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 pb-20">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Header Skeleton */}
                    <div className="mb-8 animate-pulse">
                        <div className="h-10 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>

                    {/* Search Bar Skeleton */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 animate-pulse">
                        <div className="h-12 bg-gray-200 rounded-xl mb-4"></div>
                        <div className="flex gap-2">
                            <div className="h-10 bg-gray-200 rounded-lg w-20"></div>
                            <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
                            <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
                        </div>
                    </div>

                    {/* Product Grid Skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <div key={n} className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse">
                                <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                                <div className="flex justify-between items-center">
                                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                                    <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Browse Medicines & Products
                    </h1>
                    <p className="text-gray-500">
                        Discover our wide range of approved medicines, wellness products, and medical devices
                    </p>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for medicines, brands, or symptoms..."
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Category Filter */}
                        <div className="overflow-x-auto">
                            <div className="flex gap-2 pb-2 min-w-max">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${selectedCategory === cat
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 text-sm text-gray-500">
                        Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> product(s)
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <div className="flex justify-center mb-4">
                            <Filter className="w-16 h-16 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-500">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

function ProductCard({ product }: { product: Product }) {
    const router = useRouter();
    const imageUrl = product.images?.[0] || product.imageUrl || "";

    return (
        <Link href={`/products/${product._id}`}>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-xl hover:border-blue-100 transition-all group flex flex-col h-full cursor-pointer">
                {/* Discount Badge and Share Button */}
                <div className="flex justify-between items-start mb-2">
                    {product.discount > 0 ? (
                        <span className="px-2 py-1 bg-red-500 text-white text-[10px] font-bold uppercase rounded-md shadow-sm">
                            -{product.discount}% OFF
                        </span>
                    ) : (
                        <div></div>
                    )}
                    <ShareButton
                        title={product.name}
                        text={`Check out ${product.name} on Apex Care!`}
                        url={`/products/${product._id}`}
                    />
                </div>

                {/* Product Image */}
                <div className="relative aspect-square bg-gray-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={product.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerHTML = '<div class="text-gray-300 text-6xl">📦</div>';
                            }}
                        />
                    ) : (
                        <div className="text-gray-300 text-6xl">📦</div>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        {product.category}
                    </span>
                    <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">By {product.manufacturer}</p>

                    {/* Stock Status */}
                    <div className="mb-3">
                        {product.stock > 0 ? (
                            <span className="text-xs text-green-600 font-medium">In Stock</span>
                        ) : (
                            <span className="text-xs text-red-600 font-bold">Out of Stock</span>
                        )}
                    </div>

                    {/* Price and Action */}
                    <div className="mt-auto space-y-3">
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-gray-900">₹{product.sellingPrice}</span>
                            {product.actualPrice > product.sellingPrice && (
                                <span className="text-xs text-gray-400 line-through">
                                    ₹{product.actualPrice}
                                </span>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    addToCart({
                                        productId: product._id,
                                        name: product.name,
                                        price: product.sellingPrice,
                                        originalPrice: product.actualPrice,
                                        image: product.images?.[0] || product.imageUrl || '',
                                        category: product.category,
                                        stock: product.stock,
                                    });
                                }}
                                className="flex-1 p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                            >
                                <ShoppingCart className="w-4 h-4" /> Add
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    addToCart({
                                        productId: product._id,
                                        name: product.name,
                                        price: product.sellingPrice,
                                        originalPrice: product.actualPrice,
                                        image: product.images?.[0] || product.imageUrl || '',
                                        category: product.category,
                                        stock: product.stock,
                                    });
                                    router.push('/checkout');
                                }}
                                className="flex-1 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
