import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MaterialPaper from 'material-ui/Paper/Paper'
import defaultsDeep from "lodash/defaultsDeep";
import {v4} from "uuid";

export default class InfoPaper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const defaultProps = {
            style: {
                height: 381,
                width: 295,
                top: 80,
                left: 165,
                textAlign: 'center',
                display: 'block',
                position: 'fixed',
                zIndex: 1,
                border: 'solid 1px #666666',
                boxShadow: 'none',
            },
            ulStyle: {paddingLeft: '13px', display: 'flex', textAlign: 'left'},
            numberStyle: {fontSize: '12px', fontWeight: 600, color: '#666666'},
            contentStyle: {fontSize: '12px', color: '#666666', paddingLeft: '6px', paddingRight: '16px'}
        };

        const childProps = defaultsDeep({...this.props}, {...defaultProps});
        const ulStyle = childProps.ulStyle;
        const numberStyle = childProps.numberStyle;
        const contentStyle = childProps.contentStyle;
        const rules = childProps['rules'];

        delete childProps['rules'];
        delete childProps['ulStyle'];
        delete childProps['numberStyle'];
        delete childProps['contentStyle'];

        return (
            <MaterialPaper {...childProps} >
                {
                    rules.map((rule, index) => {
                        return (
                            <ul key={v4()} style={ulStyle}>
                                <div style={numberStyle}> #{index + 1}</div>
                                <div style={contentStyle}>{rule.content}</div>
                            </ul>
                        );
                    })
                }
            </MaterialPaper>
        );
    }
};

InfoPaper.propTypes = {
    rules: PropTypes.array,
    style: PropTypes.object,
    ulStyle: PropTypes.object,
    numberStyle: PropTypes.object,
    contentStyle: PropTypes.object,
};