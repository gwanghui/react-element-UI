import React from 'react';
import PropTypes from 'prop-types';
import Dialog from "../dialog";
import AdminMessageBody from "../views/admin-message-body";

const contentStyle = {
    width: '500px',
    height: '215px',
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

const AdminConfirmDialog = (props) => {
    const {
        icon = '',
        message,
        subMessage = '',
        negativeButtonText,
        positiveButtonText,
        onNegativeClick,
        onPositiveClick,
        isOpen,
        onCloseClick,
        isDimmed = true,
    } = props;

    const dialogProps = {
        ...defaultProps,
        negativeButtonText,
        positiveButtonText,
        onNegativeClick,
        onPositiveClick,
        isOpen,
        onCloseClick,
        isDimmed,
    };

    return (
        <Dialog {...dialogProps}>
            <AdminMessageBody icon={icon} message={message} subMessage={subMessage}/>
        </Dialog>
    );
};

export default AdminConfirmDialog;

AdminConfirmDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    subMessage: PropTypes.string,
    positiveButtonText: PropTypes.string.isRequired,
    negativeButtonText: PropTypes.string,
    onPositiveClick: PropTypes.func.isRequired,
    onNegativeClick: PropTypes.func,
    onCloseClick: PropTypes.func,
};