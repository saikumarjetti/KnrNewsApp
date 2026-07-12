# KNR Channel Mobile App

A React Native mobile application built with **Expo SDK 53** for KNR News, supporting iOS and Android.

---

## 🚀 Getting Started

### 📋 Prerequisites
Before running the application, make sure you have:
* **Node.js** (LTS version recommended)
* **npm** or **yarn**
* **Expo Go** app installed on your iOS or Android device for quick testing, OR Xcode / Android Studio set up for simulators/emulators.

### ⚙️ Local Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the Expo Dev Server (Metro Bundler)**:
   ```bash
   npm start
   ```
   * Scan the displayed QR code with your phone (using Expo Go on Android, or the Camera app on iOS) to run it on your device.
   * Or press `a` to open in Android Emulator, or `i` to open in iOS Simulator.

3. **Run directly on Emulator/Simulator**:
   * **Android**:
     ```bash
     npm run android
     ```
   * **iOS**:
     ```bash
     npm run ios
     ```

---

## 📦 Building and Publishing (EAS Build)

We use **EAS (Expo Application Services)** to compile native builds in the cloud.

### 🔑 1. Logging into Expo (EAS)
If you aren't logged in, authenticate using the Expo CLI:
```bash
npx expo login
```

### 🛠️ 2. Generating a Production Build (Android)
To compile a production-ready `.aab` (Android App Bundle) to upload to Google Play Console:
```bash
eas build --platform android --profile production
```
* **Auto-Increment**: The app is configured with `"appVersionSource": "remote"` and `"autoIncrement": true` in [eas.json](file:///Users/saikumar/Programming/KNR_Channel/App/KNRNewsApp/eas.json). EAS will automatically increment the `versionCode` on the server when triggering a build.

### 📤 3. Submitting to Google Play
Once your EAS build is complete, you can:
* **Automatically submit** via EAS CLI:
  ```bash
  eas submit --platform android
  ```
* **Manually upload**: Download the `.aab` file from the build details on your Expo dashboard and upload it directly inside the Google Play Console under the Production or Internal testing tracks.

---

## 🛠️ Android 15 & 16 KB Memory Page Size Support

Starting with Android 15, Google Play requires apps to support a **16 KB memory page size** for better performance. 

This project is configured for 16 KB page-alignment in [app.json](file:///Users/saikumar/Programming/KNR_Channel/App/KNRNewsApp/app.json) under `expo-build-properties`:
* **API Level**: Set to target Android 15 (`compileSdkVersion: 35` and `targetSdkVersion: 35`).
* **Uncompressed Packaging**: `"useLegacyPackaging": false` is explicitly set to ensure all compiled native libraries (`.so` files) are stored uncompressed, allowing Android to align them to 16 KB boundaries correctly.

> [!WARNING]
> If you add new native packages to `package.json` in the future, run `npx expo install --fix` to verify they are matched with compatible 16 KB aligned versions.

---

## 🐛 Deobfuscation File Warning (Google Play Console)

When uploading to the Play Console, you may see a warning:
> *"There is no deobfuscation file associated with this App Bundle."*

### How to resolve it:
1. Go to your **Expo Dashboard** and find the details page for the completed build.
2. Under **Artifacts**, download the **ProGuard mapping file** (usually named `mapping.txt`).
3. In the Google Play Console release panel, click the three dots next to your uploaded App Bundle, select **Upload deobfuscation file**, and upload the `mapping.txt` file.
4. *Note: This is only a warning. The app will build and publish fine even if you choose to skip this.*
