import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import MaterialDialog from 'material-ui/Dialog';
import isNil from "lodash/isNil";
import defaultsDeep from 'lodash/defaultsDeep';
import {autobind} from "core-decorators";
import v4 from 'uuid/v4';

import FlatButton from "../button/flat-button/flat-button";

const NEXSHOP_DIALOG_NAME_SUFFIX = 'NEXSHOP_DIALOG';
const ESC = 27;

const contentStyle = {
    minWidth: '500px',
    maxWidth: 'auto',
    width: 0,
};

const actionsContainerStyle = {
    height: '55px',
    padding: 0,
    bottom: 0,
    position: 'relative',
};

const defaultNegativeButtonStyle = {
    marginRight: '15px'
};
const defaultPositiveButtonStyle = {
    marginRight: '40px'
};
const defaultOptionButtonStyle = {
    marginRight: '250px'
};

const bodyStyle = {
    padding: 0,
};

const defaultProps = {
    contentStyle,
    bodyStyle,
    actionsContainerStyle,
    paperClassName: 'dialog-paper',
    overlayClassName: 'dialog-overlay',
    bodyClassName: 'dialog-body',
    modal: true,
};

const mockEvent = {
    preventDefault: () => {},
    stopPropagation: () => {},
};

@autobind
class Dialog extends Component {
    static isClearStateOnLoad = false;

    uuid = v4();
    historyUnlisten = null;
    keyEventAttatched = false;

    state = {
        pushed: false,
    };


    static clearAllHistoryState(props) {
        if (Dialog.isClearStateOnLoad) return;
        Dialog.isClearStateOnLoad = true;

        const {history: {location: {state: oldState = {}, ...restLocationProps}, replace, go}} = props;
        const countOfExistDialogState = Object.keys(oldState).filter((key) => key.endsWith(NEXSHOP_DIALOG_NAME_SUFFIX)).length;
        const state = Object.keys(oldState)
            .filter((key) => !key.endsWith(NEXSHOP_DIALOG_NAME_SUFFIX))
            .reduce((accumulator, key) => {
                accumulator[key] = oldState[key];

                return accumulator;
            }, {});

        if(countOfExistDialogState > 0) {
            go(countOfExistDialogState * -1);
        }

        replace({state, ...restLocationProps});
    }

    componentWillMount() {
        Dialog.clearAllHistoryState(this.props);

        this.listenHistory();
    }


    componentDidUpdate() {
        if(this.props.isOpen && !this.keyEventAttatched) {
            this.attachKeyDownEvent();
        }

        if(!this.props.isOpen && this.keyEventAttatched) {
            this.detachKeyDownEvent();
        }
    }

    componentWillUnmount() {
        this.unlistenHistory();
        this.clearHistoryState();
        this.detachKeyDownEvent();
    }

    componentWillReceiveProps(nextProps) {
        const {isOpen} = this.props;

        if (!isOpen && nextProps.isOpen) {
            setTimeout(this.pushState);
        }

        if (isOpen && !nextProps.isOpen) {
            this.popState();
        }
    }

    get dialogName() {
        return `${this.uuid}_${NEXSHOP_DIALOG_NAME_SUFFIX}`;
    }

    attachKeyDownEvent() {
        window.addEventListener('keydown', this.closeByEscape);
        this.keyEventAttatched = true;
    }

    detachKeyDownEvent() {
        window.removeEventListener('keydown', this.closeByEscape);
        this.keyEventAttatched = false;
    }

    listenHistory() {
        const {history, enableOnBrowserBackClose} = this.props;

        if (enableOnBrowserBackClose) {
            this.historyUnlisten = history.listen(({state = {}}, action) => {
                if( action === 'PUSH' && state[this.dialogName]) {
                    this.setState({pushed: true});
                } else if (action === 'POP') {
                    if (this.dialogName && !state[this.dialogName] && this.state.pushed) {
                        this.closeDialog();
                    }
                }
            });
        }
    }

    unlistenHistory() {
        if (this.historyUnlisten) this.historyUnlisten();
    }

    clearHistoryState() {
        const {history: {location: {state, ...restLocationProps}, replace}} = this.props;

        if (state && this.dialogName) {
            delete state[this.dialogName];
        }

        replace({state, ...restLocationProps});
    }

    pushState() {
        const {enableOnBrowserBackClose, history: {location: {state, ...restLocationProps}, push}} = this.props;

        if (!enableOnBrowserBackClose) return;

        push({state: {...state, [this.dialogName]: true}, ...restLocationProps});
    }

    popState() {
        const {enableOnBrowserBackClose, history: {location: {state = {}}, goBack}} = this.props;

        if (!enableOnBrowserBackClose) return;

        if (state[this.dialogName]) {
            goBack();
        }
    }

    closeByEscape(e) {
        const {enableOnEscapeKeyClose, enableOnBrowserBackClose} = this.props;

        if (e.keyCode !== ESC) return;

        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();

        if(!enableOnEscapeKeyClose) return false;

        enableOnBrowserBackClose ? this.popState() : this.closeDialog();
    }

    closeDialog() {
        const {onNegativeClick, onPositiveClick, onCloseClick, isOpen} = this.props;

        this.setState({pushed: false});

        if(!isOpen) return;

        if (onCloseClick) {
            onCloseClick(mockEvent);
        } else if(onNegativeClick) {
            onNegativeClick(mockEvent);
        } else {
            onPositiveClick(mockEvent);
        }
    }

    getActions() {
        const {
            positiveButtonText,
            negativeButtonText,
            optionButtonText,
        } = this.props;

        const actions = [];

        if (!isNil(optionButtonText)) {
            const {optionButtonStyle, optionButtonDisabled, onOptionClick} = this.props;
            const optionFlatButtonStyle = defaultsDeep(optionButtonStyle, defaultOptionButtonStyle);

            actions.push(<FlatButton
                label={optionButtonText}
                secondary={true}
                disabled={optionButtonDisabled}
                onClick={onOptionClick}
                style={optionFlatButtonStyle}
            />);
        }

        if (!isNil(negativeButtonText)) {
            const {negativeButtonStyle, negativeButtonDisabled, onNegativeClick} = this.props;
            const negativeFlatButtonStyle = defaultsDeep(negativeButtonStyle, defaultNegativeButtonStyle);

            actions.push(<FlatButton
                label={negativeButtonText}
                secondary={true}
                disabled={negativeButtonDisabled}
                onClick={onNegativeClick}
                style={negativeFlatButtonStyle}
            />);
        }

        if (!isNil(positiveButtonText)) {
            const {positiveButtonStyle, positiveButtonDisabled, onPositiveClick} = this.props;
            const positiveFlatButtonStyle = defaultsDeep(positiveButtonStyle, defaultPositiveButtonStyle);

            actions.push(<FlatButton
                label={positiveButtonText}
                primary={true}
                disabled={positiveButtonDisabled}
                onClick={onPositiveClick}
                style={positiveFlatButtonStyle}
            />);
        }

        return actions;
    }

    render() {
        const {
            isOpen,
            isDimmed,
            children,
            style,
            contentStyle,
            bodyStyle,
            actionsContainerStyle,
            overlayStyle = {},
            onCloseClick,
            bodyClassName,
        } = this.props;

        if (!isDimmed) {
            overlayStyle.backgroundColor = 'transparent';
        }

        const materialDialogProps = defaultsDeep({
            actions: this.getActions(),
            open: isOpen,
            modal: true,
            contentStyle,
            bodyStyle,
            style,
            actionsContainerStyle,
            overlayStyle,
            bodyClassName,
        }, {...defaultProps});

        return (
            <MaterialDialog {...materialDialogProps}>
                <div className="default-dialog-header">
                    {
                        onCloseClick &&
                        <div className="default-dialog-header__close" onClick={onCloseClick}/>
                    }
                </div>
                {children}
            </MaterialDialog>
        )
    };
}

export default withRouter(Dialog);

Dialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isDimmed: PropTypes.bool,
    enableOnEscapeKeyClose: PropTypes.bool,
    enableOnBrowserBackClose: PropTypes.bool,
    positiveButtonText: PropTypes.string,
    positiveButtonStyle: PropTypes.object,
    positiveButtonDisabled: PropTypes.bool,
    negativeButtonText: PropTypes.string,
    negativeButtonStyle: PropTypes.object,
    negativeButtonDisabled: PropTypes.bool,
    optionButtonText: PropTypes.string,
    optionButtonStyle: PropTypes.object,
    optionButtonDisabled: PropTypes.bool,
    onPositiveClick: PropTypes.func,
    onNegativeClick: PropTypes.func,
    onCloseClick: PropTypes.func,
    onOptionClick: PropTypes.func,
};

Dialog.defaultProps = {
    isDimmed: true,
    enableOnEscapeKeyClose: true,
    enableOnBrowserBackClose: true,
    positiveButtonStyle: {},
    positiveButtonDisabled: false,
    negativeButtonStyle: {},
    negativeButtonDisabled: false,
    optionButtonStyle: {},
    optionButtonDisabled: false,
};