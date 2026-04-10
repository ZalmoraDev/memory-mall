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

const data = await useHealth();
</script>


<template>
  <WebMmHeader/>
  <main class="h-full w-full flex flex-1 flex-col items-center justify-center bg-mm-bg text-mm-fg mx-auto">

    <h1 class="font-bold"> Index page</h1>
    <NuxtLink class="text-mm-fg!" to="/web/mm/accounts">To Accounts</NuxtLink>
    <br>
    <p> Health status: {{ data || 'Loading...' }}</p>
    <div class="mt-4 flex gap-4">
      <UButton color="mm-primary">Primary UButton</UButton>
    </div>
  </main>
</template>