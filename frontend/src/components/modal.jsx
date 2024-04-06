import React from "react";
import { useDispatch } from "react-redux";
import { setIsOpen } from "../slice/componentSlice";
import { setUploadImage } from "../slice/conversationSlice";

function Modal() {
    const dispatch=useDispatch()
  return (
    <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Discard unsent message</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog"  >
            {/* if there is a button in form, it will close the modal */}
            <button className="btn mr-2" onClick={() => {
              dispatch(setIsOpen(false))
              dispatch(setUploadImage(null))
            }}>Discard</button>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
