<script setup lang="ts">
interface Props {
  readonly title: string;
  readonly subtitle?: string;
  readonly color: "green" | "blue";
}

const props = defineProps<Props>();
const getColorClasses = () => {
  switch (props.color) {
    case "green":
      return "from-green-500 to-green-700";
    case "blue":
    default:
      return "from-blue-500 to-blue-700";
  }
};
</script>

<template>
  <div :class="`STYLE-web-mm mt-4 p-3 rounded-t-xl text-white shadow-md bg-linear-to-r ${getColorClasses()}`">
    <h2 class="uppercase tracking-wider text-2xl font-black">{{ title }}</h2>
    <p v-if="subtitle" class="text-sm font-semibold mt-1">{{ subtitle }}</p>
  </div>
</template>

<style>
@import "~/assets/css/web/memory-mall.css";
</style>
