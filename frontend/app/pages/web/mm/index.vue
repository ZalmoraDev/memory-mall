<!------------------------->
<!-- WEBSITE: Memory Mall-->
<!------------------------->
<script setup lang="ts">
useSeoMeta({
  title: "Memory Mall - Tech Deals & Electronics",
});

definePageMeta({
  title: "Home",
});

const popularBusinessProducts = [
  { uuid: "1", title: "Intel Pentium 4 Desktop PC", price: 299.99, condition: "new", category: "Desktops" },
  { uuid: "2", title: 'Sony 17" CRT Monitor', price: 199.99, condition: "excellent", category: "Monitors" },
  { uuid: "3", title: "Canon PowerShot Digital Camera", price: 149.99, condition: "open-box", category: "Cameras" },
  { uuid: "4", title: "Creative Sound Blaster", price: 89.99, condition: "fair", category: "Speakers" },
  { uuid: "5", title: "Maxtor 250GB Hard Drive", price: 119.99, condition: "good", category: "Storage" },
  { uuid: "6", title: "Samsung 512MB RAM", price: 49.99, condition: "refurbished", category: "Memory" },
];
</script>

<template>
  <div class="STYLE-web-mm flex flex-col h-full">
    <main class="flex-1 w-full text-black bg-web-mm-backdrop">
      <WebMmLayoutHeader />
      <WebMmLayoutNav />
      <div class="w-auto m-4 h-64 bg-web-mm-primary-800 rounded-2xl flex items-center justify-center relative overflow-hidden">
        <div class="absolute inset-0 bg-web-mm-primary-800 opacity-50"></div>
        <div class="flex flex-col items-center justify-center text-white text-center px-8 relative z-10">
          <h1 class="text-5xl font-bold mb-4">Memory Mall</h1>
          <p class="text-2xl font-semibold mb-2">Where Users & Companies Trade Tech</p>
          <p class="text-lg mb-6">Buy, sell, and discover vintage electronics and technology from trusted sellers</p>
          <div class="flex gap-4">
            <NuxtLink to="/web/mm/p" class="main-link-button web-mm-glossy-button-primary px-8 py-3 rounded-2xl">Browse Products</NuxtLink>
            <NuxtLink to="/web/mm/p" class="main-link-button web-mm-glossy-button-primary px-8 py-3 rounded-2xl">Start Selling</NuxtLink>
          </div>
        </div>
      </div>

      <div class="flex m-4 gap-4">
        <div class="flex w-full h-full p-4 rounded-t-2xl inset-shadow-sm inset-shadow-white bg-gradient-to-b from-green-500 to-green-300">
          <div class="flex flex-col w-auto h-full gap-2">
            <NuxtLink to="/web/mm/p" class="main-link-button web-mm-glossy-button-green w-64 p-4 rounded-2xl"> All </NuxtLink>
            <NuxtLink to="/web/mm/p" class="main-link-button web-mm-glossy-button-green w-64 p-4 rounded-2xl"> New </NuxtLink>
            <NuxtLink to="/web/mm/p" class="main-link-button web-mm-glossy-button-green w-64 p-4 rounded-2xl"> Refurbished </NuxtLink>
          </div>
          <img src="/images/web/mm/showcase/users.png" class="h-48" />
        </div>

        <div class="flex w-full h-full p-4 rounded-t-2xl inset-shadow-sm inset-shadow-white bg-gradient-to-b from-blue-500 to-blue-300">
          <div class="flex flex-col w-auto h-full gap-2">
            <NuxtLink to="/web/mm/p" class="main-link-button web-mm-glossy-button-blue w-64 p-4 rounded-2xl"> All </NuxtLink>
            <NuxtLink to="/web/mm/p" class="main-link-button web-mm-glossy-button-blue w-64 p-4 rounded-2xl"> New </NuxtLink>
            <NuxtLink to="/web/mm/p" class="main-link-button web-mm-glossy-button-blue w-64 p-4 rounded-2xl"> Refurbished </NuxtLink>
          </div>
          <img src="/images/web/mm/showcase/businesses.png" class="h-48" alt="Apple computer" />
        </div>
      </div>
    </main>
    <WebMmLayoutFooter />
  </div>
</template>

<style>
@import "~/assets/css/web/memory-mall.css";
</style>
