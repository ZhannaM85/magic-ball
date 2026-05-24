# Issues Priority List

Issues grouped by implementation tier for publishing Magic 8-Ball on the App Store and Google Play. Work top-to-bottom within each tier; dependencies are noted where order matters.

---

## Tier 1 — Capacitor foundation
_Must be done first. Every subsequent tier depends on this._

| # | Issue | Notes |
|---|-------|-------|
| [#1](https://github.com/ZhannaM85/magic-ball/issues/1) | feat: install and configure Capacitor (iOS + Android foundation) | Do first — required by all other tiers |
| [#2](https://github.com/ZhannaM85/magic-ball/issues/2) | feat: replace DeviceMotionEvent with @capacitor/motion for native shake | Depends on #1; test on a **physical device** (simulator has no accelerometer) |

---

## Tier 2 — Assets & visual polish
_Can start in parallel with Tier 1. No code dependencies._

| # | Issue | Notes |
|---|-------|-------|
| [#3](https://github.com/ZhannaM85/magic-ball/issues/3) | feat: add app icons and splash screens for iOS and Android | Required by both stores; use \`@capacitor/assets\` to generate all sizes from one source |

---

## Tier 3 — Platform configuration
_After Tier 1. iOS and Android can be done in parallel._

| # | Issue | Notes |
|---|-------|-------|
| [#4](https://github.com/ZhannaM85/magic-ball/issues/4) | feat: configure iOS-specific settings (Info.plist, permissions, display name) | Depends on #1; requires Apple Developer account (€99/year) |
| [#5](https://github.com/ZhannaM85/magic-ball/issues/5) | feat: configure Android-specific settings (AndroidManifest, signing, permissions) | Depends on #1; requires Google Play Developer account ($25 one-time) |

---

## Tier 4 — Legal
_Can be done any time. Needed before store submission._

| # | Issue | Notes |
|---|-------|-------|
| [#6](https://github.com/ZhannaM85/magic-ball/issues/6) | feat: add Privacy Policy page (required by App Store and Google Play) | Option B (static \`public/privacy.html\`) requires no new dependencies |

---

## Tier 5 — Store submission
_Do last. Requires all previous tiers complete._

| # | Issue | Notes |
|---|-------|-------|
| [#7](https://github.com/ZhannaM85/magic-ball/issues/7) | feat: prepare App Store Connect listing and submit for review | Depends on #1 #2 #3 #4 #6; needs a Mac with Xcode to archive and upload |
| [#8](https://github.com/ZhannaM85/magic-ball/issues/8) | feat: prepare Google Play Console listing and submit for review | Depends on #1 #2 #3 #5 #6; upload a signed AAB from Android Studio or Gradle |

---

## Dependency graph

```
#1 Capacitor
 ├── #2 Native shake
 ├── #4 iOS config ──── #7 App Store submission
 └── #5 Android config ─ #8 Google Play submission

#3 Icons & splash ────── #7 + #8

#6 Privacy Policy ──────  #7 + #8
```

---

## External accounts needed

| Account | Cost | Used for |
|---------|------|---------|
| Apple Developer Program | €99 / year | App Store Connect, signing certificates, provisioning |
| Google Play Developer | $25 one-time | Play Console, signing upload key |
