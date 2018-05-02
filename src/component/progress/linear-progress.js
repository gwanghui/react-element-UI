import React from 'react';

const LinearProgress = (props) => {
    const {
        value = 0,
        color = '#70c8be',
        height,
    } = props;

    return (
        <div className="linear-progress" style={{flex: '1 1 780px'}}>
            <div className="linear-progress-wrapper" >
                <div className="linear-progress-background" style={{height}}/>
                <div className="linear-progress-body" style={
                    {
                        width: `${value}%`,
                        backgroundColor: color,
                        visibility: (value > 0) ? 'visible' : 'hidden',
                        height,
                    }
                }/>
            </div>
        </div>
    );
};

export default LinearProgress;