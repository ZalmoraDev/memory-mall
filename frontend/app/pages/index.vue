<!--------------->
<!--Web Browser-->
<!--------------->
<script setup lang="ts">
useSeoMeta({
  title: "Schmoogle",
});

definePageMeta({
  title: "Schmoogle",
});
</script>

<!-- TODO: Make this a Nuxt Layout OR use Layers, when creating additional 'windows' besides this 'web browser'  -->
<template>
  <div class="p-4 flex-1 flex flex-col items-center bg-web-bg justify-center">
    <img src="/images/web/schmoogle.png" alt="Schmoogle Logo" />
    <div class="grid grid-cols-3 sm:grid-cols-4 p-2 rounded-xl gap-2 mt-4">
      <UButton
        as="NuxtLink"
        to="/web/mm"
        class="flex flex-col items-center gap-2 text-white! no-underline!"
        :avatar="{ src: '/icons/web/mm/logo-FFF.svg', class: 'w-10 h-10 bg-transparent rounded-none' }"
      >
        Memory Mall
      </UButton>
    </div>
  </div>
</template>

<style>
@import "~/assets/css/web-browser.css";
</style>
