import React from 'react';
import {expect} from 'chai';
import * as sinon from "sinon";
import {shallow} from "enzyme";
import MaterialSnackbar from 'material-ui/Snackbar/Snackbar'
import Snackbar from '../../../src/component/snackbar/snackbar';

describe('Snackbar Spec', () => {
    const spyOnRequestClose = sinon.spy();

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Snackbar message={'some message'} onRequestClose={spyOnRequestClose} open={true}/>);
    });

    afterEach(() => {
        spyOnRequestClose.reset();
    });

    describe('props test', () => {
        it('pass message prop to child component', () => {
            wrapper.setProps({message: 'some message'});
            expect(wrapper.find(MaterialSnackbar).props().message).to.equal("some message");
        });

        it('pass transform style to materialSnackbar', () => {
            wrapper.setProps({open: true, transformStyle: {open: 'open style', close: 'close style'}});
            expect(wrapper.find(MaterialSnackbar).getElement().props.style.transform).to.be.equal('open style');

            wrapper.setProps({open: false, transformStyle: {open: 'open style', close: 'close style'}});
            expect(wrapper.find(MaterialSnackbar).getElement().props.style.transform).to.be.equal('close style');
        });
    });

    describe('timeout test', () => {
        it('when click outside of snackbar, then do not disappear snackbar', () => {
            wrapper.find(MaterialSnackbar).props().onRequestClose('clickaway');

            expect(spyOnRequestClose.called).to.false;
        });

        it('after autoHideDuration time, then do not show snackbar', () => {
            wrapper.find(MaterialSnackbar).props().onRequestClose('timeout');

            expect(spyOnRequestClose.called).to.true;
        });
    });
});