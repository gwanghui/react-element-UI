import React from 'react';
import PropTypes from 'prop-types';

const ContextMenuItemView = ({text, onClick, className, children}) => {
    return (
        (text.length > 0) ?
        <div className={`context-menu-text ${className}`}
             onClick={(e) => {
                 e.stopPropagation();
                 onClick(e);
             }}
        >{text}
        </div>
            :
        <div className={`context-menu-text ${className}`}>{children}</div>
    )
};

export default ContextMenuItemView;

ContextMenuItemView.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

ContextMenuItemView.defaultProps = {
    text:'',
    className: '',
    onClick: () => {},
};
