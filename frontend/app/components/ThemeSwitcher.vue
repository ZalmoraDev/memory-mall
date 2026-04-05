<script setup lang="ts">
</script>

<template>
  <select class="w-full" v-model="$colorMode.preference">
    <option value="blue">Light: blue</option>
    <option value="olive-green">Light: olive green</option>
    <option value="silver">Light: silver</option>
    <option value="royale-noir">Dark: royale noir</option>
    <option value="zune">Dark: zune</option>
    <option value="embedded">Dark: embedded</option>
  </select>
</template>