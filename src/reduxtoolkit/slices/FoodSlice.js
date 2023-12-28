import { createSlice } from "@reduxjs/toolkit";
import { getFoolCategory } from "../actions/FoodAction";

const initialState = {
    isLoading: false,
    isError: false,
    foodCategoryList : [],
    message:""
}

const foodSlice = createSlice({
    name: "foodSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getFoolCategory.pending, (state, action)=>{
            state.isLoading = true
        })
        builder.addCase(getFoolCategory.fulfilled, (state, action)=>{
            state.isLoading = false
            state.foodCategoryList = action.payload
        })
        builder.addCase(getFoolCategory.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message="Somthing went wrong"
        })
    }
})
export default foodSlice.reducer