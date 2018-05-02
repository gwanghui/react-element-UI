import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import {shallow} from "enzyme";
import ResolutionItem from "../../../../src/component/drop-down/resolution-drop-down/resolution-item";

describe('ResolutionItem Spec', () => {
    let wrapper;
    let spyOnSelected = sinon.spy();

    beforeEach(() => {
        wrapper = shallow(<ResolutionItem item={{value: 'value', text: 'text'}} onSelected={spyOnSelected}/>);
    });

    afterEach(() => {
        spyOnSelected.reset();
    });

    it('shows resolution value', () => {
        expect(wrapper.find('.resolution-item__title').text()).to.equal('value');
    });

    it('shows resolution text', () => {
        expect(wrapper.find('.resolution-item__resolution').text()).to.equal('text');
    });

    describe('Selected Orientation', () => {
        const assertOrientationIsSelected = (orientation) => {
            expect(wrapper.find(`.resolution-item__${orientation}--selected`).length).to.equal(0);

            wrapper.setProps({selectedOrientation: orientation});

            expect(wrapper.find(`.resolution-item__${orientation}--selected`).length).to.equal(1);
        };

        it('changes orientation selected class depends on selectedOrientation', () => {
            assertOrientationIsSelected('horizontal');
            assertOrientationIsSelected('vertical');
        });
    });

    describe('Orientation is clicked', () => {
        const assertOnSelectedIsCalled = (orientation) => {
            wrapper.find(`.resolution-item__${orientation}`).simulate('click');

            expect(spyOnSelected.calledWith({value: 'value', text: 'text', orientation})).to.be.true;
        };

        it('calls onSelected props with orientation', () => {
            assertOnSelectedIsCalled('horizontal');
            assertOnSelectedIsCalled('vertical');
        });
    });

    it('includes divider when includeDivider is true', () => {
        expect(wrapper.find('.resolution-item__divider').length).to.equal(0);

        wrapper.setProps({includeDivider: true});

        expect(wrapper.find('.resolution-item__divider').length).to.equal(1);
    });

    it('set diabled style when isDisabled props is true', () => {
        wrapper.setProps({isDisabled: true});

        expect(wrapper.find('.resolution-item__title--disabled')).to.be.lengthOf(1);
        expect(wrapper.find('.resolution-item__resolution--disabled')).to.be.lengthOf(1);
        expect(wrapper.find('.resolution-item__horizontal--disabled')).to.be.lengthOf(1);
        expect(wrapper.find('.resolution-item__vertical--disabled')).to.be.lengthOf(1);
    });

    it('disabled icon button onClick event when isDisabled props is true', () => {
        wrapper.setProps({isDisabled: true});
        wrapper.find('.resolution-item__horizontal--disabled').simulate('click');
        wrapper.find('.resolution-item__vertical--disabled').simulate('click');

        expect(spyOnSelected.called).to.be.false;
    });
});