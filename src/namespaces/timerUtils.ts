import * as wt from "worker-timers";

export const useWorkerThreadForTimer = false;

const globalSetInterval = setInterval;
const globalClearInterval = clearInterval;
const globalSetTimeout = setTimeout;
const globalClearTimout = clearTimeout;

export function setInterval(func: Function, timeout: number): number {
  return (useWorkerThreadForTimer ? wt.setInterval(func, timeout) : globalSetInterval(func, timeout));
}

export function clearInterval(timerId: number): void {
  useWorkerThreadForTimer ? wt.clearInterval(timerId) : globalClearInterval(timerId);
}

export function setTimeout(func: Function, delay: number): number {
  return (useWorkerThreadForTimer ? wt.setTimeout(func, delay) : globalSetTimeout(func, delay));
}

export function clearTimeout(timerId: number): void {
  useWorkerThreadForTimer ? wt.clearTimeout(timerId) : globalClearTimout(timerId);
}
