import React from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash/defaultsDeep';
import MaterialChip from 'material-ui/Chip';

function labelStyle(props) {
    return {
        fontFamily: 'Open Sans',
        fontSize: '13px',
        lineHeight: '28px',
        maxWidth: 393,
        marginRight: props.onRequestDelete ? '3px' : 0,
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    }
}

const style = {
    margin: '4px',
};

const deleteIconStyle = {
    margin: '2px 4px 2px -8px',
    fill: 'white',
};

function defaultProps(props) {
    return {
        backgroundColor: props.onRequestDelete ? '#5c65c0' : '#eeeeee',
        labelColor: props.onRequestDelete ? 'white' : '#333333',
        labelStyle: labelStyle(props),
        style,
        deleteIconStyle,
    }
}

const Chip = (props) => {
    const chipProps = defaultsDeep({...props}, {...defaultProps(props)});

    return (
        <div className='chip-wrapper' title={chipProps.name}>
            <MaterialChip {...chipProps}>
                {chipProps.name}
            </MaterialChip>
        </div>
    );
};

export default Chip;

Chip.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onRequestDelete: PropTypes.func,
    backgroundColor: PropTypes.object,
    labelColor: PropTypes.string,
    labelStyle: PropTypes.object,
    style: PropTypes.object,
    deleteIconStyle: PropTypes.object,
};