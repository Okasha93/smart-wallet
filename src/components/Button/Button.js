import React from 'react';
import './Button.css';
import  'bootstrap/dist/css/bootstrap.css';

const Button = (props) => {
  return (
    <div className="btn-container">
        <button type="button" className="btn" onClick={props.onClick}>{props.title}</button>
    </div>
  )
}

export default Button;