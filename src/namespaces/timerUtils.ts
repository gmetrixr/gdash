import * as wt from "worker-timers";
import { isWindow } from "./jsUtils";

/*eslint prefer-const: "off"*/
/** We need to modify this variable to false to use workTimers. Worker Timers work only in the browswer. */
let worker = false;
function setUseWorkerTimer(use: boolean) {
  worker = use;
}

function customSetInterval(func: Function, timeout: number): number {
  return ((worker && isWindow) ? wt.setInterval(func, timeout) : global.setInterval(func, timeout));
}

function customClearInterval(timerId: number): void {
  return ((worker && isWindow) ? wt.clearInterval(timerId) : global.clearInterval(timerId));
}

function customSetTimeout(func: Function, delay: number): number {
  return ((worker && isWindow) ? wt.setTimeout(func, delay) : global.setTimeout(func, delay));
}

function customClearTimeout(timerId: number): void {
  return ((worker && isWindow) ? wt.clearTimeout(timerId) : global.clearTimeout(timerId));
}

export { setUseWorkerTimer }
export { customSetInterval as setInterval }
export { customClearInterval as clearInterval }
export { customSetTimeout as setTimeout }
export { customClearTimeout as clearTimeout }
