import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../checkbox/checkbox';

const DayChooser = ({days, onChange, errorMessage, disabled = false}) => {
    days = [...days];

    const DAYS = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Fridays', 'Saturdays'
        ];

    const onClick = (dayOfWeek) => {
        days[dayOfWeek] = !days[dayOfWeek];
        onChange([...days]);
    };

    const isEveryDay = () => {
        return days.every(day => day);
    };

    const onIsEveryDayCheck = () => {
        const value = isEveryDay();
        onChange(days.map(() => !value));
    };

    return (
        <div className="day-chooser-wrapper">
            <div className="day-chooser">
                <table className={`day-chooser-selector${errorMessage ? '--error' : ''}`}>
                    <tbody>
                    <tr>
                        {
                            days.map((day, index) => (
                                <td key={index}
                                    className={`day-chooser-selector__day${day === true ? '--selected' : ''}`}
                                    onClick={() => onClick(index)}
                                >{DAYS[index]}</td>
                            ))
                        }
                    </tr>
                    </tbody>
                </table>
                {
                    disabled &&
                    <div className="day-chooser__dimmed_overlay"/>
                }
                <Checkbox label={'Every Days'}
                          checked={isEveryDay()}
                          disabled={disabled}
                          onCheck={onIsEveryDayCheck}
                          labelStyle={{marginLeft: '-10px'}}
                />
            </div>
            <div className={`day-chooser-error${errorMessage ? '' : '--hidden'}`}>{errorMessage}</div>
        </div>
    );
};

export default DayChooser;

DayChooser.propTypes = {
    days: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
};