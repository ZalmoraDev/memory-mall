<script setup lang="ts">
</script>

<template>
  <!-- Uses NuxtColorMode -->
  <select class="os-STYLE bg-os-ter text-os-fg-lg w-full" v-model="$colorMode.preference">
    <option value="system">Default ({{ $colorMode.value === "light" ? "Light: blue" : "Dark: royale noir" }})</option>
    <option value="light-blue">Light: blue</option>
    <option value="light-olive-green">Light: olive green</option>
    <option value="light-silver">Light: silver</option>
    <option value="dark-royale-noir">Dark: royale noir</option>
    <option value="dark-zune">Dark: zune</option>
    <option value="dark-embedded">Dark: embedded</option>
  </select>
</template>

<style>
@import "~/assets/css/operating-system.css";
</style>