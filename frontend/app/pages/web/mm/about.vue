<script setup lang="ts">
definePageMeta({
  title: "About",
});

useSeoMeta({
  title: "About",
});
</script>

<template>
  <div class="web-mm-STYLE flex flex-col h-full">
    <main class="flex-1 w-full bg-web-mm-bg-dark">
      <WebMmLayoutHeader />
      <WebMmLayoutNav />
    </main>
    <WebMmLayoutFooter />
  </div>
</template>

<style>
@import "~/assets/css/web/memory-mall.css";
</style>
