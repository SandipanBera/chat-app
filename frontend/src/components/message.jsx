import React from 'react'
import { CircleArrowDown } from 'lucide-react';
import { useSelector } from 'react-redux'
import extractTimeFromMongoDBCreatedAt from '../timeExtraction'
function Message({message}) {
   const time=extractTimeFromMongoDBCreatedAt(message.createdAt)
    const sender = useSelector(state => state.conversations.currentConversation)
    const receiver = useSelector(state => state.user.userData)
    const fromMe=receiver?._id===message?.senderId ? true : false; 
    
  return (
    <div className={`chat ${fromMe?"chat-end": "chat-start"}`}>
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img alt="Tailwind CSS chat bubble component" src={fromMe?receiver?.profileImage?.url:sender?.profileImage?.url} />
      </div>
    </div>
    <div className="chat-header">
      {fromMe?receiver?.userName:sender?.userName}
    </div>
      <div className={`chat-bubble ${fromMe && "bg-sky-500 text-slate-50"} py-3`}>
        {message?.image && <div className="indicator">
          <span className="indicator-item badge badge-secondary h-6 w-6 bg-slate-300 opacity-50  border-transparent">
            <a href={message.image} download> <CircleArrowDown size={20} color="#757575"/></a>
  </span>
  <img src={message.image} alt="" className='h-20 w-20' />
</div>
         }
        <span>{message.message }</span>
          </div>
    <div className="chat-footer opacity-50">
     {time}
    </div>
  </div>
  )
}

export default Message
