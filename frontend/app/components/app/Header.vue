<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const appConfig = useAppConfig();
</script>


<template>
  <header class="flex items-center justify-between p-4 bg-primary text-fg-md border-b-2 border-(--th-primary) shadow">
    <div class="font-bold text-lg">HEADER</div>
    <div class="flex items-center gap-4">
      <ThemeSwitcher />
    </div>
  </header>
</template>


<style lang="css">
</style>