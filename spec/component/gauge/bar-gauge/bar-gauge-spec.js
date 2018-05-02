import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import BarGauge from '../../../../src/component/gauge/bar-gauge/bar-gauge';

describe('Bar Gauge Spec', () => {
    const VALUE = 50;
    const COLOR = 'blue';
    const TEXT = 'some text';

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BarGauge value={VALUE} color={COLOR} text={TEXT}/>);
    });

    describe('render', () => {
        
        it('shows value celsius', () => {
            expect(wrapper.find('.bar-gauge__value').text()).to.equal(VALUE+'\xB0C');
        });

        it('shows text ', () => {
            expect(wrapper.find('.bar-gauge__text').text()).to.equal(TEXT);
        });

        it('shows gauge body when value is more than 0', () => {
            expect(wrapper.find('.bar-gauge-body').prop('style').visibility).to.equal('visible');
        });

        it('does not show gauge body when value is 0', () => {
            wrapper.setProps({value: 0});
            expect(wrapper.find('.bar-gauge-body').prop('style').visibility).to.equal('hidden');
        });
    });
});