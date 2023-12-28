import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, editUser, getAllUser, loginUserByAllFields } from "../actions/LoginAction";

const initialState = {
    isLoading: false,
    isError: false,
    allUserData: [],
    singleUser:{},
    message: "",
}

const loginAllFieldsSlice = createSlice({
    name: "userLoginSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // post login
        builder.addCase(loginUserByAllFields.pending, (state, actions) => {
            state.isLoading = true
        })
        builder.addCase(loginUserByAllFields.fulfilled, (state, actions) => {
            state.isLoading = false
            state.allUserData = [...state.allUserData, actions.payload]
            state.message = "User Login Successful"
        })
        builder.addCase(loginUserByAllFields.rejected, (state, actions) => {
            state.isLoading = false
            state.isError = true
            state.message = "Somting went wrong"
        })
        // get all user

        builder.addCase(getAllUser.pending, (state, actions) => {
            state.isLoading = true
        })
        builder.addCase(getAllUser.fulfilled, (state, actions) => {
            state.isLoading = false
            state.allUserData = actions.payload
        })
        builder.addCase(getAllUser.rejected, (state, actions) => {
            state.isLoading = false
            state.isError = true
            state.allUserData = []
            state.message = "Somting went wrong"
        })

        // delete user
        builder.addCase(deleteUser.pending, (state, actions) => {
            state.isLoading = true
        })
        builder.addCase(deleteUser.fulfilled, (state, actions) => {
            //console.log('d id =>', actions.payload)
            state.isLoading = false
            state.allUserData = [...state.allUserData]
            state.message = "User deleted"
        })
        builder.addCase(deleteUser.rejected, (state, actions) => {
            state.isLoading = false
            state.isError = true
            state.allUserData = []
            state.message = "Somting went wrong"
        })

        // edit user
        builder.addCase(editUser.pending, (state, actions) => {
            state.isLoading = true
        })
        builder.addCase(editUser.fulfilled, (state, actions) => {
            //console.log('d id =>', actions.payload)
            state.isLoading = false
            state.singleUser = actions.payload
            state.message = "User edit succesful"
        })
        builder.addCase(editUser.rejected, (state, actions) => {
            state.isLoading = false
            state.isError = true
            state.allUserData = []
            state.message = "Somting went wrong"
        })
    }
})
export default loginAllFieldsSlice.reducer