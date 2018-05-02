import React from 'react';
import PropTypes from 'prop-types';
import DiscardRefresh from "./discard-refresh";
import AlertDialog from "../alert/alert-dialog";

export default class DiscardConfirm extends React.Component {
    constructor(props) {
        super(props);

        this.prevBlock = false;
        this.state = {
            message: 'back',
        }
    }

    componentWillReceiveProps(next) {
        const isChange = next.block !== this.prevBlock;

        if (next.message) {
            this.setState({message: next.message});
        } else if (this.state.message === 'backAlertPop.text') {
            this.setState({message: 'back'});
        }

        if (isChange) {
            if (next.block) {
                this.unblock = this.props.history.block(({pathname = ''}) => {
                    if(this.props.history.location.pathname !== pathname) {
                        return this.state.message;
                    }
                });
            } else {
                if (this.unblock) {
                    this.unblock();
                    this.unblock = null;
                }
            }
        }

        this.prevBlock = next.block;
    }

    render() {
        const {visibility, block, onContinue, onDiscard} = this.props;

        return (
            <div>
                <AlertDialog
                    isOpen={visibility}
                    enableOnBrowserBackClose={false}
                    message={this.state.message}
                    icon={'warning'}
                    onPositiveClick={onDiscard}
                    positiveButtonText={'leave'}
                    onNegativeClick={onContinue}
                    negativeButtonText={'stay'}
                />
                {
                    block && <DiscardRefresh/>
                }
            </div>
        );
    }
}

DiscardConfirm.propTypes = {
    history: PropTypes.object.isRequired,
    visibility: PropTypes.bool.isRequired,
    message: PropTypes.string,
    block: PropTypes.bool,
    onContinue: PropTypes.func.isRequired,
    onDiscard: PropTypes.func.isRequired,
};