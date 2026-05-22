<script setup lang="ts">
definePageMeta({
  title: "About",
});

useSeoMeta({
  title: "About",
});
</script>

<template>
  <div class="STYLE flex flex-col h-full">
    <main class="flex-1 w-full text-black bg-web-mm-bg-surface">
      <WebMmLayoutHeader />
      <WebMmLayoutNav />
    </main>
    <WebMmLayoutFooter />
  </div>
</template>

<style>
@import "~/assets/css/web/memory-mall.css";
</style>
