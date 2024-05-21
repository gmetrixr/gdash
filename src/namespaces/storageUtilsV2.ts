import Cookies from "js-cookie";

type SiteRestriction = "strict" | "Strict" | "lax" | "Lax" | "none" | "None";

type PermanentCookieOptionsBrowser = {
  expires: number,
  sameSite: SiteRestriction,
  secure?: boolean
};

type PermanentCookieOptions = {
  expiryMinutes?: number,
  siteRestrictions?: SiteRestriction
};

export const permanentCookieOptionsBrowser = (options: PermanentCookieOptions): PermanentCookieOptionsBrowser => {
  const { expiryMinutes = 1, siteRestrictions = "lax" } = options;
  //Expire cookie 1 minute before the token expires
  const expiry_in_days = (expiryMinutes - 1) / (60 * 24);
  return { expires: expiry_in_days, sameSite: siteRestrictions };
};

/** Functions to interact with browser cookies */
type SetCookie = {
  key: string,
  value: string,
  options?: PermanentCookieOptions
};

export function setCookie({ key, value, options }: SetCookie) {
  if(options) {
    return Cookies.set(key, value, permanentCookieOptionsBrowser(options));
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
