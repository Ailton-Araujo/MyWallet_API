import xss from 'xss';

export function sanitizeEntries<T extends object>(object: T): T {
  const entries = Object.entries(object);
  const sanitatedEntries = entries.map((entry) => {
    const [_key, value] = entry;
    if (typeof value === 'string') {
      entry[1] = xss(value);
    }
    return entry;
  });
  return Object.fromEntries(sanitatedEntries) as T;
}
