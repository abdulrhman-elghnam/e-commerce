"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { incrementWishlist } from '@/lib/redux/slices/wishlistSlice';
import { addToWishlist } from '@/lib/services/wishlistService';
import { toast } from 'sonner';

export default function WishlistButton({ 
  productId,
  variant = 'default',
}: { 
  productId: string;
  variant?: 'default' | 'icon';
}) {
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleAddWishlist = async (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (!session?.user?.token) {
            toast.error("Please sign in to add to wishlist");
            return;
        }

        try {
            setIsLoading(true);
            await addToWishlist(session.user.token, productId);
            dispatch(incrementWishlist());
            toast.success("Successfully added to wishlist!");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to add to wishlist";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    if (variant === 'icon') {
        return (
            <button
                type="button"
                onClick={handleAddWishlist}
                disabled={isLoading}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-[#4A5565] hover:bg-[#FB2C36] hover:text-white transition-colors disabled:opacity-50"
                title="Add to Wishlist"
            >
                <Heart size={16} className={isLoading ? 'animate-pulse' : ''} />
            </button>
        );
    }

    return (
        <Button 
            variant="outline" 
            className="flex-1 h-[52px] border-2 border-[#E5E7EB] rounded-xl gap-3 font-semibold text-[#364153] hover:bg-gray-50 hover:text-[#364153]"
            onClick={handleAddWishlist}
            disabled={isLoading}
        >
            <Heart size={18} strokeWidth={2.5} className={isLoading ? 'animate-pulse' : ''} /> 
            {isLoading ? 'Adding...' : 'Add to Wishlist'}
        </Button>
    );
}
