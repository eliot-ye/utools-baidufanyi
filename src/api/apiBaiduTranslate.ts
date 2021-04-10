import axios from "axios"
import { MD5 } from "crypto-js"

interface BaiduTranslateReq {
  query: string
  from?: string
  to?: string
}

interface TransResult {
  src: string,
  dst: string,
  src_tts: string,
  dst_tts: string,
  dict: string
}

interface BaiduTranslateRes {
  from: string,
  to: string,
  trans_result: TransResult[]
}
interface BaiduTranslateRes { error_code: string, error_msg: string }

export async function apiBaiduTranslate({ query, from = 'auto', to = 'zh' }: BaiduTranslateReq): Promise<BaiduTranslateRes> {
  const appid = '20201206000639851';
  const key = '4fKPUl9EaivnS0DU5cZ4';
  const salt = (new Date).getTime();
  const signPre = appid + query + salt + key;
  const signMD5 = MD5(signPre).toString();

  const res = await axios.get(`${import.meta.env.PROD ? 'http://api.fanyi.baidu.com' : ''}/api/trans/vip/translate?q=${encodeURI(query)}&appid=${appid}&salt=${salt}&from=${from}&to=${to}&sign=${signMD5}`)
  return res.data
}