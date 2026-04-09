
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/pillora-logo.png"
                                alt="Pillora"
                                width={32}
                                height={32}
                                className="w-8 h-8 object-contain"
                                unoptimized
                            />
                            <span className="font-bold text-xl text-gray-900">Pillora</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            We&apos;re a healthcare coordination platform focused on emergency blood services and hospital data.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialIcon icon={<Facebook className="w-4 h-4" />} />
                            <SocialIcon icon={<Twitter className="w-4 h-4" />} />
                            <SocialIcon icon={<Instagram className="w-4 h-4" />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Company</h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-blue-600 transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
                            <li><Link href="/partners" className="hover:text-blue-600 transition-colors">Partner with us</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Services</h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="/blood-bank" className="hover:text-blue-600 transition-colors">Blood Bank</Link></li>
                            <li><Link href="/hospitals" className="hover:text-blue-600 transition-colors">Hospitals</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="/help" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
                            <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/returns" className="hover:text-blue-600 transition-colors">Return Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} Pillora Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="w-8 h-5 bg-gray-100 rounded border border-gray-200" />
                        <span className="w-8 h-5 bg-gray-100 rounded border border-gray-200" />
                        <span className="w-8 h-5 bg-gray-100 rounded border border-gray-200" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon }: any) {
    return (
        <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
            {icon}
        </a>
    )
}
