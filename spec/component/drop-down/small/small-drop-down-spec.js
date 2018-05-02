import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import sinon from "sinon";
import SmallDropDown from "../../../../src/component/drop-down/small/small-drop-down";
import DropDownMenu from "../../../../src/component/drop-down/menu/drop-down-menu";

describe('Small Drop Down Spec', () => {
    const spyDropDownSelect = sinon.spy();
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<SmallDropDown dropDownSelect={spyDropDownSelect}/>);
    });

    afterEach(() => {
        spyDropDownSelect.reset();
    });
    
    describe('pass props', () => {
        it('DropDownMenu', () => {
            expect(wrapper.find(DropDownMenu).exists()).to.true;
            expect(wrapper.find(DropDownMenu).prop('onChange')).to.equal(spyDropDownSelect);
        });
    });
});