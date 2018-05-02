import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import Progress from "../../../src/component/progress/progress";

describe('Progress Spec', () => {
    let wrapper, instance;


    beforeEach(() => {
        wrapper = shallow(<Progress/>);
        instance = wrapper.instance();
    });

    describe('render', () => {
        it('has circle', () => {
            expect(wrapper.find('circle').length).to.be.equal(2);
        });
    });
    
    describe('inner func', () => {
        it('getCircumference', () => {
            expect(instance.getCircumference(2)).to.be.equal(Math.PI * 4);
        });
        
        it('getDashOffset', () => {
            expect(instance.getDashOffset(50, 13)).to.be.equal(Math.PI * 13);
            expect(instance.getDashOffset(-1, 13)).to.be.equal(Math.PI * 13 * 2);
            expect(instance.getDashOffset(101, 13)).to.be.equal(0);

        });
    });

});