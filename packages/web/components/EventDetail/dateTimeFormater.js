// @flow
import format from 'date-fns/format/index';

type Formatter = string => string;

const dateTimeFormater: Formatter = date =>
  format(new Date(date), 'YYYY-MM-DD HH:mm');

export default dateTimeFormater;
