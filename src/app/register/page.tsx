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
        <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white overflow-hidden relative">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-500/20 rounded-full blur-[128px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <img src="/pillora-logo.png" alt="Pillora" className="w-20 h-20 object-contain" />
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-rose-500">
                        Create Account
                    </h2>
                    <p className="text-slate-400 mt-2">Join the future of healthcare</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                            <input
                                type="text"
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-black/30"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                            <input
                                type="email"
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-black/30"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                            <input
                                type="password"
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-black/30"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">I am a...</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-black/30 appearance-none"
                        >
                            <option value="customer" className="bg-slate-900">Customer</option>
                            <option value="seller" className="bg-slate-900">Seller (Pharmacy Owner)</option>
                            <option value="delivery" className="bg-slate-900">Delivery Partner</option>
                        </select>
                    </div>

                    {role === 'seller' && (
                        <div className="space-y-4 pt-4 border-t border-white/10">
                            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Seller Details</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs text-slate-400">Bank Account No.</label>
                                    <input
                                        type="text"
                                        name="accountNumber"
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                        placeholder="0000000000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-slate-400">IFSC Code</label>
                                    <input
                                        type="text"
                                        name="ifsc"
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                        placeholder="SBIN000XXXX"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Pharmacy Certificate No. / Link</label>
                                <input
                                    type="text"
                                    name="pharmacyCertificate"
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                    placeholder="License Number or URL to Document"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Aadhaar Card (Image or PDF)</label>
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
                                        className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                                    >
                                        <FileText className="w-4 h-4" />
                                        {aadhaarFileName ? 'Change Aadhaar' : 'Upload Aadhaar'}
                                    </button>
                                    {aadhaarFileName && (
                                        <span className="text-xs text-slate-400 truncate max-w-[150px]">
                                            {aadhaarFileName}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        type="submit"
                        className="w-full mt-4 bg-gradient-to-r from-purple-500 to-rose-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Create Account <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </motion.button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-500 text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                            Sign in instead
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
