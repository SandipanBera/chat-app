import mongoose, { Schema } from "mongoose";
const messageSchema = new Schema({
    sender: {
        type:Schema.Types.ObjectId, 
        ref:"User"
    },
    receiver: {
        type:Schema.Types.ObjectId, 
        ref:"User"
    },
    content: {
        type: String,
        required:true
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;
