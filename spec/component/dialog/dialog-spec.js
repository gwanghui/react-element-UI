import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import * as sinon from "sinon";
import MaterialDialog from 'material-ui/Dialog';

import Dialog from "../../../src/component/dialog/dialog";
import createMockHistory from "../../test-helper/mock-history";

describe('Dialog Spec', () => {
    const spyOnPositiveClick = sinon.spy();
    const spyOnCloseClick = sinon.spy();
    const spyHistoryUnlisten = sinon.spy();

    let wrapper;
    let instance;
    let mockHistory;

    beforeEach(() => {
        mockHistory = createMockHistory();
        mockHistory.location.state = {
            '1_NEXSHOP_DIALOG': true,
            '2_NEXSHOP_DIALOG': true,
            'other key': 'other value',
        };
        sinon.stub(mockHistory, 'listen').returns(spyHistoryUnlisten);

        wrapper = shallow(
            <Dialog.WrappedComponent
                isOpen={false}
                history={mockHistory}
                positiveButtonText={'OK'}
                onPositiveClick={spyOnPositiveClick}
                onCloseClick={spyOnCloseClick}
            />
        );

        instance = wrapper.instance();
    });

    afterEach(() => {
        spyOnPositiveClick.reset();
        spyOnCloseClick.reset();
        spyHistoryUnlisten.reset();

        instance.detachKeyDownEvent()
    });

    describe('rendering', () => {
        it('shows header close button when props.onCloseClick is exist', () => {
            const spyOnCloseClick = sinon.spy();
            wrapper.setProps({onCloseClick: spyOnCloseClick});

            expect(wrapper.find('.default-dialog-header__close').length).to.equal(1);
            expect(wrapper.find('.default-dialog-header__close').prop('onClick')).to.equal(spyOnCloseClick);
        });

        it('sets overlayStyle backgroundColor when props.isDimmed is false', () => {
            wrapper.setProps({isDimmed: false});

            expect(wrapper.find(MaterialDialog).prop('overlayStyle').backgroundColor).to.equal('transparent');
        });

        it('does not show secondary button when negativeButtonText is not exist', () => {
            expect(wrapper.find(MaterialDialog).prop('actions').length).to.equal(1);

            wrapper.setProps({negativeButtonText: 'CANCEL', onNegativeClick: sinon.spy()});

            expect(wrapper.find(MaterialDialog).prop('actions').length).to.equal(2);
        });

        it('does not show primary button when positiveButtonText is not exist', () => {
            expect(wrapper.find(MaterialDialog).prop('actions').length).to.equal(1);

            wrapper.setProps({positiveButtonText: null});

            expect(wrapper.find(MaterialDialog).prop('actions').length).to.equal(0);
        });
    });

    describe('lifecycle', () => {
        let spyAddEventListener;
        let spyRemoveEventListener;
        let spySetTimeout;

        beforeEach(() => {
            spyAddEventListener = sinon.spy(window, 'addEventListener');
            spyRemoveEventListener = sinon.spy(window, 'removeEventListener');
            spySetTimeout = sinon.spy(global, 'setTimeout');
        });

        afterEach(() => {
            window.addEventListener.restore();
            window.removeEventListener.restore();
            global.setTimeout.restore();
        });

        describe('componentWillMount', () => {
            describe('listenHistory', () => {
                let listenCallback;

                beforeEach(() => {
                    listenCallback = mockHistory.listen.lastCall.args[0];
                });

                it('sets pushed of state to true when action is PUSH and dialogName is exist in location.state', () => {
                    listenCallback({state: {[instance.dialogName]: true}}, 'PUSH');

                    expect(instance.state.pushed).to.be.true;
                });

                it('sets pushed of state to false when action is POP and dialogName is not exist in location.state', () => {
                    wrapper.setProps({isOpen: true});
                    wrapper.setState({pushed: true});

                    listenCallback({}, 'POP');

                    expect(instance.state.pushed).to.be.false;
                });

                it('calls onCloseClick when action is POP and dialogName is not exist in location.state', () => {
                    wrapper.setProps({isOpen: true});
                    wrapper.setState({pushed: true});
                    listenCallback({}, 'POP');

                    expect(spyOnCloseClick.called).to.be.true;
                });
            });
        });

        describe('componentWillReceiveProps', () => {
            it('push new state to history when dialog is open', () => {
                expect(Object.keys(mockHistory.location.state).length).to.equal(3);

                wrapper.setProps({isOpen: true});
                const pushState = spySetTimeout.lastCall.args[0];

                pushState();

                expect(Object.keys(mockHistory.location.state).length).to.equal(4);
            });

            it('calls goBack when dialog is close', () => {
                instance.pushState();

                wrapper.setProps({isOpen: true});
                wrapper.setProps({isOpen: false});

                expect(mockHistory.goBack.called).to.be.true;
            });
        });

        describe('componentWillUnmount', () => {
            beforeEach(() => {
                instance.componentWillUnmount();
            });

            it('calls historyUnliten', () => {
                expect(instance.historyUnlisten.called).to.be.true;
            });
        });

        describe('componentDidUpdate', () => {
            it('calls addEventListener with arguments', () => {
                wrapper.setProps({isOpen: true});
                instance.keyEventAttatched = false;

                instance.componentDidUpdate();
                expect(window.addEventListener.calledWith('keydown', instance.closeByEscape)).to.be.true;
            });

            it('calls removeEventListener with arguments', () => {
                wrapper.setProps({isOpen: false});
                instance.keyEventAttatched = true;

                instance.componentDidUpdate();

                expect(window.removeEventListener.calledWith('keydown', instance.closeByEscape)).to.be.true;
            });
        });
    });

    describe('methods', () => {
        describe('closeByEscape', () => {
            let mockEvent;
            beforeEach(() => {
                mockHistory.push({state: {[instance.dialogName]: true}});
                mockEvent = {keyCode: 27,};
            });

            it('does not call anything when enableOnEscapeKeyClose is false', () => {
                wrapper.setProps({enableOnEscapeKeyClose: false});

                window.dispatchEvent(new KeyboardEvent('keydown', mockEvent));

                expect(mockHistory.goBack.called).to.be.false;
                expect(spyOnCloseClick.called).to.be.false;
            });

            it('does not call anything when keyCode is not ESC', () => {
                mockEvent.keyCode = 30;

                window.dispatchEvent(new KeyboardEvent('keydown', mockEvent));

                expect(mockHistory.goBack.called).to.be.false;
                expect(spyOnCloseClick.called).to.be.false;
            });

            it('calls goBack when enableOnBrowserBackClose is true', () => {
                instance.attachKeyDownEvent();
                window.dispatchEvent(new KeyboardEvent('keydown', mockEvent));

                expect(mockHistory.goBack.called).to.be.true;
                expect(spyOnCloseClick.called).to.be.false;
            });

            it('calls onCloseClick when enableOnBrowserBackClose is false', () => {
                wrapper.setProps({enableOnBrowserBackClose: false, isOpen: true});

                instance.attachKeyDownEvent();
                window.dispatchEvent(new KeyboardEvent('keydown', mockEvent));

                expect(mockHistory.goBack.called).to.be.false;
                expect(spyOnCloseClick.called).to.be.true;
            });
        });
    });
});