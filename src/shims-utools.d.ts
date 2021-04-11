interface Window {
  utools: Utools.Base
}

declare namespace Utools {
  interface Base {
    onPluginReady: (callback: () => void) => void;
    onPluginEnter: (callback: (param: PluginEnterCallbackParam) => void) => void;
    setSubInput: (onChange: (param: { text: string }) => void, placeholder: string, isFocus?: boolean) => void;
    db: { put: (param: DBObj) => void, get: (id: string) => DBObj }
    copyText: (value: string) => void
  }

  interface PluginEnterCallbackParam {
    code: string
    type: "text" | "img" | "files" | "regex" | "over" | "window"
    payload: any
    optional: any[] | undefined
  }

  interface DBObj { _id: string, _rev?: string, data: string }

}
