import React from "react";
import { X } from "lucide-react";
import Modal from "./modal";
import { useDispatch, useSelector } from "react-redux";
import { Send } from "lucide-react";
import useSendMessage from "../hooks/useSendMessage";
import { setIsOpen } from "../slice/componentSlice";
function FilePicker({ className = "", ...props }) {
  const image = useSelector((state) => state.conversations.uploadImage);
  const dispatch=useDispatch()
  const handleMessage=useSendMessage()
  const handleClick = () => {
    console.log(props.image);
    if (!props.image) { 
      return
    }
    handleMessage("", props.image)
    props.setImage("")
    dispatch(setIsOpen(false))


   }
  
  return (
    <>
      <div
        className={`h-80 w-80 fixed z-20 bg-slate-600 rounded-md grid grid-rows-12 p-3 gap-2 ${className} $`}
      >
        <div className="row-span-1 border border-amber-300 flex justify-end">
          {" "}
          <button
            onClick={() => document.getElementById("my_modal").showModal()}
          >
            <X />
          </button>
          <Modal />
        </div>
        <div className="row-span-7 border border-amber-300 flex justify-center items-center">
          <img src={image?.url} alt="upload-image" height={150} width={150} />
        </div>
        <div className="row-span-2 border border-amber-300 text-center">{image?.name}</div>
        <div className="row-span-2 border border-amber-300 flex justify-center items-center"><Send onClick={handleClick} /></div>
      </div>
    </>
  );
}

export default FilePicker;
