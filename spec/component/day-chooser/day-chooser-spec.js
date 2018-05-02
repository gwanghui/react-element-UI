import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import * as sinon from "sinon";
import DayChooser from "../../../src/component/day-chooser/day-chooser";
import Checkbox from "../../../src/component/checkbox/checkbox";

describe('Day Chooser Spec', () => {
    const spyOnChange = sinon.spy();

    let wrapper;

    beforeEach(() => {
        let mockDays = [true, true, true, true, true, true, true];
        wrapper = shallow(<DayChooser days={mockDays} onChange={spyOnChange}/>)
    });

    describe('render', () => {
        it('has className via days value', () => {
            expect(wrapper.find('.day-chooser-selector__day--selected').length).to.equal(7);
        });

        it('has errorMessage when prop.errorMessage is exist', () => {
            expect(wrapper.find('.day-chooser-error').length).to.equal(0);

            wrapper.setProps({errorMessage: 'this is error message'});

            expect(wrapper.find('.day-chooser-error').length).to.equal(1);
            expect(wrapper.find('.day-chooser-error').text()).to.equal('this is error message');
        });

        it('shows day-chooser__dimmed_overlay when disabled is true', () => {
            expect(wrapper.find('.day-chooser__dimmed_overlay').length).to.equal(0);

            wrapper.setProps({disabled: true});
            expect(wrapper.find('.day-chooser__dimmed_overlay').length).to.equal(1);
        });
    });

    describe('event', () => {
        it('calls props.onChange when day-chooser-selector__day is clicked', () => {
            wrapper.find('.day-chooser-selector__day--selected').at(0).simulate('click');

            let changedDays = [false, true, true, true, true, true, true];
            expect(spyOnChange.calledWith(changedDays)).to.true;
        });
    });

    describe('passes props to Checkbox', () => {
        it('pass checked and onCheck', () => {
            expect(wrapper.find(Checkbox).prop('checked')).to.be.true;

            wrapper.find(Checkbox).prop('onCheck')();
            let changedDays = [false, false, false, false, false, false, false];
            expect(spyOnChange.calledWith(changedDays)).to.be.true;
        });

        it('passes disabled as true when disabled is true', () => {
            wrapper.setProps({disabled: true});
            expect(wrapper.find(Checkbox).prop('disabled')).to.be.true;
        });
    });
});