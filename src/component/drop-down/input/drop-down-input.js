import React, {Component} from 'react';
import PropType from 'prop-types';
import Popover from "../../popover/popover";
import MenuItem from "../../menu-item/menu-item";

export default class DropDownInput extends Component {
    constructor(props) {
        super(props);

        const {value = {}, children = []} = props;

        this.state = {
            visibility: false,
            selectedIndex: children.findIndex((menuItem) => value === menuItem.props.value),
        };
    }

    onMenuItemClick(value, index) {
        this.setState({
            selectedIndex: index,
            visibility: false,
        });

        this.props.onChange(value, index);
    }

    render() {
        const {children, placeholder, value, inputStyle, popoverStyle,} = this.props;
        const {visibility, selectedIndex} = this.state;

        const menuItems = children.map((menuItem, index) => {
            if(menuItem.type === MenuItem) {
                return <MenuItem key={index}
                                 onClick={this.onMenuItemClick.bind(this, menuItem.props.value, index)}
                                 {...menuItem.props}
                />
            }
            return menuItem;
        });

        const inputValue = (selectedIndex > -1) ? (children[selectedIndex].props.primaryText || value) : '';

        return (
            <div>
                <div className="drop-down-input" ref={(div) => this.anchor = div}
                     onClick={() => this.setState({visibility: true})}
                     style={inputStyle}>
                    <input className="drop-down-input__label" placeholder={placeholder} value={inputValue} readOnly/>
                    <div className={`drop-down-input__arrow${visibility ? '--ascending' : '--descending'}`}/>
                </div>
                <Popover
                    anchorEl={this.anchor}
                    open={visibility}
                    onRequestClose={() => this.setState({visibility: false})}
                    width={'200px'}
                    listStyle={{paddingTop: 10, paddingBottom: 10}}
                    style={popoverStyle}
                >{menuItems}
                </Popover>
            </div>
        );
    }
}

DropDownInput.propTypes = {
    value: PropType.object,
    placeholder: PropType.string,
    inputStyle: PropType.object,
    popoverStyle: PropType.object,
    onChange: PropType.func,
};