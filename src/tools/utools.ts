
export function utoolsDBPut(param: Utools.DBObj) {
  if (!window.utools) return
  window.utools.db.put(param)
}

export function utoolsDBGet(id: string) {
  if (!window.utools) return
  return window.utools.db.get(id)
}

export function baidufanyiAppidSet(data: string) {
  utoolsDBPut({ _id: 'baidufanyi_Appid', data })
}

export function baidufanyiAppidGet() {
  return utoolsDBGet("baidufanyi_Appid")
}

export function baidufanyiKeySet(data: string) {
  return utoolsDBPut({ _id: 'baidufanyi_Key', data })
}

export function baidufanyiKeyGet() {
  return utoolsDBGet("baidufanyi_Key")
}