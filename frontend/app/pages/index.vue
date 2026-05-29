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
  <div class="web-STYLE p-4 flex-1 flex flex-col items-center bg-web-bg justify-center">
    <img src="/images/web/schmoogle.png" alt="Google Logo" class="max-w-xl w-full"/>
    <div class="grid grid-cols-3 sm:grid-cols-4 p-2 rounded-xl gap-2 mt-4">
      <NuxtLink to="/web/mm" class="flex flex-col items-center gap-2 text-white! no-underline!">
        <img src="/icons/web/mm/logo-FFF.svg" alt="Memory Mall Logo" class="w-16 h-16 p-2 rounded-xl bg-web-mm-pri-500" />
        Memory Mall
      </NuxtLink>
    </div>
  </div>
</template>

<style>
@import "~/assets/css/web-browser.css";
</style>
