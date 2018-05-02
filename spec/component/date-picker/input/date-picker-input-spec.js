import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import moment from "moment";
import * as sinon from "sinon";
import DatePickerInput from "../../../../src/component/date-picker/input/date-picker-input";
import DatePicker from "../../../../src/component/date-picker/date-picker";

describe('Date Picker Input Spec', () => {
    const spyOnChange = sinon.spy();

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<DatePickerInput date={moment()}
                                           onChange={spyOnChange}/>);
    });

    afterEach(() => {
        spyOnChange.reset();
    });

    describe('rendering', () => {
        it('has className via state.visibility and props.isActive', () => {
            wrapper.setState({visibility: true, isActive: true});

            expect(wrapper.find('.date-picker-input__focus').length).to.equal(1);

            wrapper.setState({visibility: true, isActive: false});

            expect(wrapper.find('.date-picker-input__focus').length).to.equal(1);

            wrapper.setState({visibility: false, isActive: true});

            expect(wrapper.find('.date-picker-input').length).to.equal(1);

            wrapper.setState({visibility: false, isActive: false});

            expect(wrapper.find('.date-picker-input').length).to.equal(1);
        });
    });

    describe('event', () => {
        it('sets visibility state to true when date-picker-input is clicked', () => {
            wrapper.setState({visibility: true});
            wrapper.find('.date-picker-input__focus').simulate('click');

            expect(wrapper.instance().state.visibility).to.be.true;
        });

        it('sets visibility state to false and calls props.onChange when onDayClick of DatePicker is called', () => {
            wrapper.find(DatePicker).simulate('dayClick', null, {disabled: undefined});

            expect(spyOnChange.called).to.be.true;
            expect(wrapper.instance().state.visibility).to.false;
        });

        it('sets visibility state to false when onClose of DatePicker is called', () => {
            wrapper.find(DatePicker).simulate('close');

            expect(wrapper.instance().state.visibility).to.false;
        });
    });
});