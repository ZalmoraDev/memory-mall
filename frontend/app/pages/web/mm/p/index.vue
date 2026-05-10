<script setup lang="ts">
import type { WebMmProductCondition } from "~/shared/types/web/mm";

definePageMeta({
  title: "Products",
});

useSeoMeta({
  title: "Memory Mall - Products",
});

// TODO: Load by useFeaturedListings.ts
const popularBusinessProducts = [
  { uuid: "1", title: "Intel Pentium 4 Desktop PC", price: 299.99, condition: "new", category: "Desktops" },
  { uuid: "2", title: 'Sony 17" CRT Monitor', price: 199.99, condition: "excellent", category: "Monitors" },
  { uuid: "3", title: "Canon PowerShot Digital Camera", price: 149.99, condition: "open-box", category: "Cameras" },
  { uuid: "4", title: "Creative Sound Blaster", price: 89.99, condition: "fair", category: "Speakers" },
  { uuid: "5", title: "Maxtor 250GB Hard Drive", price: 119.99, condition: "good", category: "Storage" },
  { uuid: "6", title: "Samsung 512MB RAM", price: 49.99, condition: "refurbished", category: "Memory" },
  { uuid: "7", title: "Dell Inspiron Laptop", price: 599.99, condition: "damaged", category: "Laptops" },
  { uuid: "8", title: "HP DeskJet Printer", price: 79.99, condition: "good", category: "Printers" },
  { uuid: "9", title: "Dell Inspiron Laptop", price: 599.99, condition: "excellent", category: "Laptops" },
  { uuid: "10", title: "HP DeskJet Printer", price: 79.99, condition: "parts-only", category: "Printers" },
  { uuid: "11", title: "Creative Sound Blaster", price: 89.99, condition: "new", category: "Speakers" },
  { uuid: "12", title: "Maxtor 250GB Hard Drive", price: 119.99, condition: "open-box", category: "Storage" },
];
</script>

<template>
  <div class="flex flex-col h-full">
    <main class="flex-1 w-full text-black bg-web-mm-backdrop">
      <WebMmLayoutHeader />
      <WebMmLayoutNav />

      <!-- Featured Products Section -->
      <div class="px-4">
        <WebMmSectionHeader title="Trending" subtitle="Business last 7 days" color="blue" />
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mb-8 border-l border-t border-gray-300">
          <WebMmProductGallery
            v-for="product in popularBusinessProducts"
            :uuid="product.uuid"
            :title="product.title"
            :price="product.price"
            :condition="product.condition as WebMmProductCondition"
          />
        </div>
      </div>

      <!-- Featured User Products Section -->
      <div class="px-4">
        <WebMmSectionHeader title="Trending" subtitle="Customer last 7 days" color="green" />
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mb-8 border-l border-t border-gray-300">
          <WebMmProductGallery
            v-for="product in popularBusinessProducts"
            :uuid="product.uuid"
            :title="product.title"
            :price="product.price"
            :condition="product.condition as WebMmProductCondition"
          />
        </div>
      </div>
    </main>
    <WebMmLayoutFooter />
  </div>
</template>

<style>
@import "~/assets/css/web/memory-mall.css";
</style>
