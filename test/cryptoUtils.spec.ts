import { cryptoUtils } from "../src/index.js";
import { expect, describe, xdescribe, beforeAll, afterAll, it, xit, afterEach } from "@jest/globals";

describe("cryptoUtitls rsa encrypt/decrypt test", () => {
  it("encrypt and decrypt correctly", async () => {
    const value = "test";
    const enc = await cryptoUtils.encryptRSA({
      data: value,
      pemEncodedPublicKey: publicKey
    })
    console.log("Encrypted Value:", enc);

    const dec = await cryptoUtils.decryptRSA({
      dataInBase64: enc,
      pemEncodedPPrivateKey: privateKey
    })

    console.log("Decrypted Value:", dec);
    expect(dec).toEqual(value);
  });
});


describe("cryptoUtitls AES encrypt/decrypt test", () => {
  it("encrypt and decrypt correctly", async () => {
    const key = "hello1234asdf5678";
    const data = `test123`;
    const enc = await cryptoUtils.encrytpAES({ data, key });
    console.log("Encrypted Value:", enc);

    const dec = await cryptoUtils.decryptAES({ data: enc, key });

    console.log("Decrypted Value:", dec);
    expect(dec).toEqual(data);
  });
});
  

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7wB+YBnmzGSsiIE2USc+
PRRQwMe6+GhOqL4JwEhO0QN9Sh/Z8fsfA1GDU4EUlbXM6NkGarA4vDh0jSJZrpT4
U4LUaWepDyLlFq0DVfwObh/yU/mIqknchYwDO/kpDiUzJj6zZ1hDiNqdImtPcBjo
9jFT8K1yTt0y3mCUVcOf62UyJysaKa7lB762BH+/KqNpW/w0DOjt+zQv5IyXDmRp
kM4eyCRS1ZGi0i1tfODYk2kjbpp8G6a6z9Qo1vmgqj8w2bvFyRRXYv68EOYeRhPK
jUR0J+7lwG93UJZdTly494XCxQkcO1ncsJd9rCTD1vipWerSmXLB8t/Teh1R2jpo
tQIDAQAB
-----END PUBLIC KEY-----`;

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDvAH5gGebMZKyI
gTZRJz49FFDAx7r4aE6ovgnASE7RA31KH9nx+x8DUYNTgRSVtczo2QZqsDi8OHSN
IlmulPhTgtRpZ6kPIuUWrQNV/A5uH/JT+YiqSdyFjAM7+SkOJTMmPrNnWEOI2p0i
a09wGOj2MVPwrXJO3TLeYJRVw5/rZTInKxopruUHvrYEf78qo2lb/DQM6O37NC/k
jJcOZGmQzh7IJFLVkaLSLW184NiTaSNumnwbprrP1CjW+aCqPzDZu8XJFFdi/rwQ
5h5GE8qNRHQn7uXAb3dQll1OXLj3hcLFCRw7Wdywl32sJMPW+KlZ6tKZcsHy39N6
HVHaOmi1AgMBAAECggEANOYlkoy5Fk1EGNSMmqq2blt0Qi8S9Y9UtamWS+5VL5L3
pLPnD9WWuCvPBuj/juFV0MXUU0Hc1OAj/+b19Zu4WPeQnyHX++cr0HiLz/jBkuNU
RfzpoFNH0XE7eAc+bIiUSSdAmyOgkwZcGDWrN/LzgSZK327saYMxEqJKwq7RUw69
6fBt+5YjRQQC+3w74R7HydCETctzadt+eGFNp4tvVk18jL4Yn2CoMxVFFLsRvLxc
cPPBvhZ/phXGIr6aJmvtbro0BGFJ3y6JEwYzwbBduqXrmbfG0SERcNhwgQe8gYSU
9bqxFkbRXyMw0W9ACK6TE74LgIwszjNj9xLh3E1+IQKBgQD5u3STFMx8u3WtUNIt
vQpBDfKrCTiKohY7ktLx1eJzzEDKn9p9Yg7OE5Hij0siTRrtoaO9UDzJMG84hoyX
gFJZEdeUJf56MvGZMViPZBZoDrJImXwHTEVGc43glH6YHwogTPX86Hqt4MJem178
pPBr7+8521HcWQTddkDsQFwvsQKBgQD1ABhoUetm3+RnA/CAmBNJWZUxwTztlUzJ
o3xaA7Fo+QzyjqfkzAoqwk40Q+Rc7sIs2OrNexml3XTfFIFQ1XVLb/kcokbp3B3l
03w/tG2WHa/ggPwurTTrf2I0tkNeP8BgOFEf7KCE8i8loypdvPfJdTkEksEV/IrK
NA/F03vuRQKBgGpbOmeVeQ06LQDWJd0S4HYaQZo0AB+SrlNK0YnrJFlayNFCySOT
CmkbjorlqgL+wZQovfpXXLv2Y7e4HdI79VY3sg9HKxzR63DpwiS3ZI+Gisk+jMLy
6aH6fpcBxvR0a7Sb8jt2qyC4Uy9Fjmuct0PQ2JpUXIWyZ88FmNrFAj3RAoGBAKI3
4vFHtGbUPcXbvOVYTATYFMnx2aaxoTstTUvIgDIyHNmJjS8Xzm+LYf6HKXBDAjxx
j95n8I57OEPwrsLX4ycEx9umsu9rODyRMAZ6L8kidO5gWRmKw6xeFqcyOx7vdTAA
ee56XbpJJOB1zbptQV+Zhxw5EzG8miTSHdNtePRFAoGANkMP/TNmf30gzsIlosIg
bq+8/UKY/7Z0moYEqahhNegfPGZ203SU6x1eT2R4Mb/HX2ztQCCFQ2vDTgb6ZqJo
0OdOK9VQRqguFyiYKKULOlLtgvJ3FbTjYUyEPtaBxe9TzwrzC9fInZ8UVjQDcSSY
WUJfVY3ilusB3/b9tjCiUQM=
-----END PRIVATE KEY-----`;

