import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {autobind} from "core-decorators";
import defaultsDeep from "lodash/defaultsDeep";
import Chip from "../chips/chip";

const defaultSelectedChipStyle = {
    margin: 0,
};

const defaultChipStyle = {
    margin: 0,
};

@autobind
export default class ChipGroup extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        selectedItems: PropTypes.array,
        onSelect: PropTypes.func,
        onDeselect: PropTypes.func,
        style: PropTypes.object,
        searchContainerStyle: PropTypes.object,
        selectedChipsContainerStyle: PropTypes.object,
        chipsContainerStyle: PropTypes.object,
        chipDraggable: PropTypes.bool,
        onChipDragStart: PropTypes.func,
    };

    static defaultProps = {
        chipDraggable: false,
        selectedItems: [],
        style: {},
        searchContainerStyle: {},
        selectedChipsContainerStyle: {},
        chipsContainerStyle: {},
        onSelect: () => {},
        onDeselect: () => {},
        onChipDragStart: () => {},
    };

    render() {
        const {
            items,
            selectedItems,
            style,
            selectedChipsContainerStyle,
            selectedChipStyle,
            chipsContainerStyle,
            chipStyle,
            onSelect,
            onDeselect,
            chipDraggable,
            onChipDragStart,
        } = this.props;

        const mergedSelectedChipStyle = defaultsDeep(selectedChipStyle, defaultSelectedChipStyle);
        const mergedChipStyle = defaultsDeep(chipStyle, defaultChipStyle);

        return (
            <div className="chip-group" style={style}>
                {
                    <div className="chip-group-chips-wrapper">
                        {
                            <div className="chip-group-selected-chips"  style={selectedChipsContainerStyle}>
                            {
                                selectedItems.map(({id, name}) =>
                                    <div key={id} className="chip-group-chip-wrapper">
                                        <Chip style={mergedSelectedChipStyle}
                                              name={name}
                                              onRequestDelete={() => onDeselect({id, name})}/>
                                    </div>
                                )
                            }
                            </div>
                        }
                        <div className="chip-group-chips"  style={chipsContainerStyle}>
                        {
                            items.map(({id, name}) =>
                                <div key={id} className="chip-group-chip-wrapper">
                                    <Chip style={mergedChipStyle}
                                          name={name}
                                          onClick={() => onSelect({id, name})}
                                          draggable={chipDraggable}
                                          onDragStart={(e) => onChipDragStart(e, {id, name})}
                                    />
                                </div>
                            )
                        }
                        </div>
                    </div>
                }
            </div>
        );
    }
}