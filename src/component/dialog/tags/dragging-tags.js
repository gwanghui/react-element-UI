import React, {Component} from 'react';
import {autobind} from "core-decorators";
import PropTypes from "prop-types";

import Chip from "../../chips/chip";

@autobind
export default class DraggingTags extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        title: PropTypes.string,
        tagList: PropTypes.array,
        onTagDrop: PropTypes.func,
        onTagDelete: PropTypes.func,
    };

    static defaultProps = {
        disabled: false,
        title: '',
        tagList: [],
        onTagDrop: () => {},
        onTagDelete: () => {},
    };

    state = {
        isDragOver: false,
    };

    onTagDragOver(e) {
        e.preventDefault();
        this.setState({isDragOver: true});
    }

    onDrop() {
        const {onTagDrop} = this.props;

        onTagDrop();
        this.setState({isDragOver: false});
    }

    render() {
        const {disabled, title, tagList, onTagDelete} = this.props;
        const {isDragOver,} = this.state;

        return (
            <div className="dragging-tags">
                <div className="dragging-tags__title">{title}</div>
                <div className={`dragging-tags__area${disabled ? '--dimmed' : isDragOver ? '--selected' : ''}`}
                     onDragOver={(e) => this.onTagDragOver(e)}
                     onDragLeave={() => this.setState({isDragOver: false})}
                     onDrop={this.onDrop}
                >
                    {
                        tagList.length > 0 ?
                            tagList.map(({id, name}) =>
                                <Chip key={id}
                                      id={id}
                                      name={name}
                                      style={{margin: 0}}
                                      onRequestDelete={() => onTagDelete(id)}
                                />)
                            :
                            !disabled &&
                            <div className="dragging-tags__placeholder">{'drag'}</div>
                    }
                </div>
            </div>
        );
    }
}