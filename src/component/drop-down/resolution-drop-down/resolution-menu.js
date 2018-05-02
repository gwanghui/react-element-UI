import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ResolutionItem from "./resolution-item";

export default class ResolutionMenu extends Component {
    constructor(props) {
        super(props);

        this.closeMenuByEscape = this.closeMenuByEscape.bind(this);
    }

    componentDidMount() {
        if(this.element) {
            this.element.focus();
        }
    }

    closeMenuByEscape(e) {
        const {onBlur} = this.props;
        const {keyCode} = e;
        if (keyCode === 27) {
            e.stopPropagation();
            onBlur(e);
        }
    }

    render() {
        const {items, selectedItem, onItemSelected, onBlur} = this.props;
        const getSelectedOrientation = (item, selectedItem) => {
            if (!selectedItem) return '';

            if (item.value === selectedItem.value && item.text === selectedItem.text) {
                return selectedItem.orientation;
            } else {
                return '';
            }
        };

        return (
            <div className="resolution-menu" tabIndex="0"
                 onBlur={onBlur}
                 onKeyDown={this.closeMenuByEscape}
                 ref={(div) => this.element = div}
            >
                {
                    items.map((item, index) => (
                        <ResolutionItem key={index}
                                        item={item}
                                        selectedOrientation={getSelectedOrientation(item, selectedItem)}
                                        onSelected={onItemSelected}
                                        isDisabled={item.isDisabled}
                        />
                    ))
                }
            </div>
        );
    }
};

ResolutionMenu.propTypes = {
    items: PropTypes.array.isRequired,
    selectedItem: PropTypes.object,
    selectedOrientation: PropTypes.string,
    onItemSelected: PropTypes.func,
    onBlur: PropTypes.func
};