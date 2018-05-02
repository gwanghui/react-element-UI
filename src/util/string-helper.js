const leftPadZero = (number) => `0${number}`.slice(-2);

const getTextByValue = (value, dataArr) => {
    for(let i = 0; i< dataArr.length; i++){
        if(dataArr[i].value === value){
            return dataArr[i].text;
        }
    }
};

const getTextWidth = (text, font) => {
    const canvas = getTextWidth.canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
};

const ellipsisText = (text, maxWidth = 215, font = '16px \'Open Sans\'') => {
    if (text && getTextWidth(text, font) > maxWidth) {
        const ellipsisWidth = getTextWidth('...', font);
        const widthWithoutEllipsis = (Number(maxWidth) - ellipsisWidth) / 2;
        let prefix, suffix;
        for (let i = 4; i < text.length; i++) {
            if (getTextWidth(text.substring(0, i), font) > widthWithoutEllipsis) {
                prefix = text.substring(0, i - 1);
                break;
            }
        }
        for (let i = 4; i < text.length; i++) {
            if (getTextWidth(text.substring(text.length - i, text.length), font) > widthWithoutEllipsis) {
                suffix = text.substring(text.length - (i - 1), text.length);
                break;
            }
        }
        return prefix ? prefix + "..." + suffix : suffix;
    } else {
        return text;
    }
};

export {leftPadZero, getTextWidth, ellipsisText};