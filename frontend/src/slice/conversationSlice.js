import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    conversation: [],
    currentConversation: null
}
const conversationSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        setConversation: (state, action) => {
            state.conversation=[...state.conversation,action.payload];
        },
        setCurrentConversation: (state, action) => {
            state.currentConversation = action.payload;
         }

    }
})
export const { setConversation,setCurrentConversation} = conversationSlice.actions
export default conversationSlice.reducer