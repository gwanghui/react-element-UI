import React from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash/defaultsDeep';
import MaterialMoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const style = {
    color: 'white'
};

const defaultProps = {
    style,
};

const MoreVertIcon = ({visibility, ...props}) => {
    const materialMoreVertIconProps = defaultsDeep({...props}, {...defaultProps});

    materialMoreVertIconProps.onClick = (e) => {
        e.stopPropagation();
        props.onClick(e);
    };

    return visibility && (
        <MaterialMoreVertIcon {...materialMoreVertIconProps}/>
    );
};

export default MoreVertIcon;

MoreVertIcon.propTypes = {
    className: PropTypes.string,
    visibility: PropTypes.bool,
    onClick: PropTypes.func,
};

MoreVertIcon.defaultProps = {
    className: '',
    visibility: true,
    onClick: () => {},
};