/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format);
}

export function formatToDate(date?: dayjs.ConfigType, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}

/**
 * 将 int64 时间戳转换为可读的日期时间格式
 * @param timestamp - int64 时间戳
 * @param format - 输出格式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期时间字符串
 */
export function formatInt64ToDateTime(timestamp: number, format = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs(timestamp).format(format);
}
export const dateUtil = dayjs;
