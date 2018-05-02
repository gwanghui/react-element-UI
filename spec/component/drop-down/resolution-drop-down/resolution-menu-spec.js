import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import {shallow} from "enzyme";
import ResolutionMenu from "../../../../src/component/drop-down/resolution-drop-down/resolution-menu";
import ResolutionItem from "../../../../src/component/drop-down/resolution-drop-down/resolution-item";

describe('ResolutionMenu Spec', () => {
    let wrapper;
    let instance;
    let spyOnItemSelected;
    let spyOnBlur;

    const createResolutionItem = (value, text) => ({value, text});

    const resolutionItems = [
        createResolutionItem('value1', 'text1'),
        createResolutionItem('value2', 'text2'),
        createResolutionItem('value3', 'text3'),
    ];

    const selectedItem = {...createResolutionItem('value1', 'text1'), orientation: 'some orientation'};

    beforeEach(() => {
        spyOnItemSelected = sinon.spy();
        spyOnBlur = sinon.spy();
        wrapper = shallow(<ResolutionMenu items={resolutionItems} onItemSelected={spyOnItemSelected}
                                          selectedItem={selectedItem} onBlur={spyOnBlur}/>);

        instance = wrapper.instance();
    });

    it('draws number of items', () => {
        expect(wrapper.find(ResolutionItem).length).to.equal(3);
    });

    it('adds onBlur', () => {
        wrapper.find('.resolution-menu').simulate('blur');

        expect(spyOnBlur.called).to.be.true;                   
    });

    it('could not show selectedOrientation when selectedItem is not exist', () => {
        wrapper.setProps({selectedItem: undefined});
        expect(wrapper.find(ResolutionItem).at(0).prop('selectedOrientation')).to.equal('');
    });

    it('close menu when esc key pressed', () => {
        const event = {
            keyCode: 27,
            stopPropagation: () => {
            }
        };
        wrapper.find('.resolution-menu').simulate('keydown', event);

        expect(spyOnBlur.calledOnce).to.true;
    });

    describe('ResolutionItem props', () => {
        let first;
        let last;

        beforeEach(() => {
            first = wrapper.find(ResolutionItem).at(0);
            last = wrapper.find(ResolutionItem).at(resolutionItems.length - 1);
        });

        it('has item', () => {
            expect(first.prop('item')).to.equal(resolutionItems[0]);
            expect(last.prop('item')).to.equal(resolutionItems[2]);
        });

        it('has onItemSelected as onSelected prop', () => {
            expect(first.prop('onSelected')).to.equal(spyOnItemSelected);
            expect(last.prop('onSelected')).to.equal(spyOnItemSelected);
        });

        it('has selected orientation as prop', () => {
            expect(first.prop('selectedOrientation')).to.equal('some orientation');
            expect(last.prop('selectedOrientation')).to.equal('');
        });

        it('has isDisabled as prop', () => {
            const isDisabled = true;
            let disabledResolutionItems = [...resolutionItems, {
                ...createResolutionItem('value4', 'text4'),
                isDisabled
            }];

            wrapper = shallow(<ResolutionMenu items={disabledResolutionItems} onItemSelected={spyOnItemSelected}
                                              selectedItem={selectedItem} onBlur={spyOnBlur}/>);

            expect(wrapper.find(ResolutionItem).at(3).prop('isDisabled')).to.be.true;
        });
    });

    describe('lifecycle', () => {
        it('sets focus to this.element when componentDidMount is called', () => {
            const mockElement = {
                focus: sinon.spy(),
            };

            instance.element = mockElement;

            instance.componentDidMount();

            expect(mockElement.focus.called).to.be.true;
        });
    });
});