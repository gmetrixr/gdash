import Cookies from "js-cookie";

export const permanentCookieOptionsBrowser = (jwtExpiryMinutes: number): { expires: number, sameSite: "strict" | "Strict" | "lax" | "Lax" | "none" | "None" } => {
  //Expire cookie 1 minute before the token expires
  const expiry_in_days = (jwtExpiryMinutes - 1) / (60 * 24);
  return { expires: expiry_in_days, sameSite: "lax" };
};

/** Functions to interact with browser cookies */

export function setCookie({ key, value, jwtExpiryMinutes }: { key: string, value: string, jwtExpiryMinutes?: number }) {
  if(jwtExpiryMinutes) {
    return Cookies.set(key, value, permanentCookieOptionsBrowser(jwtExpiryMinutes));
  }
  return Cookies.set(key, value);
}

export function getCookie({ key }: { key: string }): (string | undefined) {
  return Cookies.get(key);
}

export function removeCookie({ key }: { key: string }) {
  Cookies.remove(key);
}

/** 
 * Functions to interact with browser session storage (gets deleted when the tab is closed) 
 * Note: 
 * * session is linked to a single tab (multiple tabs get multiple sessions)
 * * session survives page reload and restores
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
 */

export function setSessionStorageItem({ key, value }: { key: string, value: string }) {
  if(typeof sessionStorage === "object") {
    sessionStorage.setItem(key, value);
  }
}

export function getSessionStorageItem({ key }: { key: string }): (string | null) {
  if(typeof sessionStorage === "object") {
    return sessionStorage.getItem(key);
  }
  return null;
}

export function removeSessionStorageItem({ key }: { key: string }) {
  if(typeof sessionStorage === "object") {
    sessionStorage.removeItem(key);
  }
}
