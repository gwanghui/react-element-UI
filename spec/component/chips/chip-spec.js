import React from 'react';
import {expect} from 'chai';
import * as sinon from "sinon";
import {shallow} from "enzyme";
import MaterialChip from 'material-ui/Chip';
import Chip from '../../../src/component/chips/chip';

describe('Chip Spec', () => {
    const spyOnClick = sinon.spy();
    const spyOnRequestDelete = sinon.spy();

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Chip onClick={spyOnClick} name={'chip name'}/>);
    });

    describe('render', () => {
        it('default value', () => {
            expect(wrapper.find(MaterialChip).exists()).to.true;
            expect(wrapper.find(MaterialChip).getElement().props.backgroundColor).to.equal('#eeeeee');
            expect(wrapper.find(MaterialChip).getElement().props.labelColor).to.equal('#333333');
            expect(wrapper.find(MaterialChip).getElement().props.labelStyle).to.deep.equal({
                fontFamily: 'Open Sans',
                fontSize: '13px',
                lineHeight: '28px',
                maxWidth: 393,
                marginRight: 0,
                textOverflow: 'ellipsis',
                overflow: 'hidden'
            });
            expect(wrapper.find(MaterialChip).getElement().props.style).to.deep.equal({margin: '4px'});
            expect(wrapper.find(MaterialChip).getElement().props.deleteIconStyle).to.deep.equal({
                margin: '2px 4px 2px -8px',
                fill: 'white',
            });
            expect(wrapper.find(MaterialChip).getElement().props.children).to.equal('chip name');
            expect(wrapper.find(MaterialChip).getElement().props.onClick).to.equal(spyOnClick);
        });

        it('tooltip by title', () => {
            expect(wrapper.find('.chip-wrapper').getElement().props.title).to.equal('chip name');
        });

        it('specific value', () => {
            wrapper = shallow(<Chip onRequestDelete={spyOnRequestDelete} name={'chip name'}/>);

            expect(wrapper.find(MaterialChip).getElement().props.backgroundColor).to.equal('#5c65c0');
            expect(wrapper.find(MaterialChip).getElement().props.labelColor).to.equal('white');
            expect(wrapper.find(MaterialChip).getElement().props.labelStyle.marginRight).to.equal('3px');
            expect(wrapper.find(MaterialChip).getElement().props.onRequestDelete).to.equal(spyOnRequestDelete);
        });
    });
});