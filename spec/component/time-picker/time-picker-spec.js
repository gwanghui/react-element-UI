import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import {shallow} from "enzyme";
import DropDownMenu from "../../../src/component/drop-down/menu/drop-down-menu";
import MenuItem from "../../../src/component/menu-item/menu-item";
import TimePicker from "../../../src/component/time-picker/time-picker";

describe('Time Picker Spec', () => {
    const spyOnChange = sinon.spy();

    let wrapper;
    let instance;

    afterEach(() => {
        spyOnChange.reset();
    });

    let someDate;

    beforeEach(() => {
        someDate = new Date();
        wrapper = shallow(
            <TimePicker hour={"7"}
                        minute={"17"}
                        onChange={spyOnChange}
            />);
        instance = wrapper.instance();
    });

    describe('mapping props', () => {
        it('has props', () => {
            expect(instance.props.onChange).to.equal(spyOnChange);
            expect(instance.props.hour).to.equal('7');
            expect(instance.props.minute).to.equal('17');
        });
    });

    describe('events', () => {
        it('calls spyOnChange with hour and minute when hour DropDownMenu changed', () => {
             wrapper.find(DropDownMenu).at(0).simulate('change', null, null, '9');

             expect(spyOnChange.calledWith('9', '17')).to.be.true;
        });

        it('sets false to state.isFocus when hour DropDownMenu calls changeShowing with false', () => {
            wrapper.setState({isFocus: true});
            wrapper.find(DropDownMenu).at(0).simulate('changeShowing', false);

            expect(instance.state.isFocus).to.be.false;
        });

        it('calls spyOnChange with hour and minute when minute DropDownMenu changed', () => {
            wrapper.find(DropDownMenu).at(1).simulate('change', null, null, '7');

            expect(spyOnChange.calledWith('7', '7')).to.be.true;
        });

        it('sets false to state.isFocus when minute DropDownMenu calls changeShowing with false', () => {
            wrapper.setState({isFocus: true});
            wrapper.find(DropDownMenu).at(1).simulate('changeShowing', false);

            expect(instance.state.isFocus).to.be.false;
        });
    });

    describe('rendering', () => {
        describe('hour', () => {
            it('shows default hour list when props.hourList does not exist', () => {
                expect(wrapper.find(DropDownMenu).at(0).find(MenuItem).length).to.equal(24);

                wrapper.find(DropDownMenu).at(0).find(MenuItem).forEach((item, index) => {
                    expect(item.prop('value')).to.equal(String(index));
                });
            });

            it('shows hour list as props.hourList', () => {
                wrapper.setProps({
                    hourList: [
                        { value: '0', text: '00'},
                        { value: '2', text: '02'},
                        { value: '4', text: '04'},
                    ]
                });
                expect(wrapper.find(DropDownMenu).at(0).find(MenuItem).length).to.equal(3);

                wrapper.find(DropDownMenu).at(0).find(MenuItem).forEach((item, index) => {
                    expect(item.prop('value')).to.equal(String(index * 2));
                });
            });
        });

        describe('minute', () => {
            it('shows default minute list when props.hourList does not exist', () => {
                expect(wrapper.find(DropDownMenu).at(1).find(MenuItem).length).to.equal(60);

                wrapper.find(DropDownMenu).at(0).find(MenuItem).forEach((item, index) => {
                    expect(item.prop('value')).to.equal(String(index));
                });
            });

            it('shows minute list as props.minuteList', () => {
                wrapper.setProps({
                    minuteList: [
                        { value: '0', text: '00'},
                        { value: '2', text: '02'},
                        { value: '4', text: '04'},
                        { value: '6', text: '06'},
                    ]
                });
                expect(wrapper.find(DropDownMenu).at(1).find(MenuItem).length).to.equal(4);

                wrapper.find(DropDownMenu).at(1).find(MenuItem).forEach((item, index) => {
                    expect(item.prop('value')).to.equal(String(index * 2));
                });
            });
        });

        it('has elements-time-picker when time is validate', () => {
            wrapper.setProps({disabledTime: {before: "07:00"}});

            expect(wrapper.find('.elements-time-picker__input').length).to.equal(1);
            expect(wrapper.find('.elements-time-picker__input--error').length).to.equal(0);

            expect(wrapper.find('.elements-time-picker__error-message').text())
                .to.equal('');
        });

        it('has elements-time-picker--error and errorMessage when time is invalid', () => {
            wrapper.setProps({disabledTime: {before: "08:00"}});

            expect(wrapper.find('.elements-time-picker__input').length).to.equal(0);
            expect(wrapper.find('.elements-time-picker__input--error').length).to.equal(1);
            expect(wrapper.find('.elements-time-picker__error-message').text())
                .to.equal('Invalid time range');
        });
    });

    describe('methods', () => {
        describe('validate', () => {
            describe('disabled time is {before: "3:0"}', () => {
                beforeEach(() => {
                    wrapper.setProps({disabledTime: {before: "3:0"}});
                });

                it('returns true when selected time is 04:00', () => {
                    wrapper.setProps({hour: '4', minute: '0'});

                    expect(instance.validate()).to.be.true;
                });

                it('returns false when selected time is 3:0', () => {
                    wrapper.setProps({hour: '3', minute: '0'});

                    expect(instance.validate()).to.be.false;
                });

                it('returns false when selected time is 2:0', () => {
                    wrapper.setProps({hour: '2', minute: '0'});

                    expect(instance.validate()).to.be.false;
                });
            });

            describe('disabled time is {after: "10:30"}', () => {
                beforeEach(() => {
                    wrapper.setProps({disabledTime: {after: "10:30"}});
                });

                it('returns true when selected time is 9:0', () => {
                    wrapper.setProps({hour: '9', minute: '0'});

                    expect(instance.validate()).to.be.true;
                });

                it('returns false when selected time is 10:30', () => {
                    wrapper.setProps({hour: '10', minute: '30'});

                    expect(instance.validate()).to.be.false;
                });

                it('returns false when selected time is 14:0', () => {
                    wrapper.setProps({hour: '14', minute: '0'});

                    expect(instance.validate()).to.be.false;
                });
            });

            describe('disabled time is {before: "10:30", after: "16:50"}', () => {
                beforeEach(() => {
                    wrapper.setProps({disabledTime: {before: "10:30", after: "16:50"}});
                });

                it('returns true when selected time is 12:0', () => {
                    wrapper.setProps({hour: '12', minute: '0'});

                    expect(instance.validate()).to.be.true;
                });

                it('returns false when selected time is 10:30', () => {
                    wrapper.setProps({hour: '10', minute: '30'});

                    expect(instance.validate()).to.be.false;
                });

                it('returns false when selected time is 16:50', () => {
                    wrapper.setProps({hour: '16', minute: '50'});

                    expect(instance.validate()).to.be.false;
                });

                it('returns false when selected time is 9:50', () => {
                    wrapper.setProps({hour: '9', minute: '50'});

                    expect(instance.validate()).to.be.false;
                });

                it('returns false when selected time is 18:50', () => {
                    wrapper.setProps({hour: '18', minute: '50'});

                    expect(instance.validate()).to.be.false;
                });
            });
        });
    });
});