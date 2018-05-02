import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import {popupEnhancer} from "nexshop-web-popup";

class ContextMenu extends Component {
    render() {
        const {isShow, popupStyle} = this.props;

        const style = {
            opacity: (isShow ? 1 : 0),
            visibility: (isShow ? '' : 'hidden'),
            transitionProperty: 'opacity, visibility',
            transitionDuration: '450ms',
            transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
            transitionDelay: '0ms',
            zIndex: 10,
            ...popupStyle,
        };

        return (
            <Paper className="context-menu-wrapper"
                   zDepth={3}
                   style={style}
            >
                <div className='context-menu'>
                    { this.props.children }
                </div>
            </Paper>
        );
    }
}

export default popupEnhancer(ContextMenu, 'context-menu');

ContextMenu.propTypes = {
    isShow: PropTypes.bool.isRequired,
    popupStyle: PropTypes.object,
};