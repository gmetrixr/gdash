import { expect } from "chai";
import { jsUtils } from "../src/index";
import largeJson from "./jsons/largeProject.json";
const { deepCloneRfdc, deepCloneStringify } = jsUtils;
import { performance } from "perf_hooks";

describe("uuid Test", () => {

  it("should see if string created by uuid is of a certain length", () => {
    const id = jsUtils.generateRandomUUID();
    expect(id.length).to.eq(36);
  });

  it("should deepClone 50 times", () => {
    let t1, t2, finalJson;
    
    t1 = performance.now();
    for(let i = 0; i < 50; i++) {
      finalJson = deepCloneStringify(largeJson);
    }
    t2 = performance.now();
    expect(JSON.stringify(finalJson)).to.be.equal(JSON.stringify(largeJson));
    console.log(`Time taken by deepCloneStringify is ${t2 - t1} milliseconds`);

    t1 = performance.now();
    for(let i = 0; i < 50; i++) {
      finalJson = deepCloneRfdc(largeJson);
    }
    t2 = performance.now();
    expect(JSON.stringify(finalJson)).to.be.equal(JSON.stringify(largeJson));
    console.log(`Time taken by deepCloneRfdc is ${t2 - t1} milliseconds`);

  }).timeout(20000);

  it("should template the string", () => {
    const templatedName = jsUtils.renderTemplate("lorem ipsum {{rep}}", {rep: "dolor"});
    expect(templatedName).to.eq("lorem ipsum dolor");
  });
});

