import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import modalReducer from "./features/modal/modalSlice";
export const store = configureStore({
    reducer:{
        cart:cartReducer,        
        modal: modalReducer,
    },
})
