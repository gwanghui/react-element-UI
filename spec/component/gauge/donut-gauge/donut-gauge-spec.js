import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import CircularProgress from 'material-ui/CircularProgress';
import DonutGauge from '../../../../src/component/gauge/donut-gauge/donut-gauge';

describe('Donut Gauge Spec', () => {
    const CIRCLE_VALUE = 50;
    const CIRCLE_COLOR = 'blue';
    const CIRCLE_TEXT = 'some text';

    let wrapper;
    let instance;

    beforeEach(async () => {
        wrapper = shallow(<DonutGauge value={CIRCLE_VALUE} color={CIRCLE_COLOR} text={CIRCLE_TEXT}/>);
        instance = wrapper.instance();
    });

    describe('render', () => {
        it('has 2 CircularProgress', () => {
            expect(wrapper.find(CircularProgress).length).to.equal(2);
        });

        it('has 100 value of first CircularProgress to render background', () => {
            expect(wrapper.find(CircularProgress).first().prop('value')).to.equal(100);
        });

        it('set props.color to last CircularProgress', () => {
            expect(wrapper.find(CircularProgress).last().prop('color')).to.equal(CIRCLE_COLOR);
        });

        it('shows text ', () => {
            expect(wrapper.find('.donut-gauge__text').text()).to.equal(CIRCLE_TEXT);
        });

        it('set props.value to last CircularProgress', () => {
            expect(wrapper.find(CircularProgress).last().prop('value')).to.equal(CIRCLE_VALUE);
        });

        it('shows value percent', () => {
            expect(wrapper.find('.donut-gauge__value').text()).to.equal(CIRCLE_VALUE+'%');
        });
    });
});