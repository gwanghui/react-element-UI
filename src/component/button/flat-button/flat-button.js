import React from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash/defaultsDeep';
import MaterialFlatButton from 'material-ui/FlatButton';

const style = {
    padding: 0,
    height: '29px',
    lineHeight: '29px',
    minWidth: '30px',
    borderRadius: 0,
};

const labelStyle = {
    padding: '5px',
    fontSize: '14px',
    fontWeight: '600',
};

const defaultProps = {
    style,
    labelStyle,
    disableTouchRipple: true,
};

const FlatButton = (props) => {
    const materialFlatButtonProps = defaultsDeep({...props}, {...defaultProps});
    const onButtonClick = (e) => {
        e.stopPropagation();
        materialFlatButtonProps.onClick(e);
    };

    return (
        <MaterialFlatButton {...materialFlatButtonProps} onClick={onButtonClick}/>
    );
};

export default FlatButton;

FlatButton.propTypes = {
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