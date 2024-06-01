
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from '../cartItems'
import { openModal } from "./modal/modalSlice";

const url = 'https://www.course-api.com/react-useReducer-cart-project';

// Example 1 : using fetch api 
// export const getCartItems = createAsyncThunk('cart/getCartItems', ()=>{
// return  fetch(url)
//        .then((resp)=> resp.json())
//        .catch((err)=> console.log(err))  
// })

// Example 2 : using Axios
export const getCartItems = createAsyncThunk('cart/getCartItems', async (name, thunkAPI)=>{
try {
  
  // console.log(name);
  // console.log(thunkAPI);
  // console.log(thunkAPI.getState());
  // thunkAPI.dispatch(openModal());
  const resp = await axios(url);  
  // return resp
  return resp.data;
} catch (error) {
  return thunkAPI.rejectWithValue(`Internal Error - ${error}`); 
}
})


const initialState = {
    cartItems: [],
    // local data
    // cartItems: cartItems, 
    amount: 0,
    total:0, //total count
    isLoading:true 
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      //   return { cartItems: [] };
    },

    removeItem: (state, action) => {
      //   console.log(action);
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id != itemId);
    },
    increase: (state, { payload }) => {
      console.log(payload);

      const cartItem = state.cartItems.find((item) => item.id == payload.id);
      cartItem.amount = cartItem.amount + 1;
      // cartItem.amount +=  1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id == payload.id);
      cartItem.amount = cartItem.amount - 1;
    },

    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    }
  },

  extraReducers:(builder)=>{

    builder.addCase(getCartItems.pending, (state) => { state.isLoading = true;})
           .addCase(getCartItems.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    })
           .addCase(getCartItems.rejected,(state, action) => {
      console.log(action);
      state.isLoading = false;
    })
  }

  // extraReducers: {
  //   [getCartItems.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [getCartItems.fulfilled]: (state, action) => {
  //     console.log(action);
  //     state.isLoading = false;
  //     state.cartItems = action.payload;
  //   },
  //   [getCartItems.rejected]: (state, action) => {
  //     console.log(action);
  //     state.isLoading = false;
  //   }
  // }
});

// console.log(cartSlice);
export const { clearCart, removeItem, increase, decrease, calculateTotal } = cartSlice.actions;  
export default cartSlice.reducer;