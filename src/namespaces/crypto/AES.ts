// Want to avoid importing crypto-js into the browser. Around 500kb.
// Try using inbuilt libraries (like Subtle)
// import CryptoJS from "crypto-js";

// export const encrytpAES = async ({ data, key }: {
//   data: string,
//   key: string
// }): Promise<string> => {
//   return CryptoJS.AES.encrypt(data, key).toString();
// };

// export const decryptAES = async ({ data, key }: {
//   data: string,
//   key: string
// }): Promise<string> => {
//   return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
// };