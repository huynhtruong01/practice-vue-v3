<template>
  <div>
    <div class="flex flex-col items-center py-8">
      <p>Count: {{ state.count }}</p>
      <div class="flex gap-4 mt-4 justify-center">
        <button
          class="p-2 px-3 rounded bg-red-500 text-white leading-none"
          @click="decreaseCount"
        >
          -
        </button>
        <button
          class="p-2 px-3 rounded bg-blue-500 text-white leading-none"
          @click="increaseCount"
        >
          +
        </button>
      </div>
    </div>
    <div class="max-w-[600px] m-auto">
      <form @submit.prevent="addDoc" class="flex gap-2 justify-center">
        <input
          type="text"
          class="border border-slate-200 p-3 rounded"
          v-model="docValue"
          placeholder="Enter text..."
        />
        <button type="submit" class="px-4 py-2 bg-red-500 text-white rounded">
          Add
        </button>
      </form>
      <div class="flex mt-4 items-center flex-col flex-wrap w-full gap-4">
        <div
          v-for="doc of docs"
          :key="doc"
          class="p-3 border border-slate-200 rounded w-full flex-1"
        >
          <p>{{ doc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, Ref, ref } from "vue"

const docValue: Ref<string> = ref("")
const state = reactive({
  count: 0,
})
const docs: string[] = reactive([])

const increaseCount = () => {
  state.count += 1
}

const decreaseCount = () => {
  if (!state.count) return
  state.count -= 1
}

const addDoc = () => {
  if ((docValue.value, docValue.value)) {
    docs.push(docValue.value)
  }
  docValue.value = ""
}
</script>

<style scoped></style>
