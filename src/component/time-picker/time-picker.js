import React, {Component} from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash/defaultsDeep';
import MenuItem from "../menu-item/menu-item";
import DropDownMenu from "../drop-down/menu/drop-down-menu";

const padLeftZero = (value, length) => {
    return Array(length - value.length).fill('0') + value;
};

const defaultHourStyle = {
    width: '50px',
    height: '30px',
    borderTop: 'none',
};

const defaultMinuteStyle = {
    width: '50px',
    height: '30px',
};

const defaultDropDownLabelStyle = {
    height: '30px',
    lineHeight: '30px',
    fontSize: 13,
    color: '#666666',
    paddingRight: 0,
    display: 'flex',
    justifyContent: 'center',
    borderTop: 'none',
};

export default class TimePicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isFocus: false
        };
    }

    validate() {
        const {
            disabledTime: {before = '-1:00', after = '25:00'},
            hour,
            minute,
        } = this.props;

        const beforeHour = padLeftZero(String(before.split(':')[0]), 2);
        const beforeMinute = padLeftZero(String(before.split(':')[1]), 2);
        const afterHour = padLeftZero(String(after.split(':')[0]), 2);
        const afterMinute = padLeftZero(String(after.split(':')[1]), 2);

        const paddedBefore = `${beforeHour}:${beforeMinute}`;
        const paddedAfter = `${afterHour}:${afterMinute}`;
        const paddedTime = `${padLeftZero(String(hour), 2)}:${padLeftZero(String(minute), 2)}`;

        return paddedBefore < paddedTime && paddedTime < paddedAfter;
    }

    render() {

        const {
            hour,
            minute,
            hourList = Array(24).fill().map((v, index) => ({
                value: String(index),
                text: padLeftZero(String(index), 2)
            })),
            minuteList = Array(60).fill().map((v, index) => ({
                value: String(index),
                text: padLeftZero(String(index), 2)
            })),
            isActive = true,
            onChange,
            style = {},
        } = this.props;

        const {isFocus} = this.state;

        const hourStyle = defaultsDeep(this.props.hourStyle, defaultHourStyle);
        const hourLabelStyle = defaultsDeep(this.props.hourLabelStyle, defaultDropDownLabelStyle);
        const minuteStyle = defaultsDeep(this.props.minuteStyle, defaultMinuteStyle);
        const minuteLabelStyle = defaultsDeep(this.props.minuteLabelStyle, defaultDropDownLabelStyle);
        const isValidTime = this.validate();
        let modifier = isValidTime ? (isFocus ? '--focus' : '') : '--error';

        if(!isActive) {
            modifier = '--dim';
            hourLabelStyle.color = minuteLabelStyle.color = '#bbb';
        }

        return (
            <div className="elements-time-picker" style={style}>
                <div className={`elements-time-picker__input${modifier}`}
                     onClick={() => this.setState({isFocus: true})}
                >
                    <DropDownMenu maxHeight={200}
                                  arrowExist={false}
                                  value={hour}
                                  onChange={(event, index, value) => onChange(value, minute)}
                                  onChangeShowing={(isOpen) => this.setState({isFocus: isOpen})}
                                  style={hourStyle}
                                  labelStyle={hourLabelStyle}
                                  underlineStyle={{borderTop: 'none'}}
                    >
                        {
                            hourList.map((item, i) => (
                                <MenuItem value={item.value} key={i} primaryText={item.text}
                                          innerDivStyle={{padding: 0, display: 'flex', justifyContent: 'center',}}/>
                            ))
                        }
                    </DropDownMenu>
                    <span>:</span>
                    <DropDownMenu maxHeight={200}
                                  arrowExist={false}
                                  value={minute}
                                  onChange={(event, index, value) => onChange(hour, value)}
                                  onChangeShowing={(isOpen) => this.setState({isFocus: isOpen})}
                                  style={minuteStyle}
                                  labelStyle={minuteLabelStyle}
                                  underlineStyle={{borderTop: 'none'}}
                    >
                        {
                            minuteList.map((item, i) => (
                                <MenuItem value={item.value} key={i} primaryText={item.text}
                                          innerDivStyle={{padding: 0, display: 'flex', justifyContent: 'center',}}/>
                            ))
                        }
                    </DropDownMenu>

                </div>
                <div className="elements-time-picker__error-message">
                    {isValidTime ? '' : 'Invalid time range'}
                </div>
            </div>
        );
    }
};

TimePicker.propTypes = {
    hour: PropTypes.string,
    minute: PropTypes.string,
    isActive: PropTypes.bool,
    hourList: PropTypes.array,
    minuteList: PropTypes.array,
    disabledTime: PropTypes.object,
    onChange: PropTypes.func,
    style: PropTypes.object,
    hourStyle: PropTypes.object,
    hourLabelStyle: PropTypes.object,
    minuteStyle: PropTypes.object,
    minuteLabelStyle: PropTypes.object,
};

TimePicker.defaultProps = {
    disabledTime: {before: '-1:00', after: '25:00'},
    hour: '00',
    minute: '00',
};