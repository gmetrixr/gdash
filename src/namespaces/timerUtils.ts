import * as wt from "worker-timers";
import { isWindow } from "./jsUtils";

/*eslint prefer-const: "off"*/
/** We need to modify this variable to false to use workTimers. Worker Timers work only in the browswer. */
let worker = false;
function setUseWorkerTimer(use: boolean) {
  worker = use;
}

function workerSetInterval(func: Function, timeout: number): number {
  return ((worker && isWindow) ? wt.setInterval(func, timeout) : setInterval(func, timeout));
}

function workerClearInterval(timerId: number): void {
  return ((worker && isWindow) ? wt.clearInterval(timerId) : clearInterval(timerId));
}

function workerSetTimeout(func: Function, delay: number): number {
  return ((worker && isWindow) ? wt.setTimeout(func, delay) : setTimeout(func, delay));
}

function workerClearTimeout(timerId: number): void {
  return ((worker && isWindow) ? wt.clearTimeout(timerId) : clearTimeout(timerId));
}

export { setUseWorkerTimer }
export { workerSetInterval as setInterval }
export { workerClearInterval as clearInterval }
export { workerSetTimeout as setTimeout }
export { workerClearTimeout as clearTimeout }
