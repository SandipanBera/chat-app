import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    authenticate: false,
  
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
// This function handles authentication
// Parameters:
// - state: the current state of the application
// - action: the action object containing the payload
// Returns: none
authentication: (state, action) => {
    state.authenticate = action.payload;
},

    }

})
export const { authentication } = authSlice.actions; //action creators
export default authSlice.reducer;