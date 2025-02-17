import moment from 'moment';
import * as queryUtils from './queryUtils';

import { DATE_RANGE_FILTER_FORMAT } from '../constants';

describe('queryUtils', () => {
  describe('buildDateTimeRangeQuery', () => {
    const start = moment('2014-07-14').startOf('day').utc().format(DATE_RANGE_FILTER_FORMAT);
    const end = moment('2020-07-14').endOf('day').utc().format(DATE_RANGE_FILTER_FORMAT);

    it('should return query based on filter key and value', () => {
      expect(
        queryUtils.buildDateTimeRangeQuery('date', '2014-07-14:2020-07-14'),
      ).toEqual(`(date>="${start}" and date<="${end}")`);
    });
  });

  describe('buildDateRangeQuery', () => {
    const start = moment('2014-07-14').startOf('day').format(DATE_RANGE_FILTER_FORMAT);
    const end = moment('2020-07-14').endOf('day').format(DATE_RANGE_FILTER_FORMAT);

    it('should return query based on filter key and value', () => {
      expect(
        queryUtils.buildDateRangeQuery('date', '2014-07-14:2020-07-14'),
      ).toEqual(`(date>="${start}" and date<="${end}")`);
    });
  });

  describe('buildNumberRangeQuery', () => {
    it('should return query based on filter key and value', () => {
      expect(
        queryUtils.buildNumberRangeQuery('amount', '10-100'),
      ).toEqual('(amount >=/number 10 and amount <=/number 100)');
    });
  });
});
