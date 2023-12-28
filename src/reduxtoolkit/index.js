import { configureStore } from "@reduxjs/toolkit";
import loginAllFieldsSlice from "./slices/LoginSlice"
import FoodSlice from "./slices/FoodSlice";

export const store = configureStore({
    reducer: {
        loginUsers : loginAllFieldsSlice,
        food: FoodSlice
    }
})