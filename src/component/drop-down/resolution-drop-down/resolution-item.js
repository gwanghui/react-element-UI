import React from 'react';
import PropTypes from 'prop-types';

const ResolutionItem = (props) => {
    const {item, selectedOrientation, onSelected, includeDivider, isDisabled = false} = props;
    const {value, text} = item;

    const horizontalSelected = selectedOrientation === 'horizontal';
    const verticalSelected = selectedOrientation === 'vertical';

    function onClick(selectedItem) {
        if (!isDisabled) {
            onSelected(selectedItem);
        }
    }

    return (
        <div>
            <div className="resolution-item">
                <label className={`resolution-item__title${isDisabled ? '--disabled' : ''}`}>{value}</label>
                <label className={`resolution-item__resolution${isDisabled ? '--disabled' : ''}`}>{text}</label>
                <div
                    className={`resolution-item__horizontal${isDisabled ? '--disabled' : (horizontalSelected ? '--selected' : '')}`}
                    onClick={() => onClick({...item, orientation: 'horizontal'})}/>
                <div
                    className={`resolution-item__vertical${isDisabled ? '--disabled' : (verticalSelected ? '--selected' : '')}`}
                    onClick={() => onClick({...item, orientation: 'vertical'})}/>
            </div>
            {includeDivider ? <div className="resolution-item__divider"/> : ''}
        </div>
    )
};

ResolutionItem.propTypes = {
    onSelected: PropTypes.func,
    resolution: PropTypes.object,
    selectedOrientation: PropTypes.string,
    includeDivider: PropTypes.bool,
    isDisabled: PropTypes.bool,
};

export default ResolutionItem;