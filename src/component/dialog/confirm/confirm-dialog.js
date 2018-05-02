import React from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from "lodash/defaultsDeep";

import Dialog from "../dialog";
import MessageBody from '../views/message-body';

const contentStyle = {
    width: '500px',
    height: '180px',
};

const bodyStyle = {
    padding: 0,
    height: '110px',
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

const ConfirmDialog = (props) => {
    const {
        icon = '',
        message,
        negativeButtonText,
        positiveButtonText,
        onNegativeClick,
        onPositiveClick,
        isOpen,
        style,
        actionsContainerStyle,
        bodyStyle,
        contentStyle,
        onCloseClick,
        isDimmed = true,
    } = props;

    const dialogProps = defaultsDeep({
        negativeButtonText,
        positiveButtonText,
        onNegativeClick,
        onPositiveClick,
        isOpen,
        style,
        bodyStyle,
        actionsContainerStyle,
        contentStyle,
        onCloseClick,
        isDimmed,
    }, {...defaultProps});

    return (
        <Dialog {...dialogProps}>
            <MessageBody icon={icon} message={message}/>
        </Dialog>
    );
};

export default ConfirmDialog;

ConfirmDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    style: PropTypes.object,
    bodyStyle: PropTypes.object,
    actionsContainerStyle: PropTypes.object,
    contentStyle: PropTypes.object,
    positiveButtonText: PropTypes.string.isRequired,
    negativeButtonText: PropTypes.string,
    onPositiveClick: PropTypes.func.isRequired,
    onNegativeClick: PropTypes.func,
    onCloseClick: PropTypes.func,
};