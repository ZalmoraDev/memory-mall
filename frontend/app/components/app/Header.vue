<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const appConfig = useAppConfig();
</script>


<template>
  <header class="flex items-center justify-between p-1 text-fg-md border-b-3 border-primary shadow mm-bg-pri-sec">
    <div class="flex items-center gap-2">
      <img src="/icons/browser/MyIE2.png" alt="MyIE2 Logo" class="w-6 h-6 rounded-full" />
      <div class="font-bold text-fg-on-pri">[PAGE TITLE] - Michaelsoft MyIE2</div>
    </div>
    <ThemeSwitcher/>
  </header>
</template>


<style lang="css">
</style>