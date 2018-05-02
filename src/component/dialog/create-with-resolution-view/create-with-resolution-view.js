import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import TextField from "../../input/text-field";
import ResolutionDropDown from "../../drop-down/resolution-drop-down/resolution-drop-down";
import ResolutionView from "../../drop-down/resolution-drop-down/resolution-view";
import Dialog from "../dialog";

class CreateWithResolutionView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.copiedTitle || '',
            resolution: null,
        };

        this.onResolutionChange = this.onResolutionChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onCreated = this.onCreated.bind(this);
        this.onClosed = this.onClosed.bind(this);
        this.isCreateButtonDisabled = this.isCreateButtonDisabled.bind(this);
        this.onCloseByEscape = this.onCloseByEscape.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {copiedTitle, copiedResolution} = nextProps;

        if (this.props.copiedTitle !== copiedTitle) {
            this.setState({
                title: copiedTitle,
                resolution: copiedResolution,
            });

            this.props.onTitleInputBlur(copiedTitle);
        }
    }

    onTitleChange({target: {value: title}}) {
        this.setState({title});
        this.props.onTitleChange && this.props.onTitleChange(title);
    }

    onResolutionChange(resolution) {
        this.setState({resolution})
    }

    onCloseByEscape(e) {
        const {keyCode} = e;
        if (keyCode === 27) {
            e.preventDefault();
            this.onClosed(e);
        }
    }

    onCreated() {
        const {title, resolution} = this.state;
        const {onCreated} = this.props;
        onCreated(title, resolution);
    }

    onClosed(e) {
        const {onClose} = this.props;
        e.preventDefault();

        this.setState({
            resolution: null,
            title: '',
        });

        onClose();
    }

    isCreateButtonDisabled() {
        const {errorText = '', createButtonDisabled} = this.props;
        const {title = '', resolution} = this.state;

        return isEmpty(title.trim()) || isEmpty(resolution) || !isEmpty(errorText) || createButtonDisabled;
    }

    render() {
        const {
            label,
            resolutionItems,
            errorText,
            onTitleInputBlur,
            visibility,
            copiedResolution,
        } = this.props;

        const {
            title,
        } = this.state;

        return (
            <Dialog isOpen={visibility}
                    positiveButtonText={'create'}
                    negativeButtonText={'cancel'}
                    positiveButtonDisabled={this.isCreateButtonDisabled()}
                    onNegativeClick={this.onClosed}
                    onPositiveClick={this.onCreated}
                    onCloseClick={this.onClosed}
            >
                <div className="create-dialog-body">
                    <TextField value={title}
                               label={label}
                               name='create with resolution view'
                               errorMessage={errorText}
                               onBlur={() => onTitleInputBlur(this.state.title)}
                               onChange={this.onTitleChange}
                               focusOnMount={true}
                               maxLength={50}
                    />
                    {
                        !copiedResolution ?
                        <ResolutionDropDown resolutionItems={resolutionItems}
                                            onChange={this.onResolutionChange}
                        /> :
                        <ResolutionView menuOpened={false}
                                        isDisabled={true}
                                        resolution={copiedResolution} />
                    }
                </div>
            </Dialog>
        );
    }
}

export default CreateWithResolutionView;

CreateWithResolutionView.propTypes = {
    label: PropTypes.string.isRequired,
    visibility: PropTypes.bool.isRequired,
    errorText: PropTypes.string,
    createButtonDisabled: PropTypes.bool,
    resolutionItems: PropTypes.array.isRequired,
    onTitleChange: PropTypes.func,
    onTitleInputBlur: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    onCreated: PropTypes.func,
    copiedTitle: PropTypes.string,
    copiedResolution: PropTypes.object,
};

CreateWithResolutionView.defaultProps = {
    errorText: '',
    createButtonDisabled: false,
    onTitleChange: () => {},
    onTitleInputBlur: () => {},
    onCreated: () => {},
};