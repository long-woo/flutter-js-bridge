export {};

declare global {
  interface Window {
    JSChannel: {
      postMessage: (data: any) => void
    }
  }
}
