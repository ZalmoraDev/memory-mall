<script setup lang="ts">
import StartMenu from '../StartMenu.vue';
import { ref } from 'vue';

const runtimeConfig = useRuntimeConfig();
const appConfig = useAppConfig();

const showStartMenu = ref(false);

async function onClickStartButton() {
  showStartMenu.value = !showStartMenu.value;
}
</script>


<template>
  <footer class="mm-color-taskbar mm-inline-highlight flex items-center justify-between h-8 w-fill text-fg-md">
    <UButton @click="onClickStartButton" color="start-button"
             class="font-bold h-full p-1 rounded-l-none! rounded-r-lg! text-lg">
      start
    </UButton>
    <StartMenu v-if="showStartMenu" />
  </footer>
</template>


<style lang="css">
</style>