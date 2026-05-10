<script setup lang="ts"></script>

<template>
  <!-- Uses NuxtColorMode, which is a dependency of Nuxt-ui -->
  <select class="STYLE-os w-full" v-model="$colorMode.preference">
    <option value="system">Default ({{ $colorMode.value === "light" ? "blue" : "royale noir" }})</option>
    <option value="os-blue">Light: blue</option>
    <option value="os-olive-green">Light: olive green</option>
    <option value="os-silver">Light: silver</option>
    <option value="os-royale-noir">Dark: royale noir</option>
    <option value="os-zune">Dark: zune</option>
    <option value="os-embedded">Dark: embedded</option>
  </select>
</template>

<style>
@import "~/assets/css/operating-system.css";
</style>
