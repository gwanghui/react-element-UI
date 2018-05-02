import React from 'react';
import {expect} from 'chai';
import moment from "moment";
import mockdate from 'mockdate';
import momentTimezone from 'moment-timezone';
import {shallow} from "enzyme";
import ScheduleDayChooser from "../../../src/component/day-chooser/schedule-day-chooser";
import DayChooser from "../../../src/component/day-chooser/day-chooser";

describe('Schedule Day Chooser Spec', () => {
    let wrapper;
    let mockDays;

    beforeEach(() => {
        momentTimezone.tz.setDefault('Asia/Seoul');
        mockdate.set(404146800000); //1982-10-23 sat

        mockDays = [false, false, false, false, false, false, false];

        wrapper = shallow(<ScheduleDayChooser startDate={moment()}
                                              endDate={moment()}
                                              days={mockDays}
                                              onChange={() => {}}
        />);
    });

    afterEach(() => {
        momentTimezone.tz.setDefault();
        mockdate.reset();
    });

    describe('render', () => {
        describe('period is over 7days', () => {
            beforeEach(() => {
                wrapper.setProps({
                    startDate: moment(),
                    endDate: moment().add(10, 'days'),
                });
            });

            it('show errorMessage to "At least one day should be selected." when all days is false', () => {
                expect(wrapper.find(DayChooser).prop('errorMessage')).to.equal('common.programPop.daySelErrMsg');

                mockDays[0] = true;
                wrapper.setProps({days: mockDays});

                expect(wrapper.find(DayChooser).prop('errorMessage')).to.equal('');
            });
        });

        describe('period is within 7days', () => {
            beforeEach(() => {
                wrapper.setProps({
                    startDate: moment(),
                    endDate: moment().add(4, 'days'),
                });
            });

            it('show errorMessage to "Disable to repeat, change the date." when any day is not selected', () => {
                expect(wrapper.find(DayChooser).prop('errorMessage')).to.equal('common.programPop.daySelErrMsg');

                mockDays[4] = true;
                wrapper.setProps({days: mockDays});

                expect(wrapper.find(DayChooser).prop('errorMessage')).to.equal('common.programPop.repeatErrMsg');

                mockDays[3] = true;
                wrapper.setProps({days: mockDays});

                expect(wrapper.find(DayChooser).prop('errorMessage')).to.equal('');
            });
        });
    });
});