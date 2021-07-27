export interface IParams {
  [key: string]: any;
}

export interface IResult {
  code: number;
  data: any;
  message: string;
}

declare global {
  interface Window {
    FlutterJSBridge: IParams;
    JSChannel: any;
  }
}
