import React from 'react';
import PropTypes from 'prop-types';
import MaterialSnackbar from 'material-ui/Snackbar/Snackbar'
import defaultsDeep from "lodash/defaultsDeep";

const Snackbar = (props) => {
    const {
        transformStyle: {open = 'translate(-50%, 0)', close = 'translate(-50%, 60px)'} = {},
        onRequestClose = () => {},
        ...cloneProps
    } = props;

    const defaultProps = {
        style: {
            bottom: '20px',
            transform: cloneProps.open ? open : close,
        },
        bodyStyle: {
            backgroundColor: '#7e86d1',
            lineHeight: '18px',
            padding: '11px 17px',
            height: '40px',
            minWidth: 'fit-content',
            maxWidth: 'fit-content',
            borderRadius: '0',
        },
        contentStyle: {
            fontSize: '13px',
        },
        autoHideDuration: 2500,
        onRequestClose: (reason) => {
            if (reason === 'timeout') {
                onRequestClose();
            }
        }
    };

    const childProps = defaultsDeep({...cloneProps}, {...defaultProps});


    return (
        <MaterialSnackbar {...childProps} />
    );
};

export default Snackbar;

Snackbar.propTypes = {
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    transformStyle: PropTypes.shape({
        open: PropTypes.string,
        close: PropTypes.string,
    }),
};