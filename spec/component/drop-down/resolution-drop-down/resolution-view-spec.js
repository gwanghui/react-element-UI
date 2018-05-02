import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import ResolutionView from "../../../../src/component/drop-down/resolution-drop-down/resolution-view";

describe('ResolutionViewSpec', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ResolutionView menuOpened={false} isDisabled={false}/>)
    });

    describe('isDisabled is false', () => {
        describe('resolution exists', () => {
            let title;
            let resolution;

            beforeEach(() => {
                wrapper.setProps({resolution: {value: 'QHD', text: '1920x1050', orientation: 'horizontal'}});

                title = wrapper.find('.resolution-drop-down-selected__title');
                resolution = wrapper.find('.resolution-drop-down-selected__resolution');
            });

            it('shows {value, text} of resolution', () => {
                expect(title.text()).to.equal('QHD');
                expect(resolution.text()).to.equal('1920x1050');
            });

            it('gives selected class for given orientation', () => {
                let selectedOrientation = wrapper.find('.resolution-drop-down-selected').childAt(2);

                expect(selectedOrientation.hasClass('resolution-drop-down-selected__horizontal')).to.be.true;

                wrapper.setProps({resolution: {value: 'QHD', text: '1920x1050', orientation: 'vertical'}});

                selectedOrientation = wrapper.find('.resolution-drop-down-selected').childAt(2);

                expect(selectedOrientation.hasClass('resolution-drop-down-selected__vertical')).to.be.true;
            });

            it('does not show placeholder', () => {
                expect(wrapper.find('.resolution-drop-down__placeholder').exists()).to.be.false;
            });
        });

        describe('resolution not exist', () => {
            it('shows "Target Resolution" as placeholder', () => {
                expect(wrapper.find('.resolution-drop-down__placeholder').text()).to.equal('createWithResolution.targetResolution.hint');
            });
        });

        describe('menu status', () => {
            it('shows ▼ when menu is closed', () => {
                wrapper.setProps({menuOpened: false});

                expect(wrapper.find('.resolution-drop-down__arrow--descending')).lengthOf(1);
            });

            it('shows ▲ when menu is opened', () => {
                wrapper.setProps({menuOpened: true});

                expect(wrapper.find('.resolution-drop-down__arrow--ascending')).lengthOf(1);
            });
        });
    });

    describe('isDisabled is true', () => {
        beforeEach(() => {
           wrapper.setProps({isDisabled: true, resolution: {orientation: 'horizontal'}});
        });
        
        it('exist resolution-drop-down--disabled class name', () => {
             expect(wrapper.find('.resolution-drop-down--disabled')).to.be.lengthOf(1);
        });
        
        it('exist disabled title, resolution, orientation, arror', () => {
            expect(wrapper.find('.resolution-drop-down-selected__title--disabled')).to.be.lengthOf(1);
            expect(wrapper.find('.resolution-drop-down-selected__resolution--disabled')).to.be.lengthOf(1);
            expect(wrapper.find('.resolution-drop-down-selected__horizontal--disabled')).to.be.lengthOf(1);
            expect(wrapper.find('.resolution-drop-down__arrow--disabled')).to.be.lengthOf(1);
        });
    });
});