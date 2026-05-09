<script setup lang="ts">
// TODO: Fetch by Main Categories with composable on page load (categories with no parents)
const categories = ["All", "Laptops", "Desktops", "Monitors", "Printers", "Cameras", "Phones", "Tablets", "Speakers", "Memory", "Storage", "Networking"];
</script>

<template>
  <header class="sticky top-0 z-50 flex items-center w-full p-1.5 gap-2 text-white shadow-lg border-b-4 border-red-900 bg-gradient-to-r from-mm-primary to-red-700">
    <!-- Logo + Title -->
    <div class="flex flex-shrink-0 items-center gap-3">
      <img src="/icons/web/mm/logo-FFF.svg" alt="Memory mall logo" class="w-12 h-12" />
      <div>
        <h1 class="text-2xl font-black tracking-wider">MEMORY MALL</h1>
        <p class="text-xs font-bold text-red-100">The #1 Electronics Marketplace</p>
      </div>
    </div>

    <div class="flex flex-wrap gap-1 items-center">
      <button
        v-for="category in categories"
        :key="category"
        class="bg-slate-400 text-white px-3 py-1 border-2 border-slate-600 hover:bg-slate-300 transition text-xs font-bold uppercase shadow-md hover:shadow-lg"
      >
        {{ category }}
      </button>
    </div>

    <!-- Cart & Login/Profile -->
    <div class="flex flex-shrink-0 gap-3 font-bold text-sm">
      <button class="bg-blue-500 text-white px-3 py-1 border-2 border-blue-700 hover:bg-blue-600 transition">CART</button>
      <button class="bg-green-600 text-white px-3 py-1 border-2 border-green-800 hover:bg-green-700 transition">Log In / Register</button>
    </div>
  </header>

  <!--  <div-->
  <!--      class="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 mb-8 border-l border-t border-gray-300 bg-gradient-to-b from-mm-primary to-white">-->
  <!--    <WebMmProductGallery-->
  <!--        v-for="product in popularBusinessProducts"-->
  <!--        :uuid="product.uuid"-->
  <!--        :title="product.title"-->
  <!--        :price="product.price"-->
  <!--        :condition="product.condition as WebMmProductCondition"-->
  <!--    />-->
  <!--  </div>-->
</template>
