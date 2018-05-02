import React, {Component} from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash/defaultsDeep';
import MaterialDropDownMenu from 'material-ui/DropDownMenu';
import DomHelper from '../../../util/dom-helper';

const style = {
    width: '100%',
    height: '40px',
};
const listStyle = {
    paddingTop: '10px',
    paddingBottom: '10px',
};
const labelStyle = {
    paddingLeft: 0,
    lineHeight: '40px',
    height: '40px',
};
const menuStyle = {
    height: '350px',
    overflowX: 'hidden',
};
const menuItemStyle = {
    height: '35px',
    lineHeight: '35px',
    fontSize: '13px',
    color: '#333333',
};
const selectedMenuItemStyle = {
    color: '#2e3ab1',
};
const underlineStyle = {
    marginLeft: 0,
    marginRight: 0,
};
const iconStyle = {
    right: 0,
    top: 0,
    width: '36px',
    height: '36px',
};
const anchorOrigin = {vertical: 'bottom', horizontal: 'left'};
const defaultProps = {
    anchorOrigin,
    style,
    listStyle,
    labelStyle,
    menuStyle,
    menuItemStyle,
    selectedMenuItemStyle,
    underlineStyle,
    iconStyle,
    maxHeight: 300,
    autoWidth: false,
    disabled: false,
    openImmediately: false,
};

export default class DropDownMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: props.openImmediately || false,
            filter: '',
        };

        this.onClick = this.onClick.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if(!prevState.isOpen && this.state.isOpen) {
            setTimeout(() => {
                const {children, value,} = this.props;
                const index = children.findIndex && children.findIndex((child) => child.props.value === value);
                const menu = document.querySelector('div[role="presentation"]');

                if (index > -1) {
                    const selectedMenuItem = menu.querySelectorAll('span')[Number(index)];

                    if (selectedMenuItem) {
                        selectedMenuItem.scrollIntoView();
                    }
                }
            },50);
        }
    }

    onClick() {
        const {onChangeShowing, } = this.props;
        this.setState({isOpen: true}, () => {
            onChangeShowing(this.state.isOpen);
        });
    }

    onClose() {
        const {onChangeShowing} = this.props;
        this.setState({isOpen: false, filter: ''}, () => onChangeShowing(this.state.isOpen));
    }

    onSearchTextChanged(e) {
        this.setState({filter: e.target.value}, () => this.searchInput.focus());
    }

    render() {
        const {
            arrowExist = true,
            children,
            disabled,
            iconButtonPrefix = '',
            searchExist = false,
            filterPlaceholder = '',
            placeholder,
            value,
        } = this.props;

        const {filter} = this.state;

        let newProps = Object.keys(this.props).filter(key => key !== 'onChangeShowing').reduce((propsAccum, propName) => {
            propsAccum[propName] = this.props[propName];
            return propsAccum;
        }, {});

        let iconButton = <div/>;

        if (!arrowExist) {
            let hiddenStyle = {width: 0, height: 0, padding: 0};
            newProps.iconStyle = {...hiddenStyle};
        } else {
            iconButton = <div
                className={`${iconButtonPrefix}arrow-${this.state.isOpen && !disabled ? 'ascending' : 'descending'}`}/>;
        }

        delete newProps.arrowExist;
        delete newProps.iconButtonPrefix;
        delete newProps.searchExist;
        delete newProps.filterPlaceholder;

        const materialDropDownMenuProps = defaultsDeep({...newProps, iconButton}, {...defaultProps});

        if (searchExist) {
            materialDropDownMenuProps.menuStyle.marginTop = '50px';
        }

        const wrapperStyle = {
            width: materialDropDownMenuProps.style.width,
            height: materialDropDownMenuProps.style.height,
            lineHeight: materialDropDownMenuProps.style.height,
        };

        let menuList = searchExist && filter ? children.filter((item) => item.props.primaryText.toLowerCase().indexOf(filter.toLowerCase()) >= 0) : children;

        return (
            <div style={{...wrapperStyle, position: 'relative'}}>
                <MaterialDropDownMenu
                    {...materialDropDownMenuProps}
                    onClick={this.onClick}
                    onClose={this.onClose}
                    onMouseOver={DomHelper.setToolTip}
                >
                    {
                        searchExist &&
                        <div className="drop-down-menu__input-wrapper">
                            <input className="drop-down-menu__input"
                                   type="text"
                                   placeholder={filterPlaceholder}
                                   onKeyDown={(e) => e.stopPropagation()}
                                   onChange={this.onSearchTextChanged}
                                   onBlur={() => this.searchInput.focus()}
                                   ref={(input) => this.searchInput = input}
                            />
                        </div>
                    }
                    {menuList}
                </MaterialDropDownMenu>
                {
                    (value === null || value === undefined) && placeholder &&
                    <div className="drop-down-menu__placeholder" style={wrapperStyle}>
                        <div>{placeholder}</div>
                    </div>
                }
            </div>
        );
    }
};

DropDownMenu.propTypes = {
    style: PropTypes.object,
    labelStyle: PropTypes.object,
    listStyle: PropTypes.object,
    menuStyle: PropTypes.object,
    menuItemStyle: PropTypes.object,
    selectedMenuItemStyle: PropTypes.object,
    underlineStyle: PropTypes.object,
    iconStyle: PropTypes.object,
    anchorOrigin: PropTypes.object,
    arrowExist: PropTypes.bool,
    autoWidth: PropTypes.bool,
    openImmediately: PropTypes.bool,
    maxHeight: PropTypes.number,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onChangeShowing: PropTypes.func,
    iconButtonPrefix: PropTypes.string,
    searchExist: PropTypes.bool,
    filterPlaceholder: PropTypes.string,
};

DropDownMenu.defaultProps = {
    onChangeShowing: () => {
    },
};