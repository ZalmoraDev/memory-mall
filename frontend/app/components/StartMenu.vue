<script setup lang="ts">
</script>


<template>
  <div class="absolute bottom-8 left-0 flex flex-col items-center rounded-t-xl border-2 border-primary overflow-hidden w-120 h-160 shadow-[2px_1px_4px_0px_rgba(0,0,0,0.5)]">
    <div class="flex items-center w-full p-2 gap-2 mm-bg-pri-sec mm-inline-highlight border-b-2 border-primary">
      <img src="/images/profile-picture.png" class="w-16 h-16 rounded-2xl object-cover self-center border border-neutral-200" alt="profile picture"/>
      <span class="text-xl font-bold text-white text-shadow-md text-shadow-black/50"> Michael</span>
    </div>
    <div class="flex h-full w-full">
      <div class="flex flex-col gap-2 h-full w-full border-r-2 border-primary/50 bg-bg">

      </div>
      <div class="flex flex-col gap-2 h-full w-full  bg-tertiary">
        <ThemeSwitcher/>
      </div>
    </div>
    <div class="flex justify-end gap-2 p-1 w-full mm-bg-sec-pri">
      <div class="flex gap-1 items-center">
        <UButton color="log-off-button" size="sm" class="w-8 h-8 border border-tertiary inset-shadow-sm inset-shadow-white/50">x</UButton>
        <span class="text-sm text-fg-on-pri">Log Off</span>
      </div>
      <div class="flex gap-1 items-center p-1">
        <UButton color="turn-off-button" size="sm" class="w-8 h-8 border border-tertiary inset-shadow-sm inset-shadow-white/50">x</UButton>
        <span class="text-sm text-fg-on-pri">Turn Off Computer</span>
      </div>
    </div>
  </div>
</template>


<style lang="css">
</style>