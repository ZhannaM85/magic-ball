// Capacitor configuration stub — not imported by any app code.
// When ready to publish on App Store / Google Play:
//
//   npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
//   npx cap add ios
//   npx cap add android
//
// Build for native (overrides the GitHub Pages base path):
//   npx vite build --base /
//   npx cap sync
//   npx cap open ios    (or android)
//
// For native shake detection, replace DeviceMotionEvent in
// src/hooks/useDeviceMotion.ts with @capacitor/motion:
//   import { Motion } from '@capacitor/motion';
//   Motion.addListener('shake', onShake);

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zhannam85.magicball',
  appName: 'Magic 8-Ball',
  webDir: 'dist',
  server: {
    // androidScheme: 'https',
  },
};

export default config;
