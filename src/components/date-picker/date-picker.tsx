import React from "react";
import {DatePicker as AntdDatePicker} from "antd";
import classNames from "classnames";
import './date-picker.scss';
import {RangePickerProps} from "antd/es/date-picker";

const {RangePicker} = AntdDatePicker;

const DatePicker: React.FC<RangePickerProps> = (props) => {
    return <RangePicker {...props} className={classNames('weski-date-picker', props.className)} />
}

export default DatePicker;