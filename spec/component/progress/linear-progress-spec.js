import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import LinearProgress from "../../../src/component/progress/linear-progress";

describe('Linear Progress Spec', () => {
    const VALUE = 50;
    const COLOR = 'blue';

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<LinearProgress value={VALUE} color={COLOR}/>);
    });

    describe('render', () => {

        it('shows gauge body when value is more than 0', () => {
            expect(wrapper.find('.linear-progress-body').prop('style').visibility).to.equal('visible');
        });

        it('does not show gauge body when value is 0', () => {
            wrapper.setProps({value: 0});
            expect(wrapper.find('.linear-progress-body').prop('style').visibility).to.equal('hidden');
        });
    });
});