<script setup lang="ts">
definePageMeta({
  title: "About",
});

useSeoMeta({
  title: "About",
});
</script>

<template>
  <div class="web-mm-STYLE flex flex-row h-full">
    <WebMmLayoutNav />
    <div class="flex-1 flex flex-col min-w-0 overflow-y-auto">
      <main class="flex-1 w-full bg-web-mm-bottom">
        <WebMmLayoutHeader />
      </main>
      <WebMmLayoutFooter />
    </div>
  </div>
</template>

<style>
@import "~/assets/css/web/memory-mall.css";
</style>
