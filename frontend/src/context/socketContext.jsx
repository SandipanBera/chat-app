import React from 'react'
import c
function socketContext() {
  return (
   <Socket.Provider value={socket}></Socket.Provider>
  )
}

export default socketContext