import { expect } from "chai";
import { stringUtils } from "../src/index";

describe("stringUtils test", () => {
  it("should correct unsafe names for project/scene/element names", () => {
    const str1 = "new\folder";
    const str2 = "new/folder*image";
    const str5 = "This is-a{big}_[string] that don't work";
    const str6 = "This is-a{big}_[string] \that \n don't \vork";
    const str8 = "_new_element";
    const str9 = " new_element";
    const str10 = " new#element_123 ";

    expect(stringUtils.makeNameSafeL1(str1)).to.be.eq("new_folder");
    expect(stringUtils.makeNameSafeL1(str2)).to.be.eq("new_folder*image");
    expect(stringUtils.makeNameSafeL1(str5)).to.be.eq("This is-a_big__[string] that don't work");
    expect(stringUtils.makeNameSafeL1(str6)).to.be.eq("This is-a_big__[string] _that  don't _vork");
    expect(stringUtils.makeNameSafeL1(str8)).to.be.eq("_new_element");
    expect(stringUtils.makeNameSafeL1(str9)).to.be.eq("new_element");
    expect(stringUtils.makeNameSafeL1(str10)).to.be.eq("new_element_123");
  });

  it("should correct unsafe names for file/folder names", () => {
    const str1 = "new\folder";
    const str2 = "new/folder*image";
    const str3 = "360_york_castle_museum034%20Panorama%20(Custom)";
    const str4 = `"Screen-Recording-2021-"11-05-at-9.07.37-PM"`;
    const str5 = "This is-a{big}_[string] that don't work";
    const str6 = "This is-a{big}_[string] \that \n don't \vork";
    const str7 = `{ "patches": [ { "op": "replace", "path": [ "records", "element", "map", "1636642488165", "props", "source" ], "value": { "file_urls": { "o": "https://u.vrgmetri.com/gb-sms-prod-1/media/2021-1/gmetri/6b68ee54-2354-4e25-bfe9-c367d5d2cf8a/o/Chocos.png" }, "name": "Chocos.png", "type": "IMAGE", "size": "7318556" } } ] }`;

    expect(stringUtils.makeNameSafeL2(str1)).to.be.eq("new_folder");
    expect(stringUtils.makeNameSafeL2(str2)).to.be.eq("new_folder_image");
    expect(stringUtils.makeNameSafeL2(str3)).to.be.eq("360_york_castle_museum034_20Panorama_20(Custom)");
    expect(stringUtils.makeNameSafeL2(str4)).to.be.eq("_Screen-Recording-2021-_11-05-at-9.07.37-PM_");
    expect(stringUtils.makeNameSafeL2(str5)).to.be.eq("This is-a_big___string_ that don't work");
    expect(stringUtils.makeNameSafeL2(str6)).to.be.eq("This is-a_big___string_ _that  don't _vork");
    expect(stringUtils.makeNameSafeL2(str7)).to.be.eq(`_ _patches_ _ _ _op_ _replace_, _path_ _ _records_, _element_, _map_, _1636642488165_, _props_, _source_ _, _value_ _ _file_urls_ _ _o_ _https_u.vrgmetri.com_gb-sms-prod-1_media_2021-1_gmetri_6b68ee54-2354-4e25-bfe9-c367d5d2cf8a_o_Chocos.png_ _, _name_ _Chocos.png_, _type_ _IMAGE_, _size_ _7318556_ _ _ _ _`);
  });

  it("should correct unsafe names for slugs", () => {
    const str1 = "new\folder";
    const str2 = "new/folder*image";
    const str3 = "360_york_castle_museum034%20Panorama%20(Custom)";
    const str4 = `"Screen-Recording-2021-"11-05-at-9.07.37-PM"`;
    const str5 = "This is-a{big}_[string] that don't work";
    const str6 = "This is-a{big}_[string] \that \n don't \vork";
    const str7 = `{ "patches": [ { "op": "replace", "path": [ "records", "element", "map", "1636642488165", "props", "source" ], "value": { "file_urls": { "o": "https://u.vrgmetri.com/gb-sms-prod-1/media/2021-1/gmetri/6b68ee54-2354-4e25-bfe9-c367d5d2cf8a/o/Chocos.png" }, "name": "Chocos.png", "type": "IMAGE", "size": "7318556" } } ] }`;

    expect(stringUtils.makeNameSafeL3(str1)).to.be.eq("new_folder");
    expect(stringUtils.makeNameSafeL3(str2)).to.be.eq("new_folder_image");
    expect(stringUtils.makeNameSafeL3(str3)).to.be.eq("360_york_castle_museum034_20Panorama_20_Custom_");
    expect(stringUtils.makeNameSafeL3(str4)).to.be.eq("_Screen-Recording-2021-_11-05-at-9_07_37-PM_");
    expect(stringUtils.makeNameSafeL3(str5)).to.be.eq("This_is-a_big___string_that_don_t_work");
    expect(stringUtils.makeNameSafeL3(str6)).to.be.eq("This_is-a_big___string_that_don_t_vork");
    expect(stringUtils.makeNameSafeL3(str7)).to.be.eq(`_patches_op_replace_path_records_element_map_1636642488165_props_source_value_file_urls_o_https_u_vrgmetri_com_gb-sms-prod-1_media_2021-1_gmetri_6b68ee54-2354-4e25-bfe9-c367d5d2cf8a_o_Chocos_png_name_Chocos_png_type_IMAGE_size_7318556_`);
  });

  it("should correct unique names", () => {
    const res1 = stringUtils.getUniqueName("abc", ["abc", "abc (3)", "xyc"]);
    expect(res1).to.eq("abc (4)");

    const res2 = stringUtils.getUniqueName("abc", ["abc", "abc (2)", "abc (2) (1)", "abc (2) (2)", "abc (3)"]);
    expect(res2).to.eq("abc (4)");

    const res3 = stringUtils.getUniqueName("abc_(2)", ["abc", "abc_(2)", "abc (3)"]);
    expect(res3).to.eq("abc_(2) (1)");

    const res4 = stringUtils.getUniqueName("360_york_castle_museum034 Panorama (Custom)", [
      "360_york_castle_museum034 Panorama (Custom)",
      "360_york_castle_museum034 Panorama (Custom) (1)",
    ]);
    expect(res4).to.eq("360_york_castle_museum034 Panorama (Custom) (2)");
  });

  it("should make a safe unique name for file", () => {
    const unsafeName = "This is-a{big}_[string] \that \n don't \vork";
    const safeName = stringUtils.makeNameSafeL2(unsafeName);
    const uniqueName = stringUtils.getUniqueName(safeName, [
      "This is-a_big___string_ _that  don't _vork",
      "This is-a_big___string_ _that  don't _vork (1)",
      "This is-a_big___string_ _that  don't _vork (4)",
    ]);
    expect(uniqueName).to.be.eq("This is-a_big___string_ _that  don't _vork (5)");
  });

  it("should check for safeNameRegexL3CheckString", () => {
    const validOrgSlug = "gmetri";
    const invalidOrgSlug = ".gmetri"
    const validDeploymentSlug = "my_metaverse_-2"
    const invalidDeploymentSlug = ".env"
    const invalidDeploymentSlug2 = "env."
    expect(new RegExp(stringUtils.safeNameRegexL3CheckString, "g").test(validOrgSlug)).to.be.eq(true)
    expect(new RegExp(stringUtils.safeNameRegexL3CheckString, "g").test(invalidOrgSlug)).to.be.eq(false)
    expect(new RegExp(stringUtils.safeNameRegexL3CheckString, "g").test(validDeploymentSlug)).to.be.eq(true)
    expect(new RegExp(stringUtils.safeNameRegexL3CheckString, "g").test(invalidDeploymentSlug)).to.be.eq(false)
    expect(new RegExp(stringUtils.safeNameRegexL3CheckString, "g").test(invalidDeploymentSlug2)).to.be.eq(false)
  });
});
  
describe("unique slug test", () => {

  it("should see if getUniqueSlug works test 1", () => {
    try {
      const res = stringUtils.getUniqueSlug("xyz", ["abc", "abc_(2)", "abc (3)"]);
    }
    catch (e) {
      expect((e as any).code).to.eq("ERR_ASSERTION");
    }
  });

  it("should see if getUniqueSlug works test 1", () => {
    const res = stringUtils.getUniqueSlug("abc", ["abc_2", "abc_1", "xyc"]);
    expect(res).to.eq("abc");
  });

  it("should see if getUniqueSlug works test 2", () => {
    const res = stringUtils.getUniqueSlug("abc", ["abc", "abc_1", "abc_2_1", "abc_2_2", "abc_3"]);
    expect(res).to.eq("abc_4");
  });

  it("should see if getUniqueSlug works test 3", () => {
    const res = stringUtils.getUniqueSlug("abc_2", ["abc", "abc_2", "abc_3"]);
    expect(res).to.eq("abc_4");
  });

  it("should see if getUniqueSlug works test 4", () => {
    const res = stringUtils.getUniqueSlug("360_york_castle_museum034 Panorama_Custom", [
      "360_york_castle_museum034 Panorama_Custom",
      "360_york_castle_museum034 Panorama_Custom_1"
    ]);
    expect(res).to.eq("360_york_castle_museum034 Panorama_Custom_2");
  });
})

describe("unique name test", () => {

  it("should see if getUniqueName works test 1", () => {
    try {
      const res = stringUtils.getUniqueName("xyz", ["abc", "abc_(2)", "abc (3)"]);
    }
    catch (e) {
      expect((e as any).code).to.eq("ERR_ASSERTION");
    }
  })

  it("should see if getUniqueName works test 1", () => {
    const res = stringUtils.getUniqueName("abc", ["abc", "abc (3)", "xyc"]);
    expect(res).to.eq("abc (4)");
  })

  it("should see if getUniqueName works test 2", () => {
    const res = stringUtils.getUniqueName("abc", ["abc", "abc (2)", "abc (2) (1)", "abc (2) (2)", "abc (3)"]);
    expect(res).to.eq("abc (4)");
  })

  it("should see if getUniqueName works test 3", () => {
    const res = stringUtils.getUniqueName("abc_(2)", ["abc", "abc_(2)", "abc (3)"]);
    expect(res).to.eq("abc_(2) (1)");
  })

  it("should see if getUniqueName works test 4", () => {
    const res = stringUtils.getUniqueName("360_york_castle_museum034 Panorama (Custom)", [
      "360_york_castle_museum034 Panorama (Custom)",
      "360_york_castle_museum034 Panorama (Custom) (1)"
    ]);
    expect(res).to.eq("360_york_castle_museum034 Panorama (Custom) (2)");
  })

  it("should see if getUniqueNameForFilename works test 1", () => {
    const res = stringUtils.getUniqueNameForFilename("abc.png", ["abc.png", "abc (3).png", "xyc.png"]);
    expect(res).to.eq("abc (4).png");
  })
});
