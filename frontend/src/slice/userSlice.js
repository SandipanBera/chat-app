import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userData:null,
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        Userdata: (state, action) => {
            state.userData=action.payload;
        }
    }
})
export const { Userdata } = userSlice.actions
export default userSlice.reducer