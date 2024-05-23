import Cookies from "js-cookie";
import { DAY, MINUTE } from "./jsUtils.js";

/** 
 * An open function where you can set cookie attributes directly 
 **/
export function setCookieWithOptions({ key, value, options }: {key: string, value: string, options: Cookies.CookieAttributes | undefined}) {
  if(options) {
    return Cookies.set(key, value, options);
  }
  return Cookies.set(key, value);
}

function createCookieAttributes (options: CookieOptions): Cookies.CookieAttributes | undefined {
  const { expiryMinutes, openInEmbeds } = options;
  const cookieAttributes: Cookies.CookieAttributes | undefined = {
    "secure": true,
  };
  if(expiryMinutes) {
    cookieAttributes.expires = expiryMinutes / (60 * 24); //"expires" accepts days
  }
  if(openInEmbeds) {
    //https://intercom.help/progressier/en/articles/6894845-why-aren-t-cookies-working-inside-an-iframe
    //Since Chrome 85, a web page that's inside an iframe and that's on a different domain than the parent won't be able to read its own cookies, unless they've explicitly been set using SameSite=None and Secure.
    //Hence we need sameSite: "None" and secure: true
    cookieAttributes.sameSite = "None";
  } else {
    cookieAttributes.sameSite = "Lax";
  }
  return cookieAttributes;
}

type CookieOptions = {
  expiryMinutes?: number,
  openInEmbeds?: boolean,
};

/** Can be used to store user preferences */
export function setLongLivedCookie({ key, value }: {key: string, value: string}) {
  return setCookie({key, value, options: {expiryMinutes: DAY * 365 / MINUTE, openInEmbeds: true} });
}

export function setCookie({ key, value, options }: {key: string, value: string, options: CookieOptions}) {
  if(options) {
    return Cookies.set(key, value, createCookieAttributes(options));
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
