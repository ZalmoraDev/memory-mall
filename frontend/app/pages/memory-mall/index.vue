<!--------------->
<!--Memory Mall-->
<!--------------->
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
<div class="bg-mm-backdrop min-h-screen w-full flex justify-center items-center">
  <div class="max-w-[90rem] px-2 h-full w-full flex flex-1 flex-col items-center justify-center p-4 bg-mm-bg text-mm-fg mx-auto">
    <h1 class="font-bold"> Index page</h1>
    <NuxtLink class="text-mm-fg!" to="/accounts">To Accounts</NuxtLink>
    <br>
    <p> {{ data }}</p>
    <div class="mt-4 flex gap-4">
      <UButton color="mm-primary">Primary UButton</UButton>
    </div>
  </div>
</div>
</template>