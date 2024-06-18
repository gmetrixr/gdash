import { expect, describe, xdescribe, beforeAll, afterAll, it, xit, afterEach } from "@jest/globals";
import { jsUtils } from "../src/index.js";
import largeJson from "./jsons/largeProject.json";
const { deepCloneStructured, deepCloneRfdc, deepCloneStringify } = jsUtils;
import { performance } from "perf_hooks";
import { sampleSize } from "../src/namespaces/stringUtils.js";

describe("uuid Test", () => {

  it("should see if string created by uuid is of a certain length", () => {
    const id = jsUtils.generateRandomUUID();
    expect(id.length).toBe(36);
  });

  it("should deepClone 50 times", () => {
    let t1, t2, finalJson;
    
    t1 = performance.now();
    for(let i = 0; i < 50; i++) {
      finalJson = deepCloneStringify(largeJson);
    }
    t2 = performance.now();
    expect(JSON.stringify(finalJson)).toBe(JSON.stringify(largeJson));
    console.log(`Time taken by deepCloneStringify is ${t2 - t1} milliseconds`);

    t1 = performance.now();
    for(let i = 0; i < 50; i++) {
      finalJson = deepCloneRfdc(largeJson);
    }
    t2 = performance.now();
    expect(JSON.stringify(finalJson)).toBe(JSON.stringify(largeJson));
    console.log(`Time taken by deepCloneRfdc is ${t2 - t1} milliseconds`);

    t1 = performance.now();
    for(let i = 0; i < 50; i++) {
      finalJson = deepCloneStructured(largeJson);
    }
    t2 = performance.now();
    expect(JSON.stringify(finalJson)).toBe(JSON.stringify(largeJson));
    console.log(`Time taken by deepCloneStructured is ${t2 - t1} milliseconds`);

  }, 20000);

  it("should template the string", () => {
    const templatedName = jsUtils.renderTemplate("lorem ipsum {{rep}}", {rep: "dolor"});
    expect(templatedName).toBe("lorem ipsum dolor");
  });

  it("should select random sample from input array", () => {
    const inputArray = ["Sahil", "Vivek", "Amit", 1, 2, 3];
    const randomSample = sampleSize(inputArray, 4);
    console.log(randomSample);
    expect(randomSample.length).toBe(4);
  });
});

