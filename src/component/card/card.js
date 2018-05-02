import React from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash/defaultsDeep';
import MaterialCard from 'material-ui/Card/Card';

const style = {
    width: '100%',
    height: '100%',
    border: 'solid 1px #dddddd',
    boxShadow: 'none',
    borderRadius: 0,
    position: 'relative',
};

const defaultProps = {
    style,
};

const Card = (props) => {
    const materialCaredProps = defaultsDeep({...props}, {...defaultProps});

    return (
        <MaterialCard {...materialCaredProps}/>
    );
};

export default Card;

Card.propTypes = {
    style: PropTypes.object,
};