import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import sinon from 'sinon';
import FolderNavigator from "../../../../src/component/popup/folder-navigator/folder-navigator"

describe('Folder Navigator Spec', () => {
    const spyOnClose = sinon.spy();
    const spyOnItemClick = sinon.spy();

    const folders = [
        {
            id: '1',
            name: 'grandfather'
        },
        {
            id: '2',
            name: 'father'
        }
    ];

    const popupStyle = {top: '40px'};
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<FolderNavigator.WrappedPopupComponent
            onClose={spyOnClose}
            onItemClick={spyOnItemClick}
            folders={folders}
            popupStyle={popupStyle}
                          />);
    });

    afterEach(() => {
        spyOnClose.reset();
        spyOnItemClick.reset();
    });

    describe('rendering spec', () => {
        it('has 2 folder navigator item', () => {
           expect(wrapper.find('.folder-navigator__item')).to.be.lengthOf(2);
        });

        it('folder navigator item icon has different margin', () => {
            expect(wrapper.find('.folder-navigator__item-icon').at(0).getElement().props.style.marginLeft).to.be.equal('20px');
            expect(wrapper.find('.folder-navigator__item-icon').at(1).getElement().props.style.marginLeft).to.be.equal('30px');
        });

        it('folder navigator name has different width', () => {
            expect(wrapper.find('.folder-navigator__item-name').at(0).getElement().props.style.maxWidth).to.be.equal('331px');
            expect(wrapper.find('.folder-navigator__item-name').at(1).getElement().props.style.maxWidth).to.be.equal('321px');
        });

        it('set style by popupStyle', () => {
            expect(wrapper.find('.folder-navigator-wrapper').props().style).to.deep.equal(popupStyle);
        });
    });

    describe('component function spec', () => {
        it('onFolderNavigatorItemClick spec', () => {
           wrapper.instance().onFolderNavigatorItemClick({id: '2', name: 'father'}, 1);

           expect(spyOnItemClick.calledWith({id: '2', name: 'father'}, 1)).to.true;
           expect(spyOnClose.called).to.true;
        });
    });

});