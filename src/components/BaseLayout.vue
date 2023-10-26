<template>
  <header>
    <button
      class="px-4 py-2 bg-green-500 rounded text-white font-medium"
      @click="changeMessage"
    >
      Change
    </button>
    <slot name="header" :message="message"></slot>
  </header>
  <main>
    <slot name="main"></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue"

const message: Ref<string> = ref("hello world")

const changeMessage = () => {
  message.value = "HI you 9999"
}
</script>

<style scoped></style>
