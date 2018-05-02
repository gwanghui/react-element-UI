import React from 'react';
import sinon from 'sinon';
import {expect} from 'chai';
import DiscardRefresh from "../../../../src/component/dialog/discard-confirm/discard-refresh";
import {shallow} from "enzyme";

describe('Discard Refresh Spec', () => {
    let wrapper;
    beforeEach(() => {
        sinon.stub(window, 'removeEventListener');
        sinon.stub(window, 'addEventListener');

        wrapper = shallow(<DiscardRefresh/>);
    });

    afterEach(() => {
        window.removeEventListener.restore();
        window.addEventListener.restore();
    });

    describe('componentDidMount', () => {
        beforeEach(() => {
            wrapper.instance().componentDidMount();
        });

        it('calls window.removeEventListener', () => {
            expect(window.removeEventListener.called).to.be.true
        });

        it('calls window.addEventListener', () => {
            expect(window.addEventListener.called).to.be.true
        });
    });

    describe('componentWillUnmount', () => {
        beforeEach(() => {
            wrapper.instance().componentWillUnmount();
        });

        it('calls window.removeEventListener', () => {
            expect(window.removeEventListener.called).to.be.true
        });
    });
});