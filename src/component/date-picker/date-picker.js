import React from 'react';
import PropTypes from 'prop-types';

import Popover from "../popover/popover";
import Calendar from "./calendar";

const DatePicker = (props) => {
    const {month, selectedDays, disabledDays, anchorEl, isOpen, onDayClick, onClose} = props;

    return (
        <Popover anchorEl={anchorEl}
                 open={isOpen}
                 onRequestClose={onClose}
                 width={'258px'}
        >
            <Calendar onDayClick={onDayClick}
                      month={month}
                      selectedDays={selectedDays}
                      disabledDays={disabledDays}
            />
        </Popover>
    );
};

export default DatePicker;

DatePicker.propTypes = {
    month: PropTypes.object,
    selectedDays: PropTypes.object,
    disabledDays: PropTypes.array,
    anchorEl: PropTypes.any,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onDayClick: PropTypes.func,
};