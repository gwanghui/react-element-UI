import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import ContextMenu from '../../../../src/component/popup/context-menu/context-menu';

describe('Context Menu Spec', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <ContextMenu isShow={false}>
                <div>child1</div>
                <div>child2</div>
            </ContextMenu>
        ).dive();
    });

    describe('rendering', () => {
        it('sets opacity as 0 when isShow is false', () => {
            expect(wrapper.find('.context-menu-wrapper').props().style.opacity).to.equal(0);
        });

        it('sets opacity as 1 when isShow is true', () => {
            wrapper.setProps({isShow: true,});

            expect(wrapper.find('.context-menu-wrapper').props().style.opacity).to.equal(1);
        });

        it('sets visibility as hidden when isShow is false', () => {
            expect(wrapper.find('.context-menu-wrapper').props().style.visibility).to.equal('hidden');
        });

        it('sets opacity as "" when isShow is true', () => {
            wrapper.setProps({isShow: true,});

            expect(wrapper.find('.context-menu-wrapper').props().style.visibility).to.equal('');
        });

        it('renders children', () => {
            expect(wrapper.find('.context-menu').html()).to.equal('<div class="context-menu"><div>child1</div><div>child2</div></div>');
        });
    });
});