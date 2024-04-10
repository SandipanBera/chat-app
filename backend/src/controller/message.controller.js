import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import cloudinaryUpload from "../utils/cloudinary.js";

const messageHandler = asyncHandler(async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { message } = req.body;
    // check conversation happened before or not
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });
    if (!conversation) {
      //create a new conversation
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    //user's sending image upload in cloudinary and url save in database
    const imageLocalPath = req.file?.path;
    let sendingImage = "";
    if (imageLocalPath) {
      console.log(imageLocalPath);
      sendingImage = await cloudinaryUpload(imageLocalPath);
      if (!sendingImage?.url) {
        throw new apiError(500, "failed to upload image");
      }
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      image: sendingImage?.url || "",
  
    });
    await newMessage.save();
    conversation.messages.push(newMessage);
    await conversation.save();
    return res
      .status(200)
      .json(new apiResponse("Message successfully delivered", 200, newMessage));
  } catch (error) {
    console.log(error.message);
    throw new apiError(500, "Something went wrong");
  }
});
const getMessage = asyncHandler(async (req, res) => {
  try {
    const { id: recieverid } = req.params;
    const senderid = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [recieverid, senderid] },
    }).populate({
      path: "messages",
      select: "-__v  ",
    });
    if (!conversation) {
      return res
        .status(200)
        .json(new apiResponse( "No chat available", 200,[]));
    }
    return res
      .status(200)
      .json(new apiResponse( "Messages fetched Successfully",200,conversation.messages));
  } catch (error) {
    console.log(error.message);
    return new apiError(500, "Internal server error");
  }
});
export { messageHandler, getMessage };
