import { useState } from 'react'
import '../App.css'

function Task({name, tag, handleCheck, check}) {

  return (
    <div className="task">
      <input type="checkbox" checked={check} onChange={() => handleCheck(name)}/>
      <div className="taskInfo">
        <p>{name}</p>
        <p style={{opacity: "60%"}}>{tag}</p>
      </div>
      </div>
  )
}

export default Task