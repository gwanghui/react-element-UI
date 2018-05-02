import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {autobind} from "core-decorators";

import ChipGroup from "../chips/chip-group";
import TextField from "../input/text-field";

const defaultSearchInputStyle = {
    width: '100%',
    height: 40,
    paddingBottom: 9,
};

@autobind
export default class TaggingBoard extends Component {
    static propTypes = {
        title: PropTypes.string,
        subTitle: PropTypes.string,
        enableSearch: PropTypes.bool,
        onChangeSelectedTags: PropTypes.func,
        tags: PropTypes.array.isRequired,
        selectedTags: PropTypes.array,
        chipDraggable: PropTypes.bool,
        onChipDragStart: PropTypes.func,
    };

    static defaultProps = {
        title: '',
        subTitle: '',
        enableSearch: true,
        onChangeSelectedTags: () => {},
        selectedTags: [],
        chipDraggable: false,
        onChipDragStart: () => {},
    };

    state = {
        reorderedTags: [],
        searchText: '',
    };

    constructor(props) {
        super(props);

        this.state = {
            reorderedTags: [...props.tags],
            searchText: '',
        }
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.tags !== nextProps.tags) {
            this.setState({reorderedTags: [...nextProps.tags]});
        }
    }

    onSelectTag(tag) {
        this.setState({searchText: ''});
        this.props.onChangeSelectedTags([...this.props.selectedTags, tag]);
    }

    onDeselectTag(tag) {
        const {reorderedTags} = this.state;
        this.setState({
            reorderedTags:  [...reorderedTags.filter(({id}) => id !== tag.id), tag],
        });

        const selectedTags = this.props.selectedTags.filter(({id}) => id !== tag.id);
        this.props.onChangeSelectedTags(selectedTags);
    }

    onChangeSearchText({target: {value}}) {
        this.setState({searchText: value});
    }

    get availableTags() {
        const {selectedTags} = this.props;
        const {searchText, reorderedTags} = this.state;
        const selectedIds = selectedTags.reduce((idMap, {id}) => {
            idMap[id] = true;
            return idMap;
        }, {});

        return reorderedTags.filter(({id}) => !selectedIds[id])
            .filter(({name}) => name.toUpperCase().includes(searchText.toUpperCase()));
    }

    get isSearching() {
        return this.props.tags.length > 0 && this.props.enableSearch && this.state.searchText.length > 0;
    }

    get isSearchResultEmpty() {
        return this.isSearching && this.availableTags.length === 0;
    }

    get emptyItemsText() {
        return i18n.t('common:editTagPop.search.empty');
    }

    get emptySearchResultText() {
        return i18n.t('common:editTagPop.search.noResult');
    }

    get searchHintText() {
        return i18n.t('common:editTagPop.search.hint');
    }

    render () {
        const {
            chipDraggable,
            selectedTags,
            title,
            subTitle,
            enableSearch,
            onChipDragStart,
        } = this.props;

        const {
            reorderedTags,
            searchText,
        } = this.state;

        return (
            <div className='tagging-board'>
                {
                    title.length > 0 &&
                    <div className='tagging-board-header'>
                        <div className='tagging-board-header__title'>{title}</div>
                        {
                            subTitle.length > 0 &&
                            <div className='tagging-board-header__sub-title'>{subTitle}</div>
                        }
                    </div>
                }
                {
                    enableSearch &&
                    <div className="tagging-board-search">
                        <TextField style={defaultSearchInputStyle}
                                   maxLength={50}
                                   name="tagging-board-search-input"
                                   hintText={this.searchHintText}
                                   value={searchText}
                                   onChange={this.onChangeSearchText}
                                   focusOnMount={true}
                                   disabled={reorderedTags.length === 0}
                        />
                    </div>
                }
                {
                    reorderedTags.length > 0 && !this.isSearchResultEmpty &&
                    <ChipGroup items={this.availableTags}
                               chipDraggable={chipDraggable}
                               selectedItems={this.isSearching ? [] : selectedTags}
                               onSelect={this.onSelectTag}
                               onDeselect={this.onDeselectTag}
                               onChipDragStart={onChipDragStart}
                    />
                }
                {
                    reorderedTags.length === 0 &&
                    <div className="tagging-board__empty-items-text">{this.emptyItemsText}</div>
                }
                {
                    this.isSearchResultEmpty &&
                    <div className="tagging-board__empty-search-result-text">{this.emptySearchResultText}</div>
                }
            </div>
        );
    }
}