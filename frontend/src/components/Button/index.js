import React from 'react'
import { StyledButton } from './style'


const Button = ({ children, primary, extraPadding }) => {
    return (
        <StyledButton primary={primary} extraPadding={extraPadding}>
            {children}
        </StyledButton>
    )
}

export default Button