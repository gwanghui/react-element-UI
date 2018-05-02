import React, {Component} from 'react';
import PropTypes from 'prop-types';

const DEFAULT_ARROW_EXIST = true;
const DEFAULT_ALWAYS_SHOWING_ARROW = false;
const DEFAULT_DISPLAY_BUTTON_ICON = true;

const getSelectedModifier = (selected, item) => {
    return selected.text === item.text ? '--selected' : '';
};

export default class DropDown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hovered: false,
            showing: false,
        };

        this.onItemClick = this.onItemClick.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onDropDownButtonClick = this.onDropDownButtonClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.getArrowClass = this.getArrowClass.bind(this);
        this.closeMenuByEscape = this.closeMenuByEscape.bind(this);
    }

    onItemClick(item) {
        const {onSelect} = this.props;

        return () => {
            onSelect(item);
            this.setState({showing: false});
        }
    }

    onMouseOver() {
        this.setState({hovered: true})
    }

    onMouseLeave() {
        this.setState({hovered: false})
    }

    onDropDownButtonClick(e) {
        e.stopPropagation();

        const {onChangeShowing} = this.props;

        if (onChangeShowing !== undefined)
            onChangeShowing(!this.state.showing);

        this.setState({showing: !this.state.showing});
    }

    onBlur() {
        const {onChangeShowing} = this.props;
        if (onChangeShowing !== undefined)
            onChangeShowing(false);

        this.setState({showing: false});
    }

    getPrefixClassName(className, disabled) {
        const {classNamePrefix} = this.props;

        let defaultClassName = disabled ? `${className}--disabled` : className;
        let subClassName = classNamePrefix ? `${classNamePrefix}-${className}` : undefined;
        subClassName = subClassName && disabled ? `${subClassName}--disabled` : subClassName;

        return subClassName ? `${defaultClassName} ${subClassName}` : defaultClassName;
    }

    getArrowClass = (showing, hovered, alwaysShowingArrow, disabled) => {
        if (showing) return this.getPrefixClassName('drop-down-arrow-ascending', disabled);
        if (hovered || alwaysShowingArrow) return this.getPrefixClassName('drop-down-arrow-descending', disabled);
        return '';
    };

    closeMenuByEscape(e) {
        const {showing} = this.state;
        const {keyCode} = e;
        if (keyCode === 27 && showing) {
            e.stopPropagation();
            this.onBlur();
        }
    }

    render() {
        const {
            items,
            selected,
            arrowExist = DEFAULT_ARROW_EXIST,
            alwaysShowingArrow = DEFAULT_ALWAYS_SHOWING_ARROW,
            displayButtonIcon = DEFAULT_DISPLAY_BUTTON_ICON,
            placeholder = 'Choose',
            dropDownMenuPosition = 'bottom',
            disabled,
        } = this.props;

        const {showing, hovered} = this.state;

        return (
            <div className={this.getPrefixClassName('drop-down', disabled)} tabIndex="0"
                 onBlur={this.onBlur}
                 onKeyDown={this.closeMenuByEscape}
            >
                <button className={this.getPrefixClassName('drop-down__button')}
                        type="button"
                        onClick={disabled ? () => {
                        } : this.onDropDownButtonClick}
                        onMouseOver={this.onMouseOver}
                        onMouseLeave={this.onMouseLeave}>
                    {!!selected.value ?
                        (selected.displayButtonIcon && displayButtonIcon ?
                                (<div
                                    className={this.getPrefixClassName(`drop-down__icon-${selected.displayButtonIcon}`)}/>)
                                :
                                (selected.icon && displayButtonIcon ?
                                    <div className={this.getPrefixClassName(`drop-down__icon-${selected.icon}`)}/>
                                    : selected.text)
                        )
                        :
                        (
                            <span
                                className={this.getPrefixClassName('drop-down__placeholder', disabled)}>{placeholder}</span>
                        )
                    }
                    {arrowExist &&
                    <div className={this.getArrowClass(showing, hovered, alwaysShowingArrow, disabled)}/>}
                </button>
                {
                    showing &&
                    <div className={this.getPrefixClassName('drop-down-menu')}
                         style={{bottom: dropDownMenuPosition === 'top' ? '20px' : ''}}
                    >
                        {
                            items.map((item, index) =>
                                <div key={index}
                                     className={this.getPrefixClassName(`drop-down__item${getSelectedModifier(selected, item)}`)}
                                     onMouseDown={this.onItemClick(item)}>
                                    {item.icon &&
                                    <div
                                        className={this.getPrefixClassName(`drop-down__icon-${item.icon}${getSelectedModifier(selected, item)}`)}/>
                                    }
                                    {item.indent !== undefined &&
                                    <div className="drop-down__indent" style={{width: `${item.indent * 30}px`}}/>
                                    }
                                    <div className={this.getPrefixClassName(`drop-down__item__text`)}>
                                        {item.text}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                }
            </div>
        );
    }
}

DropDown.propTypes = {
    items: PropTypes.array.isRequired,
    selected: PropTypes.object,
    alwaysShowingArrow: PropTypes.bool,
    arrowExist: PropTypes.bool,
    classNamePrefix: PropTypes.string,
    displayButtonIcon: PropTypes.bool,
    placeholder: PropTypes.string,
    dropDownMenuPosition: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    onChangeShowing: PropTypes.func,
    disabled: PropTypes.bool,
};