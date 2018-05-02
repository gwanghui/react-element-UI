import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import defaultsDeep from "lodash/defaultsDeep";
import {autobind} from "core-decorators";

import BoxButton from '../../button/box-button/box-button';
import InfoPaper from "../../paper/info-paper/info-paper";

export default class SmallInput extends Component {
    constructor(props) {
        super(props);

        this.getPrefixCSS = this.getPrefixCSS.bind(this);
        this.initializeStyle = this.initializeStyle.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.renderConditionText = this.renderConditionText.bind(this);
        this.onMouseOverInfoIcon = this.onMouseOverInfoIcon.bind(this);
        this.onMouserLeaveInfoIcon = this.onMouserLeaveInfoIcon.bind(this);

        this.state = {
            focus: false,
            isPaperDisplay: 'none'
        };
    }

    componentDidMount() {
        if(!this.smallInput) return;

        const {
            focused = false,
            getElement = () => {},
            value = ''
        } = this.props;

        if (focused) {
            this.smallInput.focus();
        }

        getElement(this.smallInput);
        this.smallInput.value = value;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== undefined && nextProps.value !== null) {
            this.smallInput.value = nextProps.value;
        }
    }

    getPrefixCSS(status) {
        return status !== '' ? `--${status}` : '';
    }

    onFocus(e) {
        this.setState({focus: true});
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }

    }

    onBlur(e) {
        this.setState({focus: false});
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    onKeyUp(e) {
        const {
            button,
            watchTextIsBlank = () => {},
            onPressEnter = () => {},
        } = this.props;

        if (button) {
            watchTextIsBlank(this.smallInput.value.trim());
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            onPressEnter(e);
        }
    }

    onChange() {
        const {
            onValueChange = () => {}
        } = this.props;
        onValueChange(this.smallInput.value);
    }

    initializeStyle(style, disabled, pureDisabled, whiteDisabled, condition) {
        const {focus} = this.state;
        let newStyle = {};
        const {
            inputWidth, height, inputLeftPadding, inputRightPadding, textAlign, buttonWidth,
            backgroundColor, borderWidth, borderColor = '#2e3ab1', fontSize, textOverflow = 'normal', overflow = 'visible', whiteSpace = 'normal',
            labelFontWeight = 'lighter',
        } = style;

        newStyle.width = inputWidth ? inputWidth : `calc(100% - ${buttonWidth})`;
        newStyle.height = height;
        newStyle.paddingLeft = inputLeftPadding;
        newStyle.paddingRight = inputRightPadding;
        newStyle.textAlign = textAlign;
        newStyle.backgroundColor = backgroundColor;
        newStyle.fontSize = fontSize;
        newStyle.borderWidth = borderWidth;
        newStyle.borderColor = (condition && condition.type === 'error') ? '#ef6144' : focus ? '#2e3ab1' : borderColor;
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

        if (pureDisabled) {
            return Object.assign({...newStyle}, {
                backgroundColor: '#eeeeee',
                border: '1px solid #eeeeee',
                color: '#bbbbbb'
            });
        }

        if (whiteDisabled) {
            return Object.assign({...newStyle}, {
                backgroundColor: '#ffffff',
                border: '1px solid #d8d8d8',
                color: '#bbbbbb',
                paddingLeft: '12px'
            });
        }
        return newStyle;
    }

    renderConditionText(condition, labelWidth, isWrap) {
        let className = '';

        if (condition) {
            switch (condition.type) {
                case 'error':
                    className = 'small-input__errorText';
                    break;
                case 'verified':
                    className = 'small-input__verifiedText';
                    break;
            }
        }

        return (
            <div className={className} style={{paddingLeft: labelWidth, minHeight:'20px', whiteSpace: isWrap ? 'pre-line' : 'nowrap'}}>
                {
                    condition && condition.text && condition.text.split("^^").map((word, index) => {
                        if (index === 1) {
                            return <b key={word}>{word}</b>;
                        }
                        return word;
                    })
                }
            </div>
        );
    }

    onMouseOverInfoIcon() {
        this.setState({
            isPaperDisplay: 'block'
        });
    }

    onMouserLeaveInfoIcon() {
        this.setState({
            isPaperDisplay: 'none'
        });
    }

    render() {
        const {
            title = '',
            isMandatory = false,
            unit = '',
            status = '',
            button = '',
            type = 'text',
            style = {},
            placeHolder = '',
            disabled = false,
            condition = null,
            conditionWrap = true,
            readOnly = false,
            tabIndex,
            buttonClick = () => {},
            isButtonDisabled = false,
            info = false,
            rules,
            textAlign,
            minLength,
            maxLength,
            smallInputStyle,
            pureDisabled = false,
            whiteDisabled = false,
        } = this.props;

        const defaultStyle = {
            labelWidth: '30%',
            labelFontSize: '11px',
            labelColor: '', // color default is not specified
            height: '100%',
            inputWidth: '100%',
            inputLeftPadding: '0px',
            inputRightPadding: '0px',
            textAlign: textAlign ? textAlign : unit ? 'right' : 'left',
            buttonWidth: '0px',
            labelMarginRight: '',
            borderWidth: '',
            borderColor: '',
            fontSize: '',
            labelFontWeight: 'normal',
            paddingLeft: '0px'
        };

        const materialStyle = defaultsDeep({...style}, {...defaultStyle});
        let inputBoxStyle = {height: materialStyle.height, paddingLeft: materialStyle.paddingLeft} ;
        Object.assign(inputBoxStyle, this.props.smallInputStyle);

        return (
            <div className='small-input' style={inputBoxStyle}>
                <div className='small-input__label' style={{
                    width: materialStyle.labelWidth,
                    fontSize: materialStyle.labelFontSize,
                    color: materialStyle.labelColor,
                    marginRight: materialStyle.labelMarginRight
                }}>
                    {title && `${title}`} {isMandatory && <span>*</span>}
                    {info &&
                    <span className='small-input__label-ico'
                          onMouseEnter={this.onMouseOverInfoIcon}
                          onMouseLeave={this.onMouserLeaveInfoIcon}>
                    <InfoPaper style={{display: this.state.isPaperDisplay}} rules={rules}/></span>}
                </div>
                <div className='small-input__wrapper'
                       style={{width: `calc(100% - ${materialStyle.labelWidth})`, height: materialStyle.height}}>
                    <input className={`small-input__input${this.getPrefixCSS(status)}`}
                           type={type}
                           style={this.initializeStyle(materialStyle, disabled, pureDisabled, whiteDisabled, condition)}
                           ref={(input) => this.smallInput = input}
                           onKeyUp={this.onKeyUp}
                           disabled={disabled || pureDisabled || whiteDisabled}
                           placeholder={placeHolder}
                           tabIndex={tabIndex}
                           onFocus={this.onFocus}
                           onBlur={this.onBlur}
                           readOnly={readOnly}
                           onChange={this.onChange}
                           minLength={minLength && minLength}
                           maxLength={maxLength && maxLength}
                    />
                    {unit && <div className='small-input__unit'
                                  style={{
                                      color: materialStyle.unitColor ? materialStyle.unitColor : ''
                                  }}>{unit}</div>}
                    {button &&
                    <div>
                        <BoxButton label={button}
                                   disabled={isButtonDisabled}
                                   style={{width: materialStyle.buttonWidth}}
                                   onClick={buttonClick}
                                   labelStyle={{padding: '0', textTransform: 'none'}}
                        />
                    </div>
                    }
                </div>
                {
                    this.renderConditionText(condition, materialStyle.labelWidth, conditionWrap)
                }
            </div>
        );
    }
}

SmallInput.propTypes = {
    title: PropTypes.string,
    isMandatory: PropTypes.bool,
    unit: PropTypes.string,
    paddingRight: PropTypes.string,
    value: PropTypes.any,
    status: PropTypes.string,
    button: PropTypes.string,
    isButtonDisabled: PropTypes.bool,
    type: PropTypes.string,
    style: PropTypes.object,
    placeHolder: PropTypes.string,
    buttonClick: PropTypes.func,
    watchTextIsBlank: PropTypes.func,
    onValueChange: PropTypes.func,
    onPressEnter: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    condition: PropTypes.object,
    rules: PropTypes.array,
    info: PropTypes.bool,
    textAlign: PropTypes.string,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    smallInputStyle: PropTypes.object,
    pureDisabled: PropTypes.bool,
    whiteDisabled: PropTypes.bool,
};

SmallInput.defaultProps = {
    getElement: () => {},
    watchTextIsBlank: () => {},
    onPressEnter: () => {},
    onValueChange: () => {},
    buttonClick: () => {},
};