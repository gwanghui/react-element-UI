import React, {Component} from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from "lodash/defaultsDeep";
import {autobind} from "core-decorators";

import BoxButton from '../button/box-button/box-button';
import FlatButton from "../button/flat-button/flat-button";

const BUTTON_WIDTH = '66px';
const LABEL_UPLOAD = 'Upload';
const LABEL_ADD_FILE = 'Add File';

@autobind
export default class SingleFileInput extends Component {
    state = {
        infoText: '',
    };

    componentWillReceiveProps(nextProps) {
        const {fileType, getFile} = this.props;

        if (fileType !== nextProps.fileType) {
            this.setState({infoText: ''});

            this.fileNameInput.value = '';
            this.singleFile.value = '';

            getFile(undefined);
        }
    }

    initializeStyle(style, disabled) {
        const {setButtonInside} = this.props;
        let newStyle = {};
        const {
            height, inputLeftPadding, inputRightPadding, backgroundColor, borderWidth, borderColor = '#2e3ab1',
            fontSize, textOverflow = 'normal', overflow = 'visible', whiteSpace = 'normal', labelFontWeight = 'lighter'
        } = style;

        newStyle.width = setButtonInside ? '100%' : `calc(100% - ${BUTTON_WIDTH})`;
        newStyle.height = height;
        newStyle.paddingLeft = inputLeftPadding;
        newStyle.paddingRight = inputRightPadding;
        newStyle.backgroundColor = backgroundColor;
        newStyle.fontSize = fontSize;
        newStyle.borderWidth = borderWidth;
        newStyle.borderColor = borderColor;
        newStyle.textOverflow = textOverflow;
        newStyle.overflow = overflow;
        newStyle.whiteSpace = whiteSpace;
        newStyle.fontWeight = labelFontWeight;
        newStyle.minHeight = '30px';

        if (disabled) {
            return Object.assign({...newStyle}, {
                backgroundColor: '#f9f9f9',
                border: '1px solid #eeeeee',
                color: '#bbbbbb'
            });
        }

        return newStyle;
    }

    validateExtension = (path) => {
        switch (this.props.fileType) {
            case 'LFD-WIN-C':
            case 'LFD-WIN-P':
                return /(\.zip)$/i.exec(path);
            case 'LFD-TIZ':
                return /(\.wgt)$/i.exec(path);
            case 'LFD-TIZ/xml':
                return /(\.xml)$/i.exec(path);
            default:
                return true;
        }
    };

    setFile = (event) => {
        if (!this.validateExtension(event.target.value)) {
            return false;
        }

        const {
            fileType,
            getFile,
        } = this.props;

        const file = event.target.files[0];
        const fileName = file.name;
        this.fileNameInput.value = fileName;

        if (fileType === 'LFD-TIZ/xml') {
            const reader = new FileReader();

            reader.onloadend = (event) => {
                if (event.target.readyState === FileReader.DONE) {
                    getFile(event.target.result);
                }
            };

            reader.readAsBinaryString(file);
        } else {
            getFile(file);

            if (fileType === 'LFD-WIN-C' || fileType === 'LFD-WIN-P' || fileType === 'LFD-TIZ') {
                const from = fileName.indexOf('_');
                const to = fileName.lastIndexOf('.');
                let infoText = '';

                if (from >= 0 && to >= 0) {
                    infoText = `SW Version: ${fileName.substring(from + 1, to)}`;
                }

                this.setState({
                    infoText
                });
            }
        }
    };

    getFileType = (fileType) => {
        if (fileType === 'LFD-WIN-C' || fileType === 'LFD-WIN-P') {
            return '.zip';
        } else if (fileType === 'LFD-TIZ') {
            return '.wgt';
        } else if (fileType === 'LFD-TIZ/xml') {
            return '.xml';
        } else {
            return fileType;
        }
    };

    render() {
        const {infoText} = this.state;

        const {
            title = '',
            isMandatory = false,
            style = {},
            placeHolder = '',
            disabled = false,
            condition = null,
            fileType = '*',
            setButtonInside,
        } = this.props;

        const defaultStyle = {
            labelWidth: '43%',
            labelFontSize: '11px',
            labelColor: '#666666',
            height: '100%',
            width: '100%',
            inputWidth: '100%',
            inputLeftPadding: '0px',
            inputRightPadding: '0px',
            buttonWidth: '0px',
            labelMarginRight: '',
            borderWidth: '',
            borderColor: '',
            fontSize: '',
            labelFontWeight: 'normal',
        };

        const materialStyle = defaultsDeep({...style}, {...defaultStyle});

        return (
            <div className='single-file-input' style={{height: materialStyle.height, width: materialStyle.width}}>
                <div className='single-file-input__label' style={{
                    width: materialStyle.labelWidth,
                    fontSize: materialStyle.labelFontSize,
                    color: materialStyle.labelColor,
                    marginRight: materialStyle.labelMarginRight
                }}>
                    {title && `${title}`} {isMandatory && <span>*</span>}
                </div>
                <div className='single-file-input__wrapper'
                     style={{width: `calc(100% - ${materialStyle.labelWidth})`, height: materialStyle.height}}>
                    <input className='single-file-input__input'
                           type='text'
                           style={this.initializeStyle(materialStyle, disabled)}
                           ref={(input) => this.fileNameInput = input}
                           disabled={disabled}
                           placeholder={placeHolder}
                           readOnly={true}
                    />
                    {
                        setButtonInside ?
                            <div style={{position: 'absolute', right: '10px'}}>
                                <FlatButton label={LABEL_UPLOAD}
                                            onClick={() => {
                                                this.singleFile.click()
                                            }}
                                            labelStyle={{
                                                fontSize: '12px',
                                                textTransform: 'none',
                                                color: disabled ? '#c0c3e7' : '#2e3ab1',
                                                textDecoration: 'underline'
                                            }}
                                            disabled={disabled}
                                />
                            </div>
                            :
                            <div>
                                <BoxButton label={LABEL_ADD_FILE}
                                           style={{width: BUTTON_WIDTH}}
                                           onClick={() => {
                                               this.singleFile.click()
                                           }}
                                           labelStyle={{padding: '0', textTransform: 'none'}}
                                           disabled={disabled}
                                />
                            </div>
                    }
                    <input type='file'
                           style={{display: 'none'}}
                           ref={(el) => {
                               this.singleFile = el
                           }}
                           accept={this.getFileType(fileType)}
                           onChange={this.setFile}
                    />
                </div>
                <div className='single-file-input__info-text'
                     style={{paddingLeft: materialStyle.labelWidth, minHeight: '20px'}}>
                    {infoText}
                </div>
            </div>
        );
    }
}

SingleFileInput.propTypes = {
    title: PropTypes.string,
    isMandatory: PropTypes.bool,
    style: PropTypes.object,
    placeHolder: PropTypes.string,
    disabled: PropTypes.bool,
    fileType: PropTypes.string,
    setButtonInside: PropTypes.bool,
    getFile: PropTypes.func,
};

SingleFileInput.defaultProps = {
    getFile: () => {},
};
