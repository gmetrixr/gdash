import { expect, describe, xdescribe, beforeAll, afterAll, it, xit, afterEach } from "@jest/globals";
import { Config } from "../src/namespaces/config.js";
import { PropertyValue } from "../src/namespaces/config.js";

describe("Console log test", () => {
  it("Logs console", () => {
    console.log("hi there!");
  });
});

describe("Config", () => {
  it("should try config on server", () => {
    enum properties {
      PUBLIC_IS_PRIVATE_INSTALLATION = "PUBLIC_IS_PRIVATE_INSTALLATION",
      PUBLIC_IS_ENTERPRISE = "PUBLIC_IS_ENTERPRISE",
      FOLDER_ROOT = "FOLDER_ROOT",
      PORT_EXPRESS = "PORT_EXPRESS",
      TEAXR_PG_URL = "TEAXR_PG_URL",
      PUBLIC_SKETCHFAB_TOKEN = "PUBLIC_SKETCHFAB_TOKEN",
    }

    //Needed only in server. Use within if(!isWindow) in prod
    const propertyDefaults: {[key in properties]?: PropertyValue} = {
      PUBLIC_IS_PRIVATE_INSTALLATION: true,
      PUBLIC_IS_ENTERPRISE: false,
      PORT_EXPRESS: 3249,
      TEAXR_PG_URL: "pg://user@pass:hostname/dbname",
      PUBLIC_SKETCHFAB_TOKEN: "abcdef",
    }

    process.env[properties.FOLDER_ROOT] = "/src";

    const config = new Config({properties: Object.values(properties), propertyDefaults});

    expect(config.get(properties.PUBLIC_IS_PRIVATE_INSTALLATION)).toBe(true);
    expect(config.get(properties.PORT_EXPRESS)).toBe(3249);
    expect(config.getWindowConfigJSONString()).toBe("{\"PUBLIC_IS_PRIVATE_INSTALLATION\":true,\"PUBLIC_IS_ENTERPRISE\":false,\"PUBLIC_SKETCHFAB_TOKEN\":\"abcdef\"}");
  });

  it("should try config on window", () => {
    enum properties {
      PUBLIC_IS_PRIVATE_INSTALLATION = "PUBLIC_IS_PRIVATE_INSTALLATION",
      PUBLIC_IS_ENTERPRISE = "PUBLIC_IS_ENTERPRISE",
      FOLDER_ROOT = "FOLDER_ROOT",
      PORT_EXPRESS = "PORT_EXPRESS",
      TEAXR_PG_URL = "TEAXR_PG_URL",
      PUBLIC_SKETCHFAB_TOKEN = "PUBLIC_SKETCHFAB_TOKEN",
    }

    //emulate window
    // @ts-ignore
    global.window = {windowConfig: {"PUBLIC_IS_PRIVATE_INSTALLATION":true,"PUBLIC_IS_ENTERPRISE":false,"PUBLIC_SKETCHFAB_TOKEN":"abcdef"}};

    const config = new Config({properties: Object.values(properties), isWindowOverride: true});
    expect(config.get(properties.PUBLIC_IS_PRIVATE_INSTALLATION)).toBe(true);
    expect(config.get(properties.PUBLIC_IS_ENTERPRISE)).toBe(false);
    expect(config.get(properties.PUBLIC_SKETCHFAB_TOKEN)).toBe("abcdef");
  });

  it("should handle automatic boolean converion of unix shell vars", () => {
    enum properties {
      IS_BOOLEAN_TRUE = "IS_BOOLEAN_TRUE",
      IS_BOOLEAN_FALSE = "IS_BOOLEAN_FALSE",
    }

    process.env[properties.IS_BOOLEAN_TRUE] = "true";
    process.env[properties.IS_BOOLEAN_FALSE] = "false";

    const config = new Config({properties: Object.values(properties)});
    expect(config.get(properties.IS_BOOLEAN_TRUE)).toBe(true);
    expect(config.get(properties.IS_BOOLEAN_FALSE)).toBe(false);
  });

  it("should not convert string boolens in window env", () => {
    enum properties {
      PUBLIC_FALSE_BOOLEAN = "PUBLIC_FALSE_BOOLEAN",
    }

    //emulate window
    // @ts-ignore
    global.window = {windowConfig: {"PUBLIC_FALSE_BOOLEAN":"false"}};

    const config = new Config({properties: Object.values(properties), isWindowOverride: true});
    expect(config.get(properties.PUBLIC_FALSE_BOOLEAN)).toBe("false");
  });

  it("should handle string templating on config properties", () => {
    enum properties {
      CDN_BASE = "CDN_BASE",
      PORT_EXPRESS = "PORT_EXPRESS",
      PORT_WEBPACK = "PORT_WEBPACK",
      CDN_STATIC = "CDN_STATIC",
      PUBLIC_CDN_WEBPACK = "PUBLIC_CDN_WEBPACK",
      PUBLIC_GEOLOCATE_API_KEY = "PUBLIC_GEOLOCATE_API_KEY",
    }

    //Needed only in server. Use within if(!isWindow) in prod
    const propertyDefaults: {[key in properties]?: PropertyValue} = {
      CDN_BASE: "http://localhost",
      PORT_EXPRESS: 3650,
      PORT_WEBPACK: 3652,
      CDN_STATIC: "{{{CDN_BASE}}}:{{PORT_EXPRESS}}/localcloud",
      PUBLIC_CDN_WEBPACK: "{{{CDN_BASE}}}:{{PORT_WEBPACK}}/web/",
      PUBLIC_GEOLOCATE_API_KEY: "abcdef",
    }

    const config = new Config({properties: Object.values(properties), propertyDefaults});

    expect(config.get(properties.CDN_BASE)).toBe("http://localhost");
    expect(config.get(properties.CDN_STATIC)).toBe("http://localhost:3650/localcloud");
    expect(config.get(properties.PUBLIC_CDN_WEBPACK)).toBe("http://localhost:3652/web/");
    expect(config.getWindowConfigJSONString()).toBe("{\"PUBLIC_CDN_WEBPACK\":\"http://localhost:3652/web/\",\"PUBLIC_GEOLOCATE_API_KEY\":\"abcdef\"}");
  });

});
