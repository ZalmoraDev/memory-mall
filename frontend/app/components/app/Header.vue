<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const appConfig = useAppConfig();
</script>


<template>
  <header
      class="flex items-center justify-between text-fg-md border-b-2 border-primary mm-bg-pri-sec mm-inline-highlight">
    <div class="p-1 flex items-center gap-2">
      <img src="/icons/browser/MyIE2.png" alt="MyIE2 Logo" class="w-6 h-6 rounded-full"/>
      <div class="font-bold text-fg-on-pri">[PAGE TITLE] - Michaelsoft MyIE2</div>
    </div>
    <div class="p-1 flex items-center gap-1">
      <UButton color="primary" size="sm" class="w-7 h-7 border border-tertiary inset-shadow-sm inset-shadow-white/50">_
      </UButton>
      <UButton color="primary" size="sm" class="w-7 h-7 border border-tertiary inset-shadow-sm inset-shadow-white/50">&#9633;
      </UButton>
      <UButton color="close-button" size="sm" class="w-7 h-7 border border-tertiary inset-shadow-sm inset-shadow-white/50">x
      </UButton>
    </div>
  </header>
</template>


<style lang="css">
</style>