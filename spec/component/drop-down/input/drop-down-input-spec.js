import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import * as sinon from "sinon";
import Popover from "../../../../src/component/popover/popover";
import DropDownInput from "../../../../src/component/drop-down/input/drop-down-input";
import MenuItem from "../../../../src/component/menu-item/menu-item";

describe('Drop Down Input Spec', () => {
    const spyOnChange = sinon.spy();

    let wrapper;

    beforeEach(() => {
        let mockChildren = [<MenuItem value={{value: 'a', text: 'A'}} primaryText={'A'}/>];

        wrapper = shallow(<DropDownInput children={mockChildren}/>);
    });

    describe('rendering', () => {
        it('has arrow className via props.visibility', () => {
            expect(wrapper.find('.drop-down-input__arrow--descending').length).to.equal(1);

            wrapper.setState({visibility: true});

            expect(wrapper.find('.drop-down-input__arrow--ascending').length).to.equal(1);
        });

        it('binds onClick prop when children type is menuItem', () => {
            expect(wrapper.find(MenuItem).prop('onClick').name).to.equal('bound onMenuItemClick');
        });
    });

    describe('event', () => {
        it('changes visibility state to true when drop-down-input is clicked', () => {
            wrapper.find('.drop-down-input').simulate('click');

            expect(wrapper.instance().state.visibility).to.true;
        });

        it('changes visibility state to false when onRequestClose of Popover is called', () => {
            wrapper.find(Popover).simulate('requestClose');

            expect(wrapper.instance().state.visibility).to.false;
        });

        it('changes selectedIndex, visibility state and calls props.onChange when onMenuItemClick is called', () => {
            wrapper.setProps({onChange: spyOnChange});
            wrapper.instance().onMenuItemClick({value: 'a', text: 'A'}, 0);

            expect(wrapper.instance().state.selectedIndex).to.equal(0);
            expect(wrapper.instance().state.visibility).to.false;
            expect(spyOnChange.calledWith({value: 'a', text: 'A'}, 0)).to.true;
        });
    });
});