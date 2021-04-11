<template>
  <div
    class="SettingPopup-modal"
    :style="{ display: show ? 'flex' : 'none' }"
    @click="onClose"
  >
    <div class="SettingPopup-container card" @click.stop>
      <div style="padding: 20px; padding-left: 0; color: #afbac0">
        自定义百度翻译密钥
      </div>
      <CustomInput v-model="appid" title="appid" />
      <div style="height: 30px"></div>
      <CustomInput v-model="key" title="key" />
      <div style="height: 30px"></div>
      <div style="text-align: center">
        <button type="button" @click="onSave">确定</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CustomInput from "./CustomInput.vue";

import { ref, defineComponent } from "vue";
import {
  baidufanyiAppidGet,
  baidufanyiAppidSet,
  baidufanyiKeyGet,
  baidufanyiKeySet,
} from "../tools/utools";
export default defineComponent({
  name: "SettingPopup",
  components: { CustomInput },
  props: { show: Boolean },
  emits: ["update:show"],
  setup: (props, { emit }) => {
    function onClose() {
      emit("update:show", false);
    }

    const appid = ref("");
    const key = ref("");

    if (window.utools) {
      window.utools.onPluginReady(() => {
        const appidObj = baidufanyiAppidGet();
        if (appidObj) appid.value = appidObj.data;

        const keyObj = baidufanyiKeyGet();
        if (keyObj) key.value = keyObj.data;
      });
    }

    function onSave() {
      baidufanyiAppidSet(appid.value);
      baidufanyiKeySet(key.value);
      onClose();
    }

    return { onClose, appid, key, onSave };
  },
});
</script>

<style>
.SettingPopup-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.SettingPopup-modal .SettingPopup-container {
  width: 400px;
  padding-bottom: 30px;
}
.SettingPopup-modal .card {
  box-shadow: 0 0 12px #ebedf0;
}
button {
  padding: 10px 70px;
  border: none;
  background-color: #fafafa;
  border-radius: 16px;
  cursor: pointer;
  outline: none;
  color: #afbac0;
}
button:hover {
  box-shadow: 0 0 12px #afbac0;
}
</style>
