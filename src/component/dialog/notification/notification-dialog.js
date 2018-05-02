import React from 'react';
import PropTypes from 'prop-types';
import Dialog from "../dialog";


const NotificationDialog = (props) => {

    const {isOpen, message, onClose} = props;
    const bodyStyle = {height: '88px', width: '420px', marginLeft: '40px'};
    const titleStyle = {color: '#333333'};
    const subStyle = {marginTop: '6px', fontSize: '12px', textAlign: 'left', fontWeight: 'normal', color: '#666666'};

    return (
        <Dialog isOpen={isOpen}
                positiveButtonText={'ok'}
                onPositiveClick={onClose}
                onCloseClick={onClose}
                actionsContainerStyle={{paddingTop: '14px', height: '69px'}}>
            {
                isOpen &&
                <div style={bodyStyle}>
                    <div>
                        <div style={titleStyle}>{message.title}</div>
                        <div style={subStyle}>{message.sub}</div>
                    </div>
                </div>
            }
        </Dialog>
    );
};

export default NotificationDialog;

NotificationDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};