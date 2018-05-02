import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MaterialTextField from 'material-ui/TextField';

export default class TextField extends Component {
    componentDidMount() {
        if (this.textField && this.props.focusOnMount) {
            this.textField.focus();

            if (!!this.props.value) {
                this.textField.input.selectionStart = this.props.value.length;
            }
        }
    }

    render() {
        const {
            label,
            value,
            maxLength,
            errorMessage,
            onChange,
            onFocus,
            onBlur,
            style = {
                width: '100%',
                height: '80px',
                marginBottom: '15px',
                transition: 'none',
            },
            floatingLabelStyle = {
                fontSize: '16px',
                textAlign: 'left',
                transition: 'none',
            },
            errorStyle = {
                fontSize: '11px',
                float: "left"
            },
            underlineFocusStyle = {
                transition: 'none',
            },
            name,
            hintText,
            hintStyle,
            disabled = false,
            onKeyPress,
            underlineShow = true,
        } = this.props;

        const underlineDisableStyle = {borderBottom: '1px solid #d8d8d8'};
        if (this.props.errorMessage) floatingLabelStyle.color = '#f44336';

        return (
            <MaterialTextField value={value}
                               floatingLabelText={label}
                               maxLength={maxLength}
                               errorText={errorMessage}
                               onBlur={onBlur}
                               onFocus={onFocus}
                               onChange={onChange}
                               onKeyPress={onKeyPress}
                               style={style}
                               floatingLabelStyle={floatingLabelStyle}
                               errorStyle={errorStyle}
                               underlineFocusStyle={underlineFocusStyle}
                               hintText={hintText}
                               hintStyle={hintStyle}
                               ref={(textField) => this.textField = textField}
                               name={name}
                               disabled={disabled}
                               underlineShow={underlineShow}
                               underlineDisabledStyle={underlineDisableStyle}
            />
        );
    }
}

TextField.propTypes = {
    style: PropTypes.object,
    floatingLabelStyle: PropTypes.object,
    errorStyle: PropTypes.object,
    label: PropTypes.string,
    value: PropTypes.string,
    focusOnMount: PropTypes.bool,
    maxLength: PropTypes.number,
    errorMessage: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    hintText: PropTypes.string,
    hintStyle: PropTypes.object,
    onKeyPress: PropTypes.func,
    underlineShow: PropTypes.bool,
    disabled: PropTypes.bool,
};