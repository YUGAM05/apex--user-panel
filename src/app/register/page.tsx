"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { User, Mail, Lock, Loader2, ArrowRight, FileText } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("customer");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [aadhaarCardUrl, setAadhaarCardUrl] = useState<string | null>(null);
    const [aadhaarFileName, setAadhaarFileName] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAadhaarFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAadhaarCardUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (role === 'seller' && !aadhaarCardUrl) {
            setError("Please upload your Aadhaar Card for verification.");
            setLoading(false);
            return;
        }

        const formData = new FormData(e.target as HTMLFormElement);
        const bankDetails = role === 'seller' ? {
            accountNumber: formData.get('accountNumber'),
            ifsc: formData.get('ifsc')
        } : undefined;
        const pharmacyCertificate = role === 'seller' ? formData.get('pharmacyCertificate') : undefined;

        try {
            const res = await api.post("/auth/register", {
                name,
                email,
                password,
                role,
                bankDetails,
                pharmacyCertificate,
                aadhaarCardUrl: role === 'seller' ? aadhaarCardUrl : undefined
            });

            if (res.data.status === 'pending') {
                setError("Account created! Waiting for Admin Approval.");
                setLoading(false);
                return;
            }

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data));
            router.push("/"); // Redirect to dashboard
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 relative overflow-hidden">
            {/* Decorative background element matching home page feel */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white border border-gray-100 p-8 rounded-3xl shadow-xl relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <img src="/pillora-logo-new.png" alt="Pillora" className="w-20 h-20 object-contain" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Create Account
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm">Join Pillora Health Network</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-xs text-center border border-red-100"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleRegister} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="email"
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="password"
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Account Type</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                        >
                            <option value="customer">Customer / Patient</option>
                            <option value="seller">Seller (Pharmacy Owner)</option>
                            <option value="delivery">Delivery Partner</option>
                        </select>
                    </div>

                    {role === 'seller' && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-4 pt-4 border-t border-gray-100"
                        >
                            <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Merchant Details</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 ml-1">Bank A/C No.</label>
                                    <input
                                        type="text"
                                        name="accountNumber"
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        placeholder="0000000000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 ml-1">IFSC Code</label>
                                    <input
                                        type="text"
                                        name="ifsc"
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        placeholder="SBIN000XXXX"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 ml-1">Pharmacy Certificate No.</label>
                                <input
                                    type="text"
                                    name="pharmacyCertificate"
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="Enter License Number"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 ml-1">Identity Verification (Aadhaar)</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="file"
                                        id="aadhaarUpload"
                                        className="hidden"
                                        accept="image/*,.pdf"
                                        onChange={handleFileChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('aadhaarUpload')?.click()}
                                        className="bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
                                    >
                                        <FileText className="w-4 h-4" />
                                        {aadhaarFileName ? 'Change File' : 'Upload Aadhaar'}
                                    </button>
                                    {aadhaarFileName && (
                                        <span className="text-xs text-gray-500 truncate max-w-[150px]">
                                            {aadhaarFileName}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full mt-4 bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Create Account <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-gray-100 pt-6">
                    <p className="text-gray-500 text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary font-bold hover:underline transition-all">
                            Sign in instead
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
