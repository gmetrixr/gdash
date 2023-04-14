import Cookies from "js-cookie";

export const permanentCookieOptionsBrowser = (jwtExpiryMinutes: number): { expires: number, sameSite: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None' } => {
  //Expire cookie 1 minute before the token expires
  const expiry_in_days = (jwtExpiryMinutes - 1)/(60*24);
  return { expires: expiry_in_days, sameSite: "lax" };
};

/*
* Below methods are CLIENT ONLY, so they are not isomorphic.
**/
export function setPermanentTokenWithName({ key, value, jwtExpiryMinutes }: { key: string, value: string, jwtExpiryMinutes?: number }) {
  if(jwtExpiryMinutes) {
    return Cookies.set(key, value, permanentCookieOptionsBrowser(jwtExpiryMinutes));
  }
  return Cookies.set(key, value);
}

export function getPermanentCookieWithName({ key }: { key: string }): (string | undefined) {
  return Cookies.get(key);
}

export function getTokenWithName({ key, req }: { key: string, req?: Request }) {
  return Cookies.get(key);
}

export function setTemporaryTokenWithName({ key, value }: { key: string, value: string }) {
  return (typeof sessionStorage === "object")? sessionStorage.setItem(key, value): "";
}

export function getTemporaryTokenWithName({ key }: { key: string }) {
  return typeof sessionStorage === "object"? sessionStorage.getItem(key): "";
}

export function deleteTemporaryTokenWithName({ key }: { key: string }) {
  return typeof sessionStorage === "object"? sessionStorage.removeItem(key): "";
}
