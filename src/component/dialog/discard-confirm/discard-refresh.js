import React, {Component} from 'react';

const unload = (e) => {
    e.returnValue = 'Your work has not been saved.';
};

export default class DiscardRefresh extends Component {
    componentDidMount() {
        window.removeEventListener('beforeunload', unload);
        window.addEventListener('beforeunload', unload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', unload);
    }

    render() {
        return null;
    }
}