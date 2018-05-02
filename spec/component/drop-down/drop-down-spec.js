import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import sinon from "sinon";
import DropDown from "../../../src/component/drop-down/drop-down";

describe('Drop Down Spec', () => {
    const ITEMS = Object.freeze([
        {value: 'value1', text: 'text1'},
        {value: 'value2', text: 'text2'},
        {value: 'value3', text: 'text3'}
    ]);
    const spyOnSelect = sinon.spy();

    let wrapper;
    let instance;

    beforeEach(() => {
        wrapper = shallow(<DropDown items={ITEMS} onSelect={spyOnSelect} selected={ITEMS[0]}/>);
        instance = wrapper.instance();
    });

    afterEach(() => {
        spyOnSelect.reset();
    });

    describe('Showing menu items', () => {
        const mockEvent = {
            stopPropagation: () => {
            }
        };

        beforeEach(() => {
            expect(wrapper.find('.drop-down-menu').length).to.equal(0);
            wrapper.find('.drop-down__button').simulate('click', mockEvent);
        });

        it('change showing state as true', () => {
            expect(wrapper.state('showing')).to.be.true;
        });

        it('calls props.onChangeShowing with opposite showing state when onChangeShowing is exist', () => {
            let spyOnChangeShowing = sinon.spy();
            let changeShowingState = !instance.state.showing;
            wrapper.setProps({onChangeShowing: spyOnChangeShowing});

            wrapper.find('.drop-down__button').simulate('click', mockEvent);

            expect(spyOnChangeShowing.calledWith(changeShowingState)).to.be.true;
        });

        it('draws number of items', () => {
            expect(wrapper.find('.drop-down-menu').children().length).to.equal(3);
        });

        it('shows ▲ with class', () => {
            expect(wrapper.find('.drop-down-arrow-ascending').length).to.equal(1);
        });

        it('shows selected item with --selected class', () => {
            wrapper.setProps({selected: ITEMS[1]});

            expect(wrapper.find('.drop-down-menu').childAt(1).hasClass('drop-down__item--selected')).to.be.true;
        });

        describe('Clicking on item', () => {
            beforeEach(() => {
                wrapper.find('.drop-down-menu').childAt(1).simulate('mousedown');
            });

            it('changes showing state as false', () => {
                expect(wrapper.state('showing')).to.be.false;
            });

            it('runs onSelect with selected item', () => {
                expect(spyOnSelect.calledWith(ITEMS[1])).to.be.true;
            });
        });

        describe('Losing focus', () => {
            it('changes showing state with false', () => {
                wrapper.find('.drop-down').simulate('blur');

                expect(wrapper.state('showing')).to.be.false;
            });

            it('calls props.onChangeShowing with false when onChangeShowing is exist', () => {
                let spyOnChangeShowing = sinon.spy();
                wrapper.setProps({onChangeShowing: spyOnChangeShowing});

                wrapper.find('.drop-down').simulate('blur');

                expect(spyOnChangeShowing.calledWith(false)).to.be.true;
            });
        });

        it('has drop-down__indent when props.item has indent', () => {
            expect(wrapper.find('.drop-down__indent').length).to.equal(0);

            const mockItemsWithIndent = [{value: 'a', text: 'a', indent: 0},
                {value: 'b', text: 'b', indent: 1},
                {value: 'c', text: 'c', indent: 2}];

            wrapper.setProps({items: mockItemsWithIndent});

            expect(wrapper.find('.drop-down__indent').length).to.equal(3);
            expect(wrapper.find('.drop-down__indent').at(0).getElement().props.style.width).to.equal('0px');
            expect(wrapper.find('.drop-down__indent').at(1).getElement().props.style.width).to.equal('30px');
            expect(wrapper.find('.drop-down__indent').at(2).getElement().props.style.width).to.equal('60px');
        });
    });

    it('changes hovered state with true when mouse is over', () => {
        wrapper.find('.drop-down__button').simulate('mouseover');

        expect(wrapper.state('hovered')).to.be.true;
    });

    it('changes hovered state with false when mouse leaved', () => {
        wrapper.setState({hovered: true});

        wrapper.find('.drop-down__button').simulate('mouseleave');

        expect(wrapper.state('hovered')).to.be.false;
    });

    it('has maxHeight from props and arrow is not visible', () => {
        wrapper = shallow(<DropDown items={ITEMS} onSelect={spyOnSelect} arrowExist={false} selected={ITEMS[0]}/>);

        wrapper.setState({showing: true});

        expect(wrapper.find('.drop-down-arrow-ascending').length).to.equal(0);
        expect(wrapper.find('.drop-down-arrow-descending').length).to.equal(0);
    });

    it('sets selected value when received from props', () => {
        wrapper = shallow(<DropDown items={ITEMS} onSelect={spyOnSelect} selected={ITEMS[2]}/>);

        expect(wrapper.instance().props.selected).to.equal(ITEMS[2]);
    });

    it('set icon and text into menus when items include icon', () => {
        const iconItems = [{icon: 'icon1', text: 'text1'}, {icon: 'icon2', text: 'text2'}, {
            icon: 'icon3',
            text: 'text3'
        }];
        wrapper = shallow(<DropDown items={iconItems} onSelect={spyOnSelect} selected={iconItems[2]}
        />);

        wrapper.setState({'showing': true});

        expect(wrapper.find('.drop-down__icon-icon1').exists()).to.true;
        expect(wrapper.find('.drop-down__item').at(0).text()).to.equal('text1');
    });

    it('shows text value of selected state', () => {
        wrapper.setProps({selected: {text: 'blah blah', value: 'VAL'}});

        expect(wrapper.find('.drop-down__button').text()).to.equal('blah blah');
    });

    it('show icon without text when selected value include icon', () => {
        wrapper.setProps({selected: {icon: 'some-icon', value: 'ICON'}});

        expect(wrapper.find('.drop-down__icon-some-icon').exists()).to.true;
    });

    it('show text without icon when displayButtonIcon false', () => {
        wrapper.setProps({
            selected: {icon: 'some-icon', text: 'some-text', value: 'some-text'},
            displayButtonIcon: false
        });

        expect(wrapper.find('.drop-down__icon-some-icon').exists()).to.false;
        expect(wrapper.find('.drop-down__button').at(0).text()).to.equal('some-text');
    });

    it('shows drop down items when showing state is true', () => {
        wrapper.setState({'showing': true});
        expect(wrapper.find('.drop-down-menu').length).to.equal(1);
    });

    it('does not show ▼ as default', () => {
        expect(wrapper.find('.drop-down-arrow-descending').length).to.equal(0);
    });

    it('shows ▼ when hovered state is true', () => {
        wrapper.setState({hovered: true});

        expect(wrapper.find('.drop-down-arrow-descending').length).to.equal(1);
    });

    it('show ▼ as default when defaultShowing is true', () => {
        wrapper.setProps({alwaysShowingArrow: true});
        expect(wrapper.find('.drop-down-arrow-descending').length).to.equal(1);
    });

    it('has class with given prefixed className', () => {
        expect(wrapper.find('.testPrefix-drop-down').length).to.equal(0);

        wrapper = shallow(<DropDown items={ITEMS} onSelect={spyOnSelect} classNamePrefix={'testPrefix'}
                                    selected={ITEMS[0]}/>);

        expect(wrapper.find('.testPrefix-drop-down').length).to.equal(1);
    });

    it('getPrefixClassName', () => {
        expect(wrapper.instance().getPrefixClassName('hi')).to.equal('hi');

        wrapper.setProps({classNamePrefix: 'testPrefix'});

        expect(wrapper.instance().getPrefixClassName('hi')).to.equal('hi testPrefix-hi');
    });

    it('has style.bottom as 20px when dropDownMenuPosition is "top"', () => {
        wrapper.setState({showing: true});
        wrapper.setProps({dropDownMenuPosition: 'top'});

        expect(wrapper.find('.drop-down-menu').prop('style').bottom).to.equal('20px');
    });

    it('has style.bottom as empty string when dropDownMenuPosition is "bottom"', () => {
        wrapper.setState({showing: true});
        wrapper.setProps({dropDownMenuPosition: 'bottom'});

        expect(wrapper.find('.drop-down-menu').prop('style').bottom).to.equal('');
    });

    it('add "--disabled" after "drop-down" className when disabled is true', () => {
        wrapper.setProps({disabled: true});

        expect(wrapper.find('.drop-down--disabled').length).to.equal(1);
    });

    it('add "--disabled" after "drop-down__placeholder" className when disabled is true ', () => {
        wrapper.setProps({
            disabled: true,
            selected: {
                value: null
            }
        });

        expect(wrapper.find('.drop-down__placeholder--disabled').length).to.equal(1);
    });

    describe('function', () => {
        describe('getPrefixClassName', () => {
            it('return default class name when classNamePrefix props is undefined', () => {
                wrapper.setProps({
                    classNamePrefix: undefined,
                });

                const className = wrapper.instance().getPrefixClassName('drop-down', false);

                expect(className).to.be.equal('drop-down');
            });

            it('return default class name and sub class name when classNamePrefix props is exist', () => {
                wrapper.setProps({
                    classNamePrefix: 'sub',
                });

                const className = wrapper.instance().getPrefixClassName('drop-down', false);

                expect(className).to.be.equal('drop-down sub-drop-down');
            });

            it('return default disabled class name when classNamePrefix props is undefined and disabled is true', () => {
                wrapper.setProps({
                    classNamePrefix: undefined,
                });

                const className = wrapper.instance().getPrefixClassName('drop-down', true);

                expect(className).to.be.equal('drop-down--disabled');
            });

            it('return default disabled class name and sub class disabled name when classNamePrefix props is exist and disabled is true', () => {
                wrapper.setProps({
                    classNamePrefix: 'sub',
                });

                const className = wrapper.instance().getPrefixClassName('drop-down', true);

                expect(className).to.be.equal('drop-down--disabled sub-drop-down--disabled');
            });
        });
    });

    it('close menu when esc key pressed', () => {
        const event = {
            keyCode: 27,
            stopPropagation: () => {
            }
        };
        const spyOnBlur = sinon.spy(wrapper.instance(), 'onBlur');
        wrapper.setState({showing: true});
        wrapper.find('.drop-down').simulate('keydown', event);

        expect(spyOnBlur.calledOnce).to.true;
    });
});