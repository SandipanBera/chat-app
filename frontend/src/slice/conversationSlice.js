import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    conversation: [],
    currentConversation: null,
    uploadImage:null
}
const conversationSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        setConversation: (state, action) => {
            state.conversation=[...action.payload];
        },
       
        setCurrentConversation: (state, action) => {
            state.currentConversation = action.payload;
        },
        setUploadImage: (state,action) => {
            state.uploadImage=action.payload
        }

    }
})
export const { setConversation,setCurrentConversation,setUploadImage} = conversationSlice.actions
export default conversationSlice.reducer