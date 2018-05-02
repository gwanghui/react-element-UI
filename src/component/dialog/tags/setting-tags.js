import React, {Component} from 'react';
import {autobind} from "core-decorators";
import PropTypes from "prop-types";
import isEmpty from 'lodash/isEmpty';

import Dialog from "../dialog";
import FlatButton from "../../button/flat-button/flat-button";
import TaggingBoard from "../../tag/tagging-board";
import DraggingTags from "./dragging-tags";
import Chip from "../../chips/chip";

const TAG_TYPE = {
  AND: 'and',
  OR: 'or',
  NONE: 'none'
};

@autobind
export default class SettingTags extends Component {
    static propTypes = {
        visibility: PropTypes.bool,
        useOnlyNoneTag: PropTypes.bool,
        positiveButtonText: PropTypes.string,
        tags: PropTypes.array,
        onClose: PropTypes.func,
        onPositiveButtonClick: PropTypes.func,
    };

    static defaultProps = {
        visibility: false,
        useOnlyNoneTag: true,
        positiveButtonText: '',
        tags: [],
        onClose: () => {},
        onPositiveButtonClick: () => {},
    };

    state = {
        selectableTagList: [],
        draggingTagItem: null,
        andTagList: [],
        orTagList: [],
        noneTagList: [],
    };

    componentWillReceiveProps(nextProps) {
        const {tags} = this.props;

        if (nextProps.tags !== tags) {
            this.setState({selectableTagList: nextProps.tags});
        }
    }

    clearState() {
        const {tags} = this.props;

        this.setState({
            selectableTagList: tags,
            draggingTagItem: null,
            andTagList: [],
            orTagList: [],
            noneTagList: [],
        });
    }

    onCloseDialog() {
        this.clearState();
        this.props.onClose();
    }

    setDragImage(e) {
        const {nativeEvent: {offsetX, offsetY}} = e;

        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setDragImage(this.preview, offsetX, offsetY);
    }

    onTagDragStart(e, id, name) {
        this.setState({draggingTagItem: {id, name}});

        this.setDragImage(e);
    }

    onTagDrop(tagType) {
        const {selectableTagList, draggingTagItem, andTagList, orTagList, noneTagList} = this.state;

        let targetState = {...this.state};

        targetState.selectableTagList = selectableTagList.filter(({id}) => id !== draggingTagItem.id);
        targetState.draggingTagItem = null;

        switch(tagType) {
            case TAG_TYPE.AND:
                targetState.andTagList = [...andTagList, draggingTagItem];
                break;
            case TAG_TYPE.OR:
                targetState.orTagList = [...orTagList, draggingTagItem];
                break;
            case TAG_TYPE.NONE:
                targetState.noneTagList = [...noneTagList, draggingTagItem];
                break;
        }

        this.setState({...targetState});
    }

    onTagDelete(tagType, willBeDeletedId) {
        const {useOnlyNoneTag} = this.props;
        const {selectableTagList, andTagList, orTagList, noneTagList} = this.state;

        let targetState = {...this.state};
        let willBeDeletedTag;

        switch(tagType) {
            case TAG_TYPE.AND:
                targetState.andTagList = andTagList.filter(({id}) => id !== willBeDeletedId);
                willBeDeletedTag = andTagList.find(({id}) => id === willBeDeletedId);
                break;
            case TAG_TYPE.OR:
                targetState.orTagList = orTagList.filter(({id}) => id !== willBeDeletedId);
                willBeDeletedTag = orTagList.find(({id}) => id === willBeDeletedId);
                break;
            case TAG_TYPE.NONE:
                targetState.noneTagList = noneTagList.filter(({id}) => id !== willBeDeletedId);
                willBeDeletedTag = noneTagList.find(({id}) => id === willBeDeletedId);
                break;
        }

        if (!useOnlyNoneTag && isEmpty([...targetState.andTagList, ...targetState.orTagList])) {
            targetState.noneTagList = [];
            targetState.selectableTagList = [...selectableTagList, willBeDeletedTag, ...noneTagList];
        } else {
            targetState.selectableTagList = [...selectableTagList, willBeDeletedTag];
        }

        this.setState({...targetState});
    }

    render() {
        const {visibility, useOnlyNoneTag, positiveButtonText, onPositiveButtonClick} = this.props;
        const {draggingTagItem, selectableTagList, andTagList, orTagList, noneTagList} = this.state;
        const {message: {all = 'all', any = 'any', none = 'none', reset = 'reset', cancel = 'cancel'}} = this.props;
        const noneTagDisabled = !useOnlyNoneTag && isEmpty([...andTagList, ...orTagList]);
        const tagIsNotSelected = isEmpty([...andTagList, ...orTagList, ...noneTagList]);

        return (
            <Dialog isOpen={visibility}
                    bodyClassName={'setting-tags-body'}
                    onCloseClick={this.onCloseDialog}
                    contentStyle={{width: '917px', height: '502px'}}
            >
                <div className="setting-tags">
                    <div className="setting-tags-left">
                        <TaggingBoard tags={selectableTagList}
                                      chipDraggable={true}
                                      onChipDragStart={(e, {id, name}) => this.onTagDragStart(e, id, name)}
                        />
                    </div>
                    <div className="setting-tags-right">
                        <div className="setting-tags-right-body">
                            <DraggingTags title={all}
                                          tagList={andTagList}
                                          onTagDrop={() => this.onTagDrop(TAG_TYPE.AND)}
                                          onTagDelete={(id) => this.onTagDelete(TAG_TYPE.AND, id)}
                            />
                            <DraggingTags title={any}
                                          tagList={orTagList}
                                          onTagDrop={() => this.onTagDrop(TAG_TYPE.OR)}
                                          onTagDelete={(id) => this.onTagDelete(TAG_TYPE.OR, id)}
                            />
                            <DraggingTags disabled={noneTagDisabled}
                                          title={none}
                                          tagList={noneTagList}
                                          onTagDrop={() => this.onTagDrop(TAG_TYPE.NONE)}
                                          onTagDelete={(id) => this.onTagDelete(TAG_TYPE.NONE, id)}
                            />
                        </div>
                        <div className="setting-tags-right-footer">
                            <FlatButton label={reset}
                                        secondary={true}
                                        style={tagIsNotSelected ? {opacity: 0.5, pointerEvents: 'none'} : {}}
                                        onClick={this.clearState}
                            />
                            <div>
                                <FlatButton label={cancel}
                                            secondary={true}
                                            onClick={this.onCloseDialog}
                                />
                                <FlatButton label={positiveButtonText}
                                            disabled={tagIsNotSelected}
                                            primary={true}
                                            style={{marginLeft: '15px'}}
                                            onClick={() => onPositiveButtonClick(andTagList, orTagList, noneTagList)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="setting-tags--dragging" ref={(div) => this.preview = div}>
                {
                    draggingTagItem &&
                        <Chip name={draggingTagItem.name}
                              style={{backgroundColor: '#5c65c0'}}
                              labelColor="#ffffff"
                        />
                }
                </div>
            </Dialog>
        );
    }
}