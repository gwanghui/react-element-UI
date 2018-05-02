import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'nexshop-web-i18n';

const ResolutionView = (props) => {
    const {onClick, resolution, menuOpened, isDisabled = false} = props;
    let value = i18n.t('common:createWithResolution.targetResolution.hint');
    let text = '';
    let orientation = '';
    if (resolution) {
        ({value, text, orientation} = resolution);
    }

    return (
        <div className={`resolution-drop-down${isDisabled ? '--disabled' : ''}`} onClick={onClick}>
            {
                resolution ?
                    (
                        <div className="resolution-drop-down-selected">
                            <label className={`resolution-drop-down-selected__title${isDisabled ? '--disabled' : ''}`} >{value}</label>
                            <label className={`resolution-drop-down-selected__resolution${isDisabled ? '--disabled' : ''}`}>{text}</label>
                            <div className={orientation === "horizontal" ?
                                `resolution-drop-down-selected__horizontal${isDisabled ? '--disabled' : ''}` :
                                `resolution-drop-down-selected__vertical${isDisabled ? '--disabled' : ''}`
                            }
                            />
                        </div>
                    ) :
                    (
                        <label className="resolution-drop-down__placeholder">{value}</label>
                    )
            }
            <div className={`resolution-drop-down__arrow${isDisabled ? '--disabled' : ''}`}>
                <span className={`resolution-drop-down__arrow${menuOpened ? '--ascending' : '--descending'}`} />
            </div>
        </div>
    );
};

ResolutionView.propTypes = {
    onClick: PropTypes.func,
    resolution: PropTypes.object,
    menuOpened: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool,
};

export default ResolutionView;