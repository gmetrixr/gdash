import * as wt from "worker-timers";
import { isWindow } from "./jsUtils";

/*eslint prefer-const: "off"*/
/** We need to modify this variable to false to use workTimers. Worker Timers work only in the browswer. */
export let useWorkerTimers = false;

function newSetInterval(func: Function, timeout: number): number {
  return ((useWorkerTimers && isWindow) ? wt.setInterval(func, timeout) : setInterval(func, timeout));
}

function newClearInterval(timerId: number): void {
  return ((useWorkerTimers && isWindow) ? wt.clearInterval(timerId) : clearInterval(timerId));
}

function newSetTimeout(func: Function, delay: number): number {
  return ((useWorkerTimers && isWindow) ? wt.setTimeout(func, delay) : setTimeout(func, delay));
}

function newClearTimeout(timerId: number): void {
  return ((useWorkerTimers && isWindow) ? wt.clearTimeout(timerId) : clearTimeout(timerId));
}

export { newSetInterval as setInterval }
export { newClearInterval as clearInterval }
export { newSetTimeout as setTimeout }
export { newClearTimeout as clearTimeout }
