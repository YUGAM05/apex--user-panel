'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { ShoppingCart, Plus, Minus, Tag, Store, Info, CheckCircle2, Clock, MapPin, Loader2 } from 'lucide-react';

function OrderMedicinesContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const rx_id = searchParams.get('rx_id');

    const [prescription, setPrescription] = useState<any>(null);
    const [availableMedicines, setAvailableMedicines] = useState<any[]>([]);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState('');
    const [placingOrder, setPlacingOrder] = useState(false);

    useEffect(() => {
        if (rx_id) {
            fetchData();
        }
    }, [rx_id]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            // 1. Fetch Prescription
            const rxRes = await axios.get(`http://localhost:5000/api/prescriptions/${rx_id}`, config);
            setPrescription(rxRes.data);

            // 2. Fetch Available Medicines based on names
            const names = rxRes.data.medicines_extracted.map((m: any) => m.name);
            const medRes = await axios.post(`http://localhost:5000/api/medicines/search`, { names }, config);

            // Flatten the grouped results
            const flattened = Object.values(medRes.data).flat();
            setAvailableMedicines(flattened);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleItem = (medicine: any) => {
        const exists = selectedItems.find(i => i.medicine_id === medicine._id);
        if (exists) {
            setSelectedItems(selectedItems.filter(i => i.medicine_id !== medicine._id));
        } else {
            setSelectedItems([...selectedItems, {
                medicine_id: medicine._id,
                name: medicine.name,
                price: medicine.price,
                quantity: 1,
                image_url: medicine.image_url,
                seller_id: medicine.seller_id
            }]);
        }
    };

    const updateQuantity = (id: string, delta: number) => {
        setSelectedItems(selectedItems.map(item => {
            if (item.medicine_id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const calculateSubtotal = () => {
        return selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    const handlePlaceOrder = async () => {
        if (selectedItems.length === 0) return alert('Select at least one medicine');
        if (!address) return alert('Enter delivery address');

        setPlacingOrder(true);
        try {
            const token = localStorage.getItem('token');
            const subtotal = calculateSubtotal();

            const payload = {
                rx_id: prescription.rx_id,
                seller_id: selectedItems[0].seller_id, // Simplified: assume one seller per order
                medicines: selectedItems,
                delivery_address: address,
                total_amount: subtotal + 10 // platform fee
            };

            const res = await axios.post('http://localhost:5000/api/orders', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            router.push(`/order/track/${res.data._id}`);
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order');
        } finally {
            setPlacingOrder(false);
        }
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Section: Prescription Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-card shadow-lg rounded-2xl p-6 border border-border sticky top-24">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Prescription</h2>
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                {prescription?.rx_id}
                            </span>
                        </div>

                        <div className="space-y-4 mb-6">
                            {prescription?.medicines_extracted.map((med: any, i: number) => (
                                <div key={i} className="flex justify-between items-start border-b border-border/50 pb-3">
                                    <div>
                                        <p className="font-semibold text-primary">{med.name}</p>
                                        <p className="text-xs text-muted-foreground">{med.dosage} • {med.duration}</p>
                                    </div>
                                    <span className="text-sm font-medium">Qty: {med.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>Valid until: {prescription?.valid_until ? new Date(prescription.valid_until).toLocaleDateString() : 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Pharmacist Approved</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section: Available Medicines */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Store className="w-7 h-7 text-primary" />
                        Available in Local Pharmacies
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availableMedicines.map((med: any) => {
                            const isSelected = selectedItems.some(item => item.medicine_id === med._id);
                            return (
                                <div key={med._id} className={`bg-card p-5 border-2 rounded-2xl transition-all ${isSelected ? 'border-primary shadow-md' : 'border-border hover:border-primary/50'}`}>
                                    <div className="flex gap-4">
                                        <div className="w-20 h-20 bg-secondary/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                            {med.image_url ? <img src={med.image_url} alt={med.name} className="w-full h-full object-cover rounded-lg" /> : <Info className="w-8 h-8 text-muted-foreground/30" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-lg leading-tight">{med.name}</h3>
                                                <div className="text-primary font-bold">₹{med.price}</div>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">{med.brand || 'Generic'}</p>
                                            <div className="flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded">
                                                Stock: {med.stock}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        {isSelected ? (
                                            <div className="flex items-center gap-3 bg-secondary rounded-lg px-2 py-1">
                                                <button onClick={() => updateQuantity(med._id, -1)} className="p-1 hover:text-primary"><Minus className="w-4 h-4" /></button>
                                                <span className="font-bold w-6 text-center">{selectedItems.find(i => i.medicine_id === med._id)?.quantity}</span>
                                                <button onClick={() => updateQuantity(med._id, 1)} className="p-1 hover:text-primary"><Plus className="w-4 h-4" /></button>
                                            </div>
                                        ) : <div></div>}

                                        <button
                                            onClick={() => toggleItem(med)}
                                            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${isSelected ? 'bg-destructive/10 text-destructive hover:bg-destructive/20' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                                        >
                                            {isSelected ? 'Remove' : 'Add to Order'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                        {availableMedicines.length === 0 && (
                            <div className="col-span-2 py-12 text-center bg-secondary/10 rounded-2xl border-2 border-dashed border-border">
                                <p className="text-muted-foreground italic">No matching medicines found in our partner pharmacies. Please try searching manually.</p>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Bottom Bar */}
                    <div className="bg-card shadow-2xl rounded-2xl p-6 border-2 border-primary/20">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <ShoppingCart className="w-6 h-6 text-primary" /> Order Summary
                        </h3>

                        <div className="space-y-3 mb-8">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Subtotal ({selectedItems.length} items)</span>
                                <span>₹{calculateSubtotal()}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Platform Fee</span>
                                <span>₹10</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Delivery Fee</span>
                                <span className="text-green-600 font-medium italic">Calculated at pickup</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold pt-3 border-t border-border">
                                <span>Total Amount</span>
                                <span className="text-primary">₹{calculateSubtotal() + 10}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Enter full delivery address..."
                                    className="w-full pl-11 pr-4 py-3 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                disabled={selectedItems.length === 0 || !address || placingOrder}
                                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {placingOrder ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Confirm Order & Pay'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function OrderMedicinesPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-primary" /></div>}>
            <OrderMedicinesContent />
        </Suspense>
    );
}
