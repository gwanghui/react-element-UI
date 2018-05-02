import React,{Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const DonutGauge = (props) => {
    const {
        value,
        color = '#70c8be',
        backgroundColor = '#eceff4',
        text = '',
        size = 115,
        thickness = 4
    } = props;


    return (
        <div className="donut-gauge">
            <div className="donut-gauge-wrapper" style={{width: size, height: size}}>
                <div className="donut-gauge-background">
                    <CircularProgress mode="determinate"
                                      color={backgroundColor}
                                      value={100}
                                      thickness={thickness}
                                      size={size}/>
                </div>
                <div className="donut-gauge-body">
                    <CircularProgress mode="determinate"
                                      value={value}
                                      color={color}
                                      thickness={thickness}
                                      size={size}/>
                </div>
                <div className="donut-gauge-description" style={{width: size, height: size}}>
                    <div className="donut-gauge__value">{value}%</div>
                    <div className="donut-gauge__text">{text}</div>
                </div>
            </div>
        </div>
    );
};


export default DonutGauge;