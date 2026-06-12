<script setup lang="ts">
const colorMode = useColorMode();
const props = defineProps<Props>();

interface Props {
  readonly mmIconLight: string; // memory mall path prefix
  readonly mmIconDark: string; // memory mall path prefix
  readonly mmLink: string; // memory mall path prefix
  readonly text: string;
  readonly alt: string;
}


const mmIcon = computed(() => colorMode.value.startsWith("dark") ? props.mmIconDark : props.mmIconLight);
</script>

<template>
  <a
    :href="'mm' + mmLink"
    class="flex items-center justify-center group-data-expanded:justify-start gap-3 w-full px-1.5 group-data-expanded:px-3 py-2 rounded-md hover:bg-gray-100 transition-colors mb-0 group/item"
  >
    <img :src="'/icons/web/mm/' + mmIcon" class="w-6 h-6 shrink-0" :alt="alt" />
    <span class="whitespace-nowrap hidden group-data-expanded:block">{{ text }}</span>
  </a>
</template>

<style>
@import "~/assets/css/web/memory-mall.css";
</style>
