import React from 'react';
import PropTypes from 'prop-types';

const BackButton = ({onClick}) => {
    return (
        <div className="back-button-wrapper">
            <div className="back-button-icon" onClick={onClick}/>
        </div>
    );
};

export default BackButton;

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};