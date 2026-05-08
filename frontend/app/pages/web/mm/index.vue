<!--------------->
<!--Memory Mall-->
<!--------------->
<script setup lang="ts">

import type {WebMmProductCondition} from '~/shared/types/web/mm';

useSeoMeta({
  title: 'Memory Mall - Tech Deals & Electronics',
});

definePageMeta({
  title: 'Home'
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