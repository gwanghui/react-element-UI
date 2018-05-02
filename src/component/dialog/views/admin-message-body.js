import React from 'react';
import PropTypes from 'prop-types';

const AdminMessageBody = ({icon = 'ok', message, subMessage = ''}) => {
    return (
        <div className="message-body" style={{flexWrap: 'wrap', height: '110px', alignContent: 'flex-start'}}>
            <div className={`message-body__icon--${icon}`}/>
            <div className="message-body__text">{message}</div>
            {subMessage &&
            <div className="message-body__sub-text">{subMessage}</div>
            }
        </div>
    )
};

export default AdminMessageBody;

AdminMessageBody.propTypes = {
    message: PropTypes.string.isRequired,
    subMessage: PropTypes.string,
    icon: PropTypes.string,
};