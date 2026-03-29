<script setup>
const {data} = await useFetch('http://localhost:3000/api/v1/health', {
  server: false
});
</script>

<template>
  <h1>Index page</h1>
  {{ data }}
</template>