<script setup lang="ts">

definePageMeta({
  title: 'Account',
  middleware: 'web-mm-auth',
});

const {data} = await useFetch('http://localhost:3000/api/v1/health', {
  server: false
});
</script>


<template>
  <div class="bg-mm-backdrop min-h-screen w-full flex justify-center items-center">
    <div
        class="max-w-[90rem] px-2 h-full w-full flex flex-1 flex-col items-center justify-center p-4 bg-mm-bg text-mm-fg mx-auto">
      <h1 class="font-bold"> Home page</h1>
      <NuxtLink class="text-mm-fg!" to="/memory-mall">To Accounts</NuxtLink>
      <br>
      <p> {{ data }}</p>
      <div class="mt-4 flex gap-4">
        <UButton color="mm-primary">Primary UButton</UButton>
      </div>
    </div>
  </div>
</template>