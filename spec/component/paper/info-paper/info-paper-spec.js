import React from 'react';
import {expect} from 'chai';
import InfoPaper from "../../../../src/component/paper/info-paper/info-paper";
import {shallow} from "enzyme";
import MaterialPaper from 'material-ui/Paper/Paper';

describe('InfoPaper Spec', () => {
    let wrapper;
    let instance;

    beforeEach(() => {
        wrapper = shallow(<InfoPaper rules={[{content:'rule1'},{content:'rule2'}]} style={{display:'none'}}/>);
        instance = wrapper.instance();
    });

    it('pass props', () => {
        expect(wrapper.find(MaterialPaper).props().style.display).to.be.equal('none');
    });

    it('render Rules Area', () => {
        wrapper.setProps({style:{display:'block'}});
        expect(instance.props.rules).to.be.lengthOf(2);
    });
});