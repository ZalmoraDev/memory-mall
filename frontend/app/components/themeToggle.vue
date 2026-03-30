<script setup lang="ts">
const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>


<template>
  <button @click="toggleTheme">Switch Modes</button>
</template>


<style lang="css">
</style>