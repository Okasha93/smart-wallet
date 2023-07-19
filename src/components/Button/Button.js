import React from 'react'

const Button = (props) => {
  return (
    <div>
        <button type="button" className="btn" onClick={props.onClick}>{props.title}</button>
    </div>
  )
}

export default Button;
