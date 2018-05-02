import React from 'react';
import PropTypes from 'prop-types';
import MaterialCircularProgress from "material-ui/CircularProgress";

function CircularProgress({isLoading}) {
    return isLoading && (
        <div className="spinner-wrapper">
            <MaterialCircularProgress
                color="#5c65c0"
                size={30}
                thickness={4}
            />
        </div>
    )
}

CircularProgress.propTypes = {
    isLoading: PropTypes.bool,
};

CircularProgress.defaultProps = {
    isLoading: false,
};

export default CircularProgress;