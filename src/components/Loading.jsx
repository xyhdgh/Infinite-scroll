import React from 'react'

const Loading = ({tip}) => {
  return (
    <div style={{position: "absolute", top: "0", left: "0", right: '0', bottom: '0', background: "rgba(0,0,0,.5)", zIndex: "20"}}>
      <span style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "#fff", fontSize: "20px"}}>{tip}</span>
    </div>
  )
}

export default Loading
