<template>
  <div class="card" style="padding-bottom: 10px">
    <CustomTextarea auto-focus v-model="originalText" @keydown="onKeydown" />
    <div style="margin-top: 10px; color: #afbac0; font-size: 12px">
      按下回车键翻译
    </div>
  </div>
  <div class="card" style="padding-top: 10px">
    <div style="margin-bottom: 10px; text-align: right">
      <CustomSelect v-model="translateLang" />
    </div>
    <CustomTextarea v-model="translateText" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CustomTextarea from "./components/CustomTextarea.vue";
import CustomSelect from "./components/CustomSelect.vue";

import { apiBaiduTranslate } from "./api/apiBaiduTranslate";
import errprCodeList from "./assets/dict_errorCode";

export default defineComponent({
  name: "App",
  components: {
    CustomTextarea,
    CustomSelect,
  },
  setup() {
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

    if (window.utools) {
      window.utools.onPluginReady(() => {
        window.utools.setSubInput(({ text }) => {
          originalText.value = text;
          console.log("setSubInput", text);
        }, "翻译");
        window.utools.onPluginEnter(({ code, type, payload, optional }) => {
          console.log("onPluginEnter 用户进入插件", code, type, payload);
        });
      });
    }

    return { originalText, translateLang, translateText, onKeydown };
  },
});
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
  background-color: #fafafa;
  padding: 20px;
}
.card {
  margin-bottom: 24px;
  padding: 24px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 12px #ebedf0;
}
</style>
