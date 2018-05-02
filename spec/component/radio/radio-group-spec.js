import React from 'react';
import {expect} from 'chai';
import * as sinon from "sinon";
import {shallow} from "enzyme";
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';
import RadioButton from 'material-ui/RadioButton/RadioButton';
import RadioGroup from '../../../src/component/radio/radio-group';

describe('RadioGroup Spec', () => {
    const spyOnChange = sinon.spy();

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<RadioGroup name={"RadioGroup"}
                                      children={[{props:{value: 1}}]}
                                      onChange={spyOnChange}
        />);
    });

    describe('render', () => {
        it('default value', () => {
            expect(wrapper.find(RadioButtonGroup).exists()).to.true;
            expect(wrapper.find(RadioButtonGroup).getElement().props.name).to.equal("RadioGroup");
            expect(wrapper.find(RadioButtonGroup).getElement().props.defaultSelected).to.equal(undefined);
            expect(wrapper.find(RadioButtonGroup).getElement().props.valueSelected).to.equal(undefined);
            expect(wrapper.find(RadioButton).exists()).to.true;
            expect(wrapper.find(RadioButtonGroup).getElement().props.onChange).to.equal(spyOnChange);
        });
    });
});