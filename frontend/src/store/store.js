import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import userReducer from "../slice/userSlice";
import converasationReducer from "../slice/conversationSlice";
import componentReducer from '../slice/componentSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    conversations: converasationReducer,
    components: componentReducer,
  },
});
