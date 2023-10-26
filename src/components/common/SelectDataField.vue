<template>
  <div>
    <select
      @change="changeOptions"
      :value="selectVal"
      class="p-2.5 rounded bg-white border border-slate-200"
    >
      <option v-for="item in props.data" :key="item.value" :value="item.value">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, Ref, ref } from "vue"

const props = defineProps(["data"])
const emits = defineEmits(["filterTodoValue"])
const selectVal: Ref<string> = ref("")

const changeOptions = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value
  selectVal.value = value
  emits("filterTodoValue", value)
}
</script>

<style scoped></style>
