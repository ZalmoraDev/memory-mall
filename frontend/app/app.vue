<template>
  <div>
  </div>
</template>
<script>
fetch('http://localhost:3000/api/health')
    .then(res => res.json())
    .then(console.log)
</script>