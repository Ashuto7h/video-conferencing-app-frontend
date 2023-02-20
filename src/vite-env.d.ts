/// <reference types="vite/client" />
declare module '*.png';

declare global {
  interface Window {
    cloudinary: unknown;
  }
}
