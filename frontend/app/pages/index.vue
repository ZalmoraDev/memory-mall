<script setup lang="ts">
</script>


<template>
  <div class="p-4 flex-1 flex flex-col items-center justify-center">
    <img src="/images/schmoogle.png" alt="Schmoogle Logo">
    <div class="grid grid-cols-3 sm:grid-cols-4 p-2 rounded-xl gap-2 mt-4">
      <UButton
          color="primary"
          :avatar="{src:'/icons/logo/logo-FFF.svg', class:'w-10 h-10 bg-transparent rounded-none'}"
          class="flex flex-col items-center gap-2 text-fg-on-pri"
      >
        <NuxtLink to="/mm" class="text-fg-on-pri">Memory Mall</NuxtLink>
      </UButton>
    </div>
  </div>
</template>