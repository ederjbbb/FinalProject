export const truncateText = (text = '', len, addEllipsis = true) => text.substring(0, Math.min(text.length, len)) +
  (addEllipsis && text.length > len ? '...' : '');

export const isValidString = string => (string ? /([^\s])/.test(string) : false);

export const trim = str => (str ? str.trim().replace(/\s\./, '') : str);

export const httpToHttps = str => (str ? str.replace(/[hH][tT]{2}[pP]:/g, 'https:').replace(/\/+$/, '') : str);

export const toUpperSnakeCase = str => str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
