import { createAsyncThunk } from "@reduxjs/toolkit";
import { FoodBaseUrl } from "../../config/RootApi";

export const getFoolCategory = createAsyncThunk("food/get", async()=>{
    const res = await FoodBaseUrl.get('/api/json/v1/1/categories.php')
    return res.data.categories
})
