
// Workaround for making it work in a browser
export async function getSubtle() {
  // Check if running in Node.js or browser
  if (typeof window === "undefined") {
      // Node.js environment
      return (await import("node:crypto")).webcrypto.subtle;
  } else {
      // Browser environment
      return window.crypto.subtle;
  }
}