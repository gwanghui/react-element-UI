import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const AddButton = ({className = '', isActivation = false, onClick = () => {}}) => {
    return (
        <FloatingActionButton className={className} iconStyle={{height: '42px', width: '42px'}} style={{boxShadow: 'none'}} onClick={onClick}>
            <div className={`add-button ${isActivation ? 'add-button--rotate' : ''}`}/>
        </FloatingActionButton>

    )
};

export default AddButton;

AddButton.propTypes = {
    isActivation: PropTypes.bool,
    onClick: PropTypes.func,
};