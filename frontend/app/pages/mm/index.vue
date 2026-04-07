<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const appConfig = useAppConfig();

const {data} = await useFetch('/health', {
  baseURL: runtimeConfig.public.apiBase,
  server: false
});
console.log(runtimeConfig.public.bePort); // remove this after you've confirmed it is working
</script>


<template>
  <h1 class="text-fg-lg font-bold"> Index page</h1>
  <NuxtLink to="/accounts">To Accounts</NuxtLink>
  <br>
  <p> {{ data }}</p>
  <div class="mt-4 flex gap-4">
    <UButton color="primary">Primary UButton</UButton>
  </div>
</template>