<script setup lang="ts">
const themes = ['blue', 'olive green', 'silver', 'royale noir', 'zune', 'embedded']
const currentThemeIndex = useCookie<number>('theme_index', { default: () => 0 })

const cycleTheme = () => {
  currentThemeIndex.value = ((currentThemeIndex.value ?? 0) + 1) % themes.length
  document.documentElement.setAttribute('data-theme', themes[currentThemeIndex.value ?? 0])
}

onMounted(() => {
  document.documentElement.setAttribute('data-theme', themes[currentThemeIndex.value ?? 0])
})
</script>

<template>
  <button
    @click="cycleTheme"
    class="px-3 py-1 bg-(--th-primary) text-white border-2 border-(--th-secondary) rounded shadow hover:opacity-90"
    title="Cycle Windows XP Themes"
  >
    Theme: {{ themes[currentThemeIndex ?? 0] }}
  </button>
</template>
