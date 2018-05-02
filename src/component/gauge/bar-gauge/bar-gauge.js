import React from 'react';

const BarGauge = (props) => {
    const {
        value = 0,
        color = '#70c8be',
        text = '',
        size = 115,
    } = props;

    const CELSIUS = '\xB0C';

    return (
        <div className="bar-gauge">
            <div className="bar-gauge-wrapper" style={{height: size}}>
                <div className="bar-gauge-background"/>
                <div className="bar-gauge-body" style={
                    {
                        height: `${value}%`,
                        backgroundColor: color,
                        visibility: (value > 0) ? 'visible' : 'hidden',
                    }
                }/>
                <div className="bar-gauge-description">
                    <div className="bar-gauge__value">{value}{CELSIUS}</div>
                    <div className="bar-gauge__text">{text}</div>
                </div>
            </div>
        </div>
    );
};

export default BarGauge;