<script setup lang="ts">
const showStartMenu = ref(false);
async function onClickStartButton() {
  showStartMenu.value = !showStartMenu.value;
}
</script>

<template>
  <footer class="os-STYLE os-taskbar-colors os-inline-highlight flex items-center justify-between h-8 w-fill text-os-fg-md">
    <button
      @click="onClickStartButton"
      class="os-button os-taskbar-startbutton-colors font-bold text-white! rounded-l-none! rounded-r-[13px]! h-full py-1 pl-2 pr-4 text-lg flex items-center gap-1 cursor-pointer"
    >
      <Icon name="material-symbols:window" class="text-white text-xl" />
      start
    </button>
    <OsStartMenu v-if="showStartMenu" />
  </footer>
</template>

<style>
@import "~/assets/css/operating-system.css";
</style>
