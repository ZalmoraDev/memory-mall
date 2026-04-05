<script setup lang="ts">
import StartMenu from '../StartMenu.vue';
import {ref} from 'vue';

const showStartMenu = ref(false);

async function onClickStartButton() {
  showStartMenu.value = !showStartMenu.value;
}
</script>


<template>
  <footer class="os-taskbar-colors os-inline-highlight flex items-center justify-between h-8 w-fill text-fg-md">
    <UButton @click="onClickStartButton" icon="material-symbols:window"
             class="os-taskbar-startbutton-colors font-bold text-white! rounded-l-none! rounded-r-lg! h-full py-1 pl-2 pr-5 text-lg">
      start
    </UButton>
    <StartMenu v-if="showStartMenu"/>
  </footer>
</template>


<style lang="css">
</style>