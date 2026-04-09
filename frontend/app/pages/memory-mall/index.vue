<!--------------->
<!--Memory Mall-->
<!--------------->
<script setup lang="ts">
useSeoMeta({
  title: 'Home',
});

definePageMeta({
  title: 'Home'
});

const runtimeConfig = useRuntimeConfig();
const appConfig = useAppConfig();

const {data, error} = await useFetch('/health', {
  baseURL: runtimeConfig.public.apiBase,
  server: false
});
console.log(runtimeConfig.public.bePort); // remove this after you've confirmed it is working
</script>


<template>
  <div class="px-2 h-full w-full flex flex-1 flex-col items-center justify-center p-4 bg-mm-bg text-mm-fg mx-auto">
    <WebMmHeader/>
    <h1 class="font-bold"> Index page</h1>
    <NuxtLink class="text-mm-fg!" to="/memory-mall/accounts">To Accounts</NuxtLink>
    <br>
    {{useHello()}}
    <p> {{ data }}</p>
    <div class="mt-4 flex gap-4">
      <UButton color="mm-primary">Primary UButton</UButton>
    </div>
  </div>
</template>