import React from 'react'

function FilePicker({className='',...props}) {
  return (
    <div className={`h-80 w-80 absolute z-20 bg-slate-600 rounded-md grid grid-rows-10 p-3 ${className}`}>
      <div className='row-span-6 border border-amber-300'></div>
      <div className='row-span-2'></div>
      <div className='row-span-2'></div>
    </div>
  )
}

export default FilePicker