<script lang="ts">
import { defineComponent, h } from "@vue/runtime-core";
import languageTypeList from "../assets/dict_languageType";

export default defineComponent({
  name: "CustomSelect",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    function renderOption() {
      return languageTypeList.map((item) => {
        return h(
          "option",
          { class: ["com-opt"], value: item.value },
          item.title
        );
      });
    }

    return () =>
      h(
        "select",
        {
          class: ["com-sel"],
          value: props.modelValue,
          onChange: (value: any) =>
            emit("update:modelValue", value.target.value),
        },
        renderOption()
      );
  },
});
</script>

<style>
.com-sel {
  cursor: pointer; /*鼠标上移变成小手*/
  border: 1px solid #fafafa;
  border-radius: 4px;
  min-width: 110px;
  height: 30px;
  outline: none;
  padding-left: 5px;
  background: #fafafa;
  appearance: none;
  color: #afbac0;
}

.com-opt {
  padding-right: 1.8rem;
  color: #afbac0;
  border: none;
  outline: none;
}
</style>
