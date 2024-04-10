import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userData: null,
    socket: null,
    isOnline:[]
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        Userdata: (state, action) => {
            state.userData=action.payload;
        },
        addSocket: (state, action)=>{
            state.socket=action.payload;
        },
        addIsOnline: (state, action) => {
            state.isOnline= [...action.payload]
         }
    }
})
export const { Userdata,addSocket,addIsOnline  } = userSlice.actions
export default userSlice.reducer