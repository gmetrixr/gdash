import { expect } from "chai";
import { pathUtils } from "../src/index";

describe("jsutils test", () => {
  it("check file type", () => {
    const file = pathUtils.getFileType("https://www.online-image-editor.com/styles/2019/images/power_girl_editor.png");
    expect(file).to.be.deep.equal(pathUtils.FileType.IMAGE);
  });

  it("get extension", () => {
    const file = pathUtils.getExtension("https://www.online-image-editor.com/styles/2019/images/power_girl_editor.png");
    expect(file).to.be.deep.equal("png");
  })
});
  