import React from 'react';
import {expect} from 'chai';
import mockdate from 'mockdate';
import moment from 'moment-timezone';
import timeHelper from "../../src/util/time-helper";

describe('Time Helper Spec', () => {
    beforeEach(() => {
        moment.tz.setDefault('Asia/Seoul');
        mockdate.set(404146800000); //1982-10-23 sat
    });

    describe('formatSeconds', () => {
        it('formats seconds into given format mm:ss', () => {
            expect(timeHelper.formatSeconds(120, 'mm:ss')).to.equal('02:00');
        });

        it('formats seconds into given format hh:mm:ss', () => {
            expect(timeHelper.formatSeconds(120, 'hh:mm:ss')).to.equal('00:02:00');
        });
    });

    describe('convertTimeInfo', () => {
        it('returns hour info when timestamp is within 24 hours', () => {
            expect(timeHelper.convertTimeInfo(moment().subtract(3, 'hours'), "MM-DD-YYYY")).to.equal('3 hours ago');
        });

        it('returns date info when timestamp is over 24 hours', () => {
            const formatDate = moment().subtract(3, 'days').format('MM-DD-YYYY');

            expect(timeHelper.convertTimeInfo(moment().subtract(3, 'days'), "MM-DD-YYYY")).to.equal(formatDate);
        });
    });

    describe('convertTimeInfoI18n', () => {
        it('returns date info when timestamp is over 48 hours', () => {
            const formatDate = moment().subtract(3, 'days').format('MM-DD-YYYY');

            expect(timeHelper.convertTimeInfoI18n(moment().subtract(3, 'days'), "MM-DD-YYYY")).to.deep.equal({
                key: 'inDays',
                value: formatDate
            });
        });

        it('returns hours info when timestamp is within 24 hours', () => {
            expect(timeHelper.convertTimeInfoI18n(moment().subtract(3, 'hours'), "MM-DD-YYYY")).to.deep.equal({
                key: 'inHours',
                value: 3
            });
        });

        it('returns hour info when timestamp is under 2 hours', () => {
            expect(timeHelper.convertTimeInfoI18n(moment().subtract(118, 'minutes'), "MM-DD-YYYY")).to.deep.equal({
                key: 'inHour',
                value: 1
            });
        });

        it('returns minutes info when timestamp is within 60 minutes', () => {
            expect(timeHelper.convertTimeInfoI18n(moment().subtract(58, 'minutes'), "MM-DD-YYYY")).to.deep.equal({
                key: 'inMinutes',
                value: 58
            });
        });

        it('returns minute info when timestamp is under 2 minutes', () => {
            expect(timeHelper.convertTimeInfoI18n(moment().subtract(118, 'seconds'), "MM-DD-YYYY")).to.deep.equal({
                key: 'inMinute',
                value: 1
            });
        });

        it('returns seconds info when timestamp is under 60 seconds', () => {
            expect(timeHelper.convertTimeInfoI18n(moment().subtract(25, 'seconds'), "MM-DD-YYYY")).to.deep.equal({
                key: 'inSeconds',
                value: 25
            });
        });

        it('call onDateConvert', () => {
            const dateConvertResult = timeHelper.onDateConvert(moment(), 'Asia/Seoul');

            expect(dateConvertResult).to.include('1982-10-23Asia/Seoul');

            const undefinedResult = timeHelper.onDateConvert();

            expect(undefinedResult).to.equal(undefined);
        });
    });
});