import React from "react";
import {Select as AntdSelect, SelectProps} from "antd";
import classNames from "classnames";
import "./select.scss";

interface Props extends SelectProps {}
const Select: React.FC<Props> = ({children, ...props}) => {
    return <AntdSelect {...props} className={classNames("weski-select", props.className)}>{children}</AntdSelect>
}

export default Select;