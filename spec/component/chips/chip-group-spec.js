import React from 'react';
import {expect} from 'chai';
import * as sinon from "sinon";
import {shallow} from "enzyme";

import Chip from '../../../src/component/chips/chip';
import ChipGroup from '../../../src/component/chips/chip-group';

describe('Chip Group Spec', () => {
    const spyOnSelect = sinon.spy();
    const spyOnDeselect = sinon.spy();
    const spyOnChipDragStart = sinon.spy();

    let wrapper;
    let instance;

    beforeEach(() => {
        wrapper = shallow(<ChipGroup items={[]} onSelect={spyOnSelect} onDeselect={spyOnDeselect}/>);
        instance = wrapper.instance();
    });

    afterEach(() => {
        spyOnSelect.reset();
        spyOnDeselect.reset();
        spyOnChipDragStart.reset();
    });

    describe('render', () => {
        describe('selectable chips area', () => {
            beforeEach(() => {
                wrapper.setProps({
                    items: [
                        {id: 1, name: 'hello'},
                        {id: 2, name: 'react'},
                        {id: 3, name: 'world'},
                    ]
                });
            });

            it('has chips children as many items', () => {
                const chips = wrapper.find('.chip-group-chips').find(Chip);

                expect(chips.length).to.equal(3);
                expect(chips.at(0).prop('name')).to.equal('hello');
                expect(chips.at(1).prop('name')).to.equal('react');
                expect(chips.at(2).prop('name')).to.equal('world');
            });
        });

        describe('selected chips area', () => {
            beforeEach(() => {
                wrapper.setProps({
                    items: [
                        {id: 1, name: 'hello'},
                        {id: 2, name: 'react'},
                        {id: 3, name: 'world'},
                    ],
                    selectedItems: [{id: 2, name: 'react'}]
                });
            });

            it('has chips children as many selectedItems except ', () => {
                const chips = wrapper.find('.chip-group-selected-chips').find(Chip);

                expect(chips.length).to.equal(1);
                expect(chips.at(0).prop('name')).to.equal('react');
            });
        });
    });

    describe('events', () => {
        beforeEach(() => {
            wrapper.setProps({
                items: [
                    {id: 1, name: 'hello'},
                    {id: 2, name: 'react'},
                    {id: 3, name: 'chips'},
                    {id: 4, name: 'world'},
                ],
                selectedItems: [{id: 2, name: 'react'}]
            });
        });

        describe('chips', () => {
            it('call onSelect with selected item when chip selected', () => {
                wrapper.find('.chip-group-chips').find(Chip).at(0).simulate('click');

                expect(spyOnSelect.calledWith({id: 1, name: 'hello'})).to.be.true;
            });

            it('call onDeselect with deselected item when chip deselected', () => {
                wrapper.find('.chip-group-selected-chips').find(Chip).at(0).simulate('requestDelete');

                expect(spyOnDeselect.calledWith({id: 2, name: 'react'})).to.be.true;
            });

            it('call onChipDragStart prop when onDragStart is called', () => {
                wrapper.setProps({onChipDragStart: spyOnChipDragStart});

                wrapper.find('.chip-group-chips').find(Chip).at(0).simulate('dragStart', {});

                expect(spyOnChipDragStart.calledWith({}, {id: 1, name: 'hello'})).to.be.true;
            });
        });
    });
});