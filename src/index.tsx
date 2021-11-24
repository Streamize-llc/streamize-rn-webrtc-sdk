import { NativeModules, Platform } from 'react-native';
import { mediaDevices, RTCView } from 'react-native-webrtc';

import { RTCRoom } from './RTCRoom';

const LINKING_ERROR = `The package 'streamize-rn-webrtc-sdk' doesn't seem to be linked. Make sure: \n\n` + Platform.select({ios: "- You have run 'pod install'\n", default: ''}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';

const StreamizeRnWebrtcSdk = NativeModules.StreamizeRnWebrtcSdk ? NativeModules.StreamizeRnWebrtcSdk : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});

export { RTCRoom };

export function multiply(a: number, b: number): Promise<number> {
  return StreamizeRnWebrtcSdk.multiply(a, b);
}

export async function test(a: number): Promise<number> {
  try {
    s = await mediaDevices.getUserMedia({ video: true });
    setStream(s);
  } catch(e) {
    console.error(e);
  }
}

