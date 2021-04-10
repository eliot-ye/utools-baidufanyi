export default [
  { title: "请求超时", subTitle: "请重试", value: "52001" },
  { title: "系统错误", subTitle: "请重试", value: "52002" },
  { title: "未授权用户", subTitle: "请检查您的appid是否正确，或者服务是否开通", value: "52003" },
  { title: "必填参数为空", subTitle: "请检查是否少传参数", value: "54000" },
  { title: "签名错误", subTitle: "请检查您的签名生成方法", value: "54001" },
  { title: "访问频率受限", subTitle: "请降低您的调用频率，或进行身份认证后切换为高级版 / 尊享版", value: "54003" },
  { title: "账户余额不足", subTitle: "请前往管理控制台为账户充值", value: "54004" },
  { title: "长query请求频繁", subTitle: "请降低长query的发送频率，3s后再试", value: "54005" },
  { title: "客户端IP非法", subTitle: "检查个人资料里填写的IP地址是否正确，可前往开发者信息 - 基本信息修改，可前往开发者信息 - 基本信息修改", value: "58000" },
  { title: "译文语言方向不支持", subTitle: "检查译文语言是否在语言列表里", value: "58001" },
  { title: "服务当前已关闭", subTitle: "请前往管理控制台开启服务", value: "58002" },
  { title: "认证未通过或未生效", subTitle: "请前往我的认证查看认证进度", value: "90107" },
]
