import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Divider} from "material-ui";
import i18n from "nexshop-web-i18n";
import ContextMenu from "../context-menu/context-menu";
import ContextMenuItemView from "../context-menu/context-menu-item-view";

export default class ContentContextMenu extends Component {
    analyzeGroupData = (selectedItems) => {
        const returnGroupArr = [];
        const selectedItemTypes = new Set(selectedItems.map(item => item.type ? item.type : 'folder'));

        Object.values(this.groupData).forEach(item => {
            if (this.isValidTypes(selectedItemTypes, item.exclude)
                && this.isPossibleMultiple(selectedItems, selectedItemTypes, item)) {
                if (!returnGroupArr[item.groupIndex]) {
                    returnGroupArr[item.groupIndex] = [];
                }
                returnGroupArr[item.groupIndex].push(item);
            }
        });

        return returnGroupArr;
    };

    isValidTypes = (selectedItemTypes, exclude) => {
        return exclude.reduce((accum, value) => {
            return accum && (!selectedItemTypes.has(value))
        }, true);
    };

    isPossibleMultiple(selectedItems, selectedItemTypes, item) {
        return selectedItems.length === 1 || (item.enableMultiple && this.isValidTypes(selectedItemTypes, item.multiExclude));
    }

    constructor(props) {
        super(props);

        this.groupData = {
            'move': {
                text: i18n.t('common:rightClickPop.moveto'),
                onClick: 'moveToClick',
                groupIndex: 0,
                exclude: [],
                enableMultiple: true,
                multiExclude: [],
            },
            'share': {
                text: i18n.t('common:rightClickPop.share'),
                onClick: 'shareToClick',
                groupIndex: 0,
                exclude: ['video', 'image', 'playlist', 'scene', 'application', 'document'],
                enableMultiple: false,
                multiExclude: [],
            },
            'copy': {
                text: i18n.t('common:rightClickPop.makeaCopy'),
                onClick: 'copyToClick',
                groupIndex: 1,
                exclude: ['folder'],
                enableMultiple: false,
                multiExclude: [],
            },
            'download': {
                text: i18n.t('common:rightClickPop.download'),
                onClick: 'download',
                groupIndex: 2,
                exclude: ['folder', 'playlist', 'scene'],
                enableMultiple: true,
                multiExclude: [],
            },
            'expiryDate': {
                text: 'Set expiry date',
                onClick: 'expiryDateToClick',
                groupIndex: 3,
                exclude: ['folder', 'playlist', 'scene', 'application'],
                enableMultiple: true,
                multiExclude: [],
            },
            'edittag': {
                text: i18n.t('common:rightClickPop.editTag'),
                onClick: 'tagToClick',
                groupIndex: 3,
                exclude: ['folder', 'playlist', 'scene', 'application'],
                enableMultiple: true,
                multiExclude: [],
            },
            'rename': {
                text: i18n.t('common:rightClickPop.rename'),
                onClick: 'renameToClick',
                groupIndex: 3,
                exclude: [],
                enableMultiple: false,
                multiExclude: [],
            },
            'delete': {
                text: i18n.t('common:rightClickPop.delete'),
                onClick: 'deleteToClick',
                groupIndex: 3,
                exclude: [],
                enableMultiple: true,
                multiExclude: ['folder'],
            },
        };

        this.analyzeGroupData = this.analyzeGroupData.bind(this);
        this.isValidTypes = this.isValidTypes.bind(this);
        this.makeContextMenuItemView = this.makeContextMenuItemView.bind(this);
        this.isPossibleMultiple = this.isPossibleMultiple.bind(this);
        this.getPosition = this.getPosition.bind(this);
    }

    makeContextMenuItemView(selectedItems) {
        let returnArr = [];
        const groupArr = this.analyzeGroupData(selectedItems);

        groupArr.forEach((group, index, arr) => {
            group.forEach((item, innerIndex) => {
                returnArr.push(<ContextMenuItemView key={`item_${index}_${innerIndex}`} text={item.text}
                                                    onClick={this.props[item.onClick]}/>);
            });

            if (group.length > 0 && index !== arr.length - 1) {
                returnArr.push(<Divider key={`div_${index}`} style={{marginTop: '5px', marginBottom: '5px'}}/>);
            }
        });

        return returnArr;
    }

    getPosition(childElements) {
        const {popupStyle} = this.props;

        const numberOfItems = childElements.filter(item => item.key.includes("item")).length;
        const numberOfDividers = childElements.filter(item => item.key.includes("div")).length;

        const contextMenuHeight = numberOfItems * 30 + numberOfDividers * 11 + 22;

        let style = {...popupStyle};

        if (style.top + 177 + contextMenuHeight > window.innerHeight) {
            style.top -= contextMenuHeight;
        }

        return {top: style.top + 'px', left: style.left + 'px'};
    }

    render() {
        const {selectedItems, isShow, onClose} = this.props;
        const childElements = this.makeContextMenuItemView(selectedItems);
        const position = this.getPosition(childElements);

        return (
            <ContextMenu
                popupStyle={position}
                isShow={childElements.length === 0 ? false : isShow}
                onClose={onClose}>
                {
                    [...childElements]
                }
            </ContextMenu>
        )
    }
}

ContentContextMenu.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    moveToClick: PropTypes.func,
    copyToClick: PropTypes.func,
    download: PropTypes.func,
    tagToClick: PropTypes.func,
    renameToClick: PropTypes.func,
    deleteFolder: PropTypes.func,
    expiryDateToClick: PropTypes.func,
    shareToClick: PropTypes.func,
};