import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';
import Radio from "./radio";

const RadioGroup = (props) => {

    const {
        name,
        defaultSelected,
        valueSelected = defaultSelected,
        onChange,
        radioGroupStyle,
    } = props;

    return (
        <RadioButtonGroup
            className='radio-group'
            name={name}
            defaultSelected={defaultSelected}
            valueSelected={valueSelected}
            labelPosition='right'
            onChange={onChange}
            style={radioGroupStyle}
        >
            {props.children.map((item)=>{
                return Radio({...item.props, groupName: name})
            })}

        </RadioButtonGroup>
    );
};

export default RadioGroup;

RadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    defaultSelected: PropTypes.any,
    valueSelected: PropTypes.any,
    onChange: PropTypes.func,
    radioGroupStyle: PropTypes.object,
};