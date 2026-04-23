"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult 
} from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Lock, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

    useEffect(() => {
        // Initialize reCAPTCHA
        if (!recaptchaVerifierRef.current) {
            recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',
                callback: (response: any) => {
                    // reCAPTCHA solved - will proceed with signInWithPhoneNumber
                },
                'expired-callback': () => {
                    setError("reCAPTCHA expired. Please try again.");
                }
            });
        }
    }, []);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!/^\d{10}$/.test(phoneNumber)) {
            setError("Please enter a valid 10-digit mobile number.");
            setLoading(false);
            return;
        }

        try {
            const fullPhoneNumber = `+91${phoneNumber}`;
            const verifier = recaptchaVerifierRef.current;
            
            if (!verifier) {
                throw new Error("Recaptcha verifier not initialized");
            }

            const result = await signInWithPhoneNumber(auth, fullPhoneNumber, verifier);
            setConfirmationResult(result);
            setShowOtpInput(true);
        } catch (err: any) {
            console.error("Error sending OTP:", err);
            setError(err.message || "Failed to send OTP. Please try again.");
            // Reset reCAPTCHA if error occurs
            if (window.grecaptcha && recaptchaVerifierRef.current) {
                window.grecaptcha.reset();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!/^\d{6}$/.test(otp)) {
            setError("Please enter a 6-digit OTP.");
            setLoading(false);
            return;
        }

        try {
            if (!confirmationResult) {
                throw new Error("No confirmation result found");
            }

            const result = await confirmationResult.confirm(otp);
            const user = result.user;
            const idToken = await user.getIdToken();

            // Send ID token to backend for verification and session setup
            const response = await axios.post("/api/auth/verify-token", { idToken });

            if (response.data.success) {
                // Store user info in localStorage for Navbar and other components
                const userData = {
                    uid: response.data.uid,
                    phoneNumber: response.data.phoneNumber,
                    name: response.data.phoneNumber || "User", // Fallback for Navbar
                    email: "", // Phone auth users might not have email initially
                    role: "user"
                };
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("token", idToken); // Keep for compatibility

                // In a real app, you might trigger a 'storage' event or use a state manager
                window.dispatchEvent(new Event('storage'));
                
                router.push("/dashboard");
            } else {
                throw new Error("Verification failed on server");
            }
        } catch (err: any) {
            console.error("Error verifying OTP:", err);
            setError("Invalid OTP. Please check and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
            <div id="recaptcha-container"></div>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white border border-gray-100 p-8 rounded-3xl shadow-xl"
            >
                <div className="text-center mb-8">
                    <div className="mb-8 flex justify-center">
                        <img src="/pillora-logo-v2.svg" alt="Pillora" className="w-20 h-20 object-contain" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {showOtpInput ? "Verify OTP" : "Welcome to Pillora"}
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm">
                        {showOtpInput 
                            ? `Enter the 6-digit code sent to +91 ${phoneNumber}` 
                            : "Login with your mobile number to continue"}
                    </p>
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

                <AnimatePresence mode="wait">
                    {!showOtpInput ? (
                        <motion.form 
                            key="phone-form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleSendOtp} 
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Mobile Number</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-3.5 flex items-center gap-2 text-gray-500 border-r border-gray-200 pr-2">
                                        <Phone className="w-4 h-4" />
                                        <span className="text-sm font-medium">+91</span>
                                    </div>
                                    <input
                                        type="tel"
                                        required
                                        maxLength={10}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-20 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="1234567890"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || phoneNumber.length !== 10}
                                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Get OTP <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </motion.form>
                    ) : (
                        <motion.form 
                            key="otp-form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleVerifyOtp} 
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">One-Time Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        maxLength={6}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all tracking-[0.5em] font-bold"
                                        placeholder="••••••"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.length !== 6}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Verify & Login <CheckCircle2 className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            <button 
                                type="button"
                                onClick={() => setShowOtpInput(false)}
                                className="w-full text-sm text-gray-500 hover:text-primary font-medium transition-colors"
                            >
                                Change Phone Number
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
                
                <p className="text-[11px] text-gray-400 text-center mt-6 px-2 italic">
                    By continuing, you confirm that you have read and agreed to our 
                    <Link href="/terms" className="text-primary hover:underline whitespace-nowrap"> Terms &amp; Conditions</Link> and 
                    <Link href="/privacy" className="text-primary hover:underline whitespace-nowrap"> Privacy Policy</Link>.
                </p>

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
