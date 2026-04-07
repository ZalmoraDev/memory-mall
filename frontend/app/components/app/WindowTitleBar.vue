<script setup lang="ts">
</script>


<template>
  <header
      class="os-window-titlebar-colors os-inline-highlight flex items-center justify-between text-fg-md border-b-2 border-primary">
    <div class="p-1 flex items-center gap-2">
      <img src="/icons/browser/MyIE2.png" alt="MyIE2 Logo" class="w-6 h-6 items-center rounded-full"/>
      <div class="font-bold text-fg-on-pri">[PAGE TITLE] - Michaelsoft MyIE2</div>
    </div>
    <div class="p-0.75 flex items-center gap-0.5">
      <UButton size="md" icon="material-symbols:minimize-rounded" :ui="{leadingIcon: 'text-white'}"
               class="os-button-general-colors os-inline-highlight w-7 h-7 border border-primary">
      </UButton>
      <UButton size="md" icon="mdi:window-maximize" :ui="{leadingIcon: 'text-white'}"
               class="os-button-general-colors os-inline-highlight w-7 h-7 border border-primary">
      </UButton>
      <UButton size="md" icon="material-symbols:close-rounded" :ui="{leadingIcon: 'text-white'}"
               class="os-button-close-colors os-inline-highlight w-7 h-7 border border-primary">
      </UButton>
    </div>
  </header>
</template>