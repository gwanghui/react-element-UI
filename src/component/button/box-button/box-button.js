import React, {Component} from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash/defaultsDeep';
import MaterialFlatButton from 'material-ui/FlatButton';

const defaultStyle = {
    padding: 0,
    height: '30px',
    minWidth: '30px',
    border: '1px solid #5c65c0',
    borderRadius: '0',
};

const defaultLabelStyle = {
    padding: '0 11px',
    fontSize: '13px',
    fontWeight: '600',
    lineHeight: '20px',
    display: 'block',
    color: '#2e3ab1',
};

const defaultProps = {
    style: defaultStyle,
    labelStyle: defaultLabelStyle,
    hoverColor: "#5c65c0",
};

const disabledStyle = {
    border: '1px solid #c0c3e7'
};

const disabledLabelStyle = {
    color: '#c0c3e7'
};

const defaultHoverLabelStyle = {
    color: '#ffffff',
};

export default class BoxButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        };
        const {labelStyle = {}, style = {}} = this.props;

        this.border = style.border ? style.border : defaultStyle.border;
        this.hoverColor = style.hoverColor ? style.hoverColor : defaultProps.hoverColor;
        this.normalLabelColor = labelStyle.color ? labelStyle.color : defaultLabelStyle.color;
        this.hoverLabelColor = labelStyle.hoverColor ? labelStyle.hoverColor : defaultHoverLabelStyle.color;

        this.setPseudoClassStyle = this.setPseudoClassStyle.bind(this);
    }

    setPseudoClassStyle(materialFlatButtonProps) {
        const {hover} = this.state;
        const {disabled = false} = this.props;
        let {labelStyle, style} = materialFlatButtonProps;

        if (disabled) {
            style.border = disabledStyle.border;
            labelStyle.color = disabledLabelStyle.color;
            delete materialFlatButtonProps.hoverColor;
            delete style.backgroundColor;
        } else if (hover) {
            style.border = this.border;
            labelStyle.color = this.hoverLabelColor;
            style.backgroundColor = this.hoverColor;
            materialFlatButtonProps.hoverColor = this.hoverColor;
        } else {
            style.border = this.border;
            labelStyle.color = this.normalLabelColor;
            delete style.backgroundColor;
            delete materialFlatButtonProps.hoverColor;
        }

        return materialFlatButtonProps;
    }

    render() {
        let materialFlatButtonProps = this.setPseudoClassStyle(defaultsDeep({...this.props}, {...defaultProps}));

        return (
            <div onFocus={() => this.setState({hover: true})} onMouseOver={() => this.setState({hover: true})}
                 onMouseLeave={() => this.setState({hover: false})}>
                <MaterialFlatButton {...materialFlatButtonProps}/>
            </div>
        );
    }
};

BoxButton.propTypes = {
    label: PropTypes.string.isRequired,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    backgroundColor: PropTypes.string,
    style: PropTypes.object,
    labelStyle: PropTypes.object,
    onClick: PropTypes.func,
};