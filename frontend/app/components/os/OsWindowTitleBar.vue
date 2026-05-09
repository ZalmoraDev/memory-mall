<script setup lang="ts">
const route = useRoute();

// TODO: Refactor this
const pageTitle = computed(() => {
  if (route.name === "index") return "Schmoogle";
  const baseTitle = route.meta?.title || route.name || "Page not found";
  return `${baseTitle} | Memory Mall`;
});
</script>

<template>
  <header class="os-window-titlebar-colors os-inline-highlight flex items-center justify-between text-os-fg-md border-b-2 border-os-primary">
    <div class="p-1 flex items-center gap-2">
      <img src="/icons/web/MyIE2.png" alt="MyIE2 Logo" class="w-6 h-6 items-center rounded-full" />
      <div class="font-bold text-os-fg-on-pri">{{ pageTitle }} - Michaelsoft MyIE2</div>
    </div>
    <div class="p-0.75 flex items-center gap-0.5">
      <UButton size="md" icon="material-symbols:minimize-rounded" :ui="{ leadingIcon: 'text-white' }" class="os-button-general-colors os-inline-highlight w-7 h-7 border border-os-primary"> </UButton>
      <UButton size="md" icon="mdi:window-maximize" :ui="{ leadingIcon: 'text-white' }" class="os-button-general-colors os-inline-highlight w-7 h-7 border border-os-primary"> </UButton>
      <UButton size="md" icon="material-symbols:close-rounded" :ui="{ leadingIcon: 'text-white' }" class="os-button-close-colors os-inline-highlight w-7 h-7 border border-os-primary"> </UButton>
    </div>
  </header>
</template>
