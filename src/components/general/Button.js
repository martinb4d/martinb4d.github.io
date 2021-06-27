import React from 'react';
import '../../styles/Button.css'

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large', 'btn--mobile', 'btn--wide', 'btn--small'];
const COLOR = ['primary', 'blue', 'red', 'green', 'gray' ];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    buttonColor
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? 
        buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? 
        buttonSize : SIZES[0];
    const chechButtonColor = COLOR.includes(buttonColor) ? 
        buttonColor : null;
    return (
        <button className={`btn ${checkButtonStyle} ${checkButtonSize} ${chechButtonColor}`} onClick={onClick} type={type}>{children}</button>
    )
}