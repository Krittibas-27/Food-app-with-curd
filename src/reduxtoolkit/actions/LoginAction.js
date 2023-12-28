import { createAsyncThunk } from "@reduxjs/toolkit";
import { AllFieldsLogin } from "../../config/RootApi";

export const loginUserByAllFields = createAsyncThunk("user/login", async({userData})=>{
    const res = await AllFieldsLogin.post('/loginuser', userData)
    //console.log(res)
    return res.data
})

export const getAllUser = createAsyncThunk("getuser/get", async()=>{
    const res = await AllFieldsLogin.get('/loginuser')
    //console.log(res)
    return res.data.reverse()
})

export const deleteUser = createAsyncThunk("user/delete", async(id)=>{
    //console.log('deleteId =>', deleteId)
    const res = await AllFieldsLogin.delete(`/loginuser/${id}`)
    //console.log(res)
    return res.data
})

export const editUser = createAsyncThunk("user/edit", async({editData , eid})=>{
    //console.log('deleteId =>', deleteId)
    const res = await AllFieldsLogin.put(`/loginuser/${eid}`, editData)
    //console.log(res)
    return res.data
})
