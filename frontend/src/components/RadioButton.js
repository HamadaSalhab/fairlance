import React from 'react'
import '../assets/styles/RadioButton.css'

const RadioButton = ({ name, id, value, onChange, checked, text }) => {

    return (
        <div className='radio-button'>
            <input className="radio-input" type="radio"
                name={name}
                id={id}
                value={value}
                onChange={()=>onChange(name)}
                checked={checked} />
            <label htmlFor={id}>{text}</label>
            <div className="check" onClick={() => {
                document.getElementById(id).checked = true;
                onChange(name)
            }}><div className="inside"></div></div>
        </div>
    )
}

export default RadioButton