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

  it("should see if getSafeName works test 1", () => {
    try {
      const res = jsUtils.getSafeName("xyz", ["abc", "abc_(2)", "abc (3)"]);
    }
    catch (e) {
      expect((e as any).code).to.eq("ERR_ASSERTION");
    }
  })

  it("should see if getSafeName works test 1", () => {
    const res = jsUtils.getSafeName("abc", ["abc", "abc (3)", "xyc"]);
    expect(res).to.eq("abc (4)");
  })

  it("should see if getSafeName works test 2", () => {
    const res = jsUtils.getSafeName("abc", ["abc", "abc (2)", "abc (2) (1)", "abc (2) (2)", "abc (3)"]);
    expect(res).to.eq("abc (4)");
  })

  it("should see if getSafeName works test 3", () => {
    const res = jsUtils.getSafeName("abc_(2)", ["abc", "abc_(2)", "abc (3)"]);
    expect(res).to.eq("abc_(2) (1)");
  })

  it("should see if getSafeName works test 4", () => {
    const res = jsUtils.getSafeName("360_york_castle_museum034 Panorama (Custom)", [
      "360_york_castle_museum034 Panorama (Custom)",
      "360_york_castle_museum034 Panorama (Custom) (1)"
    ]);
    expect(res).to.eq("360_york_castle_museum034 Panorama (Custom) (2)");
  })

  it("should see if getSafeNameForFilename works test 1", () => {
    const res = jsUtils.getSafeNameForFilename("abc.png", ["abc.png", "abc (3).png", "xyc.png"]);
    expect(res).to.eq("abc (4).png");
  })

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

describe("safe slug test", () => {

  it("should see if getSafeSlug works test 1", () => {
    try {
      const res = jsUtils.getSafeSlug("xyz", ["abc", "abc_(2)", "abc (3)"]);
    }
    catch (e) {
      expect((e as any).code).to.eq("ERR_ASSERTION");
    }
  });

  it("should see if getSafeSlug works test 1", () => {
    const res = jsUtils.getSafeSlug("abc", ["abc_2", "abc_1", "xyc"]);
    expect(res).to.eq("abc");
  });

  it("should see if getSafeSlug works test 2", () => {
    const res = jsUtils.getSafeSlug("abc", ["abc", "abc_1", "abc_2_1", "abc_2_2", "abc_3"]);
    expect(res).to.eq("abc_4");
  });

  it("should see if getSafeSlug works test 3", () => {
    const res = jsUtils.getSafeSlug("abc_2", ["abc", "abc_2", "abc_3"]);
    expect(res).to.eq("abc_4");
  });

  it("should see if getSafeSlug works test 4", () => {
    const res = jsUtils.getSafeSlug("360_york_castle_museum034 Panorama_Custom", [
      "360_york_castle_museum034 Panorama_Custom",
      "360_york_castle_museum034 Panorama_Custom_1"
    ]);
    expect(res).to.eq("360_york_castle_museum034 Panorama_Custom_2");
  });
})