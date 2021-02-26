import React from 'react';
import './BasicInput.css';
const BasicInput = ({ type, name, placeholder, onChange, value }) =>
       <input id="standard-basic"
              type={type}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={onChange} />
export default BasicInput;