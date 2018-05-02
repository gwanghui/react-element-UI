import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import sinon from "sinon";

import SettingTags from "../../../../src/component/dialog/tags/setting-tags";
import FlatButton from "../../../../src/component/button/flat-button/flat-button";
import TaggingBoard from "../../../../src/component/tag/tagging-board";
import Chip from "../../../../src/component/chips/chip";
import DraggingTags from "../../../../src/component/dialog/tags/dragging-tags";

describe('Setting Tags Spec', () => {
    const mockTags = [{id: 1, name: '1'}, {id: 2, name: '2'}, {id: 3, name: '3'}];
    const spyOnClose = sinon.spy();
    const spyOnPositiveButtonClick = sinon.spy();

    let wrapper;
    let instance;

    beforeEach(() => {
        wrapper = shallow(<SettingTags tags={[]} onClose={spyOnClose} onPositiveButtonClick={spyOnPositiveButtonClick}/>);
        wrapper.setProps({tags: mockTags});

        instance = wrapper.instance();
    });

    afterEach(() => {
        spyOnClose.reset();
        spyOnPositiveButtonClick.reset();
    });

    describe('render', () => {
        it('passes disabled true prop to FlatButton when selected tags is not exist', () => {
            expect(wrapper.find(FlatButton).at(2).prop('disabled')).to.be.true;

            wrapper.setState({
                andTagList: [{id: 1, name: '1'}],
            });

            expect(wrapper.find(FlatButton).at(2).prop('disabled')).to.be.false;
        });

        it('shows dragging preview when draggingTagItem is exist', () => {
            expect(wrapper.find('.setting-tags--dragging').find(Chip).length).to.be.equal(0);

            wrapper.setState({draggingTagItem: {id: 1, name: '1'}});

            expect(wrapper.find('.setting-tags--dragging').find(Chip).length).to.be.equal(1);
        });

        it('passes disabled prop to DraggingTags when useOnlyNoneTag is false and andTagList, orTagList is empty ', () => {
            expect(wrapper.find(DraggingTags).at(2).prop('disabled')).to.be.false;
            wrapper.setProps({useOnlyNoneTag: false});

            expect(wrapper.find(DraggingTags).at(2).prop('disabled')).to.be.true;
        });
    });

    describe('lifecycle hook', () => {
        it('sets selectableTagList when componentWillReceiveProps', () => {
            expect(instance.state.selectableTagList).to.deep.equal([{id: 1, name: '1'}, {id: 2, name: '2'}, {id: 3, name: '3'}]);
        });
    });

    describe('event', () => {
        it('calls onClose prop and clear state when cancel FlatButton is clicked', () => {
            wrapper.setState({
                selectableTagList: [{id: 3, name: '3'}],
                andTagList: [{id: 1, name: '1'}],
                orTagList: [{id: 1, name: '1'}],
                noneTagList: [{id: 1, name: '1'}],
                draggingTagItem: {id: 2, name: '2'},
            });

            wrapper.find(FlatButton).at(1).simulate('click');

            expect(spyOnClose.called).to.be.true;
            expect(instance.state.selectableTagList).to.deep.equal([{id: 1, name: '1'}, {id: 2, name: '2'}, {id: 3, name: '3'}]);
            expect(instance.state.draggingTagItem).to.be.null;
            expect(instance.state.andTagList).to.deep.equal([]);
            expect(instance.state.orTagList).to.deep.equal([]);
            expect(instance.state.noneTagList).to.deep.equal([]);
        });

        it('calls spyOnPositiveButtonClick prop when positive FlatButton is clicked', () => {
            wrapper.setState({
                selectableTagList: [{id: 3, name: '3'}],
                andTagList: [{id: 1, name: '1'}],
                orTagList: [{id: 1, name: '1'}],
                noneTagList: [{id: 1, name: '1'}],
                draggingTagItem: {id: 2, name: '2'},
            });

            wrapper.find(FlatButton).at(2).simulate('click');

            expect(spyOnPositiveButtonClick.calledWith([{id: 1, name: '1'}], [{id: 1, name: '1'}], [{id: 1, name: '1'}])).to.be.true;
        });

        it('sets draggingId state and setDragImage when onTagDragStart is called', () => {
            let mockEvent  = {
                nativeEvent: {
                    offsetX: 100,
                    offsetY: 100,
                },
                dataTransfer: {
                    effectAllowed: '',
                    setDragImage: sinon.spy(),
                }
            };

            wrapper.find(TaggingBoard).simulate('chipDragStart', mockEvent, {id: 'test id', name: 'test name'});

            expect(instance.state.draggingTagItem).to.deep.equal({id: 'test id', name: 'test name'});
            expect(mockEvent.dataTransfer.effectAllowed).to.equal('copy');
            expect(mockEvent.dataTransfer.setDragImage.calledWith(instance.preview, 100, 100)).to.be.true;
        });

        describe('onTagDrop', () => {
            beforeEach(() => {
                wrapper.setState({
                    selectableTagList: [{id: 2, name: '2'}, {id: 3, name: '3'}],
                    andTagList: [{id: 1, name: '1'}],
                    orTagList: [{id: 1, name: '1'}],
                    noneTagList: [{id: 1, name: '1'}],
                    draggingTagItem: {id: 2, name: '2'},
                });
            });

            it('add to andTagList and draggingId changes to null remove from selectableTagList when tagType is and', () => {
                instance.onTagDrop('and');

                expect(instance.state.selectableTagList).to.deep.equal([{id: 3, name: '3'}]);
                expect(instance.state.andTagList).to.deep.equal([{id: 1, name: '1'}, {id: 2, name: '2'}]);
                expect(instance.state.orTagList).to.deep.equal([{id: 1, name: '1'}]);
                expect(instance.state.noneTagList).to.deep.equal([{id: 1, name: '1'}]);
                expect(instance.state.draggingTagItem).to.be.null;
            });

            it('add to orTagList and draggingId changes to null remove from selectableTagList when tagType is or', () => {
                instance.onTagDrop('or');

                expect(instance.state.selectableTagList).to.deep.equal([{id: 3, name: '3'}]);
                expect(instance.state.andTagList).to.deep.equal([{id: 1, name: '1'}]);
                expect(instance.state.orTagList).to.deep.equal([{id: 1, name: '1'}, {id: 2, name: '2'}]);
                expect(instance.state.noneTagList).to.deep.equal([{id: 1, name: '1'}]);
                expect(instance.state.draggingTagItem).to.be.null;
            });

            it('add to noneTagList and draggingId changes to null remove from selectableTagList when tagType is none', () => {
                instance.onTagDrop('none');

                expect(instance.state.selectableTagList).to.deep.equal([{id: 3, name: '3'}]);
                expect(instance.state.andTagList).to.deep.equal([{id: 1, name: '1'}]);
                expect(instance.state.orTagList).to.deep.equal([{id: 1, name: '1'}]);
                expect(instance.state.noneTagList).to.deep.equal([{id: 1, name: '1'}, {id: 2, name: '2'}]);
                expect(instance.state.draggingTagItem).to.be.null;
            });
        });

        describe('onTagDelete', () => {
            beforeEach(() => {
                wrapper.setState({
                    selectableTagList: [{id: 3, name: '3'}],
                    andTagList: [{id: 1, name: '1'}, {id: 2, name: '2'}],
                    orTagList: [{id: 1, name: '1'}, {id: 2, name: '2'}],
                    noneTagList: [{id: 1, name: '1'}, {id: 2, name: '2'}],
                });
            });

            it('remove andTagList and add to selectedTagList state when tagType is and', () => {
                instance.onTagDelete('and', 1);

                expect(instance.state.selectableTagList).to.be.deep.equal([{id: 3, name: '3'}, {id: 1, name: '1'}]);
                expect(instance.state.andTagList).to.be.deep.equal([{id: 2, name: '2'}]);
                expect(instance.state.orTagList).to.be.deep.equal([{id: 1, name: '1'}, {id: 2, name: '2'}]);
                expect(instance.state.noneTagList).to.be.deep.equal([{id: 1, name: '1'}, {id: 2, name: '2'}]);
            });

            it('remove orTagList and add to selectedTagList state when tagType is or', () => {
                instance.onTagDelete('or', 1);

                expect(instance.state.selectableTagList).to.be.deep.equal([{id: 3, name: '3'}, {id: 1, name: '1'}]);
                expect(instance.state.andTagList).to.be.deep.equal([{id: 1, name: '1'}, {id: 2, name: '2'}]);
                expect(instance.state.orTagList).to.be.deep.equal([{id: 2, name: '2'}]);
                expect(instance.state.noneTagList).to.be.deep.equal([{id: 1, name: '1'}, {id: 2, name: '2'}]);
            });

            it('remove noneTagList and add to selectedTagList state when tagType is none', () => {
                instance.onTagDelete('none', 1);

                expect(instance.state.selectableTagList).to.be.deep.equal([{id: 3, name: '3'}, {id: 1, name: '1'}]);
                expect(instance.state.orTagList).to.be.deep.equal([{id: 1, name: '1'}, {id: 2, name: '2'}]);
                expect(instance.state.andTagList).to.be.deep.equal([{id: 1, name: '1'}, {id: 2, name: '2'}]);
                expect(instance.state.noneTagList).to.be.deep.equal([{id: 2, name: '2'}]);
            });

            it('remove noneTagList when useOnlyNoneTag is false and last tag of andTagList and orTagList is deleted', () => {
                wrapper.setProps({useOnlyNoneTag: false});

                wrapper.setState({
                    selectableTagList: [{id: 3, name: '3'}],
                    andTagList: [],
                    orTagList: [{id: 2, name: '2'}],
                    noneTagList: [{id: 1, name: '1'}],
                });

                instance.onTagDelete('or', 2);

                expect(instance.state.selectableTagList).to.deep.equal([{id: 3, name: '3'}, {id: 2, name: '2'}, {id: 1, name: '1'}]);
                expect(instance.state.andTagList).to.deep.equal([]);
                expect(instance.state.orTagList).to.deep.equal([]);
                expect(instance.state.noneTagList).to.deep.equal([]);
            });
        });
    });
});