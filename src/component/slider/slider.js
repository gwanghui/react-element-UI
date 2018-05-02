import React from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash/defaultsDeep';
import MaterialSlider from 'material-ui/Slider';

const sliderStyle = {
    margin: 0,
    height: '22px',
};

const defaultProps = {
    sliderStyle,
    className: 'slider',
    disableFocusRipple: true,
    max: 100,
    min: 0,
    defaultValue: 50,
};

const defaultSliderValueStyle = {
    width: 30,
    position: 'relative',
    fontSize: 13,
    color: '#9b9b9b',
    marginBottom: '-4px',
};

const Slider = (props) => {
    const originalProps = {...props};
    const sliderValueStyle = {...defaultSliderValueStyle, left: `calc(${props.value}% - 10px)`, ...props.sliderValueStyle};

    delete originalProps.sliderValueStyle;
    delete originalProps.wrapperStyle;

    const materialSliderProps = defaultsDeep({...originalProps}, {...defaultProps});

    return (
        <div className="slider" style={props.wrapperStyle}>
            <div style={sliderValueStyle}>
                {`${props.value}%`}
            </div>
            <MaterialSlider {...materialSliderProps}/>
        </div>
    );
};

export default Slider;

Slider.propTypes = {
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    className: PropTypes.string,
    wrapperStyle: PropTypes.object,
    style: PropTypes.object,
    sliderStyle: PropTypes.object,
    sliderValueStyle: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onDragStart: PropTypes.func,
    onDragStop: PropTypes.func,
    axis: PropTypes.string,
};