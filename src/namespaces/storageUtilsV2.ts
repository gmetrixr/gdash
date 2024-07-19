import Cookies from "js-cookie";
import { DAY, MINUTE } from "./jsUtils.js";

type CookieOptions = {
  expiryMinutes?: number
};

/** 
 * An open function where you can set cookie attributes directly 
 * Bypasses all our checks/controls
 **/
export function setRawCookie({ key, value, options }: {key: string, value: string, options: Cookies.CookieAttributes | undefined}) {
  if(options) {
    return Cookies.set(key, value, options);
  }
  return Cookies.set(key, value);
}

export function setCookie({ key, value, options, isLongLived }: {key: string, value: string, options: CookieOptions, isLongLived: boolean}) {
  if(isLongLived) {
    options.expiryMinutes = DAY * 365 / MINUTE;
  }
  return Cookies.set(key, value, createCookieAttributes(options));
}

function createCookieAttributes (options: CookieOptions): Cookies.CookieAttributes | undefined {
  const cookieAttributes: Cookies.CookieAttributes | undefined = {
    secure: true,
    //This is needed so that our cookies work when the website is loaded inside iframes
    //If any one of the sites above loaded any other site from the list in an <iframe> , that content would be loaded cross-site
    //https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#none
    //https://web.dev/articles/samesite-cookies-explained
    sameSite: "None",
    partitioned: true
  };
  const { expiryMinutes } = options;
  if(expiryMinutes) {
    cookieAttributes.expires = expiryMinutes / (60 * 24); //"expires" accepts days
  }
  return cookieAttributes;
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
