import * as wt from "worker-timers";

export const useWorkerThreadForTimer = false;

function newSetInterval(func: Function, timeout: number): number {
  return (useWorkerThreadForTimer ? wt.setInterval(func, timeout) : setInterval(func, timeout));
}

function newClearInterval(timerId: number): void {
  return (useWorkerThreadForTimer ? wt.clearInterval(timerId) : clearInterval(timerId));
}

function newSetTimeout(func: Function, delay: number): number {
  return (useWorkerThreadForTimer ? wt.setTimeout(func, delay) : setTimeout(func, delay));
}

function newClearTimeout(timerId: number): void {
  return (useWorkerThreadForTimer ? wt.clearTimeout(timerId) : clearTimeout(timerId));
}

export { newSetInterval as setInterval }
export { newClearInterval as clearInterval }
export { newSetTimeout as setTimeout }
export { newClearTimeout as clearTimeout }
