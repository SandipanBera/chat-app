import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isOpen: false,
  
}
const componentSlice = createSlice({
    name: 'component',
    initialState,
    reducers: {
        setIsOpen: (state, action) => {
            state.isOpen = action.payload;
         }
    }
})
export const {setIsOpen}= componentSlice.actions
export default componentSlice.reducer  