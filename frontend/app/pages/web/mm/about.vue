<script setup lang="ts">
definePageMeta({
  title: "About",
});

useSeoMeta({
  title: "About",
});
</script>

<template>
  <div class="web-mm-STYLE flex flex-col h-full relative pl-16">
    <WebMmLayoutNav />
    <main class="flex-1 w-full bg-web-mm-bg-bottom">
      <WebMmLayoutHeader />
    </main>
    <WebMmLayoutFooter />
  </div>
</template>

<style>
@import "~/assets/css/web/memory-mall.css";
</style>
