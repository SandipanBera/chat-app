import mongoose, { Schema } from "mongoose";
const messageSchema = new Schema({
    senderId: {
        type:Schema.Types.ObjectId, 
        ref:"User"
    },
    receiverId: {
        type:Schema.Types.ObjectId, 
        ref:"User"
    },
    message: {
        type: String,
    },
    image: {
        type:String
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;
