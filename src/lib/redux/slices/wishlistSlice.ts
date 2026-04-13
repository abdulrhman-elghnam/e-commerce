import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  count: number;
}

const initialState: WishlistState = {
  count: 0,
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlistCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    incrementWishlist: (state) => {
      state.count += 1;
    },
    decrementWishlist: (state) => {
      if (state.count > 0) {
        state.count -= 1;
      }
    },
  },
});

export const { setWishlistCount, incrementWishlist, decrementWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
