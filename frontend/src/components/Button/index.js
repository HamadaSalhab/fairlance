import React from 'react'
import { StyledButton } from './style'


const Button = ({ children, primary, extraPadding, onClick }) => {
    return (
        <StyledButton primary={primary} extraPadding={extraPadding} onClick={onClick} >
            {children}
        </StyledButton>
    )
}

export default Button