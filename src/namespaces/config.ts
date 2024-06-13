/**
 * Requirements:
 * - Needs to allow getting config variables in an easy manner, also needs to verify that 
 * the config being asked for is already defined (or throw error otherwise)
 * - Ability to expose vars to window from server
 * - We want users of this file to be able to `import config from ..` and immediately be able to
 * use this by config.get("property name")
 * - Ideally "property name" above should be selected from a dropdown list (strongly typed)
 * rather than being a simple string with no auto-complete. (To reduce runtime errors)
 * 
 * Possible solution:
 * Make one enum properties and one arry of PropertyOptions - 
 * 1. properties (exported): This will be used everywhere in the codebase
 * 2. All properties starting with the name "PUBLIC_" will all get exposed to window (client side)
 * 3. propertyDefaults (not exported): All keys here should be already present in properties,
 *    this map is used to specify all other properties of that property
 */

import { renderTemplate, mapToObject } from "./jsUtils.js";
import { isWindow, getEnvValue } from "./envUtils.js";

export type PropertyValue = string|number|boolean|undefined;
export type PropertyLabel = string;
//Can't do PropertyObject = {[propertyLabel: propertyLabel]: PropertyValue} as index signatures can only be strings or number, not aliases
export type PropertyObject = {[propertyLabel: string]: PropertyValue};

/**
 * Check test cases for detailed usage
 * 
 * Usage Notes:
 * - Use only "properties" in the code base after the inital setup
 * - There will be one import whereever config is used:
 *      import {config, properties} from "dev/config"
 *      //to be able to use as
 *      config.get(properties.CDN_PREFIX)
 * - In dev/config.ts, we need to:
 *   1. import {config} from "@gdash/config"
 *   2. define properties enum (exported)
 *   3. define propertyDefaults (a map of default values) (NOT exported)
 *   4. Initialize config
 * - Handles automatic conversion of booleans from unix env vars
 */
export class Config {
  private initialized = false;
  /** Saved in here instead of using imported value to allow for overrding while testing */
  private isWindow: boolean; 
  private windowConfigJSONString = "";
  private pValues: Map<PropertyLabel, PropertyValue> = new Map();

  constructor({properties, propertyDefaults, isWindowOverride = isWindow}: 
    {properties: PropertyLabel[], propertyDefaults?: PropertyObject, isWindowOverride?: boolean}
  ) {
    this.isWindow = isWindowOverride;
    properties.forEach(pl => {
      //ignore non public values in window mode
      if(this.isWindow && !this.isExposedProperty(pl))
        return;
      this.pValues.set(pl, this.getInitialValue(pl, propertyDefaults))
    });
    //cache windowConfigString;
    if(!this.isWindow)
      this.getWindowConfigJSONString();
    this.initialized = true;
  }

  get(label: string): PropertyValue {
    this.verifyInitialized();
    return this.pValues.get(label);
  }

  private isExposedProperty = (pl: PropertyLabel) => pl.startsWith("PUBLIC_");

  /**
   * Returns a string (serialized JSON) To be put in the window in a variable named windowConfig
   */
  getWindowConfigJSONString(): string {
    if(!this.windowConfigJSONString) {
      const windowConfig: PropertyObject = {};
      this.pValues.forEach((pv, pl) => {
        if(this.isExposedProperty(pl))
          windowConfig[pl] = pv;
      })
      this.windowConfigJSONString = JSON.stringify(windowConfig);
    }
    return this.windowConfigJSONString;
  }

  private verifyInitialized(): void {
    if (!this.initialized)
      throw new Error("ConfigNotInitliazed");
  }

  /**
   * Get the initial value for the property
   * 1. if in window, use window value
   * 2.1. else try to use env vars OR
   * 2.2. else use default value
   * 3. else throw error
   */
  private getInitialValue(propertyLabel: PropertyLabel, propertyDefaults?: PropertyObject): PropertyValue {
    let value: PropertyValue;
    value = getEnvValue(propertyLabel, this.isWindow);
    if(value === undefined && !this.isWindow) { //peek into defaults ONLY if we are not in window
      if (propertyDefaults && propertyLabel in propertyDefaults) {
        value = propertyDefaults[propertyLabel];
      }
    }

    if(value === undefined)
      throw new Error(`Value for property ${propertyLabel} not defined`);
    if(typeof value === "string")
      value = renderTemplate(value, mapToObject(this.pValues));
    
    return value;
  }
}
