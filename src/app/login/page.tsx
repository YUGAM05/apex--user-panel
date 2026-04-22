"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { Phone, KeyRound, Loader2, ArrowRight, ArrowLeft } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const res = await api.post("/auth/send-otp", { phone });
            setMessage(res.data.message || "OTP sent successfully");
            setStep("otp");
            setLoading(false);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await api.post("/auth/verify-otp", { phone, otp });

            if (res.data.status === "pending") {
                setError("Your account is pending admin approval.");
                setLoading(false);
                return;
            }
            if (res.data.status === "rejected") {
                setError("Your registration was rejected. Contact support.");
                setLoading(false);
                return;
            }

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data));

            // Redirect based on role, falling back to homepage if Admin/Seller panels aren't deployed
            if (res.data.role === 'admin' && process.env.NEXT_PUBLIC_ADMIN_URL) window.location.href = process.env.NEXT_PUBLIC_ADMIN_URL;
            else if (res.data.role === 'seller' && process.env.NEXT_PUBLIC_SELLER_URL) window.location.href = process.env.NEXT_PUBLIC_SELLER_URL;
            else if (res.data.role === 'delivery' && process.env.NEXT_PUBLIC_DELIVERY_URL) window.location.href = process.env.NEXT_PUBLIC_DELIVERY_URL;
            else router.push("/");

        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Invalid OTP. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white border border-gray-100 p-8 rounded-3xl shadow-xl"
            >
                <div className="text-center mb-8">
                    <div className="mb-8 flex justify-center">
                        <img src="/pillora-logo-new.png" alt="Pillora" className="w-20 h-20 object-contain" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm">Sign in to access your account</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm text-center border border-red-100"
                    >
                        {error}
                    </motion.div>
                )}

                {message && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-6 p-4 bg-green-50 text-green-600 rounded-xl text-sm text-center border border-green-100"
                    >
                        {message}
                    </motion.div>
                )}

                {step === "phone" ? (
                    <form onSubmit={handleSendOtp} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Mobile Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="9876543210"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                    maxLength={10}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Send OTP <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                        <p className="text-[11px] text-gray-400 text-center mt-4 px-2 italic">
                            By continuing, you confirm that you have read and agreed to our 
                            <Link href="/terms" className="text-primary hover:underline whitespace-nowrap"> Terms & Conditions</Link> and 
                            <Link href="/privacy" className="text-primary hover:underline whitespace-nowrap"> Privacy Policy</Link>.
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Enter OTP</label>
                            <div className="relative">
                                <KeyRound className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="123456"
                                    value={otp}
                                    maxLength={6}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>
                            <p className="text-xs text-gray-500 ml-1 mt-1">OTP sent to {phone}</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                disabled={loading}
                                onClick={() => setStep("phone")}
                                className="w-14 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Verify & Login <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>
                        <p className="text-[11px] text-gray-400 text-center mt-4 px-2 italic">
                            By signing in, you confirm that you have read and agreed to our 
                            <Link href="/terms" className="text-primary hover:underline whitespace-nowrap"> Terms & Conditions</Link> and 
                            <Link href="/privacy" className="text-primary hover:underline whitespace-nowrap"> Privacy Policy</Link>.
                        </p>
                    </form>
                )}

                <div className="mt-8 text-center border-t border-gray-100 pt-6">
                    <p className="text-gray-500 text-sm">
                        New to Pillora?{" "}
                        <Link href="/register" className="text-primary font-bold hover:underline transition-all">
                            Create Account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
