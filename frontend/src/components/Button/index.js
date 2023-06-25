import React from 'react'
import { StyledButton } from './style'


const Button = ({ children, primary, extrapadding, onClick }) => {
    return (
        <StyledButton $primary={primary} $extrapadding={extrapadding} onClick={onClick} >
            {children}
        </StyledButton>
    )
}

export default Button