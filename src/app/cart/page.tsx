"use client";
import { useState, useEffect } from 'react';
import { getCartItems, updateCartQuantity, removeFromCart, getCartTotal, CartItem } from '@/lib/cart';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import ShareButton from '@/components/ShareButton';

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    const loadCart = () => {
        setCartItems(getCartItems());
        setTotal(getCartTotal());
    };

    useEffect(() => {
        loadCart();

        const handleCartUpdate = () => loadCart();
        window.addEventListener('cart:updated', handleCartUpdate);
        return () => window.removeEventListener('cart:updated', handleCartUpdate);
    }, []);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pb-20">
                <ShoppingBag className="w-32 h-32 text-gray-300 mb-6" />
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 text-lg">Start shopping to add items to your cart!</p>
                <Link
                    href="/medicines"
                    className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/medicines" className="p-2 hover:bg-gray-100 rounded-lg transition">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                    <span className="ml-auto text-gray-500">({cartItems.length} items)</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <CartItemCard key={item.productId} item={item} onUpdate={loadCart} />
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">FREE</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                                    <span>Total</span>
                                    <span className="text-blue-600">₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link href="/checkout" className="block">
                                <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                                    Proceed to Checkout
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>

                            <Link
                                href="/medicines"
                                className="block text-center text-blue-600 font-medium hover:underline"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CartItemCard({ item, onUpdate }: { item: CartItem; onUpdate: () => void }) {
    const handleQuantityChange = (newQuantity: number) => {
        updateCartQuantity(item.productId, newQuantity);
        onUpdate();
    };

    const handleRemove = () => {
        if (confirm('Remove this item from cart?')) {
            removeFromCart(item.productId);
            onUpdate();
        }
    };

    const subtotal = item.price * item.quantity;
    const savings = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0;

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex gap-4">
                {/* Product Image */}
                <Link href={`/products/${item.productId}`} className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden">
                        {item.image ? (
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
                                📦
                            </div>
                        )}
                    </div>
                </Link>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.productId}`}>
                        <h3 className="font-bold text-gray-900 text-lg mb-1 hover:text-blue-600 transition">
                            {item.name}
                        </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-3">{item.category}</p>

                    {/* Price Info */}
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
                        {item.originalPrice && item.originalPrice > item.price && (
                            <>
                                <span className="text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
                                <span className="text-sm text-green-600 font-medium">
                                    Save ₹{(item.originalPrice - item.price).toFixed(2)}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-1">
                            <button
                                onClick={() => handleQuantityChange(item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="p-2 hover:bg-gray-100 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-gray-900 w-8 text-center">{item.quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(item.quantity + 1)}
                                disabled={item.quantity >= item.stock}
                                className="p-2 hover:bg-gray-100 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <button
                            onClick={handleRemove}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm font-medium">Remove</span>
                        </button>

                        <ShareButton
                            title={item.name}
                            text={`I'm buying ${item.name} from Apex Care. Check it out!`}
                            url={`/products/${item.productId}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition flex items-center gap-2 border border-transparent hover:border-blue-100"
                        />
                    </div>

                    {item.quantity >= item.stock && (
                        <p className="text-xs text-red-600 mt-2 font-medium">Only {item.stock} left in stock</p>
                    )}
                </div>

                {/* Subtotal */}
                <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">₹{subtotal.toFixed(2)}</p>
                    {savings > 0 && (
                        <p className="text-sm text-green-600">Saved ₹{savings.toFixed(2)}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
