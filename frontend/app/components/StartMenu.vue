<script setup lang="ts">
</script>


<template>
  <div
      class="absolute bottom-8 left-0 flex flex-col items-center rounded-t-lg border-2 border-primary overflow-hidden w-120 h-160 shadow-[2px_1px_4px_0px_rgba(0,0,0,0.5)]">

    <div
        class="mm-color-startmenu-top mm-inline-highlight flex items-center w-full p-2 gap-2 border-b-2 border-primary">
      <img src="/images/profile-picture.png"
           class="w-16 h-16 rounded-md object-cover self-center border border-neutral-200" alt="profile picture"/>
      <span class="text-xl font-bold text-white text-shadow-md text-shadow-black/50"> Michael</span>
    </div>

    <div class="flex h-full w-full">
      <div class="flex flex-col gap-2 p-4 h-full w-full border-r-2 border-primary/50 bg-bg">
      </div>
      <div class="flex flex-col gap-2 p-4 h-full w-full bg-tertiary text-fg-lg font-bold">
        <ThemeSwitcher/>
      </div>
    </div>

    <div class="mm-color-startmenu-bottom flex justify-end gap-2 p-1 w-full border-t-2 border-primary">
      <div class="flex gap-1 items-center">
        <UButton icon="material-symbols:key-outline" size="md"
                 class="w-8 h-8 bg-amber-400 border border-tertiary inset-shadow-sm inset-shadow-white/50 flex items-center justify-center">
        </UButton>
        <span class="text-sm text-fg-on-pri">Log Off</span>
      </div>
      <div class="flex gap-1 items-center p-1">
        <UButton icon="material-symbols:power-settings-new-outline" size="md"
                 class="w-8 h-8 bg-red-400 border border-tertiary inset-shadow-sm inset-shadow-white/50 flex items-center justify-center">
        </UButton>
        <span class="text-sm text-fg-on-pri">Turn Off Computer</span>
      </div>
    </div>

  </div>
</template>


<style lang="css">
</style>