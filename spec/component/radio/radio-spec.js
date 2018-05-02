import React from 'react';
import {expect} from 'chai';
import * as sinon from "sinon";
import {shallow} from "enzyme";
import RadioButton from 'material-ui/RadioButton/RadioButton';
import Radio from '../../../src/component/radio/radio';

describe('Radio Spec', () => {
    const spyOnCheck = sinon.spy();

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Radio value={"Radio"}/>);
    });

    afterEach(() => {
        spyOnCheck.reset();
    });

    describe('render', () => {
        it('default value', () => {
            expect(wrapper.find(RadioButton).exists()).to.true;
            expect(wrapper.find(RadioButton).getElement().props.value).to.equal("Radio");
            expect(wrapper.find(RadioButton).getElement().props.label).to.equal(undefined);
            expect(wrapper.find(RadioButton).getElement().props.style).to.contain({ height: 16, width: '100%' });
            expect(wrapper.find(RadioButton).getElement().props.inputStyle).to.deep.equal({ height: 16 });
            expect(wrapper.find(RadioButton).getElement().props.iconStyle).to.deep.equal({ height: 16, width: 16, marginRight:0});
            expect(wrapper.find(RadioButton).getElement().props.rippleStyle).to.deep.equal({ top: -8, left: -8 });
            expect(wrapper.find(RadioButton).getElement().props.disabled).to.false;
            expect(wrapper.find(RadioButton).getElement().props.checkedIcon.props.className).to.equal('radio-on');
            expect(wrapper.find(RadioButton).getElement().props.uncheckedIcon.props.className).to.equal('radio-off');
        });


        it('specific value', () => {
           wrapper = shallow(<Radio value={"Radio"}
                                    height={24}
                                    width={50}
                                    label={'some label'}
                                    labelFontSize={15}
                                    disabled={true}
                                    groupName={'radioGroup'}
                                    style={{margin: '0 0 19px 0', color: '#777777'}}
           />);

            expect(wrapper.find(RadioButton).getElement().props.style).to.contain({ height: 24, width: 50 });
            expect(wrapper.find(RadioButton).getElement().props.inputStyle).to.deep.equal({ height: 24 });
            expect(wrapper.find(RadioButton).getElement().props.iconStyle).to.deep.equal({ height: 24, width: 24 , marginRight:0});
            expect(wrapper.find(RadioButton).getElement().props.rippleStyle).to.deep.equal({ top: -24/2, left: -24/2 });
            expect(wrapper.find(RadioButton).getElement().props.label).to.deep.equal('some label');
            expect(wrapper.find(RadioButton).getElement().props.labelStyle).to.deep.equal({
                "color": '#777777',
                "fontSize": "15px",
                "height": "24px",
                "lineHeight": "24px",
            });
            expect(wrapper.find(RadioButton).getElement().props.disabled).to.true;
            expect(wrapper.find(RadioButton).getElement().props.checkedIcon.props.className).to.equal('radio-on__dimmed');
            expect(wrapper.find(RadioButton).getElement().props.uncheckedIcon.props.className).to.equal('radio-off__dimmed');
        });
    });
});