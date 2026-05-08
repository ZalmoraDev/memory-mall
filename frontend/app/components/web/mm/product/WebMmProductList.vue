<script setup lang="ts">
import type {WebMmProductCondition} from '~/shared/types/web/mm';

interface Props {
  readonly uuid: string;
  readonly title: string;
  readonly price: number;
  readonly condition: WebMmProductCondition;
  readonly image?: string;
}

const props = defineProps<Props>();
const getBgColorClass = () => {
  switch (props.condition) {
    case 'new':
    case 'open-box':
      return 'bg-green-600';
    case 'refurbished':
    case 'excellent':
      return 'bg-blue-600';
    case 'good':
    case 'fair':
      return 'bg-purple-600';
    case 'damaged':
    case 'parts-only':
    default:
      return 'bg-gray-600';
  }
};
</script>

<template>
  <NuxtLink
      class="m-1 rounded-md cursor-pointer hover:opacity-85 hover:shadow-2xl bg-white border-b border-r border-gray-200">
    <!-- TOP: Product Image -->
    <div
        class="flex items-center justify-center overflow-hidden mb-2 h-40 border-b-2 border-dashed border-gray-300 bg-gray-100">
      <img v-if="image" :src="image" :alt="title" class="w-full h-full object-cover">
      <div v-else class="text-gray-400 text-center text-sm">[Product Image]</div>
    </div>

    <div class="p-2">
      <!-- CENTER: Product Info -->
      <div class="px-1">
        <h3 class="overflow-hidden mb-1 font-bold text-sm text-black">{{ title }}</h3>
        <div class="mb-1">
        <span :class="`inline-block px-2 py-1 text-white text-xs font-bold uppercase ${getBgColorClass()}`">
          {{ condition }}
        </span>
        </div>

        <!-- Price -->
        <div class="mb-2 text-xl font-black text-mm-primary">${{ price }}</div>
      </div>

      <!-- BOTTOM LEFT: Product Info -->


      <!-- BOTTOM RIGHT: Product Info -->
    </div>
  </NuxtLink>
</template>