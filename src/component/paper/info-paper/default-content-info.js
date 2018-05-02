import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MaterialPaper from 'material-ui/Paper/Paper'
import defaultsDeep from "lodash/defaultsDeep";
import {v4} from "uuid";

export default class DefaultContentInfoPaper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const defaultProps = {
            style: {
                height: 81,
                width: 269,
                display: 'block',
                zIndex: 1111111,
                border: 'solid 1px #666666',
                paddingLeft: 17,
                paddingRight: 17,
                paddingTop: 15,
                paddingBottom: 15,
                boxShadow: 'none',
            },
            contentStyle: {
                fontSize: 12,
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: 'normal',
                letterSpacing: 'normal',
                textAlign: 'left',
                color: '#666666',
            }
        };

        const {contentinfo} = this.props;

        const childProps = defaultsDeep({...this.props}, {...defaultProps});
        const contentStyle = childProps.contentStyle;
        const info =
            {content: contentinfo}
        ;

        delete childProps['rules'];
        delete childProps['ulStyle'];
        delete childProps['numberStyle'];
        delete childProps['contentStyle'];

        return (
            <MaterialPaper {...childProps} >
                <div style={contentStyle}>{info.content}</div>
            </MaterialPaper>
        );
    }
};

DefaultContentInfoPaper.propTypes = {
    contentinfo: PropTypes.string,
    style: PropTypes.object,
    ulStyle: PropTypes.object,
    numberStyle: PropTypes.object,
    contentStyle: PropTypes.object,
};