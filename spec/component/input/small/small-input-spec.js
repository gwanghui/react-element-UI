import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import sinon from "sinon";
import SmallInput from "../../../../src/component/input/small/small-input";

describe('Small Input Spec', () => {
    let wrapper;
    let instance;

    let spyOnValueChange = sinon.spy();
    let spyOnPressEnter = sinon.spy();
    let spyOnFocus = sinon.spy();
    let spyOnBlur = sinon.spy();
    let spyElementFocus = sinon.spy();
    let spyWatchTextIsBlank = sinon.spy();

    beforeEach(() => {
        wrapper = shallow(<SmallInput onValueChange={spyOnValueChange}
                                      onPressEnter={spyOnPressEnter}
                                      watchTextIsBlank={spyWatchTextIsBlank}
                                      onFocus={spyOnFocus}
                                      onBlur={spyOnBlur}
                                      button={'hey'}
                                      focused={true}
                                      info={false} />);
        instance = wrapper.instance();
    });

    afterEach(() => {
        spyOnValueChange.reset();
        spyOnPressEnter.reset();
        spyOnFocus.reset();
        spyOnBlur.reset();
        spyElementFocus.reset();
        spyWatchTextIsBlank.reset();
    });

    describe('pass props', () => {
        it('onValueChange', () => {
            instance.smallInput = {value: 'hi', focus: spyElementFocus};
            wrapper.find('.small-input__input').at(0).simulate("keyup", {
                key: 'Enter', preventDefault: () => {
                }
            });
            expect(spyOnPressEnter.called).to.be.true;
            expect(spyWatchTextIsBlank.calledWith('hi')).to.be.true;
        });
    });

    describe('func', () => {
        it('componentDidMount', () => {
            instance.smallInput = {value: 'hi', focus: spyElementFocus};
            instance.componentDidMount();
            expect(spyElementFocus.called).to.be.true;
        });

        it('componentWillReceiveProps', () => {
            instance.smallInput = {value: 'hi', focus: spyElementFocus};

            const nextProps = {value: 'test'};
            instance.componentWillReceiveProps(nextProps);
            expect(instance.smallInput.value).to.be.equals('test');
        });

        it('onKeyUp', () => {
            const mockEvent = {key: 'not enter'};
            instance.smallInput = {value: 'hi', focus: spyElementFocus};

            instance.onKeyUp(mockEvent);

            expect(spyWatchTextIsBlank.called, 'call watchTextIsBlank when keyUp with available button').to.be.true;
        });

        it('onKeyUp when press enter', () => {
            const mockEvent = {
                key: 'Enter', preventDefault: () => {
                }
            };
            instance.smallInput = {value: 'hi', focus: spyElementFocus};

            instance.onKeyUp(mockEvent);

            expect(spyWatchTextIsBlank.called, 'call watchTextIsBlank when keyUp with available button').to.be.true;
            expect(spyOnPressEnter.called, 'call spyOnPressEnter when keyUp').to.be.true;
        });

        it('onFocus', () => {
            const mockEvent = {
                preventDefault: () => {
                }
            };
            expect(wrapper.state('focus')).to.be.false;

            instance.onFocus(mockEvent);

            expect(wrapper.state('focus')).to.be.true;
            expect(spyOnFocus.calledWith(mockEvent)).to.be.true;
        });

        it('onBlur', () => {
            const mockEvent = {
                preventDefault: () => {
                }
            };
            instance.onFocus(mockEvent);

            instance.onBlur(mockEvent);

            expect(wrapper.state('focus')).to.be.false;
            expect(spyOnBlur.calledWith(mockEvent)).to.be.true;
        });

        it('getPrefixCSS', () => {
            expect(instance.getPrefixCSS('')).to.be.equal('');
            expect(instance.getPrefixCSS('abs')).to.be.equal('--abs');
        });

        it('initializeStyle', () => {
            const style = {
                inputWidth: '0px',
                height: '40px',
                inputLeftPadding: '40px',
                inputRightPadding: '40px',
                textAlign: 'left',
                buttonWidth: '10px',
                backgroundColor: 'transparent',
                borderWidth: '0px 0px 1px',
                borderColor: '#d8d8d8',
                fontSize: '16px',
            };

            expect(instance.initializeStyle(style, false, false, false, null)).to.deep.equal({
                width: '0px',
                height: '40px',
                paddingLeft: '40px',
                paddingRight: '40px',
                textAlign: 'left',
                backgroundColor: 'transparent',
                fontSize: '16px',
                borderWidth: '0px 0px 1px',
                borderColor: '#d8d8d8',
                overflow: "visible",
                textOverflow: "normal",
                whiteSpace: "normal",
                fontWeight: "lighter",
                minHeight: '30px',
            });

            expect(instance.initializeStyle(style, false, false, false,{type:'error'}).borderColor).to.deep.equal('#ef6144');
            expect(instance.initializeStyle(style, false, false, false,{type:'verified'}).borderColor).to.deep.equal('#d8d8d8');

            wrapper.setState({focus: true});

            expect(instance.initializeStyle(style, false, false, false,null).borderColor).to.deep.equal('#2e3ab1');

            expect(instance.initializeStyle(style, true, false, false,null).backgroundColor).to.deep.equal('#f9f9f9');
            expect(instance.initializeStyle(style, true, false, false,null).border).to.deep.equal('1px solid #eeeeee');
            expect(instance.initializeStyle(style, true, false, false,null).color).to.deep.equal('#bbbbbb');

            delete style.borderColor;
            expect(instance.initializeStyle(style, false, false, false,null).borderColor).to.deep.equal('#2e3ab1');
        });

        it('onValueChange', () => {
            instance.smallInput = {value: 'hi'};
            instance.onChange();
            expect(spyOnValueChange.calledWith('hi')).to.be.true;
        });

        it('renderConditionText spec', () => {
            let condition = {}, labelWidth = '10px';

            let result = instance.renderConditionText(condition, labelWidth);

            expect(result.props.className).to.be.equals('');
            expect(result.props.style.paddingLeft).to.be.equals('10px');

            condition.type = 'error';
            condition.text = 'error';
            result = instance.renderConditionText(condition, labelWidth);

            expect(result.props.className).to.be.equals('small-input__errorText');
            expect(result.props.style.paddingLeft).to.be.equals('10px');
            expect(result.props.children[0]).to.be.equals('error');

            condition.type = 'verified';
            condition.text = 'verified';
            result = instance.renderConditionText(condition, labelWidth);

            expect(result.props.className).to.be.equals('small-input__verifiedText');
            expect(result.props.style.paddingLeft).to.be.equals('10px');
            expect(result.props.children[0]).to.be.equal('verified');

            condition.type = 'error';
            condition.text = 'error';
            result = instance.renderConditionText(condition, labelWidth);

            expect(result.props.className).to.be.equals('small-input__errorText');
            expect(result.props.style.paddingLeft).to.be.equals('10px');
            expect(result.props.children[0]).to.be.equal('error');
        });

        it('onMouseOverInfoIcon spec', () => {
             instance.onMouseOverInfoIcon();
             expect(wrapper.state('isPaperDisplay')).to.be.equals('block');
        });

        it('onMouserLeaveInfoIcon spec', () => {
            instance.onMouserLeaveInfoIcon();
            expect(wrapper.state('isPaperDisplay')).to.be.equals('none');
        });
    });
});
