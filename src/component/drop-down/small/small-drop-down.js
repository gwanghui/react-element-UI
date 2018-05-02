import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from "../menu/drop-down-menu";
import MenuItem from "../../menu-item/menu-item";

const defaultDropDownStyle = {
    height: '100%',
    width: '100%',
    fontSize: '13px',
    backgroundColor: '#ffffff',
};

const defaultBorderStyle = {
    border: '1px solid #d8d8d8'
};

export default class SmallDropDown extends Component {
    constructor(props) {
        super(props);
        this.initializeStyle = this.initializeStyle.bind(this);
        this.initializeBorderStyle = this.initializeBorderStyle.bind(this);
    }

    initializeStyle(style, disabled) {
        if (disabled) {
            return Object.assign({...style}, {
                backgroundColor: '#f9f9f9',
                color: '#bbbbbb',
            });
        } else {
            return {...style};
        }
    }

    initializeBorderStyle(borderStyle, disabled, error) {
        if (disabled) {
            return '1px solid #eeeeee';
        } else {
            return error ? '1px solid #ef6144' : defaultBorderStyle.border;
        }
    }

    stopPropagation() {
        window.event.stopPropagation();
    }

    render() {
        const {
            title = '',
            isMandatory = false,
            style = {},
            dropDownSelect = () => {
            },
            selectedItem = {value: '0'},
            items = [],
            placeholder = undefined,
            disabled = false,
            error = false,
            treeStructure = false,
            borderStyle = defaultBorderStyle,
        } = this.props;

        const {
            labelWidth = '30%',
            labelFontSize = '11px',
            labelLineHeight = '30px',
            labelPaddingLeft = '12px',
            labelColor = '', // color default is not specified
        } = style;

        const storeList = [];

        items.map((item, i) => {
            storeList.push(<MenuItem value={item.value}
                                     key={i}
                                     primaryText={item.text}
                                     style={{paddingLeft: `${(treeStructure ? 30 : 0) * item.indent + 'px'}`,}}
            />);
        });

        return (
            <div className='small-drop-down'>
                <div className='small-drop-down__label'
                     style={{width: labelWidth, fontSize: labelFontSize, color: labelColor}}>
                    {title && `${title}`} {isMandatory && <span>*</span>}
                </div>
                <div className='small-drop-down__wrapper'
                     style={{
                         width: `calc(100% - ${labelWidth})`,
                         border: this.initializeBorderStyle({...borderStyle}, disabled, error)
                     }}
                >
                    <DropDownMenu onChange={dropDownSelect}
                                  value={selectedItem.value}
                                  disabled={disabled}
                                  style={this.initializeStyle({...style, ...defaultDropDownStyle}, disabled)}
                                  underlineStyle={{border: 'none'}}
                                  labelStyle={{lineHeight: labelLineHeight, paddingLeft: labelPaddingLeft}}
                                  menuStyle={{marginTop:'0', height:'auto'}}
                                  placeholder={placeholder}
                                  iconStyle={{top: 'calc(50% - 11px)', width: '24px', height: '24px'}}
                                  iconButtonPrefix={'small-'}
                                  onChangeShowing={this.stopPropagation}
                    >{storeList}</DropDownMenu>
                </div>
            </div>
        );
    }
}

SmallDropDown.propTypes = {
    title: PropTypes.string,
    classNamePrefix: PropTypes.string,
    placeholder: PropTypes.string,
    isMandatory: PropTypes.bool,
    alwaysShowingArrow: PropTypes.bool,
    style: PropTypes.object,
    dropDownSelect: PropTypes.func,
    selectedItem: PropTypes.object,
    items: PropTypes.array,
};