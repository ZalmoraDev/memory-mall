<script setup lang="ts">

interface Props {
  readonly mmIcon: string; // memory mall path prefix
  readonly mmLink: string; // memory mall path prefix
  readonly text: string;
}

const props = defineProps<Props>();
</script>

<template>
  <a :href="'mm' + mmLink" class="fest-nav-item group/item">
    <img :src="'/icons/web/mm/' + mmIcon" class="fest-nav-item-icon" alt="Loud music icon">
    <span class="fest-nav-item-text">{{text}}</span>
  </a>
</template>

<style>
@import "~/assets/css/web/memory-mall.css";
</style>
