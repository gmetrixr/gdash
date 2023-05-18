import { v4 as uuidv4 } from "uuid";
import mustache from "mustache";
import clone from "rfdc";

/**
 * Value is true if the code is being executed in a browser window
 */
export const isWindow = !(typeof window === "undefined");

/**
 * Used to specify expiry times in a convenient way
 * @type {number}
 */
export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

/**
 * https://github.com/uuidjs/uuid#quickstart
 * Generates a Random UUID
 * 
 */
export const generateRandomUUID = (): string => {
  return uuidv4();
};

/**
 * Standard templating function using mustache
 * Eg: template: "{{title}} spends {{calc}}" with value {title: "abc", calc: 2} renders the string "abc spends 2"
 * Use tripple brackets {{{ }}} to prevent escaping HTML
 */
export const renderTemplate = (template: string, view: unknown): string => {
  return mustache.render(template, view);
};

/**
 * Convert a `Map` to a standard JS object.
 * https://gist.github.com/davemackintosh/3b9c446e8681f7bbe7c5
 *
 * @param {Map} map to convert.
 * @returns {unknown} converted object.
 */
export const mapToObject = <T>(map: Map<T, unknown>): unknown => {
  const out = Object.create(null);
  map.forEach((value, key) => {
    out[key] = value;
  });
  return out;
};

/**
 * Date.now() gives an output like 1602018008290 (13 digits)
 * The last three digits represent milliseconds.
 * Overlaps using a simple Date.now() happen when two ids generated in the same millisecond.
 * So, add a random value.
 * IF we add (Math.random() * 1000), 3 random digits get added and chances of overlap reduce to 1 in 1000
 * IF we add (Math.random() * 1000000). 6 random digits get added and chances of overlap reduce to 1 in 10^6
 */
export const generateId = (): number => Math.floor(Date.now() + (Math.random() * 1000000));

/**
 * JS integers (without period) are accurate upto 15 digits
 * So generateIdV2 returns a 15 digit integer
 * Math.random() returns a random number between 0 (inclusive),  and 1 (exclusive)
 * the output is 0.xxxx (16 decimal places)
 * So Math.random() * 0.9e16 is a max of 899... 15 integer digits, 1 decimal digit.
 * Adding 0.1e16 ensures the first digit isn't 0. Math.floor removes the decimal digit.
 * So, we are guranteed a 15 digit integer between 1^15 (inclusive) and 1^16 (exclusive)
 */
export const generateIdV2 = (): number => Math.floor(Math.random() * 0.9e16 + 0.1e16);

/**
 * Set operations, from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 */
export const isSuperset = <T>(set: Set<T>, subset: Set<T>): boolean => {
  for (const elem of Array.from(subset)) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
};

export const union = <T>(setA: Set<T>, setB: Set<T>): Set<T> => {
  const _union = new Set(setA);
  for (const elem of Array.from(setB)) {
    _union.add(elem);
  }
  return _union;
};

/**
 * SetA is usually the ordered set, setB is the unordered set
 * In this case, the _intersection set created inside this function must respect the order of ordered setA
 */
export const intersection = <T>(setA: Set<T>, setB: Set<T>): Set<T> => {
  const _intersection = new Set<T>();
  for (const elem of Array.from(setA)) {
    if (setB.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
};

export const difference = <T>(setA: Set<T>, setB: Set<T>): Set<T> => {
  const _difference = new Set(setA);
  for (const elem of Array.from(setB)) {
    _difference.delete(elem);
  }
  return _difference;
};

/**
 * NOTE: In set theory, order isn't maintained. In JS Sets, order is maintained.
 *
 * Given orderedKeys for any map,
 * Between orderedKeys and presentKeys (keys in actual map), ensure that
 * orderedKeys.size === presentKeys.size === (orderedKeys ∩ presentKeys).size
 *
 * Else
 * orderedKeys = (orderedKeys ∩ presentKeys) ∪ (presentKeys - orderedKeys)
 *
 * @param orderedKeys
 * @param presentKeys
 */
export const sanitizeOrderedKeysWithActualKeys = <T>(orderedKeys: Set<T>, presentKeys: Set<T>): Set<T> => {
  if(!((orderedKeys.size === presentKeys.size) && (orderedKeys.size === intersection(orderedKeys, presentKeys).size))) {
    orderedKeys = union(intersection(orderedKeys, presentKeys), difference(presentKeys, orderedKeys));
  }
  return orderedKeys;
};

/**
 * Takes a map and an array of keys as an input.
 * Returns an array of values of the map, in the same order as the corresponding keys
 */
export function mapValuesToOrder<T>(map: {[key: string]: T}, order: number[] = []): T[] {
  const arr: T[] = [];
  for(const k of order) {
    const v = map[k];
    if(v !== undefined) {
      arr.push(v);
    }
  }
  return arr;
}

/**
 * This is the same as ensureDefined. But in the form of an assert.
 * 
 * Shortcut method to do a quick not(null or undefined) asset in Typescript
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions
 * Note: Asserts don't work as arrow functions. Need to define them as normal functions. (for now)
 * https://github.com/microsoft/TypeScript/issues/36931
 * Also suffereing from: https://github.com/microsoft/TypeScript/issues/36067
 */
export const assertIsDefined = function <T>(val: T, message?: string): asserts val is NonNullable<T> {
  if(val === undefined || val === null) {
    throw (message ?? `Expected 'val' to be defined, but received ${val}`);
  }
}

/**
 * Returns the same argument that is passed to it, but with type restriction of not being null or undefined
 * Use this when you want to throw an error in case the value passed is null or undefined
 */
export const ensureDefined = <T>(arg: T | null | void, customErrorMessage?: string): NonNullable<T> => {
  if(arg !== null && arg !== undefined) {
    return <NonNullable<T>> arg;
  }

  if(customErrorMessage) {
    throw new Error(customErrorMessage);
  }

  throw new Error(`arg not of required type. Current type is ${typeof arg}`);
};

/**
 * There is no (! of ??) operator. So this function allows us to do that.
 * Can use this to get the reverse of Nullish Coaleasing operator.
 * input ?? "default_value"  //returns default_value if input is null or undefined
 * isNotNullish(input) && "replacement_value" //returns replacement_value if input is NOT null or undefined
 * 
 * Note that the simple || operator doesn't work here because:
 * input && "replacement_value" //will fail and not return replacement_value if input = 0 (falsy)
 */
export const isNotNullish = <T>(arg: T | null | void): boolean => {
  if(arg !== null && arg !== undefined) {
    return true;
  }
  return false;
};

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

export const deepCloneStringify = <T>(node: T): T => JSON.parse(JSON.stringify(node));

const cloneConfigured = clone({proto: true, circles: false});
export const deepCloneRfdc = <T>(node: T): T => cloneConfigured(node);

export const deepClone = deepCloneRfdc;
