import React from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash/defaultsDeep';
import MaterialPopover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';

const anchorOrigin = {
    horizontal: 'left',
    vertical: 'bottom',
};
const targetOrigin = {
    horizontal: 'left',
    vertical: 'top',
};

const defaultProps = {
    anchorOrigin,
    targetOrigin,
    className: 'popover',
    animation: PopoverAnimationVertical
};

const defaultListStyle = {
    paddingTop: 0,
    paddingBottom: 0,
};

const Popover = (props) => {
    let style = {
        ...props.style,
        width: props.width,
    };
    const materialPopoverProps = defaultsDeep({...props}, {...defaultProps, style});
    const materialMenuListStyle = defaultsDeep(props.listStyle, {...defaultListStyle});
    return (
        <MaterialPopover {...materialPopoverProps}>
            <Menu className="popover-menu" listStyle={materialMenuListStyle}>
                {props.children}
            </Menu>
        </MaterialPopover>
    );
};

export default Popover;

Popover.propTypes = {
    anchorEl: PropTypes.any,
    open: PropTypes.bool.isRequired,
    width: PropTypes.string,
    onRequestClose: PropTypes.func,
    anchorOrigin: PropTypes.object,
    targetOrigin: PropTypes.object,
    style: PropTypes.object,
    listStyle: PropTypes.object,
};