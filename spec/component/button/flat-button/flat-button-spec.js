import React from 'react';
import {expect} from 'chai';
import * as sinon from "sinon";
import {shallow} from "enzyme";

import FlatButton from "../../../../src/component/button/flat-button/flat-button";

describe('Flat Button Spec', () => {
    const spyOnClick = sinon.spy();
    const mockEvent = {
        stopPropagation: sinon.spy(),
    };

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<FlatButton label={'flatButton'} onClick={spyOnClick}/>);
    });

    afterEach(() => {
       spyOnClick.reset();
       mockEvent.stopPropagation.reset();
    });

    it('calls stopPropagation and props.onClick when onClick is called', () => {
        wrapper.simulate('click', mockEvent);
        expect(mockEvent.stopPropagation.called).to.be.true;
        expect(spyOnClick.called).to.be.true;
    });
});