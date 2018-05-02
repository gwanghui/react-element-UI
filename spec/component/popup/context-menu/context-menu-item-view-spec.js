import React from 'react';
import {expect} from 'chai';
import * as sinon from "sinon";
import {shallow} from "enzyme";
import ContextMenuItemView from "../../../../src/component/popup/context-menu/context-menu-item-view";

describe('Context Menu Item View Spec', () => {
    const spyOnClick = sinon.spy();

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ContextMenuItemView text="some text" onClick={spyOnClick}/>);
    });

    afterEach(() => {
        spyOnClick.reset();
    });

    describe('rendering', () => {
        it('renders text node when text.length is greater than 0', () => {
            expect(wrapper.find('.context-menu-text').text()).to.equal('some text');
        });

        it('renders children nodes when text.length === 0', () => {
            wrapper = shallow(<ContextMenuItemView onClick={spyOnClick}>
                <div>child</div>
            </ContextMenuItemView>);
            expect(wrapper.find('.context-menu-text > div').text()).to.equal('child');
        });
    });

    describe('events', () => {
        it('calls spyOnClick when text exists and the node click', () => {
            const mockEvent = {
                stopPropagation: sinon.spy(),
            };

            wrapper.find('.context-menu-text').simulate('click', mockEvent);

            expect(spyOnClick.calledWith(mockEvent)).to.be.true;
            expect(mockEvent.stopPropagation.called).to.be.true;
        });
    });
});