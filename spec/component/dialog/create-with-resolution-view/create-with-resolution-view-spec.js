import React from 'react';
import sinon from 'sinon';
import {expect} from 'chai';
import {shallow} from "enzyme";
import CreateWithResolutionView from "../../../../src/component/dialog/create-with-resolution-view/create-with-resolution-view"
import ResolutionDropDown from "../../../../src/component/drop-down/resolution-drop-down/resolution-drop-down";
import TextField from "../../../../src/component/input/text-field";
import Dialog from "../../../../src/component/dialog/dialog";
import ResolutionView from "../../../../src/component/drop-down/resolution-drop-down/resolution-view";

describe('Create With Resolution view Spec', () => {
    const spyOnTitleChange = sinon.spy();
    const spyOnTitleInputBlur = sinon.spy();
    const spyOnClose = sinon.spy();
    const spyOnCreated = sinon.spy();

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CreateWithResolutionView
            label="Scene Name"
            visibility={true}
            errorText=""
            resolutionItems={['item1, item2']}
            onTitleChange={spyOnTitleChange}
            onTitleInputBlur={spyOnTitleInputBlur}
            onClose={spyOnClose}
            onCreated={spyOnCreated}
            copiedTitle={undefined}
            copiedResolution={undefined}
        />);
    });

    afterEach(() => {
        spyOnTitleChange.reset();
        spyOnTitleInputBlur.reset();
        spyOnClose.reset();
        spyOnCreated.reset();
    });

    it('shows that + Name as a title', () => {
        expect(wrapper.find(TextField).props().label).to.equal("Scene Name");
    });
    
    describe('lifecycle', () => {
        describe('componentWillReceiveProps', () => {
            it('when copiedTitle is changed, then call setState with copiedTitle, copiedResolution', () => {
                const nextProps = {
                    copiedTitle: 'copiedTitle',
                    copiedResolution: {
                        value: '16 : 9',
                        text: '',
                        orientation: 'horizontal',
                        code: {horizontal: {width: '16', height: '9'}, vertical: {width: '9', height: '16'}}
                    }
                };
                wrapper.setState({
                    title: 'title',
                    resolution: {
                        value: '16 : 9',
                        text: '',
                        orientation: 'vertical',
                        code: {horizontal: {width: '16', height: '9'}, vertical: {width: '9', height: '16'}}
                    }
                });

                wrapper.instance().componentWillReceiveProps(nextProps);

                expect(wrapper.state('title')).to.be.equal('copiedTitle');
                expect(wrapper.state('resolution')).to.be.deep.equal({
                    value: '16 : 9',
                    text: '',
                    orientation: 'horizontal',
                    code: {horizontal: {width: '16', height: '9'}, vertical: {width: '9', height: '16'}}
                });
            });

            it('when copiedTitle is changed, then call onTitleDuplicateCheck with copiedTitle', () => {
                const nextProps = {
                    copiedTitle: 'copiedTitle',
                    copiedResolution: {}
                };

                wrapper.instance().componentWillReceiveProps(nextProps);

                expect(spyOnTitleInputBlur.calledWith('copiedTitle')).to.be.true;
            });
        });
    });

    describe('Dialog', () => {
        it('pass props', () => {
            expect(wrapper.find(Dialog).prop('isOpen')).to.be.true;
            expect(wrapper.find(Dialog).prop('positiveButtonDisabled')).to.be.true;
            expect(wrapper.find(Dialog).prop('onNegativeClick')).to.equal(wrapper.instance().onClosed);
            expect(wrapper.find(Dialog).prop('onCloseClick')).to.equal(wrapper.instance().onClosed);
            expect(wrapper.find(Dialog).prop('onPositiveClick')).to.equal(wrapper.instance().onCreated);
        });
    });

    describe('TextField', () => {
        it('call fetchExistContentNameAsync when after input name and focus out', () => {
            wrapper.setState({
                title: 'some scene name',
            });

            wrapper.find(TextField).simulate('blur');
            expect(spyOnTitleInputBlur.called).to.be.true;
        });

        it('passes changeTitle as onChange of input', () => {
            expect(wrapper.find(TextField).prop('onChange')).to.equal(wrapper.instance().onTitleChange);
        });
    });

    describe('ResolutionDropDown', () => {
        it('passes changeResolution as onChange prop', () => {
            expect(wrapper.find(ResolutionDropDown).prop('onChange')).to.equal(wrapper.instance().onResolutionChange);
        });
    });

    describe('event', () => {
        it('changeTitle changes title state', () => {
            wrapper.instance().onTitleChange({target: {value: 'new title'}});

            expect(wrapper.state('title')).to.equal('new title');
        });

        it('changeResolution changes resolution state', () => {
            wrapper.instance().onResolutionChange({value: 'value', text: 'text'});

            expect(wrapper.state('resolution')).to.deep.equal({value: 'value', text: 'text'});
        });

        it('calls onClose when onNegativeClick of Dialog is called', () => {
            const event = {
                preventDefault: () => {
                }
            };
            wrapper.find(Dialog).simulate('negativeClick', event);

            expect(spyOnClose.called).to.be.true;
        });

        it('calls onClose when onCloseClick of Dialog is called', () => {
            const event = {
                preventDefault: () => {
                }
            };
            wrapper.find(Dialog).simulate('closeClick', event);

            expect(spyOnClose.called).to.be.true;
        });

        it('calls onCreated when onPositiveClick of Dialog is called', () => {
            wrapper.setState({
                title: 'create title',
                resolution: 'create resolution'
            });
            wrapper.find(Dialog).simulate('positiveClick');

            expect(spyOnCreated.calledWith('create title', 'create resolution')).to.be.true;
        });
    });

    describe('render', () => {
        it('create button is disabled when name and resolution is not selected', () => {
            expect(wrapper.find(Dialog).getElement().props.positiveButtonDisabled).to.be.true;
        });

        it('create button is not disabled when name and resolution is selected', () => {
            wrapper.setState({
                title: 'some title',
                resolution: 'some resolution',
            });

            expect(wrapper.find(Dialog).getElement().props.positiveButtonDisabled).to.be.false;
        });


        it('create button is disabled when error text is not empty', () => {
            wrapper.setState({
                title: 'some title',
                resolution: 'some resolution',
            });

            wrapper.setProps({
                errorText: 'error'
            });

            expect(wrapper.find(Dialog).getElement().props.positiveButtonDisabled).to.be.true;
        });

        it('when copiedResolution in props is exist, then show ResolutionView component', () => {
             wrapper.setProps({
                 copiedResolution: {orientation: 'some resolution'}
             });

             expect(wrapper.find(ResolutionView)).to.be.lengthOf(1);
        });
    });

    describe('function', () => {
        describe('isCreateButtonDisabled', () => {
            it('create button disabled when title only contain whitespace', () => {
                wrapper.setProps({
                    createButtonDisabled: false,
                });

                wrapper.setState({
                    title: '   ',
                    resolution: {width: 1920, height: 1080}
                });

                const expectedDisabled = wrapper.instance().isCreateButtonDisabled();

                expect(expectedDisabled).to.be.true;
            });
        });
    });
});