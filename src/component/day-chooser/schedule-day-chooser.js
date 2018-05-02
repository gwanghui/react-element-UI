import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment-timezone";
import DayChooser from "./day-chooser";

const ScheduleDayChooser = ({startDate, endDate, errorMsg, ...props}) => {
    let errorMessage = '';

    if(endDate.diff(startDate, 'day') < 7) {
        errorMessage = errorMsg;

        for (const m = moment(startDate); m.isSameOrBefore(endDate); m.add(1, 'days')) {
            if(props.days.some((day, index) => day && m.day() === index)) {
                errorMessage = '';
                break;
            }
        }
    }

    if(props.days.every(day => !day)) {
        errorMessage = errorMsg;
    }

    return (
        <DayChooser {...props} errorMessage={errorMessage}/>
    );
};

export default ScheduleDayChooser;

ScheduleDayChooser.propTypes = {
    ...DayChooser.propTypes,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
};