import React from 'react';
import DayPicker from 'react-day-picker';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash/defaultsDeep';

const WEEKDAYS_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const Modifiers = (dateForValidBefore) => {
    return ({
        sunday: day => (day > dateForValidBefore) && (day.getDay() % 7 === 0),
        saturday: day => (day > dateForValidBefore) && (day.getDay() % 7 === 6),
    });
};

const defaultProps = {
    weekdaysShort: WEEKDAYS_SHORT,
};

const Calendar = (props) => {
    const {disabledDays} = props;
    const calendarProps = defaultsDeep({...props},
        {...defaultProps},
        {modifiers: Modifiers(disabledDays[0].before)});

    return (
        <DayPicker {...calendarProps} />
    );
};

export default Calendar;

Calendar.propTypes = {
    month: PropTypes.object,
    selectedDays: PropTypes.object,
    disabledDays: PropTypes.array,
    onDayClick: PropTypes.func,
    captionElement: PropTypes.func,
    canChangeMonth: PropTypes.bool,
    onMonthChange: PropTypes.func,
};