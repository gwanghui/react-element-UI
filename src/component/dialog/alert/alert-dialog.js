import React from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from "lodash/defaultsDeep";
import Dialog from "../dialog";
import MessageBody from '../views/message-body';

const contentStyle = {
    position: 'fixed',
    width: '500px',
    top: '56px',
    left: 'calc(50vw - 250px)',
};
const bodyStyle = {
    padding: 0,
};
const actionsContainerStyle = {
    paddingTop: '8px',
    height: '63px',
};
const defaultProps = {
    contentStyle,
    bodyStyle,
    actionsContainerStyle,
};

const AlertDialog = (props) => {
    const {
        icon,
        message,
        ...restProps,
    } = props;

    const enableOnEscapeKeyClose = icon !== 'warning';
    const materialAlertDialogProps = defaultsDeep({...restProps, enableOnEscapeKeyClose}, {...defaultProps});

    return (
        <Dialog {...materialAlertDialogProps}>
            <MessageBody icon={icon} message={message}/>
        </Dialog>
    );
};

export default AlertDialog;

AlertDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    positiveButtonText: PropTypes.string.isRequired,
    negativeButtonText: PropTypes.string,
    icon: PropTypes.string,
    style: PropTypes.object,
    contentStyle: PropTypes.object,
    bodyStyle: PropTypes.object,
    actionsContainerStyle: PropTypes.object,
    overlayStyle: PropTypes.object,
    onPositiveClick: PropTypes.func.isRequired,
    onNegativeClick: PropTypes.func,
};

AlertDialog.defaultProps = {
    icon: 'ok',
    isDimmed: false,
};