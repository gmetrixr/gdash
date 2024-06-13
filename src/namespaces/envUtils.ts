
export type PropertyValue = string|number|boolean|undefined;
export type PropertyLabel = string;
//Can't do PropertyObject = {[propertyLabel: propertyLabel]: PropertyValue} as index signatures can only be strings or number, not aliases
export type PropertyObject = {[propertyLabel: string]: PropertyValue};

/**
 * Value is true if the code is being executed in a browser window
 */
export const isWindow = !(typeof window === "undefined");

export const getEnvValue = (propertyLabel: PropertyLabel, isWindowOverride = isWindow): PropertyValue => {
  let value: PropertyValue;
  if(isWindowOverride) { //Don't allow reading propertyDefaults or process.env in case we are inWindow
    /* eslint-disable @typescript-eslint/no-explicit-any */
    if((<any>window).windowConfig && propertyLabel in (<any>window).windowConfig) {
      value = (<any>window).windowConfig[propertyLabel];
    }
  } else {
    if (process && process.env && process.env[propertyLabel]) {
      value = process.env[propertyLabel];
      //Convert strings "true" and "false" to booleans (unix shell environment variables don"t support booleans)
      if(value === "false")
        value = false;
      if(value === "true")
        value = true;
    }
  }
  return value;
}

const NAMESPACE = getEnvValue("PUBLIC_NAMESPACE");
export const IS_LOCAL = NAMESPACE === "local";
export const IS_PROD = NAMESPACE === "prod";
