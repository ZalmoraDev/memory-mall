<script setup lang="ts">
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: { lang: "en" },
});
useSeoMeta({
  titleTemplate: "%s | Memory Mall",
  description: "Early 2000's themed tech marketplace Web Application.",
  ogTitle: "Take a step back into Memory Mall",
  ogImage: "/images/apple-dog.jpg",
  ogImageAlt: "Memory Mall",
});
</script>

<template>
  <UApp class="flex-col">
    <div class="flex flex-col container mx-auto sm:my-4 h-full rounded-t-lg border-2 border-os-primary">
      <OsWindowTitleBar />
      <NuxtPage class="overflow-y-auto overflow-hidden" />
    </div>
    <OsTaskBar />
  </UApp>
</template>

<style>
@import "~/assets/css/operating-system.css";
</style>
