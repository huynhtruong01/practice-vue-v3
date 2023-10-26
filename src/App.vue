<template>
  <div>
    <Header />
    <main class="mt-[80px]">
      <Container>
        <router-view></router-view>
      </Container>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Header, Container } from "./components/common"
</script>

<style scoped></style>
