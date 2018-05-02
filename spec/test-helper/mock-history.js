import sinon from "sinon";

const initialLocation = {
    pathname: '',
    search: '',
    state: {}
};

const createMockHistory = () => {
    const mockHistory = {
        push(arg, state) {
            if (typeof arg === 'string') {
                mockHistory.location = {...initialLocation};
                mockHistory.location.pathname = arg;
            } else {
                mockHistory.location = {...mockHistory.location, ...arg};
            }

            if(state) {
                mockHistory.location.state = state;
            }
        },
        location: {...initialLocation},
        replace: sinon.spy(),
        goBack: sinon.spy(),
        go: sinon.spy(),
        listen() {},
    };

    return mockHistory;
};

export default createMockHistory;