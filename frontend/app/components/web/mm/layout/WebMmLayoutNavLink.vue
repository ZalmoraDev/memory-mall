<script setup lang="ts">
const props = defineProps<Props>();
const colorMode = useColorMode();

interface Props {
  readonly mmIconLight: string; // memory mall path prefix
  readonly mmIconDark: string; // memory mall path prefix
  readonly mmLink: string; // memory mall path prefix
  readonly text: string;
  readonly alt: string;
}

const mmIcon = computed(() => colorMode.value.startsWith("light") ? props.mmIconLight : props.mmIconDark);
</script>

<template>
  <a
    :href="'mm' + mmLink"
    class="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-web-mm-top no-underline!"
  >
    <img :src="'/icons/web/mm/' + mmIcon" class="h-6" :alt="alt" />
    <!-- data-expanded TRUE=block, FALSE=hidden -->
    <span class="whitespace-nowrap hidden group-data-expanded:block">{{ text }}</span>
  </a>
</template>

<style>
@import "~/assets/css/web/memory-mall.css";
</style>
