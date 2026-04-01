<script setup lang="ts">
useHead({
  meta: [{name: 'viewport', content: 'width=device-width, initial-scale=1'}],
  link: [{rel: 'icon', href: '/favicon.ico'}],
  htmlAttrs: {lang: 'en'},
});
useSeoMeta({
  titleTemplate: '%s | Memory Mall',
  description: 'Early 2000\'s themed tech marketplace Web Application.',
  ogTitle: 'Take a step back into Memory Mall',
  ogImage: '/images/apple-dog.jpg',
  ogImageAlt: 'Memory Mall',
});

const colorMode = useColorMode();
</script>

<template>
  <UApp class="flex-1 flex flex-col">
    <main class="m-4 h-full container mx-auto border-primary border-3 rounded-t-2xl overflow-hidden bg-bg flex-1 flex flex-col">
      <AppHeader/>
      <div class="p-4 flex-1">
        <NuxtPage/>
      </div>
    </main>
    <AppFooter/>
  </UApp>
</template>

<style lang="css">
</style>