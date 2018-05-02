import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import {shallow} from "enzyme";

import DiscardConfirm from "../../../../src/component/dialog/discard-confirm/discard-confirm";
import AlertDialog from "../../../../src/component/dialog/alert/alert-dialog";

describe('DiscardConfirm Spec', () => {
    const spyOnContinue = sinon.spy();
    const spyOnDiscard = sinon.spy();

    let wrapper;
    let instance;
    let spyUnblock;
    let mockHistory = {
        block: () => {},
        location: {
            pathname: 'old path'
        }
    };

    beforeEach(() => {
        spyUnblock = sinon.spy();

        sinon.stub(mockHistory, 'block').returns(spyUnblock);

        wrapper = shallow(<DiscardConfirm history={mockHistory}
                                          visibility={true}
                                          message={'test message'}
                                          block={false}
                                          onContinue={spyOnContinue}
                                          onDiscard={spyOnDiscard}
        />);
        instance = wrapper.instance();
    });

    afterEach(() => {
        mockHistory.block.restore();
        spyOnContinue.reset();
        spyOnDiscard.reset();
    });

    describe('rendering', () => {
        it('passes props to AlertDialog', () => {
            expect(wrapper.find(AlertDialog).prop('message')).to.equal(wrapper.state('message'));
            expect(wrapper.find(AlertDialog).prop('icon')).to.equal('warning');
            expect(wrapper.find(AlertDialog).prop('onNegativeClick')).to.equal(spyOnContinue);
            expect(wrapper.find(AlertDialog).prop('onPositiveClick')).to.equal(spyOnDiscard);
        });
    });
    
    describe('componentWillReceiveProps', () => {
        it('sets message state as next prop message', () => {
            wrapper.instance().componentWillReceiveProps({message: 'hi'});
            expect(wrapper.state('message')).to.equal('hi');
        });

        describe('when block prop is changed', () => {
            beforeEach(() => {
                wrapper.setState({message: 'some message'});
                wrapper.instance().prevBlock = false;
                wrapper.instance().componentWillReceiveProps({block: true});
            });

            it('sets unblock to history.block when next prop block is true', () => {
                expect(wrapper.instance().unblock).to.equal(spyUnblock);
            });

            it('calls history.block with message when next.block is true', () => {
                const blockCallback = mockHistory.block.lastCall.args[0];
                const message = blockCallback({path: 'some path'});
                expect(message).to.equal('some message');
            });

            it('calls spyUnblock and this.unblock set to null when next.block is false ', () => {
                wrapper.instance().prevBlock = true;
                wrapper.instance().componentWillReceiveProps({block: false});

                expect(spyUnblock.called).to.be.true;
                expect(wrapper.instance().unblock).to.be.null;
            });
        });

        it('sets prevBlock as next prop block', () => {
            wrapper.instance().componentWillReceiveProps({block: true});
            expect(wrapper.instance().prevBlock).to.be.true;
        });
    });
});