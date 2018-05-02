import moment from 'moment-timezone';
import {leftPadZero} from "./string-helper";

const formatSeconds = (totalSeconds, format) => {
    let hours = leftPadZero(Math.floor(totalSeconds / 3600));
    let minutes = leftPadZero(Math.floor((totalSeconds % 3600) / 60));
    let seconds = leftPadZero(totalSeconds % 3600 % 60);

    return format.replace('hh', hours).replace('mm', minutes).replace('ss', seconds);
};

const convertTimeInfo = (timestamp, dateFormat) => {
    const currentTime = moment();
    const statusTime = moment(timestamp);

    if (currentTime.diff(statusTime, 'days') > 0) {
        return statusTime.format(dateFormat);
    }
    return statusTime.startOf('minute').fromNow();
};

const convertTimeInfoI18n = (timestamp, dateFormat) => {
    const minute = 60;
    const hour = 60 * minute;
    const day = 24 * hour;
    const currentTime = moment();
    const statusTime = moment(timestamp);

    const diffSeconds = currentTime.diff(statusTime, 'seconds');

    if (diffSeconds >= 2 * day) {
        return {key: 'inDays', value: statusTime.format(dateFormat)};
    } else if (diffSeconds >= day) {
        return {key: 'inDay', value: 1};
    } else if (diffSeconds >= 2 * hour) {
        return {key: 'inHours', value: currentTime.diff(statusTime, 'hours')};
    } else if (diffSeconds >= hour) {
        return {key: 'inHour', value: currentTime.diff(statusTime, 'hours')};
    } else if (diffSeconds >= 2 * minute) {
        return {key: 'inMinutes', value: currentTime.diff(statusTime, 'minute')};
    } else if (diffSeconds >= minute) {
        return {key: 'inMinute', value: currentTime.diff(statusTime, 'minute')};
    } else {
        return {key: 'inSeconds', value: currentTime.diff(statusTime, 'seconds')};
    }
};

const onDateConvert = (value, storeTimeZone) => {
    if (value === undefined) {
        return undefined;
    }
    let date = moment(value).format("YYYY-MM-DD");
    return date + storeTimeZone;
};

export default {formatSeconds, convertTimeInfo, convertTimeInfoI18n, onDateConvert};