"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { format } from "date-fns";
import { Package, Truck, CheckCircle, Clock, ChevronRight, ShoppingBag } from "lucide-react";

interface Order {
    _id: string;
    items: any[];
    totalAmount: number;
    status: string;
    createdAt: string;
    paymentMethod: string;
}

export default function MyOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("/orders");
                setOrders(res.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <ShoppingBag className="w-8 h-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package className="w-12 h-12 text-blue-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven&apos;t placed any orders yet.</p>
                        <Link href="/medicines">
                            <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                                Start Shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <Link href={`/order-success/${order._id}`} key={order._id}>
                                <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all group cursor-pointer">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                                        {/* Left: ID & Date */}
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                                                <Package className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-lg">Order #{order._id.slice(-8).toUpperCase()}</p>
                                                <p className="text-sm text-gray-500">
                                                    Placed on {format(new Date(order.createdAt), "MMMM d, yyyy")}
                                                </p>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize
                                                        ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                            order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                                                                order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                                    'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                    {['processing', 'out_for_pickup', 'picked_up', 'out_for_delivery'].includes(order.status) && (
                                                        <Link href={`/my-orders/track/${order._id}`} onClick={(e) => e.stopPropagation()}>
                                                            <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full hover:bg-blue-700 transition tracking-widest uppercase">
                                                                Track Live
                                                            </span>
                                                        </Link>
                                                    )}
                                                    <span className="text-xs text-gray-400">•</span>
                                                    <span className="text-xs text-gray-500">{order.items.length} Items</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right: Amount & Arrow */}
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                                                <p className="text-xl font-bold text-blue-600">₹{order.totalAmount.toFixed(2)}</p>
                                            </div>
                                            <div className="p-2 rounded-full hover:bg-gray-100">
                                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                            </div>
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
