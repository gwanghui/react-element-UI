import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import NotificationDialog from "../../../../src/component/dialog/notification/notification-dialog";
import Dialog from "../../../../src/component/dialog/dialog";

describe('NotificationDialog Spec', () => {
    const spyOnClose = sinon.spy();

    let wrapper;
    let instance;

    beforeEach(() => {
        wrapper = shallow(<NotificationDialog isOpen={true}
                                              message={{
                                                  title: 'test title message',
                                                  sub: 'test sub message'
                                              }}
                                              onClose={spyOnClose}
        />);
        instance = wrapper.instance();
    });

    afterEach(() => {
        spyOnClose.reset();
    });

    describe('rendering', () => {
        it('if isOpen is true, show div is included message', () => {
            expect(wrapper.find(Dialog).find('div').length).to.be.equal(4);
        });

        it('if isOpen is false, do not show anything', () => {
            wrapper.setProps({isOpen: false});
            expect(wrapper.find(Dialog).find('div').length).to.be.equal(0);
        });
    });
});