import Cookies from "js-cookie";


//@sahil: Needs more checks. Not sure that we should be creating ismorphic cookie functions anymore
// export function deleteTokenWithName({ key, req, res }: { key: string, req?: Request, res?: Response }) {
//   if (IN_SERVER && req && res && req.cookies) {
//     res.clearCookie(key);
//   } else {
//     return Cookies.remove(key);
//   }
// }


export const permanentCookieOptionsBrowser = (jwtExpiryMinutes: number) => {
  //Expire cookie 1 minute before the token expires
  const expiry_in_days = (jwtExpiryMinutes - 1)/(60*24);
  return { expires: expiry_in_days };
};


export function setPermanentTokenWithName({ key, value, jwtExpiryMinutes, res }: { key: string, value: string, jwtExpiryMinutes?: number, res?: Response }) {
  if(jwtExpiryMinutes) {
    return Cookies.set(key, value, permanentCookieOptionsBrowser(jwtExpiryMinutes));
  }
  return Cookies.set(key, value);
}

export function getTokenWithName({ key, req }: { key: string, req?: Request }) {
  return Cookies.get(key);
}


/*
* Below methods are CLIENT ONLY, so they are not isomorphic.
*
* */

export function setTemporaryTokenWithName({ key, value }: { key: string, value: string }) {
  return (typeof sessionStorage === "object")? sessionStorage.setItem(key, value): "";
}

export function getTemporaryTokenWithName({ key }: { key: string }) {
  return typeof sessionStorage === "object"? sessionStorage.getItem(key): "";
}

export function deleteTemporaryTokenWithName({ key }: { key: string }) {
  return typeof sessionStorage === "object"? sessionStorage.removeItem(key): "";
}
