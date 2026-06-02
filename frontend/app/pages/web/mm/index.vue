<!------------------------->
<!-- WEBSITE: Memory Mall-->
<!------------------------->
<script setup lang="ts">
useSeoMeta({
  title: "Memory Mall - Tech Deals & Electronics"
});

definePageMeta({
  title: "Home"
});

const popularBusinessProducts = [
  { uuid: "1", title: "Intel Pentium 4 Desktop PC", price: 299.99, condition: "new", category: "Desktops" },
  { uuid: "2", title: 'Sony 17" CRT Monitor', price: 199.99, condition: "excellent", category: "Monitors" },
  { uuid: "3", title: "Canon PowerShot Digital Camera", price: 149.99, condition: "open-box", category: "Cameras" },
  { uuid: "4", title: "Creative Sound Blaster", price: 89.99, condition: "fair", category: "Speakers" },
  { uuid: "5", title: "Maxtor 250GB Hard Drive", price: 119.99, condition: "good", category: "Storage" },
  { uuid: "6", title: "Samsung 512MB RAM", price: 49.99, condition: "refurbished", category: "Memory" }
];
</script>

<template>
  <div class="web-mm-STYLE flex flex-row h-full">
    <WebMmLayoutNav />
    <div class="flex-1 flex flex-col min-w-0 overflow-y-auto">
      <main class="flex-1 w-full bg-web-mm-bg-middle">
        <div class="relative w-auto m-4 h-64 bg-web-mm-pri-200 rounded-2xl flex items-center justify-center overflow-hidden">
          <div class="absolute inset-0 bg-web-mm-pri-200 opacity-50"></div>
          <div class="relative flex flex-col items-center justify-center text-center px-8 z-10">
            <h1 class="text-5xl font-bold mb-4">Memory Mall</h1>
            <p class="text-2xl font-semibold mb-2">Where Users & Companies Trade Tech</p>
            <p class="text-lg mb-6">Buy, sell, and discover vintage electronics and technology from trusted sellers</p>
            <div class="flex gap-4">
              <NuxtLink to="/web/mm/p" class="main-link-button web-mm-gradient-pri px-8 py-3 rounded-2xl">Browse Products</NuxtLink>
              <NuxtLink to="/web/mm/p" class="main-link-button web-mm-gradient-pri px-8 py-3 rounded-2xl">Start Selling</NuxtLink>
            </div>
          </div>
        </div>

        <div class="bg-web-mm-bg-bottom mx-4 p-4 rounded-xl">
          <h2 class="text-2xl font-bold mb-2">Search Products</h2>
          <p class="text-web-mm-fg-dim mb-4">Find the best tech deals or retro computers by searching catalog items below.</p>
          <div class="relative w-full">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon name="material-symbols:search" class="text-web-mm-fg-dim text-xl" />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              class="w-full px-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-web-mm-pri-300"
            />
          </div>
        </div>
      </main>
      <WebMmLayoutFooter />
    </div>
  </div>
</template>

<style>
@import "~/assets/css/web/memory-mall.css";
</style>
