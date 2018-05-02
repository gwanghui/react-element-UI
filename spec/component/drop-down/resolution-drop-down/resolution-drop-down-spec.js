import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import {shallow} from "enzyme";
import ResolutionDropDown from "../../../../src/component/drop-down/resolution-drop-down/resolution-drop-down";
import ResolutionView from "../../../../src/component/drop-down/resolution-drop-down/resolution-view";
import ResolutionMenu from "../../../../src/component/drop-down/resolution-drop-down/resolution-menu";

describe('ResolutionDropDown Spec', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ResolutionDropDown resolutionItems={['item1', '2', '3', '4']}/>)
    });

    describe('ResolutionView', () => {
        let resolutionView;

        beforeEach(() => {
            resolutionView = wrapper.find(ResolutionView);
        });

        it('has ResolutionView', () => {
            expect(resolutionView.exists()).to.be.true;
        });

        it('passes menuOpened state', () => {
            wrapper.setState({menuOpened: true});

            resolutionView = wrapper.find(ResolutionView);

            expect(resolutionView.prop('menuOpened')).to.be.true;
        });

        it('passes openMenu as onClick handler', () => {
            expect(resolutionView.prop('onClick')).to.equal(wrapper.instance().openMenu);
        });

        it('passes resolution', () => {
            wrapper.setState({resolution: {value: 'some', text: 'text'}});

            resolutionView = wrapper.find(ResolutionView);

            expect(resolutionView.prop('resolution')).to.deep.equal({value: 'some', text: 'text'});
        });
    });

    describe('ResolutionMenu', () => {
        describe('menu is closed', () => {
            beforeEach(() => {
                wrapper.setState({menuOpened: false});
            });

            it('does not draw Resolution Menu', () => {
                expect(wrapper.find(ResolutionMenu).exists()).to.be.false;
            });
        });

        describe('menu is opened', () => {
            let resolutionMenu;

            beforeEach(() => {
                wrapper.setState({menuOpened: true});

                resolutionMenu = wrapper.find(ResolutionMenu);
            });

            it('passes constant resolution items', () => {
                expect(resolutionMenu.prop('items').length).to.equal(4);
            });

            it('passes selectResolutionAndCloseMenu as onItemSelected', () => {
                expect(resolutionMenu.prop('onItemSelected')).to.equal(wrapper.instance().selectResolutionAndCloseMenu);
            });

            it('passes resolution state as selectedItem', () => {
                expect(resolutionMenu.prop('selectedItem')).to.be.null;

                wrapper.setState({resolution: {value: 'value', text: 'text'}});

                expect(wrapper.find(ResolutionMenu).prop('selectedItem')).to.deep.equal({value: 'value', text: 'text'});
            });

            it('passes closeMenu as onBlur', () => {
                expect(resolutionMenu.prop('onBlur')).to.equal(wrapper.instance().closeMenu);
            });
        });
    });

    it('openMenu changes menuOpened state as true', () => {
        wrapper.instance().openMenu();

        expect(wrapper.state('menuOpened')).to.be.true;
    });

    it('closeMenu changes menuOpened state as false', () => {
        wrapper.instance().closeMenu();

        expect(wrapper.state('menuOpened')).to.be.false;
    });

    describe('selectResolutionAndCloseMenu', () => {
        let spyOnChange;

        beforeEach(() => {
            spyOnChange = sinon.spy();

            wrapper.setProps({onChange: spyOnChange});

            wrapper.instance().selectResolutionAndCloseMenu({value: 'value', text: 'text'});
        });

        it('changes resolution state and menuOpened as false', () => {
            expect(wrapper.state('menuOpened')).to.be.false;
            expect(wrapper.state('resolution')).to.deep.equal({value: 'value', text: 'text'});
        });

        it('triggers onChange', () => {
            expect(spyOnChange.calledWith({value: 'value', text: 'text'})).to.be.true;
        });
    });
});