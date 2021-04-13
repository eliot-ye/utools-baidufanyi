<template>
  <div class="CustomInput-container">
    <div class="CustomInput-title">{{ title }}</div>
    <div class="CustomInput-wrapper">
      <input
        :type="type"
        :value="modelValue"
        class="CustomInput"
        @input="onInput"
      />
    </div>
    <div class="CustomInput-desc CustomInput-error" v-if="hasError">{{ errorText }}</div>
    <div class="CustomInput-desc" v-else-if="desc">{{ desc }}</div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from "vue";
export default defineComponent({
  name: "CustomInput",
  props: {
    modelValue: { type: String, required: true },
    type: { type: String as PropType<"text" | "password">, default: "text" },
    title: String,
    desc: String,
    errorText: String,
    hasError: Boolean,
  },
  emits: ["update:modelValue"],
  setup: (props, { emit }) => {
    function onInput(payload: any) {
      const InputSelf: HTMLInputElement = payload.target;
      emit("update:modelValue", InputSelf.value);
    }

    return { onInput };
  },
});
</script>

<style>
.CustomInput-container {
  width: 100%;
}
.CustomInput-title {
  color: #afbac0;
}
.CustomInput-wrapper {
  border-bottom: 1px solid gray;
  padding-bottom: 4px;
  padding-top: 8px;
}
.CustomInput {
  border: none;
  outline: none;
  width: 100%;
  font-size: 20px;
}
.CustomInput-desc {
  color: #afbac0;
  font-size: 12px;
}
.CustomInput-error {
  color: red;
}
</style>
