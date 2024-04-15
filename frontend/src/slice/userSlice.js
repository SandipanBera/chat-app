import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userData: null,
    isOnline:[]
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        Userdata: (state, action) => {
            state.userData=action.payload;
        },
      
        addIsOnline: (state, action) => {
            state.isOnline= [...action.payload]
         }
    }
})
export const { Userdata,addIsOnline  } = userSlice.actions
export default userSlice.reducer