import React from 'react';
import ReactHighlighter from 'react-highlight-words';
import PropTypes from "prop-types";

const DEFAULT_HIGHLIGHT_STYLE = {
    color: '#2e3ab1',
    fontWeight: '600',
    backgroundColor: 'white',
};

const Highlighter = (props) => {
    const {text = '', searchWords = []} = props;
    const style = Object.assign({}, DEFAULT_HIGHLIGHT_STYLE, props.style || {});


    return <ReactHighlighter
        highlightStyle={style}
        searchWords={searchWords}
        textToHighlight={text}
    />
}

export default Highlighter;

Highlighter.propTypes = {
    text: PropTypes.string,
    searchWords: PropTypes.array,
    style: PropTypes.object,
};