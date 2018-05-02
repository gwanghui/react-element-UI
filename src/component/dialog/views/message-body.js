import React from 'react';
import PropTypes from 'prop-types';

const MessageBody = ({icon = 'ok', message}) => {
    return (
        <div className="message-body">
            <div className={`message-body__icon--${icon}`}/>
            <div className="message-body__text">{message}</div>
        </div>
    )
};

export default MessageBody;

MessageBody.propTypes = {
    message: PropTypes.string.isRequired,
    icon: PropTypes.string,
};