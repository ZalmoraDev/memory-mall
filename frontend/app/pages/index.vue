<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const appConfig = useAppConfig()

const {data} = await useFetch('/health', {
  baseURL: runtimeConfig.public.apiBase,
  server: false
});
console.log(runtimeConfig.public.bePort) // remove this after you've confirmed it is working
</script>


<template>
  <h1> Index page</h1>
  <NuxtLink to="/accounts">To Accounts</NuxtLink>
  <br>
  {{ data }}<br>
  <ThemeToggle></ThemeToggle>

  <div class="mt-4 flex gap-4">
    <!-- If you are using Nuxt UI Components -->
    <UButton color="primary">Primary UButton</UButton>

    <!-- If you are mapping the colors to standard Tailwind classes -->
    <button class="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded">
      Tailwind Primary Button
    </button>

    <button class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded">
      Direct Emerald Button
    </button>
  </div>
</template>


<style lang="css">
</style>