import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import {shallow} from "enzyme";

import DatePicker from "../../../src/component/date-picker/date-picker";
import Calendar from "../../../src/component/date-picker/calendar";
import Popover from "../../../src/component/popover/popover";

describe('Date Picker Spec', () => {
    const spyOnDayClick = sinon.spy();
    const spyOnClose = sinon.spy();

    let wrapper;
    let instance;

    afterEach(() => {
       spyOnDayClick.reset();
        spyOnClose.reset();
    });

    let someDate;

    beforeEach(() => {
        someDate = new Date();
        wrapper = shallow(
            <DatePicker onDayClick={spyOnDayClick}
                        month={someDate}
                        selectedDays={someDate}
                        disabledDays={[{before: someDate}]}
                        anchorEl="some element"
                        isOpen={true}
                        onClose={spyOnClose}
            />);
        instance = wrapper.instance();
    });

    describe('mapping props', () => {
        it('has props', () => {
            expect(wrapper.find(Calendar).prop('onDayClick')).to.equal(spyOnDayClick);
            expect(wrapper.find(Calendar).prop('month')).to.equal(someDate);
            expect(wrapper.find(Calendar).prop('selectedDays')).to.equal(someDate);
            expect(wrapper.find(Calendar).prop('disabledDays')).to.deep.equal([{before: someDate}]);
            expect(wrapper.find(Popover).prop('anchorEl')).to.equal('some element');
            expect(wrapper.find(Popover).prop('open')).to.be.true;
            expect(wrapper.find(Popover).prop('onRequestClose')).to.equal(spyOnClose);
        });
    });
});