<script setup lang="ts">
</script>

<template>
  <div class="bg-tertiary">
    <select v-model="$colorMode.preference">
      <option value="blue">blue</option>
      <option value="olive-green">olive green</option>
      <option value="silver">silver</option>
      <option value="royale-noir">royale noir</option>
      <option value="zune">zune</option>
      <option value="embedded">embedded</option>
    </select>
  </div>
</template>