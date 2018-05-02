import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import sinon from "sinon";
import SingleFileInput from "../../../src/component/file/single-file-input";
import BoxButton from '../../../src/component/button/box-button/box-button';
import FlatButton from "../../../src/component/button/flat-button/flat-button";

describe('Single File Input Spec', () => {
    let wrapper;
    let instance;

    let spyGetFile = sinon.spy();

    beforeEach(() => {
        wrapper = shallow(<SingleFileInput title='File'
                                           isMandatory={true}
                                           style={{
                                               labelFontSize: '11px',
                                               labelColor: '#777777',
                                               labelWidth: '130px',
                                               inputLeftPadding: '12px',
                                               inputRightPadding: '12px',
                                           }}
                                           placeHolder={'PlaceHolder'}
                                           disabled={false}
                                           fileType={'*'}
                                           getFile={spyGetFile}/>);
        instance = wrapper.instance();
    });

    afterEach(() => {
        spyGetFile.reset();
    });

    describe('render', () => {
        it('hasElement', () => {
            expect(wrapper.find('.single-file-input__input')).to.be.lengthOf(1);
            expect(wrapper.find('input[type="file"]')).to.be.lengthOf(1);
            expect(wrapper.find('.single-file-input__info-text')).to.be.lengthOf(1);
            expect(wrapper.find(BoxButton)).to.be.lengthOf(1);
            expect(wrapper.find(FlatButton)).to.be.lengthOf(0);
        });

        it('has FlatButton when button is inside', () => {
            wrapper.setProps({
                setButtonInside: true
            });

            expect(wrapper.find(BoxButton)).to.be.lengthOf(0);
            expect(wrapper.find(FlatButton)).to.be.lengthOf(1);
        });
    });

    describe('events', () => {
        beforeEach(() => {
            instance.singleFile = {click: sinon.spy()};
        });

        afterEach(() => {
            instance.singleFile = undefined;
        });

        it('click add file button', () => {
            instance.singleFile = {click: sinon.spy()};
            wrapper.find(BoxButton).at(0).simulate('click');
            expect(instance.singleFile.click.called).to.be.true;
        });

        it('click upload button', () => {
            wrapper.setProps({
                setButtonInside: true
            });

            instance.singleFile = {click: sinon.spy()};
            wrapper.find(FlatButton).at(0).simulate('click');
            expect(instance.singleFile.click.called).to.be.true;
        });
    });

    describe('lifecycle', () => {
        it('componentWillReceiveProps', () => {
            instance.fileNameInput = {value: 'test'};
            instance.singleFile = {value: {name:''}};
            wrapper.setState({
                infoText: 'SW Version: 1.2.3',
            });

            wrapper.setProps({
                fileType: 'LFD-WIN-C'
            });

            expect(wrapper.state('infoText')).to.be.equal('');
            expect(instance.fileNameInput.value).to.be.equal('');
            expect(instance.singleFile.value).to.be.equal('');
            expect(spyGetFile.calledWith(undefined)).to.be.true;
        });
    });

    describe('func', () => {
        beforeEach(() => {
            instance.fileNameInput = {value: ''};
            instance.singleFile = {value: ''};

            let fakeFileReader = function () {
                this.readAsBinaryString = () => {
                    this.onloadend({
                        target: {
                            readyState: 'done',
                            result: 'some text'
                        },
                    });
                };
            };

            global.FileReader = fakeFileReader;
            global.FileReader.DONE = 'done'
        });

        afterEach(() => {
            global.FileReader = undefined;
        });

        it('getFileType', () => {
            let result = instance.getFileType('LFD-WIN-C');
            expect(result).to.be.equal('.zip');

            result = instance.getFileType('LFD-WIN-P');
            expect(result).to.be.equal('.zip');

            result = instance.getFileType('LFD-TIZ');
            expect(result).to.be.equal('.wgt');

            result = instance.getFileType('LFD-TIZ/xml');
            expect(result).to.be.equal('.xml');

            result = instance.getFileType('image/jpeg');
            expect(result).to.be.equal('image/jpeg');
        });

        it('setFile when fileType is tizen xml', () => {
            wrapper.setProps({fileType: 'LFD-TIZ/xml'});

            wrapper.find('input[type="file"]').at(0).simulate('change', {
                target: {
                    files: [
                        {name: 'testFile.xml'}
                    ],
                    readyState: 'done',
                    value: 'c:\\test\\testFile.xml',
                }
            });

            expect(instance.fileNameInput.value).to.be.equal('testFile.xml');
            expect(spyGetFile.calledWith('some text')).to.be.true;
            expect(wrapper.state('infoText')).to.be.equal('');
        });

        it('setFile when fileType is promised file', () => {
            wrapper.setProps({fileType: 'LFD-TIZ'});
            const file = {name: 'testFile_1.2.0.wgt'};
            wrapper.find('input[type="file"]').at(0).simulate('change', {
                target: {
                    files: [
                        file
                    ],
                    value: 'c:\\test\\testFile_1.2.0.wgt'
                }
            });

            expect(instance.fileNameInput.value).to.be.equal('testFile_1.2.0.wgt');
            expect(spyGetFile.calledWith(file)).to.be.true;
            expect(wrapper.state('infoText')).to.be.equal('SW Version: 1.2.0');
        });

        it('setFile when fileType is promised file', () => {
            wrapper.setProps({fileType: 'LFD-WIN-C'});
            const file = {name: 'testFile_1.2.0.zip'};
            wrapper.find('input[type="file"]').at(0).simulate('change', {
                target: {
                    files: [
                        file
                    ],
                    value: 'c:\\test\\testFile_1.2.0.zip'
                }
            });

            expect(instance.fileNameInput.value).to.be.equal('testFile_1.2.0.zip');
            expect(spyGetFile.calledWith(file)).to.be.true;
            expect(wrapper.state('infoText')).to.be.equal('SW Version: 1.2.0');
        });

        it('setFile when fileType is promised file', () => {
            wrapper.setProps({fileType: 'LFD-WIN-P'});
            const file = {name: 'testFile_1.2.0.zip'};
            wrapper.find('input[type="file"]').at(0).simulate('change', {
                target: {
                    files: [
                        file
                    ],
                    value: 'c:\\test\\testFile_1.2.0.zip'
                }
            });

            expect(instance.fileNameInput.value).to.be.equal('testFile_1.2.0.zip');
            expect(spyGetFile.calledWith(file)).to.be.true;
            expect(wrapper.state('infoText')).to.be.equal('SW Version: 1.2.0');
        });

        it('setFile when fileType is promised file', () => {
            wrapper.setProps({fileType: 'LFD-WIN-P'});
            const file = {name: 'testFile_1.2.0.txt'};
            wrapper.find('input[type="file"]').at(0).simulate('change', {
                target: {
                    files: [
                        file
                    ],
                    value: 'c:\\test\\testFile_1.2.0.txt'
                }
            });

            expect(instance.fileNameInput.value).to.be.equal('');
            expect(spyGetFile.calledWith(file)).to.be.false;
            expect(wrapper.state('infoText')).to.be.equal('');
        });

        it('setFile when fileType is default', () => {
            const file = {name: 'abc.jpg'};
            wrapper.find('input[type="file"]').at(0).simulate('change', {
                target: {
                    files: [
                        file
                    ]
                }
            });

            expect(instance.fileNameInput.value).to.be.equal('abc.jpg');
            expect(spyGetFile.calledWith(file)).to.be.true;
            expect(wrapper.state('infoText')).to.be.equal('');
        });
    });
});
