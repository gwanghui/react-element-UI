import React from 'react';
import sinon from 'sinon';
import {expect} from 'chai';
import {shallow} from "enzyme";
import i18n from "nexshop-web-i18n";
import Dialog from "../../../../src/component/dialog/dialog";
import TemplateUrlDialog from "../../../../src/component/dialog/template-url/template-url-dialog";
import RadioGroup from "../../../../src/component/radio/radio-group";
import Radio from "../../../../src/component/radio/radio";
import TextField from "../../../../src/component/input/text-field";
import CheckBox from "../../../../src/component/checkbox/checkbox";

describe('Template Url Dialog Spec', () => {
    let wrapper;

    let spyOnCancelClicked = sinon.spy();
    let spyOnOkClicked = sinon.spy();
    let spyOnDeleteClicked = sinon.spy();

    const panel = {
        id: 'p2-1',
        url: 'http://samsung.com',
        editable: 'editable'
    };

    beforeEach(() => {
        i18n.changeLanguage('test');

        wrapper = shallow(<TemplateUrlDialog
            visibility={true}
            isInitUrlDialog={true}
            panel={panel}
            onCancelClicked={spyOnCancelClicked}
            onOkClicked={spyOnOkClicked}
            onDeleteClicked={spyOnDeleteClicked}
            editor={'template'}
        />);
    });

    afterEach(() => {
        spyOnCancelClicked.reset();
        spyOnOkClicked.reset();
    });

    describe('render', () => {
        describe('editor is template', () => {
            it('has subscription', () => {
                expect(wrapper.find('.template-url-dialog__subscription')).lengthOf(1);
                expect(wrapper.find('.template-url-dialog__subscription').text()).to.be.equal('detailTemplate.urlPop.text'); //Would you like to enter the URL address?
            });

            it('has RadioGroup button', () => {
                expect(wrapper.find(RadioGroup)).to.be.lengthOf(1);
            });

            it('has two radio button', () => {
                expect(wrapper.find(Radio)).to.be.lengthOf(2);
            });

            it('has TextField', () => {
                expect(wrapper.find(TextField)).to.be.lengthOf(1);
            });

            it('has CheckBox', () => {
                expect(wrapper.find(CheckBox)).to.be.lengthOf(1);
            });
        });

        describe('editor is scene', () => {
            beforeEach(() => {
                wrapper.setProps({editor: 'scene'});
            });

            it('has TextField', () => {
                expect(wrapper.find(TextField)).to.be.lengthOf(1);
            });

            it('has subscription text when templatePresetUrl is yes', () => {
                wrapper.setState({templatePresetUrl: 'yes'});
                expect(wrapper.find('.scene-url-dialog__subscription').text()).to.be.equal('detailScene.sceneUrlPop.guide');
            });
        });
    });

    describe('pass props', () => {
        it('Dialog receive props', () => {
            const dialogProps = wrapper.find(Dialog).getElement().props;

            expect(dialogProps.isOpen).to.be.equal(wrapper.instance().props.visibility);
            expect(dialogProps.optionButtonText).to.be.null;
            expect(dialogProps.onNegativeClick).to.be.equal(wrapper.instance().onCloseClick);
            expect(dialogProps.onPositiveClick).to.be.equal(wrapper.instance().onPositiveClick);
            expect(dialogProps.onCloseClick).to.be.equal(wrapper.instance().onCloseClick);
            expect(dialogProps.onOptionClick).to.be.equal(wrapper.instance().onDeleteClick);
        });

        it('Dialog receive optionButtonText to DELETE, when isInitUrlDialog is false', () => {
            wrapper.setProps({isInitUrlDialog: false});
            const dialogProps = wrapper.find(Dialog).getElement().props;

            expect(dialogProps.optionButtonText).to.be.equal('detailTemplate.urlPop.textBtn.delete'); //DELETE
        });

        it('Dialog receive optionButtonText is null, when editor is scene', () => {
            wrapper.setProps({editor: 'scene'});
            const dialogProps = wrapper.find(Dialog).getElement().props;

            expect(dialogProps.optionButtonText).to.be.null;
        });

        it('Dialog receive disabledOkButton to true, when templatePresetUrl is yes and address is empty', () => {
            wrapper.setState({templatePresetUrl: 'yes', address: ''});
            const dialogProps = wrapper.find(Dialog).getElement().props;

            expect(dialogProps.positiveButtonDisabled).to.be.true;
        });

        it('RadioGroup receive name, defaultSelected', () => {
            const radioGroupProps = wrapper.find(RadioGroup).getElement().props;

            expect(radioGroupProps.name).to.be.equal('template-preset-url');
            expect(radioGroupProps.defaultSelected).to.be.equal('no');
            expect(radioGroupProps.valueSelected).to.be.equal(wrapper.state('templatePresetUrl'));
            expect(radioGroupProps.onChange).to.be.equal(wrapper.instance().onPresetUrlChanged);
        });

        describe('template-url-address TextField', () => {
            it('TextField receive hintText, name', () => {
                const textFieldProps = wrapper.find(TextField).getElement().props;

                expect(textFieldProps.hintText).to.be.equal('detailTemplate.urlPop.selectOption3.hint'); //Enter URL address
                expect(textFieldProps.name).to.be.equal('template-url-address');
                expect(wrapper.find(TextField).getElement().props.disabled).to.be.false;
            });
        });

        describe('template-url-address CheckBox', () => {
            it('CheckBox receive label', () => {
                expect(wrapper.find(CheckBox).getElement().props.label).to.be.equal('detailTemplate.urlPop.checkBox'); //Don’t allow others to change the address
            });

            it('disabled true when templatePresetUrl is no', () => {
                expect(wrapper.find(CheckBox).getElement().props.disabled).to.be.true;
            });

            it('disabled false when templatePresetUrl is not no', () => {
                wrapper.setState({templatePresetUrl: 'yes'});

                expect(wrapper.find(CheckBox).getElement().props.disabled).to.be.false;
            });

            it('label text color is #c7c7c7 when disable true', () => {
                wrapper.setState({templatePresetUrl: 'no'});

                expect(wrapper.find(CheckBox).getElement().props.labelStyle.color).to.be.equal('#c7c7c7');
            });

            it('label text color is #777777 when disable false', () => {
                wrapper.setState({templatePresetUrl: 'yes'});

                expect(wrapper.find(CheckBox).getElement().props.labelStyle.color).to.be.equal('#777777');
            });
        });
    });

    describe('lifecycle function', () => {
        beforeEach(() => {
            sinon.spy(wrapper.instance(), 'setState');
        });

        afterEach(() => {
            wrapper.instance().setState.restore();
        });

        it('visibility is not changed, then do not anything', () => {
            wrapper.setProps({visibility: true});
            wrapper.instance().componentWillReceiveProps({visibility: true});

            expect(wrapper.instance().setState.called).to.be.false;
        });

        it('visibility is false, then do not anything', () => {
            wrapper.setProps({visibility: true});
            wrapper.instance().componentWillReceiveProps({visibility: true});

            expect(wrapper.instance().setState.called).to.be.false;
        });

        it('isInitUrlDialog is true, then call setState with init state info', () => {
            wrapper.setProps({visibility: false});
            wrapper.instance().componentWillReceiveProps({visibility: true, isInitUrlDialog: true});

            expect(wrapper.instance().setState.calledWith({
                templatePresetUrl: 'no',
                address: '',
                addressUneditable: false,
            })).to.be.true;
        });

        it('isInitUrlDialog is false, then call setState with panel info', () => {
            wrapper.setProps({visibility: false});
            wrapper.instance().componentWillReceiveProps({
                visibility: true,
                isInitUrlDialog: false,
                panel
            });

            expect(wrapper.instance().setState.calledWith({
                templatePresetUrl: 'yes',
                address: 'http://samsung.com',
                addressUneditable: false,
            })).to.be.true;
        });

        describe('componentDidUpdate', () => {
            it('when editor is not template and textField is exist, then focus to textField', () => {
                wrapper.instance().textField = {
                    input: {
                        value: 'some url',
                        focus: sinon.spy(),
                        setSelectionRange: sinon.spy()
                    },
                };
                wrapper.setProps({editor: 'scene'});
                wrapper.instance().componentDidUpdate();

                expect(wrapper.instance().textField.input.focus.called).to.be.true;
                expect(wrapper.instance().textField.input.setSelectionRange.calledWith(8, 8)).to.be.true;
            });

            it('when editor is template or textField is not exist, then do not focus to textfield', () => {
                wrapper.instance().textField = {
                    input: {
                        value: 'some url',
                        focus: sinon.spy(),
                        setSelectionRange: sinon.spy()
                    },
                };
                wrapper.setProps({editor: 'template'});
                wrapper.instance().componentDidUpdate();

                expect(wrapper.instance().textField.input.focus.called).to.be.false;
                expect(wrapper.instance().textField.input.setSelectionRange.called).to.be.false;
            });
        });
    });

    describe('inner function', () => {
        describe('getInitialState', () => {
            it('return init state info', () => {
                const initState = wrapper.instance().getInitialState();

                expect(initState.templatePresetUrl).to.be.equal('no');
                expect(initState.address).to.be.equal('');
                expect(initState.addressUneditable).to.be.false;
            });
        });

        describe('onPresetUrlChanged', () => {
            it('set templatePresetUrl state when click radio button', () => {
                wrapper.instance().onPresetUrlChanged(null, 'yes');

                expect(wrapper.state('templatePresetUrl')).to.be.equal('yes');
            });

            it('call onPresetUrlChanged with event object and "yes", when TextField is focused in template editor', () => {
                wrapper.setProps({editor: 'template'});
                wrapper.setState({templatePresetUrl: 'no'});
                wrapper.find(TextField).getElement().props.onFocus();

                expect(wrapper.state('templatePresetUrl')).to.be.equal('yes');
            });
        });

        describe('onPositveClick', () => {
            it('state value reset and call onOkclicked with add to address http protocol, when address is not included http', () => {
                wrapper.setState({
                    templatePresetUrl: 'yes',
                    address: 'some url',
                    addressUneditable: true,
                });

                wrapper.instance().onPositiveClick();
                expect(spyOnOkClicked.calledWith('http://some url', 'uneditable')).to.be.true;
            });

            it('state value reset and call onOkclicked with address as it is, when address is included http', () => {
                wrapper.setState({
                    templatePresetUrl: 'yes',
                    address: 'https://some url',
                    addressUneditable: true,
                });

                wrapper.instance().onPositiveClick();
                expect(spyOnOkClicked.calledWith('https://some url', 'uneditable')).to.be.true;
            });

            it('state value reset and call onOkclicked with address as it is, when address is included http', () => {
                wrapper.setState({
                    templatePresetUrl: 'no',
                    address: '',
                    addressUneditable: false,
                });

                wrapper.instance().onPositiveClick();
                expect(spyOnOkClicked.calledWith('', 'editable')).to.be.true;
            });
        });

        describe('onCloseClick', () => {
            it('call onCancelClicked and state value reset', () => {
                wrapper.setState({
                    templatePresetUrl: 'yes',
                    address: 'some url',
                    addressUneditable: true,
                });
                wrapper.instance().onCloseClick();

                expect(spyOnCancelClicked.called).to.be.true;
            });
        });

        describe('onAddressChanged', () => {
            it('set addresss value', () => {
                wrapper.instance().onAddressChanged(null, 'some url');
                expect(wrapper.state('address')).to.be.equal('some url');
            });
        });

        describe('onAddressEditableChecked', () => {
            it('set addressUneditable value', () => {
                wrapper.instance().onAddressEditableChecked(null, true);
                expect(wrapper.state('addressUneditable')).to.be.true;
            });
        });

        describe('onDeleteClick', () => {
            it('call onDeleteClicked', () => {
                const mockEvent = 'some event';
                wrapper.instance().onDeleteClick(mockEvent);

                expect(spyOnDeleteClicked.calledWith('some event', 'p2-1')).to.be.true;
            });
        });

        describe('getTextField', () => {
            it('set textField element to field member, when element is exist', () => {
                const element = {
                    textField: {
                        input: 'some url'
                    }
                };
                wrapper.instance().getTextField(element);

                expect(wrapper.instance().textField).to.be.deep.equal({input: 'some url'});
            });

            it('do not set textField element to field member, when element is not exist', () => {
                wrapper.instance().textField = {input: 'some url'};
                wrapper.instance().getTextField(null);

                expect(wrapper.instance().textField).to.be.deep.equal({input: 'some url'});
            });
        });
    });
});