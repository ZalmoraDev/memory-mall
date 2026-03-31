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
  <h1 class="text-primary"> Index page</h1>
  <NuxtLink to="/accounts">To Accounts</NuxtLink>
  <br>
  {{ data }}<br>

  <div class="mt-4 flex gap-4">
    <!-- If you are using Nuxt UI Components -->
    <UButton color="primary">Primary UButton</UButton>
  </div>
</template>


<style lang="css">
</style>