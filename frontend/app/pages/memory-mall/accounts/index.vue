<script setup lang="ts">
const {data} = await useFetch('http://localhost:3000/api/v1/health', {
  server: false
});
</script>


<template>
  <h1>Accounts page</h1>
  <NuxtLink to="/">To Home</NuxtLink><br>
  {{ data }}
</template>