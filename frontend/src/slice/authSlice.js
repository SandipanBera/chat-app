import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    authenticate: false,
  
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authentication: (state,action) => {
            state.authenticate =action.payload;
        },
      
    }

})
export const { authentication } = authSlice.actions; //action creators
export default authSlice.reducer;