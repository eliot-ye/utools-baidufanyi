<template>
  <div style="flex: 1">
    <textarea
      ref="textareaEle"
      class="CustomTextarea"
      :value="modelValue"
      @input="onInput"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "CustomTextarea",
  props: { modelValue: String, autoFocus: Boolean },
  emits: ["update:modelValue"],
  setup: (props, { emit }) => {
    function onInput(payload: any) {
      const textAreaSelf: HTMLTextAreaElement = payload.target;
      emit("update:modelValue", textAreaSelf.value);
    }

    const textareaEle = ref<HTMLTextAreaElement>();
    onMounted(() => {
      if (props.autoFocus) textareaEle.value?.focus();
    });

    return { onInput, textareaEle };
  },
});
</script>

<style>
.CustomTextarea {
  display: block;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #fafafa;
  resize: none;
  min-height: 120px;
  border: none;
}
.CustomTextarea:focus {
  outline: none;
}
</style>
