import React from 'react';
import  './Button.css';
const BasicButton = ({text,onClick}) => 
       <button id="button-basic" onClick={onClick}>{text}</button>
export default BasicButton;