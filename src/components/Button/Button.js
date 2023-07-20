import React from 'react';
import './Button.css';
import  'bootstrap/dist/css/bootstrap.css';

const Button = (props) => {
  return (
    <div>
        <button type="button" className="btn-prime mt-4 p-2" onClick={props.onClick}>{props.title}</button>
    </div>
  )
}

export default Button;
