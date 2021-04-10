interface Window {
  utools: Utools
}

interface Utools {
  onPluginReady: (callback: () => void) => void;
  onPluginEnter: (callback: (param: PluginEnterCallbackParam) => void) => void;
  setSubInput: (onChange: (param: { text: string }) => void, placeholder: string, isFocus?: boolean) => void;
}

interface PluginEnterCallbackParam {
  code: string
  type: "text" | "img" | "files" | "regex" | "over" | "window"
  payload: any
  optional: any[] | undefined
}