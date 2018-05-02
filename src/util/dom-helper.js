const setToolTip = (e, text, isShowToolTip) => {
    const target = e.target;

    if (target.offsetWidth < target.scrollWidth || isShowToolTip) {
        if (text) {
            target.title = text;
        } else {
            target.title = target.textContent;
        }
    } else {
        delete target.title;
    }
};

export default {setToolTip};