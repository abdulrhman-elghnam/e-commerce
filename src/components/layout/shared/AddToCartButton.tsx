"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { incrementCart } from '@/lib/redux/slices/cartSlice';
import { addToCart } from '@/lib/services/cartService';
import { toast } from 'sonner';

export default function AddToCartButton({ 
  productId,
  variant = 'default',
}: { 
  productId: string,
  variant?: 'default' | 'icon'
}) {
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = async (e: React.MouseEvent) => {
        // Prevent event bubbling if the button is placed over a Link wrapper
        e.preventDefault();
        e.stopPropagation();

        if (!session?.user?.token) {
            toast.error("Please sign in to add to cart");
            return;
        }

        try {
            setIsLoading(true);
            await addToCart(session.user.token, productId);
            dispatch(incrementCart());
            toast.success("Successfully added to cart!");
        } catch (err: any) {
            toast.error(err.message || "Failed to add to cart");
        } finally {
            setIsLoading(false);
        }
    };

    if (variant === 'icon') {
        return (
            <button 
                onClick={handleAddToCart}
                disabled={isLoading}
                className="w-10 h-10 bg-[#16A34A] rounded-full flex justify-center items-center text-white shrink-0 hover:bg-[#10833a] transition-colors shadow-sm relative z-10 disabled:opacity-50" 
                title="Add to Cart"
            >
                <ShoppingCart size={18} strokeWidth={2.5} className={isLoading ? 'animate-pulse' : ''} />
            </button>
        );
    }

    // Default full button
    return (
        <Button 
            onClick={handleAddToCart}
            disabled={isLoading}
            className="flex-1 h-14 bg-[#16A34A] text-white rounded-xl shadow-lg shadow-green-600/20 gap-3 font-semibold text-base hover:bg-[#10833a] hover:shadow-green-700/30 disabled:opacity-50"
        >
            <ShoppingCart size={20} strokeWidth={2.5} className={isLoading ? 'animate-pulse' : ''} /> 
            {isLoading ? 'Adding...' : 'Add to Cart'}
        </Button>
    );
}
