import { useEffect, useRef, useState, useCallback } from 'react';

export type MotionPermissionState = 'unknown' | 'granted' | 'denied' | 'not-required';

export interface UseDeviceMotionOptions {
  /** Acceleration magnitude (m/s²) required to trigger a shake. Default: 15 */
  threshold?: number;
  /** Milliseconds to ignore subsequent shakes after one fires. Default: 1500 */
  cooldownMs?: number;
  onShake: () => void;
}

export interface UseDeviceMotionReturn {
  /** True if DeviceMotionEvent exists in window */
  isSupported: boolean;
  /** iOS 13+ needs an explicit permission grant before we can listen */
  permissionState: MotionPermissionState;
  /** Call this inside a user-gesture handler (tap) to request iOS permission */
  requestPermission: () => Promise<void>;
}

// iOS 13+ exposes a static requestPermission method on DeviceMotionEvent
type DeviceMotionEventWithPermission = typeof DeviceMotionEvent & {
  requestPermission?: () => Promise<'granted' | 'denied'>;
};

export function useDeviceMotion({
  threshold = 15,
  cooldownMs = 1500,
  onShake,
}: UseDeviceMotionOptions): UseDeviceMotionReturn {
  const isSupported = typeof window !== 'undefined' && 'DeviceMotionEvent' in window;

  const needsPermission =
    isSupported &&
    typeof (DeviceMotionEvent as DeviceMotionEventWithPermission).requestPermission === 'function';

  const [permissionState, setPermissionState] = useState<MotionPermissionState>(() => {
    if (!isSupported) return 'not-required';
    if (needsPermission) return 'unknown';
    return 'not-required';
  });

  const lastShakeTime = useRef<number>(0);
  const onShakeRef = useRef(onShake);
  useEffect(() => { onShakeRef.current = onShake; }, [onShake]);

  // Attach / detach the motion listener
  const attachListener = useCallback(() => {
    const handleMotion = (event: DeviceMotionEvent) => {
      const acc = event.acceleration;
      if (!acc) return;
      const { x, y, z } = acc;
      if (x == null || y == null || z == null) return;

      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();

      if (magnitude > threshold && now - lastShakeTime.current > cooldownMs) {
        lastShakeTime.current = now;
        onShakeRef.current();
      }
    };

    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [threshold, cooldownMs]);

  // For non-iOS (or where permission is not required), attach immediately
  useEffect(() => {
    if (permissionState === 'not-required' && isSupported) {
      return attachListener();
    }
    // For 'granted' state (set after iOS permission grant), also attach
    if (permissionState === 'granted') {
      return attachListener();
    }
  }, [permissionState, isSupported, attachListener]);

  const requestPermission = useCallback(async () => {
    const DME = DeviceMotionEvent as DeviceMotionEventWithPermission;
    if (typeof DME.requestPermission !== 'function') {
      setPermissionState('not-required');
      return;
    }
    try {
      const result = await DME.requestPermission();
      setPermissionState(result === 'granted' ? 'granted' : 'denied');
    } catch {
      // User dismissed or browser blocked
      setPermissionState('denied');
    }
  }, []);

  return { isSupported, permissionState, requestPermission };
}
