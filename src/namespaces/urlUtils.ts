
export const appendQueryParam = ({ url, key, value }: { url: string, key: string, value: string }): string => {
  const urlObj = new URL(url);
  urlObj.searchParams.append(key, value);
  return urlObj.href;
};

export const getQueryParam = ({ url, key }: { url: string, key: string }): string | null => {
  const urlObj = new URL(url);
  return urlObj.searchParams.get(key);
};

export const deleteQueryParam = ({ url, key }: { url: string, key: string }): string => {
  const urlObj = new URL(url);
  urlObj.searchParams.delete(key);
  return urlObj.href;
};

export const getAllQueryParams = ({ url }: { url: string }): Record<string, unknown> => {
  const urlObj = new URL(url);
  const queryParams: Record<string, unknown> = {};
  urlObj.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });
  return queryParams;
};

export const isURLValid = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

