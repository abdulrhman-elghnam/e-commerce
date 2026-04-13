"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { incrementWishlist } from '@/lib/redux/slices/wishlistSlice';
import { addToWishlist } from '@/lib/services/wishlistService';
import { toast } from 'sonner';

export default function WishlistButton({ productId }: { productId: string }) {
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleAddWishlist = async () => {
        if (!session?.user?.token) {
            toast.error("Please sign in to add to wishlist");
            return;
        }

        try {
            setIsLoading(true);
            await addToWishlist(session.user.token, productId);
            dispatch(incrementWishlist());
            toast.success("Successfully added to wishlist!");
        } catch (err: any) {
            toast.error(err.message || "Failed to add to wishlist");
        } finally {
            setIsLoading(false);
        }
    };

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
