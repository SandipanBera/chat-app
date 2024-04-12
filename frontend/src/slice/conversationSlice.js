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
            state.conversation=[...state.conversation,...action.payload];
        },
        //set new message to the last of messages array  
        setNewMessage: (state, action) => {
            state.conversation.push(action.payload); 
         } , 
       
        setCurrentConversation: (state, action) => {
            state.currentConversation = action.payload;
        },
        setUploadImage: (state,action) => {
            state.uploadImage=action.payload
        }

    }
})
export const { setConversation,setNewMessage,setCurrentConversation,setUploadImage} = conversationSlice.actions
export default conversationSlice.reducer