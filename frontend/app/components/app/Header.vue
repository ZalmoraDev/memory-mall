<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const appConfig = useAppConfig();
</script>


<template>
  <header
      class="mm-inline-highlight flex items-center justify-between text-fg-md border-b-2 border-primary comp-bg-pri-sec">
    <div class="p-1 flex items-center gap-2">
      <img src="/icons/browser/MyIE2.png" alt="MyIE2 Logo" class="w-6 h-6 rounded-full"/>
      <div class="font-bold text-fg-on-pri">[PAGE TITLE] - Michaelsoft MyIE2</div>
    </div>
    <div class="p-1 flex items-center gap-1">
      <UButton size="sm" class="mm-inline-highlight bg-linear-to-b from-primary to-secondary/80 w-7 h-7 border border-primary inset-shadow-sm">_
      </UButton>
      <UButton size="sm" class="mm-inline-highlight bg-linear-to-b from-primary to-secondary/80 w-7 h-7 border border-primary inset-shadow-sm">&#9633;
      </UButton>
      <UButton size="sm" class="mm-inline-highlight bg-linear-to-b from-close-button to-close-button/50 w-7 h-7 border border-primary inset-shadow-sm">x
      </UButton>
    </div>
  </header>
</template>


<style lang="css">
</style>