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
  <header class="os-STYLE flex items-center justify-between rounded-t-md text-os-fg-md border-b-2 border-os-pri os-inline-highlight os-window-titlebar-colors">
    <div class="p-1 flex items-center gap-2">
      <img src="/icons/web/MyIE2.png" alt="MyIE2 Logo" class="w-6 h-6 items-center rounded-full" />
      <div class="font-bold text-os-fg-on-pri">{{ pageTitle }} - Michaelsoft MyIE2</div>
    </div>
    <div class="p-0.75 flex items-center gap-0.5">
      <!--  TODO: THIS WAS A UI COMP-->
      <button class="os-button-general-colors os-inline-highlight w-7 h-7 border border-os-pri flex items-center justify-center">
        <Icon name="material-symbols:minimize-rounded" class="text-white text-base" />
      </button>
      <!--  TODO: THIS WAS A UI COMP-->
      <button class="os-button-general-colors os-inline-highlight w-7 h-7 border border-os-pri flex items-center justify-center">
        <Icon name="mdi:window-maximize" class="text-white text-sm" />
      </button>
      <!--  TODO: THIS WAS A UI COMP-->
      <button class="os-button-close-colors os-inline-highlight w-7 h-7 border border-os-pri flex items-center justify-center">
        <Icon name="material-symbols:close-rounded" class="text-white text-base" />
      </button>
    </div>
  </header>
</template>

<style>
@import "~/assets/css/operating-system.css";
</style>
