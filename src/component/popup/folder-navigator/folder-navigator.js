import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {popupEnhancer} from "nexshop-web-popup"
import DomHelper from '../../../util/dom-helper';

class FolderNavigator extends Component {

    constructor(props) {
        super(props);
        this.onFolderNavigatorItemClick = this.onFolderNavigatorItemClick.bind(this);
    }

    onFolderNavigatorItemClick(item, index) {
        this.props.onItemClick(item, index);
        this.props.onClose();
    }

    render() {

        const {
            folders,
            popupStyle
        } = this.props;

        const drawItem = (item, index) => {

            const marginLeft = 20 + index*10;
            const nameWidth = 331 - index*10;

            return (
                <div className='folder-navigator__item' key={item.id} onClick={() => this.onFolderNavigatorItemClick(item, index)}>
                    <div className={"folder-navigator__item-icon"} style={{marginLeft: `${marginLeft}px`}} />
                    <div className={"folder-navigator__item-name"} style={{maxWidth: `${nameWidth}px`}}
                         onMouseOver={DomHelper.setToolTip}>{item.name}</div>
                </div>
            );
        };

        const style = {
            ...popupStyle,
        };

        return (
            <div className="folder-navigator-wrapper"
                 style={style}>
                <div className='folder-navigator'>
                    {
                        folders.map( (item, index) => drawItem(item, index) )
                    }
                </div>
            </div>
        );
    }
}

export default popupEnhancer(FolderNavigator, 'folder-navigator');

FolderNavigator.propTypes = {
    onClose: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired,
    folders: PropTypes.array,
    popupStyle: PropTypes.object
};