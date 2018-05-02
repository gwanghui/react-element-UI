import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from 'material-ui/RadioButton/RadioButton';

const Radio = (props) => {
    const {
        height = 16,
        width = '100%',
        label,
        labelFontSize = 13,
        labelStyle = {},
        disabled = false,
        value,
        color,
        groupName,
        iconStyle = {
            marginRight: 0
        },
    } = props;

    const style = Object.assign({height, width, margin:height/2}, props.style);

    return (
        <RadioButton
            key={groupName+"-"+value}
            label={label}
            labelStyle={{fontSize: `${labelFontSize}px`, height: `${height}px`, lineHeight: `${height}px`, color:style.color, ...labelStyle}}
            checkedIcon={<div className={disabled ? 'radio-on__dimmed' : 'radio-on'}/>}
            uncheckedIcon={<div className={disabled ? 'radio-off__dimmed' : 'radio-off'}/>}
            style={style}
            inputStyle={{height}}
            iconStyle={{height, width: height, marginRight: iconStyle.marginRight}}
            rippleStyle={{top: -height / 2, left: -height / 2}}
            value={value}
            disabled={disabled}
        />
    )
};

export default Radio;

Radio.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    label: PropTypes.string,
    labelFontSize: PropTypes.number,
    labelStyle: PropTypes.object,
    iconStyle: PropTypes.object,
    disabled: PropTypes.bool,
    value: PropTypes.string.isRequired,
};