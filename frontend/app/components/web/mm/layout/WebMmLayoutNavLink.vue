<script setup lang="ts">

interface Props {
  readonly mmIcon: string; // memory mall path prefix
  readonly mmLink: string; // memory mall path prefix
  readonly text: string;
  readonly alt: string;
}

const props = defineProps<Props>();
</script>

<template>
  <a :href="'mm' + mmLink" class="flex items-center gap-3 w-full h-5 mx-1.5 px-2.5 py-1.5 rounded-md hover:bg-gray-100 transition-colors mb-0 group/item">
    <img :src="'/icons/web/mm/' + mmIcon" :alt="alt">
    <span class="whitespace-nowrap hidden group-data-expanded:block peer-checked:block">{{text}}</span>
  </a>
</template>

<style>
@import "~/assets/css/web/memory-mall.css";
</style>
