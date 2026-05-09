<script setup lang="ts">
definePageMeta({
  title: 'About'
});

useSeoMeta({
  title: 'About'
});
</script>


<template>
  <div class="flex flex-col h-full">
    <main class="flex-1 w-full text-black bg-mm-backdrop">
      <WebMmLayoutHeader/>
      <WebMmLayoutNav/>

    </main>
    <WebMmLayoutFooter/>
  </div>
</template>