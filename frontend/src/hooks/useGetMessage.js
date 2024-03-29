import React from 'react'
import { useDispatch } from 'react-redux'
import message from '../api-call/message'
import toast from 'react-hot-toast'
import { setConversation } from '../slice/conversationSlice'

function useGetMessage() {
    const dispatch = useDispatch()
    const getMessages = (id) => { 
        message.getMessage(id).then(res => {
            if (res.statusCode!==200) {
                throw res
            }
            dispatch(setConversation(res.data))
            
        }).catch((error)=>toast.error(error.message))

    }
    return getMessages;
}

export default useGetMessage