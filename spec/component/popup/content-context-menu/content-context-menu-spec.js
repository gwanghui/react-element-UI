import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import * as sinon from "sinon";
import {Divider} from "material-ui";
import i18n from "nexshop-web-i18n";
import ContentContextMenu from '../../../../src/component/popup/content-context-menu/content-context-menu';
import ContextMenu from '../../../../src/component/popup/context-menu/context-menu';
import ContextMenuItemView from '../../../../src/component/popup/context-menu/context-menu-item-view';

describe('Content Context Menu Spec', () => {
    let wrapper;
    let instance;
    let isShow = false;
    let selectedItems;
    let popupStyle = {top: 10, left: 20};
    let spyOnClose = sinon.spy();
    let spyMoveToClick = sinon.spy();
    let spyCopyToClick = sinon.spy();
    let spyDownload = sinon.spy();
    let spyTagToClick = sinon.spy();
    let spyRenameToClick = sinon.spy();
    let spyDeleteToClick = sinon.spy();
    let spyExpiryDateToClick = sinon.spy();
    let spyShareToClick = sinon.spy();

    afterEach(() => {
        spyOnClose.reset();
        spyMoveToClick.reset();
        spyCopyToClick.reset();
        spyDownload.reset();
        spyTagToClick.reset();
        spyRenameToClick.reset();
        spyDeleteToClick.reset();
        spyExpiryDateToClick.reset();
        spyShareToClick.reset();
    });

    describe('given one image in selectedItem', () => {
        beforeEach(() => {
            i18n.changeLanguage('test');

            selectedItems = [{type: 'image'}];
            wrapper = shallow(<ContentContextMenu isShow={isShow}
                                                  popupStyle={popupStyle}
                                                  selectedItems={selectedItems}
                                                  moveToClick={spyMoveToClick}
                                                  copyToClick={spyCopyToClick}
                                                  download={spyDownload}
                                                  tagToClick={spyTagToClick}
                                                  renameToClick={spyRenameToClick}
                                                  onClose={spyOnClose}
                                                  deleteToClick={spyDeleteToClick}
                                                  expiryDateToClick={spyExpiryDateToClick}
                                                  shareToClick={spyShareToClick}
            />);
            instance = wrapper.instance();
        });

        describe('pass props', () => {
            it('pass props to ContextMenu', () => {
                expect(wrapper.find(ContextMenu).getElement().props.popupStyle).to.be.deep.equal({top: '10px', left: '20px'});
                expect(wrapper.find(ContextMenu).getElement().props.isShow).to.be.equal(false);
            });
        });

        describe('rendering', () => {
            it('has ContextMenu', () => {
                expect(wrapper.find(ContextMenu)).to.be.lengthOf(1);
            });

            it('has ContextMenuItemView', () => {
                expect(wrapper.find(ContextMenuItemView)).to.be.lengthOf(7);
                expect(wrapper.find(Divider)).to.be.lengthOf(3);

                wrapper.setProps({selectedItems: [{type: 'folder'}]});
                expect(wrapper.find(ContextMenuItemView)).to.be.lengthOf(4);
                expect(wrapper.find(Divider)).to.be.lengthOf(1);

                wrapper.setProps({selectedItems: [{type: 'image'}, {type: 'image'}]});
                expect(wrapper.find(ContextMenuItemView), 'move to, download, set expiry date, edit tag, delete').to.be.lengthOf(5);
                expect(wrapper.find(Divider)).to.be.lengthOf(2);
            });
        });

        describe('inner functions', () => {
            it('isPossibleMultiple', () => {
                let selectedItems = [{type: 'image'}];

                sinon.stub(instance, 'isValidTypes').returns(true);

                expect(instance.isPossibleMultiple(selectedItems, null, {enableMultiple: true})).to.be.true;

                selectedItems.push({type: 'folder'});

                expect(instance.isPossibleMultiple(selectedItems, null, {enableMultiple: true})).to.be.true;
                expect(instance.isPossibleMultiple(selectedItems, null, {enableMultiple: false})).to.be.false;

                instance.isValidTypes.restore();
            });

            it('isValidTypes', () => {
                let selectedItemTypes = new Set(['image']);

                expect(instance.isValidTypes(selectedItemTypes, ['folder'])).to.be.true;
                expect(instance.isValidTypes(selectedItemTypes, ['image', 'folder'])).to.be.false;
            });

            it('given one image selectedItem, analyzeGroupData', () => {
                let selectedItems = [{type: 'image'}];
                const returnGroupArr = instance.analyzeGroupData(selectedItems);

                expect(returnGroupArr[0]).to.deep.equal([{
                    onClick: 'moveToClick',
                    text: 'rightClickPop.moveto',
                    groupIndex: 0,
                    exclude: [],
                    enableMultiple: true,
                    multiExclude: [],
                }]);
                expect(returnGroupArr[1]).to.deep.equal([{
                    text: 'rightClickPop.makeaCopy',
                    onClick: 'copyToClick',
                    groupIndex: 1,
                    exclude: ['folder'],
                    enableMultiple: false,
                    multiExclude: [],
                }]);
                expect(returnGroupArr[2]).to.deep.equal([{
                    text: 'rightClickPop.download',
                    onClick: 'download',
                    groupIndex: 2,
                    exclude: ['folder', 'playlist', 'scene'],
                    enableMultiple: true,
                    multiExclude: [],
                }]);
                expect(returnGroupArr[3]).to.deep.equal([
                    {
                        text: 'Set expiry date',
                        onClick: 'expiryDateToClick',
                        groupIndex: 3,
                        exclude: ['folder', 'playlist', 'scene', 'application'],
                        enableMultiple: true,
                        multiExclude: [],
                    },
                    {
                        text: 'rightClickPop.editTag',
                        onClick: 'tagToClick',
                        groupIndex: 3,
                        exclude: ['folder', 'playlist', 'scene', 'application'],
                        enableMultiple: true,
                        multiExclude: [],
                    },
                    {
                        text: 'rightClickPop.rename',
                        onClick: 'renameToClick',
                        groupIndex: 3,
                        exclude: [],
                        enableMultiple: false,
                        multiExclude: [],
                    },
                    {
                        text: 'rightClickPop.delete',
                        onClick: 'deleteToClick',
                        groupIndex: 3,
                        exclude: [],
                        enableMultiple: true,
                        multiExclude: ['folder'],
                    }
                ]);
            });

            it('given one folder selectedItem, analyzeGroupData', () => {
                const returnGroupArr = instance.analyzeGroupData([{id: 'folderId', type: 'folder'}]);

                expect(returnGroupArr[0]).to.deep.equal([
                    {
                        text: 'rightClickPop.moveto',
                        onClick: 'moveToClick',
                        groupIndex: 0,
                        exclude: [],
                        enableMultiple: true,
                        multiExclude: [],
                    },
                    {
                        enableMultiple: false,
                        exclude: ['video', 'image', 'playlist', 'scene', 'application', 'document'],
                        groupIndex: 0,
                        multiExclude: [],
                        onClick: 'shareToClick',
                        text: 'rightClickPop.share',
                    }
                ]);
                expect(returnGroupArr[3]).to.deep.equal([
                    {
                        text: 'rightClickPop.rename',
                        onClick: 'renameToClick',
                        groupIndex: 3,
                        exclude: [],
                        enableMultiple: false,
                        multiExclude: [],
                    },
                    {
                        text: 'rightClickPop.delete',
                        onClick: 'deleteToClick',
                        groupIndex: 3,
                        exclude: [],
                        enableMultiple: true,
                        multiExclude: ['folder'],
                    }
                ]);
            });

            it('makeContextMenuItemView', () => {
                let selectedItems = [{type: 'image'}];
                expect(instance.makeContextMenuItemView(selectedItems), '7 menu, 3 divider').to.be.lengthOf(10);

                selectedItems = [{type: 'image'}, {type: 'image'}];
                expect(instance.makeContextMenuItemView(selectedItems), '5 menu, 2 divider').to.be.lengthOf(7);

                selectedItems = [{type: 'folder'}];
                expect(instance.makeContextMenuItemView(selectedItems), '4 menu, 1 divider').to.be.lengthOf(5);
            });

            describe('getPosition', () => {
                it('return position top and left', () => {
                    let childElements = [{key: "item1"}, {key: "div1"}, {key: "item2"}];

                    expect(wrapper.instance().getPosition(childElements)).to.deep.equal({top: '10px', left: '20px'});
                });

                it('return opposite direction when context menu height + mouse y position bigger than window height', () => {
                    const childElements = [{key: "item1"}, {key: "div1"},
                        {key: "item2"}, {key: "item3"}, {key: "div2"},
                        {key: "item4"}, {key: "item5"}];
                    const pointY = window.innerHeight - 50;
                    const numberOfItems = childElements.filter(item => item.key.includes("item")).length;
                    const numberOfDividers = childElements.filter(item => item.key.includes("div")).length;
                    const contextMenuHeight = numberOfItems * 30 + numberOfDividers * 11 + 22;

                    wrapper.setProps({popupStyle: {top: pointY, left: 20}});
                    expect(wrapper.instance().getPosition(childElements)).to.deep.equal({
                        top: `${pointY - contextMenuHeight}px`,
                        left: '20px'
                    });
                });
            });
        });

        describe('event test', () => {
            it('click "Move To"', () => {
                wrapper.find(ContextMenuItemView).at(0).simulate('click');
                expect(spyMoveToClick.called).to.true;
            });

            it('click "Make a copy', () => {
                wrapper.find(ContextMenuItemView).at(1).simulate('click');
                expect(spyCopyToClick.called).to.true;
            });

            it('click "Download', () => {
                wrapper.find(ContextMenuItemView).at(2).simulate('click');
                expect(spyDownload.called).to.true;
            });

            it('click "Set expiry date"', () => {
                wrapper.find(ContextMenuItemView).at(3).simulate('click');
                expect(spyExpiryDateToClick.called).to.true;
            });

            it('click "Edit tag', () => {
                wrapper.find(ContextMenuItemView).at(4).simulate('click');
                expect(spyTagToClick.called).to.true;
            });

            it('click "renameToClick', () => {
                wrapper.find(ContextMenuItemView).at(5).simulate('click');
                expect(spyRenameToClick.called).to.true;
            });
        });
    });

    describe('given one folder in selectedItem', () => {

        beforeEach(() => {
            selectedItems = [{type: 'folder'}];
            wrapper = shallow(<ContentContextMenu isShow={isShow}
                                                  popupStyle={popupStyle}
                                                  selectedItems={selectedItems}
                                                  moveToClick={spyMoveToClick}
                                                  copyToClick={spyCopyToClick}
                                                  download={spyDownload}
                                                  tagToClick={spyTagToClick}
                                                  renameToClick={spyRenameToClick}
                                                  onClose={spyOnClose}
                                                  deleteToClick={spyDeleteToClick}
                                                  expiryDateToClick={spyExpiryDateToClick}
                                                  shareToClick={spyShareToClick}
            />);
            instance = wrapper.instance();
        });
        describe('event test', () => {
            it('click "Move To"', () => {
                wrapper.find(ContextMenuItemView).at(0).simulate('click');
                expect(spyMoveToClick.called).to.true;
            });

            it('click "Share To"', () => {
                wrapper.find(ContextMenuItemView).at(1).simulate('click');
                expect(spyShareToClick.called).to.true;
            });

            it('click "Rename', () => {
                wrapper.find(ContextMenuItemView).at(2).simulate('click');
                expect(spyRenameToClick.called).to.true;
            });

            it('click "Delete', () => {
                wrapper.find(ContextMenuItemView).at(3).simulate('click');
                expect(spyDeleteToClick.called).to.true;
            })
        });
    });
});