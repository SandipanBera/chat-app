import React, { useState } from "react";
import { X } from "lucide-react";
import Modal from "./modal";
import { useDispatch, useSelector } from "react-redux";
import { Send } from "lucide-react";
import useSendMessage from "../hooks/useSendMessage";
import { setIsOpen } from "../slice/componentSlice";
function FilePicker({ className = "", ...props }) {
  const [message,setMessage]=useState("")
  const image = useSelector((state) => state.conversations.uploadImage);
  const dispatch=useDispatch()
  const handleMessage=useSendMessage()
  const handleClick = () => {
    handleMessage(message, props.image,image.name)
    props.setImage("")
    setMessage("");
    dispatch(setIsOpen(false))
   }
  
  return (
    <>
      <div
        className={`h-80 w-80 fixed z-20 bg-slate-600 rounded-md grid grid-rows-12 p-3 gap-2 ${className} $`}
      >
        <div className="row-span-1  flex justify-end">
          {" "}
          <button
            onClick={() => document.getElementById("my_modal").showModal()}
          >
            <X />
          </button>
          <Modal />
        </div>
        <div className="row-span-7 flex justify-center items-center">
          <img src={image?.url} alt="upload-image" height={150} width={150} />
        </div>
        <div className="row-span-2  text-center">{image?.name}</div>
        <div className="row-span-2 flex justify-center items-center gap-2">
          <input type="text" placeholder="Type a message...(optional)" className="input input-ghost w-full max-w-xs" value={message} onChange={e=>setMessage(e.target.value)} />
          <Send onClick={handleClick} /></div>
      </div>
    </>
  );
}

export default FilePicker;
