import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import * as sinon from "sinon";

import DraggingTags from "../../../../src/component/dialog/tags/dragging-tags";
import Chip from "../../../../src/component/chips/chip";

describe('Dragging Tags Spec', () => {
    const spyOnTagDrop = sinon.spy();
    const spyOnTagDelete = sinon.spy();

    let wrapper;
    let instance;

    beforeEach(() => {
        wrapper = shallow(<DraggingTags onTagDrop={spyOnTagDrop} onTagDelete={spyOnTagDelete}/>);
        instance = wrapper.instance();
    });

    afterEach(() => {
        spyOnTagDrop.reset();
        spyOnTagDelete.reset();
    });

    describe('render', () => {
        it('shows dragging-tags__area via isDragOver state', () => {
            expect(wrapper.find('.dragging-tags__area').length).to.be.equal(1);
            expect(wrapper.find('.dragging-tags__area--selected').length).to.be.equal(0);

            wrapper.setState({isDragOver: true});

            expect(wrapper.find('.dragging-tags__area').length).to.be.equal(0);
            expect(wrapper.find('.dragging-tags__area--selected').length).to.be.equal(1);
        });

        it('shows chips as many as tagList', () => {
            expect(wrapper.find('.dragging-tags__placeholder').length).to.be.equal(1);

            wrapper.setProps({tagList: [{id: 1, name: '1'}, {id: 2, name: '2'}]});

            expect(wrapper.find('.dragging-tags__placeholder').length).to.be.equal(0);
            expect(wrapper.find(Chip).length).to.be.equal(2);
        });

        it('does not show placeholder when disabled is true', () => {
            wrapper.setProps({disabled: true});

            expect(wrapper.find('.dragging-tags__area--dimmed').length).to.be.equal(1);
            expect(wrapper.find('.dragging-tags__placeholder').length).to.be.equal(0);
        });
    });

    describe('event', () => {
        it('calls preventDefault and isDragOver state to true when dragOver in drag area', () => {
            let mockEvent = {
                preventDefault: sinon.spy(),
            };
            expect(instance.state.isDragOver).to.be.false;
            wrapper.find('.dragging-tags__area').simulate('dragOver', mockEvent);

            expect(mockEvent.preventDefault.called).to.be.true;
            expect(instance.state.isDragOver).to.be.true;
        });

        it('calls props.onTagDrop and set isDragOver state to false', () => {
            wrapper.setState({isDragOver: true});

            wrapper.find('.dragging-tags__area--selected').simulate('drop');

            expect(spyOnTagDrop.called).to.be.true;
            expect(instance.state.isDragOver).to.be.false;
        });

        it('calls props.onTagDelete when onRequestDelete of Chip is called', () => {
            wrapper.setProps({tagList: [{id: 1, name: '1'}, {id: 2, name: '2'}]});
            wrapper.find(Chip).at(0).simulate('requestDelete');

            expect(spyOnTagDelete.calledWith(1)).to.be.true;
        });

        it('sets isDragOver to false when onDragLeave is called', () => {
            wrapper.setState({isDragOver: true});

            wrapper.find('.dragging-tags__area--selected').simulate('dragLeave');

            expect(instance.state.isDragOver).to.be.false;
        });
    });
});