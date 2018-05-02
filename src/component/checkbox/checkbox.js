import React from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash/defaultsDeep';
import MaterialCheckbox from 'material-ui/Checkbox';

const style = {
    width: '100%',
    height: '16px',
};

const labelStyle = {
    fontSize: 13,
    width: '100%',
    height: '16px',
    lineHeight: '16px',
};

const inputStyle = {
    height: '16px',
};

const iconStyle = {
    width: '16px',
    height: '16px',
};

const defaultProps = {
    style,
    labelStyle,
    inputStyle,
    iconStyle,
    disabled: false,
    disableTouchRipple: true,
};

const Checkbox = (props) => {
    const materialCheckboxProps = defaultsDeep({...props}, {...defaultProps});

    return (
        <div className="checkbox">
            <MaterialCheckbox {...materialCheckboxProps}
                checkedIcon={<div className= {props.disabled ? 'checkbox-on__dimmed' : 'checkbox-on'}/>}
                uncheckedIcon={<div className= {props.disabled ? 'checkbox-off__dimmed' : 'checkbox-off'}/>}
            />
        </div>
    );
};

export default Checkbox;

Checkbox.propTypes = {
    label : PropTypes.string,
    disabled : PropTypes.bool,
    checked : PropTypes.bool.isRequired,
    onCheck : PropTypes.func.isRequired,
    style: PropTypes.object,
    labelStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    iconStyle: PropTypes.object,
};