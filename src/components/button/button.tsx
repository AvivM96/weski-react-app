import React from "react";
import {Button as AntdButton, ButtonProps} from 'antd';
import classNames from "classnames";
import './button.scss';

interface Props extends ButtonProps {}
const Button: React.FC<Props> = ({children, ...props}) => {
    return <AntdButton {...props} className={classNames("weski-button", props.className)}>{children}</AntdButton>
}

export default Button;