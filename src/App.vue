<template>
  <img
    src="./assets/img/setting.png"
    alt="setting"
    class="icon setting"
    @click="showSetting = true"
  />
  <SettingPopup v-model:show="showSetting" />
  <div class="card" style="display: flex; height: 100%">
    <div class="textarea-container" style="padding-right: 10px">
      <div style="margin-bottom: 10px">
        <CustomSelect has-auto v-model="originalLang" />
      </div>
      <CustomTextarea auto-focus v-model="originalText" @keydown="onKeydown" />
      <div style="background-color: #fafafa; padding: 10px">
        <img src="./assets/img/copy.png" alt="copy" class="icon" @click="onCopyOriginalText" />
      </div>
      <div class="textarea-desc">* 按下回车键翻译</div>
    </div>
    <div class="textarea-container" style="padding-left: 10px">
      <div style="margin-bottom: 10px">
        <CustomSelect v-model="translateLang" />
      </div>
      <CustomTextarea v-model="translateText" />
      <div style="background-color: #fafafa; padding: 10px">
        <img src="./assets/img/copy.png" alt="copy" class="icon" @click="onCopyTranslateText" />
      </div>
      <div class="textarea-desc" style="text-align: right">* by baidu</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CustomTextarea from "./components/CustomTextarea.vue";
import CustomSelect from "./components/CustomSelect.vue";
import SettingPopup from "./components/SettingPopup.vue";

import { apiBaiduTranslate } from "./api/apiBaiduTranslate";
import errprCodeList from "./assets/dict_errorCode";

window.utools.onPluginEnter(async (data)=>{
  const clipboardText = await navigator.clipboard.readText()
  if(clipboardText){
    originalText.value = clipboardText;
    getBaiduTranslate()
  }
})

const originalLang = ref("auto");
const originalText = ref("");

const translateLang = ref("zh");
const translateText = ref("");

async function getBaiduTranslate() {
  const res = await apiBaiduTranslate({
    query: originalText.value,
    to: translateLang.value,
  });
  if (res.error_code) {
    const errorObj = errprCodeList.find(
      (item) => item.value === res.error_code
    );
    if (!errorObj) return;
    translateText.value = `${errorObj.title} - ${errorObj.subTitle}`;
    return;
  }
  translateText.value = res.trans_result.map((item) => item.dst).join("\n");
}

function onKeydown(payload: KeyboardEvent) {
  if (payload.key === "Enter") {
    getBaiduTranslate();
  }
}

function onCopyOriginalText() {
  if (!window.utools) return;
  window.utools.copyText(originalText.value);
}
function onCopyTranslateText() {
  if (!window.utools) return;
  window.utools.copyText(translateText.value);
}

const showSetting = ref(false);

</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  width: 100vw;
  height: 100vh;
  background-color: #ddd;
  padding: 20px;
  position: relative;
  font-family: 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', 'WenQuanYi Micro Hei', 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}
.icon {
  width: 20px;
  cursor: pointer;
}
.setting {
  position: absolute;
  right: 5px;
  top: 5px;
}
.card {
  padding: 14px 24px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 12px #fff;
}
.textarea-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.textarea-desc {
  margin-top: 10px;
  color: #afbac0;
  font-size: 12px;
}
</style>
