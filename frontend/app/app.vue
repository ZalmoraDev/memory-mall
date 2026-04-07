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
</script>


<template>
  <UApp class="flex-1 flex flex-col">
    <main
        class="mx-auto my-0 sm:my-4 h-full container rounded-t-lg border-2 border-os-primary overflow-hidden flex-1 flex flex-col">
      <AppWindowTitleBar/>
      <NuxtPage/>
    </main>
    <AppTaskBar/>
  </UApp>
</template>