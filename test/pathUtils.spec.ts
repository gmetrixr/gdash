import { expect, describe, xdescribe, beforeAll, afterAll, it, xit, afterEach } from "@jest/globals";
import { pathUtils } from "../src/index.js";

describe("jsutils test", () => {
  it("check file type", () => {
    const file = pathUtils.getFileType("https://www.online-image-editor.com/styles/2019/images/power_girl_editor.png");
    expect(file).toBe(pathUtils.FileType.IMAGE);
  });

  it("get extension", () => {
    const file = pathUtils.getExtension("https://www.online-image-editor.com/styles/2019/images/power_girl_editor.png");
    expect(file).toBe("png");
  })
});
  