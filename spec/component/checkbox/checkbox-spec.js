import React from 'react';
import {expect} from 'chai';
import * as sinon from "sinon";
import {shallow} from "enzyme";
import MaterialCheckbox from 'material-ui/Checkbox';
import Checkbox from '../../../src/component/checkbox/checkbox';

describe('Checkbox Spec', () => {
    const spyOnCheck = sinon.spy();

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Checkbox onCheck={spyOnCheck} checked={false}/>);
    });

    describe('render', () => {
        it('default value', () => {
            expect(wrapper.find(MaterialCheckbox).exists()).to.true;
            expect(wrapper.find(MaterialCheckbox).getElement().props.style).to.deep.equal({ height: "16px", width: '100%' });
            expect(wrapper.find(MaterialCheckbox).getElement().props.inputStyle).to.deep.equal({ height: "16px" });
            expect(wrapper.find(MaterialCheckbox).getElement().props.iconStyle).to.deep.equal({ height: "16px", width: "16px" });
            expect(wrapper.find(MaterialCheckbox).getElement().props.disabled).to.false;
            expect(wrapper.find(MaterialCheckbox).getElement().props.checkedIcon.props.className).to.equal('checkbox-on');
            expect(wrapper.find(MaterialCheckbox).getElement().props.uncheckedIcon.props.className).to.equal('checkbox-off');
            expect(wrapper.find(MaterialCheckbox).getElement().props.onCheck).to.equal(spyOnCheck);
            expect(wrapper.find(MaterialCheckbox).getElement().props.disableTouchRipple).to.true;
        });

        it('specific value', () => {
            wrapper = shallow(<Checkbox onCheck={spyOnCheck} checked={false}
                                        height={24}
                                        width={50}
                                        label={'some label'}
                                        labelFontSize={15}
                                        disabled={true}
            />);

            expect(wrapper.find(MaterialCheckbox).getElement().props.style).to.deep.equal({ height: "16px", width: "100%" });
            expect(wrapper.find(MaterialCheckbox).getElement().props.inputStyle).to.deep.equal({ height: "16px" });
            expect(wrapper.find(MaterialCheckbox).getElement().props.iconStyle).to.deep.equal({ height: "16px", width: "16px" });
            expect(wrapper.find(MaterialCheckbox).getElement().props.label).to.deep.equal('some label');
            expect(wrapper.find(MaterialCheckbox).getElement().props.labelStyle).to.deep.equal({ fontSize: 13, height: "16px", lineHeight: '16px', width:'100%' });
            expect(wrapper.find(MaterialCheckbox).getElement().props.disabled).to.true;
            expect(wrapper.find(MaterialCheckbox).getElement().props.checkedIcon.props.className).to.equal('checkbox-on__dimmed');
            expect(wrapper.find(MaterialCheckbox).getElement().props.uncheckedIcon.props.className).to.equal('checkbox-off__dimmed');
        });
    });
});