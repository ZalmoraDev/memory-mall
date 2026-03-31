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

const colorMode = useColorMode()
</script>

<template>
  <UApp>
    <AppHeader />
    <UContainer as="main" class="flex-grow py-4 sm:py-7 flex flex-col">
      <NuxtPage />
    </UContainer>
    <AppFooter />
  </UApp>
</template>

<style lang="css">
</style>