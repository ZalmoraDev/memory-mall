<script setup lang="ts">
useHead({
  meta: [{name: 'viewport', content: 'width=device-width, initial-scale=1'}],
  link: [{rel: 'icon', href: '/favicon.ico'}],
  htmlAttrs: {lang: 'en'},
});

useSeoMeta({
  title: 'Page not found',
  titleTemplate: '%s | Memory Mall',
  description: 'Early 2000\'s themed tech marketplace Web Application.',
  ogTitle: 'Take a step back into Memory Mall',
  ogImage: '/images/apple-dog.jpg',
  ogImageAlt: 'Memory Mall',
});

definePageMeta({
  title: 'Page not found'
});

import type {NuxtError} from '#app';
defineProps<{
  error: NuxtError
}>();
</script>


<template>
  <UApp class="flex-1 flex flex-col">
    <main
        class="flex-1 flex flex-col mx-auto sm:my-4 h-full container rounded-t-lg border-2 border-os-primary overflow-hidden">
      <OsWindowTitleBar/>
      <UError :error="error" class="bg-os-bg p-12"/>
    </main>
    <OsTaskBar/>
  </UApp>
</template>