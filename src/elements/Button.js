import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  
  const { radius, text, _onClick, children, margin, width, padding, bg, color, disabled,borderColor,size,bold } = props;

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    bg: bg,
    color: color,
    borderColor: borderColor,
    size: size,
    bold: bold,
    radius:radius,
  }

  return (
    <React.Fragment>

      <BasicButton {...styles} onClick={_onClick}  disabled={disabled}>{text? text:children}</BasicButton>
    </React.Fragment>
  )

}

Button.defaultProps = {
  text: false,
  _onClick : () => { },
  children: null,
  margin: false,
  width: '100%',
  padding: '15px 15px',
  bg: '#E2344E',
  color: 'white',
  disabled: false,
  borderColor: '1px solid #E2344E',
  size: '16px',
  bold: false,
  radius:'3px',

}

const BasicButton = styled.button`
box-sizing:border-box;
  width:${(props) => props.width};
  cursor:pointer;
  background-color: ${(props) => props.bg};
  color:${(props) => props.color};
  padding:${(props) => props.padding};
  border: ${(props) => props.borderColor};
  border-radius: ${(props) => props.radius};
  box-sizing: border-box;
  font-size: ${(props)=> props.size};
  ${(props) => (props.margin ? `margin:${props.margin};` : '')}
  ${(props)=> (props.bold?'font-weight:600;':'')}
  outline: none;
  &:focus{
    outline: none;
  }
  &:disabled{
    background-color: #ddd;
    border:1px solid #ddd;
  }
`

export default Button;