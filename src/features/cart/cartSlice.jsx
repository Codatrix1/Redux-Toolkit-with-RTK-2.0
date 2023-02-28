import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { openModal } from "../modal/modalSlice";

// temp data
// import cartItems from "../../data";

// Products URL
const url = "https://course-api.com/react-useReducer-cart-project";

//-----------------------------------------------------------
const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // Lets us access other features/slices even if that not present in the current slice
      // !! VERY VERY POWERFUL
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());

      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("SOMETHING WENT WRONG!");
    }
  }
);

//------------------------------
const initialState = {
  cartItems: [],
  itemCount: 11,
  totalPrice: 0,
  isLoading: true,
};

//--------------------------------------
const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },

    removeItem: (state, action) => {
      // The ID Comes as payload when the button is clicked
      // console.log(action);
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((eachItem) => {
        return eachItem.id !== itemId;
      });
    },

    increase: (state, action) => {
      // The ID Comes as payload when the button is clicked
      // console.log(action);
      const itemId = action.payload;
      const cartItem = state.cartItems.find(
        (eachItem) => eachItem.id === itemId
      );

      cartItem.amount = cartItem.amount + 1;
    },

    decrease: (state, { payload }) => {
      // The ID Comes as payload when the button is clicked
      const cartItem = state.cartItems.find(
        (eachItem) => eachItem.id === payload.id
      );

      cartItem.amount = cartItem.amount - 1;
    },

    calculateTotals: (state) => {
      let itemCount = 0;
      let totalPrice = 0;

      state.cartItems.forEach((eachItem) => {
        itemCount += eachItem.amount;
        totalPrice += eachItem.amount * eachItem.price;
      });

      state.itemCount = itemCount;
      state.totalPrice = totalPrice;
    },
  },

  //---------Async Thunk Reducers: with Lifecycle Actions:
  // pending, fulfilled, and rejected
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        // console.log(action);
        state.cartItems = action.payload;
        state.isLoading = false;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },

  // extraReducers:  {
  //   [getCartItems.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [getCartItems.fulfilled]: (state, action) => {
  //     // console.log(action);
  //     state.cartItems = action.payload;
  //     state.isLoading = false;
  //   },
  //   [getCartItems.rejected]: (state, action) => {
  //     console.log(action);
  //     state.isLoading = false;
  //   },
  // },
});

// console.log(cartSlice);

//----------
// EXPORTS
//----------
export { getCartItems }; // For Async-Thunk
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
