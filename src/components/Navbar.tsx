"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Search, ShoppingCart, LogOut, Menu, X, Phone, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { getCartCount } from "@/lib/cart";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [user, setUser] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const searchRef = useRef<HTMLDivElement>(null);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/medicines?search=${encodeURIComponent(searchQuery.trim())}`);
            setShowSuggestions(false);
            setIsOpen(false);
        }
    };

    // Autocomplete Logic
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchQuery.trim().length < 2) {
                setSuggestions([]);
                return;
            }
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products/search?q=${searchQuery}`);
                const data = await res.json();
                setSuggestions(data);
            } catch (err) {
                console.error("Autocomplete error:", err);
            }
        };

        const timer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Close suggestions on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setMounted(true);
        const checkAuth = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) setUser(JSON.parse(storedUser));
            else setUser(null);
        };

        const updateCart = () => {
            setCartCount(getCartCount());
        };

        checkAuth();
        updateCart();

        const updateWidth = () => setWindowWidth(window.innerWidth);
        updateWidth();

        window.addEventListener('storage', checkAuth);
        window.addEventListener('cart:updated', updateCart);
        window.addEventListener('resize', updateWidth);

        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('cart:updated', updateCart);
            window.removeEventListener('resize', updateWidth);
        };
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        router.push("/login");
        setIsOpen(false);
    };

    if (pathname === '/login' || pathname === '/register') return null;

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/medicines", label: "Medicines" },
        { href: "/lab-tests", label: "Lab Tests", hideOnLowRes: true },
        { href: "/health-hub", label: "Health Hub", hideOnLowRes: true },
        { href: "/safety-checker", label: "AI Safety", isSpecial: true },
        { href: "/blood-bank", label: "Blood Bank", isSpecial: true, hideOnLowRes: true },
        { href: "/hospitals", label: "Hospitals", hideOnLowRes: true },
    ];

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-4 xl:px-8">
                <div className="flex items-center justify-between h-20 gap-2 lg:gap-1 xl:gap-8">

                    {/* 1. Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                        <Image
                            src="/apex-care-logo.png"
                            alt="Apex Care"
                            width={44}
                            height={44}
                            className="w-9 h-9 xl:w-11 xl:h-11 object-contain"
                            unoptimized
                        />
                        <span className="font-bold text-lg xl:text-2xl text-gray-900 tracking-tight hidden min-[1150px]:block">Apex Care</span>
                    </Link>

                    {/* 2. Search Bar (Centered - Visible on LG+) */}
                    <div className="hidden lg:flex flex-1 max-w-[400px] min-w-[200px] relative group" ref={searchRef}>
                        <div className="w-full relative">
                            <button
                                onClick={handleSearch}
                                className="absolute inset-y-0 left-0 pl-4 flex items-center cursor-pointer hover:text-blue-600 transition-colors z-10"
                            >
                                <Search className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            </button>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                onFocus={() => setShowSuggestions(true)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="block w-full pl-12 pr-6 py-3 border border-gray-200 rounded-full leading-5 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium shadow-sm hover:bg-white hover:border-gray-300"
                                placeholder={windowWidth < 1200 ? "Search..." : "Search medicines..."}
                            />

                            {/* Autocomplete Suggestions */}
                            {showSuggestions && (suggestions.length > 0 || (searchQuery.length >= 2 && !suggestions.length)) && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[60] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {suggestions.length > 0 ? (
                                        <>
                                            <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">
                                                Suggestions
                                            </div>
                                            {suggestions.map((item) => (
                                                <button
                                                    key={item._id}
                                                    onClick={() => {
                                                        router.push(`/products/${item._id}`);
                                                        setShowSuggestions(false);
                                                        setSearchQuery("");
                                                    }}
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors text-left group"
                                                >
                                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
                                                        {item.imageUrl || item.images?.[0] ? (
                                                            <img src={item.imageUrl || item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="text-gray-300 text-xs">📦</span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-bold text-gray-900 text-sm truncate group-hover:text-blue-600 transition-colors">{item.name}</p>
                                                        <p className="text-[10px] text-gray-400 font-medium uppercase">{item.category}</p>
                                                    </div>
                                                    <div className="text-blue-600 font-bold text-xs ring-1 ring-blue-100 px-2 py-1 rounded-md bg-blue-50">
                                                        ₹{item.sellingPrice}
                                                    </div>
                                                </button>
                                            ))}
                                        </>
                                    ) : searchQuery.length >= 2 ? (
                                        <div className="px-4 py-6 text-center text-gray-400">
                                            <p className="text-sm font-medium">No products found for &quot;{searchQuery}&quot;</p>
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 3. Right Actions (Desktop) */}
                    <div className="hidden lg:flex items-center lg:gap-2 xl:gap-8">
                        <div className="flex items-center lg:gap-2 xl:gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-[13px] xl:text-sm font-semibold transition-colors flex items-center gap-1 whitespace-nowrap ${link.hideOnLowRes ? 'hidden min-[1250px]:flex' : 'flex'
                                        } ${pathname === link.href ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                                        }`}
                                >
                                    {link.isSpecial && pathname === link.href && (
                                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                                    )}
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 xl:gap-4 border-l border-gray-200 pl-2 xl:pl-6 flex-shrink-0">
                            {/* Cart */}
                            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors group">
                                <ShoppingCart className="w-6 h-6" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm ring-2 ring-white">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* User Profile / Login */}
                            {user ? (
                                <div className="relative group/user">
                                    <button className="flex items-center gap-3 pl-2 outline-none">
                                        <div className="w-9 h-9 flex-shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-blue-100 transition-all group-hover/user:ring-blue-200">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all duration-200 transform translate-y-2 group-hover/user:translate-y-0 z-50">
                                        <div className="w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-2">
                                            <div className="px-4 py-3 border-b border-gray-50 mb-2">
                                                <p className="font-bold text-gray-900 truncate">{user.name}</p>
                                                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                            </div>

                                            <Link href="/my-orders" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="6" y="2" width="12" height="20" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="22"></line><line x1="8" y1="2" x2="8" y2="22"></line><line x1="6" y1="12" x2="18" y2="12"></line></svg>
                                                My Orders
                                            </Link>
                                            <Link href="/my-prescriptions" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></svg>
                                                My Prescriptions
                                            </Link>
                                            <Link href="/my-blood-requests" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                                                My Blood Requests
                                            </Link>
                                            <Link href="/my-donor-profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                                Donor Profile
                                            </Link>

                                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-gray-600 hover:text-red-500 transition-colors text-sm font-medium mt-1">
                                                <LogOut className="w-4 h-4" />
                                                Log Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link href="/login" className="flex items-center gap-1.5 xl:gap-2 px-3 xl:px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-sm hover:shadow-md active:scale-95 flex-shrink-0 whitespace-nowrap">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 xl:w-5 xl:h-5 flex-shrink-0">
                                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-semibold text-[13px] xl:text-sm">Login / Sign Up</span>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center gap-4">
                        <Link href="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm ring-2 ring-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 p-2">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg lg:hidden max-h-[calc(100vh-80px)] overflow-y-auto">
                    <div className="p-4 space-y-4">
                        {/* Mobile Search */}
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                onFocus={() => setShowSuggestions(true)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="block w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                placeholder="Search products..."
                            />
                            <button onClick={handleSearch} className="absolute right-0 top-0 h-full px-3 text-gray-400">
                                <Search className="w-5 h-5" />
                            </button>

                            {/* Mobile Autocomplete Suggestions */}
                            {showSuggestions && (suggestions.length > 0 || (searchQuery.length >= 2 && !suggestions.length)) && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[60] py-2">
                                    {suggestions.length > 0 ? (
                                        <>
                                            {suggestions.map((item) => (
                                                <button
                                                    key={item._id}
                                                    onClick={() => {
                                                        router.push(`/products/${item._id}`);
                                                        setShowSuggestions(false);
                                                        setIsOpen(false);
                                                        setSearchQuery("");
                                                    }}
                                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left"
                                                >
                                                    <div className="w-8 h-8 rounded bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
                                                        {item.imageUrl || item.images?.[0] ? (
                                                            <img src={item.imageUrl || item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="text-gray-300 text-[10px]">📦</span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-bold text-gray-900 text-xs truncate">{item.name}</p>
                                                        <p className="text-[9px] text-gray-400 uppercase">{item.category}</p>
                                                    </div>
                                                    <div className="text-blue-600 font-bold text-[10px]">
                                                        ₹{item.sellingPrice}
                                                    </div>
                                                </button>
                                            ))}
                                        </>
                                    ) : searchQuery.length >= 2 ? (
                                        <div className="px-4 py-4 text-center text-gray-400">
                                            <p className="text-xs font-medium">No results found</p>
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </div>

                        {/* Mobile Links */}
                        <div className="space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${pathname === link.href
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                            {user ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 px-4 py-2">
                                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link href="/my-prescriptions" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium">
                                        My Prescriptions
                                    </Link>
                                    <Link href="/my-blood-requests" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium">
                                        My Blood Requests
                                    </Link>
                                    <Link href="/my-donor-profile" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium">
                                        Donor Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium flex items-center gap-2"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Log Out
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Login / Sign Up
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
