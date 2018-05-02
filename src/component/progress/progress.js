import React, {Component} from 'react';

export default class Progress extends Component {
    constructor(props){
        super(props);
        this.getCircumference = this.getCircumference.bind(this);
        this.getDashOffset = this.getDashOffset.bind(this);
    }

    getCircumference(radius) {
        return Math.PI * 2 * radius;
    }

    getDashOffset(percent, radius = 13) {
        const circumference = this.getCircumference(radius);
        if(percent <= 0){
            return circumference;
        }

        if(percent >= 100){
            return 0;
        }

        const ratio = (100 - percent) / 100;

        return circumference * ratio ;
    }

    render() {
        const {
            width = '30px',
            height = '30px',
            cx = 15,
            cy = 15,
            radius = 13,
            percent = 0,
            backgroundStrokeColor = '#CCC',
            strokeColor = '#5C65C0',
            strokeWidth = '4',
            transition = '10s',
            transitionEnd = ()=>{}
        } = this.props;

        return (
            <div style={{width: width, height: height, transform:'rotate(-90deg)'}} onTransitionEnd={transitionEnd}>
                <svg viewBox={`0 0 ${width.replace('px','')} ${height.replace('px','')}`} xmlns="http://www.w3.org/2000/svg" >
                    <circle
                        r={radius}
                        cx={cx}
                        cy={cy}
                        fill="none"
                        strokeWidth={strokeWidth}
                        strokeDasharray={this.getCircumference(radius)}
                        strokeMiterlimit="20"
                        strokeLinecap="round"
                        stroke={backgroundStrokeColor}
                        strokeDashoffset={0}/>
                    <circle
                        r={radius}
                        cx={cx}
                        cy={cy}
                        fill="none"
                        strokeWidth={strokeWidth}
                        strokeDasharray={this.getCircumference(radius)}
                        strokeMiterlimit="20" stroke={strokeColor}
                        strokeLinecap="round"
                        strokeDashoffset={this.getDashOffset(percent, radius)} style={{transition:`stroke-dashoffset ${transition} linear`}}/>
                </svg>
            </div>
        );
    }
}