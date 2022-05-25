
export const generateAWSFileName = (fileName: string): string => {
  const fileNameArr = fileName.split("");

  for (let i = 0; i < fileName.length; i++) {
    if (!regexStrings.aws_fileName.regex.test(fileNameArr[i])) {
      fileNameArr[i] = "_";
    }
  }

  return fileNameArr.join("");
};

export const regexStrings = {
  email: {
    regex: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    errorMessage: "Email format is not valid",
  },
  password: {
    strongStrength: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"), //8 chars, smallChar + capChar + number + specialChar
    mediumStrength: new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})",
    ), //6 chars, smallChar + capChar | smallChar + number | capChar + number
    //minimum conditions
    regex: new RegExp("^(?=.{6,})"), //6 chars
    errorMessage: "The password should be atleast 6 characters long",
  },
  organization_slug: {
    regex: /^[a-z0-9_\-]+$/,
    errorMessage: "Organization name can only contain characters a-z, 0-9, _, -",
  },
  aws_fileName: {
    regex: /^[a-zA-Z0-9_\-\.]+$/,
    errorMessage: "File name can only contain characters a-z, 0-9, _, -",
  },
  phone: {
    regex: /^(([0-9\ \+\_\-\,\.\^\*\?\$\^\#\(\)])|(ext|x)){1,20}$/,
    errorMessage: "The phone number is not of a valid format",
  },
  nameSeriesExtractorRegex: {
    //*? makes the first part not greedy
    // (?:xxxx)? in the second part after the base makes the second part optional
    // used to match patterns like Hello (123)
    regex: /^(.*?)(?:\s\((\d+)\))?$/,
    errorMessage: "no name series found",
  },
  imageMimeTypeMatch: {
    regex: /^data:image\/([-\w.]+)/,
    errorMessage: "Not a valid image file",
  },
  sceneAndElementName: {
    regex: /^[a-zA-Z0-9_\-\.]+[\s+a-zA-Z0-9_\-\.]*$/,
    errorMessage: "Scene names can only contain alphabets, 0-9, _ and -",
  },
  upperCaseRegex: {
    regex: /\p{Lu}/u,
  },
  lowerCaseRegex: {
    regex: /\p{Ll}/u,
  },
  baseTenRegex: {
    regex: /\d/,
  },
  nonAlphaNumRegex: {
    regex: /[-!$%^&*@()_+|~=`{}\[\]:";'<>?,.\/]/,
  },
  nonCaseAlphaRegex: {
    regex: /\p{Lo}/u,
  },
};

/**
 * This function checks weather a given password meets the minimum complexity requirement.
 * @param password T
 */
export const checkPasswordStrength = (password: string): boolean => {
  if (password.length < 8) {
    return false;
  }

  let complexity = 0;

  //check for upper case of European languages
  if (regexStrings.upperCaseRegex.regex.test(password)) {
    complexity++;
  }

  //check for lower case of European languages
  if (regexStrings.lowerCaseRegex.regex.test(password)) {
    complexity++;
  }

  //check for base 10 number - /\d/g
  if (regexStrings.baseTenRegex.regex.test(password)) {
    complexity++;
  }

  //check for non alphanumeric characters
  if (regexStrings.nonAlphaNumRegex.regex.test(password)) {
    complexity++;
  }

  //check for unicode character that is categorized as an alphabetic character but is not uppercase or lowercase
  if (regexStrings.nonCaseAlphaRegex.regex.test(password)) {
    complexity++;
  }

  return complexity >= 3 ? true : false;
};

export const appendQueryParam = ({ url, key, value }: { url: string, key: string, value: string }): string => {
  const urlObj = new URL(url);
  urlObj.searchParams.append(key, value);
  return urlObj.href;
};

export const deleteQueryParam = ({ url, key }: { url: string, key: string }): string => {
  const urlObj = new URL(url);
  urlObj.searchParams.delete(key);
  return urlObj.href;
};

export const getQueryParam = ({ url, key }: { url: string, key: string }): string | null => {
  const urlObj = new URL(url);
  return urlObj.searchParams.get(key);
};

export const getAllQueryParams = ({ url }: { url: string }): Record<string, unknown> => {
  const urlObj = new URL(url);
  const queryParams: any = {};
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

/**
 * Escape all JS characters
 * \b — Backspace
 * \f — Form feed
 * \n — New line
 * \r — Carriage return
 * \t — Horizontal tabulator
 * \v — Vertical tabulator
 * @param name
 */
export function escape(name: string) {
  return name
    .replace(/[\b]/g, `\\b`)
    .replace(/[\f]/g, `\\f`)
    .replace(/[\n]/g, ``)
    .replace(/[\r]/g, `\\r`)
    .replace(/[\t]/g, `\\t`)
    .replace(/[\v]/g, `\\v`);
}

// make the name string safe to use.
function makeNameSafe(name = "", regex: RegExp) {
  name = escape(name);
  // * First find the unsafe characters from the string - returns an array of unsafe characters (including consequtive chars) ex: ["*&^", "+", "<>"]
  // * taken from here: https://stackoverflow.com/a/20541853
  const unsafeCharSetArr = name.split(regex).reduce((prev: string[], curr: string) => {
    if(curr) {
      prev.push(curr);
    }
    return prev;
  }, []);

  // * loop over all items and replace with `_` (underscore)
  for(const unsafeCharStr of unsafeCharSetArr) {
    // global flag not required here since multiple occurences are returned separately. Ex +abc+ return -> [+, +]
    name = name.replace(unsafeCharStr, "_");
  }
  return name;
}

/**
 * All makeNameSafeRestriction* functions follow the level pattern
 * 1 -> 3 signifies increasing number of restrictions.
 */

// safe name set according to: https://docs.google.com/document/d/18vQN_rS2zasDKUZ_efwXhxKEukLKRCRoQVqn8tv8g8A/edit#
export const safeNameRegexL1 = /[a-zA-Z0-9-_.'()\s,+\[\]:*&<>~]/g;
export const safeNameRegexL2 = /[a-zA-Z0-9-_.'()\s,]/g;
export const safeNameRegexL3 = /[a-zA-Z0-9_-]/g;

/**
 * Least strict, used for project/scene/element names
 * @param name
 */
export function makeNameSafeL1(name: string) {
  return makeNameSafe(name.trim(), safeNameRegexL1);
}

/**
 * Medium strict, used for file/folder names + variable names
 * @param name
 */
export function makeNameSafeL2(name: string) {
  return makeNameSafe(name.trim(), safeNameRegexL2);
}

/**
 * Most strict, used for slugs
 * @param name
 */
export function makeNameSafeL3(name: string) {
  return makeNameSafe(name.trim(), safeNameRegexL3);
}

const nameSeriesExtractorRegex = {
  // *? makes the first part not greedy
  // (?:xxxx)? in the second part after the base makes the second part optional
  // used to match patterns like Hello (123)
  regex: /^(.*?)(?:\s\((\d+)\))?$/,
  errorMessage: "no name series found"
};

export function makeNameUnique(originalName: string, existingNames: string[]) {
  if (!existingNames.includes(originalName)) {
    return originalName;
  }
  const res = nameSeriesExtractorRegex.regex.exec(originalName);
  const seriesBase = res?.[1] ?? originalName;
  const sameSeriesInExistingNames = existingNames.filter(u => u.startsWith(seriesBase)); //filter existingNames
  const series = sameSeriesInExistingNames.map(currName => {
    const matchedGroups = nameSeriesExtractorRegex.regex.exec(currName);
    return parseInt(matchedGroups?.[2] ?? "0");
  });
  let maxInSeries = series.reduce((a, b) => a >= b ? a : b);
  if (maxInSeries === undefined) {
    maxInSeries = 0;
  }
  return `${seriesBase} (${maxInSeries + 1})`;
}