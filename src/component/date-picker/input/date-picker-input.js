import React, {Component} from 'react';
import PropType from 'prop-types';
import moment from 'moment-timezone';
import {autobind} from "core-decorators";

import DatePicker from "../date-picker";

@autobind
export default class DatePickerInput extends Component {
    static propTypes = {
        date: PropType.any.isRequired,
        isActive: PropType.bool,
        inputStyle: PropType.object,
        style: PropType.object,
        disabledDays: PropType.array,
        dateFormat: PropType.string,
        onChange: PropType.func,
    };

    static defaultProps = {
        isActive: true,
        inputStyle: {},
        style: {},
        dateFormat: 'MM-DD-YYYY',
        onChange: () => {},
    };

    state = {
        visibility: false,
    };

    onDayClick(day, {disabled}) {
        if (disabled) return;

        this.setState({visibility: false});
        this.props.onChange(moment.utc(day));
    }

    onInputClick() {
        this.setState({visibility: true});
    }

    onDatePickerClose() {
        this.setState({visibility: false});
    }

    render() {
        const {date, isActive, inputStyle, style, disabledDays = [{before: new Date(moment().format('YYYY-MM-DD'))}], dateFormat} = this.props;
        const {visibility} = this.state;

        return (
            <div style={style}>
                <div className={`date-picker-input${visibility ? '__focus' : isActive ? '' : '--dim'}`}
                     style={{width: '115px', ...inputStyle}}
                     onClick={this.onInputClick}
                     ref={(div) => this.anchor = div}
                >
                    <div className="date-picker-input__value">{date.format(dateFormat)}</div>
                    <div className={`date-picker-input__calendar${isActive ? '' : '--dim'}`}/>
                </div>
                <DatePicker
                    month={date.toDate()}
                    selectedDays={date.toDate()}
                    disabledDays={disabledDays}
                    isOpen={visibility}
                    anchorEl={this.anchor}
                    onDayClick={this.onDayClick}
                    onClose={this.onDatePickerClose}
                />
            </div>
        );
    }
};