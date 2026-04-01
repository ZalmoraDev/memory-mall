<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const appConfig = useAppConfig();
</script>


<template>
  <header class="flex items-center justify-between p-4 text-fg-md border-b-3 border-primary shadow mm-bg-pri-sec">
    <div class="font-bold text-lg">HEADER</div>
    <div class="flex items-center gap-4">
      <ThemeSwitcher />
    </div>
  </header>
</template>


<style lang="css">
</style>