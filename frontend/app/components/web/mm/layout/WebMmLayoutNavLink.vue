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
  <a :href="'mm' + mmLink" class="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors mb-0 group/item">
    <img :src="'/icons/web/mm/' + mmIcon" class="w-6 h-6 shrink-0" :alt="alt">
    <span class="fest-nav-item-text">{{text}}</span>
  </a>
</template>

<style>
@import "~/assets/css/web/memory-mall.css";
</style>
