import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import * as sinon from "sinon";
import MaterialDropDownMenu from 'material-ui/DropDownMenu';
import DropDownMenu from "../../../../src/component/drop-down/menu/drop-down-menu";
import MenuItem from "../../../../src/component/menu-item/menu-item";

describe('Drop Down Menu Spec', () => {
    const spyOnChangeShowing = sinon.spy();
    let wrapper;
    let instance;

    beforeEach(() => {
        sinon.stub(global, 'setTimeout');
        wrapper = shallow(<DropDownMenu searchExist={true}>{[<MenuItem key="1" primaryText="asdf"></MenuItem>]}</DropDownMenu>);
        instance = wrapper.instance();
    });

    afterEach(() => {
       global.setTimeout.restore();
    });

    describe('pass props', () => {
        it('MaterialDropDownMenu', () => {
            expect(wrapper.find(MaterialDropDownMenu).prop('onClick')).to.equal(instance.onClick);
            expect(wrapper.find(MaterialDropDownMenu).prop('onClose')).to.equal(instance.onClose);
        });
    });

    describe('events', () => {
        describe('onClick', () => {
            let spyScrollIntoView = sinon.spy();
            beforeEach(() => {
                sinon.stub(document, 'querySelector').returns({
                    querySelectorAll: () => {
                        return [{scrollIntoView: sinon.spy(),}, {scrollIntoView: spyScrollIntoView,}]
                    }
                })
            });

            afterEach(() => {
                document.querySelector.restore();
                spyScrollIntoView.reset();
            });

            it('changes isOpen state to true and calls props.onChangeShowing when onClick is called', () => {
                wrapper.setProps({onChangeShowing: spyOnChangeShowing});
                wrapper.find(MaterialDropDownMenu).simulate('click');

                expect(instance.state.isOpen).to.be.true;
                expect(spyOnChangeShowing.calledWith(true)).to.be.true;
            });
        });

        it('changes isOpen state to false and calls props.onChangeShowing when onClose is called', () => {
            wrapper.setProps({onChangeShowing: spyOnChangeShowing});
            instance.onClose();

            expect(instance.state.isOpen).to.be.false;
            expect(spyOnChangeShowing.calledWith(false)).to.be.true;
        });

        describe('search input', () => {
            it('calls stopPropagation when key down', () => {
                const mockEvent = { stopPropagation: sinon.spy() };
                wrapper.find('.drop-down-menu__input').simulate('keydown', mockEvent);

                expect(mockEvent.stopPropagation.called).to.be.true;
            });

            it('sets text to state and calls focus of input when text change', () => {
                instance.searchInput = {focus: sinon.spy()};
                wrapper.find('.drop-down-menu__input').simulate('change', {target: {value: 'abc'}});

                expect(instance.state.filter).to.equal('abc');
                expect(instance.searchInput.focus.called).to.be.true;
            });
        });
        
        describe('Place Holder', () => {
            it('show placeholder when value is null or undefined', () => {
                wrapper.setProps({value: null, placeholder: "place holder"});
                expect(wrapper.find('.drop-down-menu__placeholder').text()).to.equal("place holder");

                wrapper.setProps({value: undefined, placeholder: "place holder"});
                expect(wrapper.find('.drop-down-menu__placeholder').text()).to.equal("place holder");
            });

            it('not show placeholder when value is exist', () => {
                wrapper.setProps({value: "any value", placeholder: "place holder"});
                expect(wrapper.find('.drop-down-menu__placeholder').length).to.equal(0);
            })
        });
    });
});