<script setup lang="ts">
import { ref } from "vue";
const isExpanded = ref(false);

const colorMode = useColorMode();
const mmIcon = computed(() => (colorMode.value.startsWith("light") ? "logo-000.svg" : "logo-FFF.svg"));
</script>

<template>
  <!-- TEMPLATE WebMmLayoutNav.vue -->
  <div
    class="web-mm-STYLE group flex flex-col cursor-e-resize bg-web-mm-bottom border-r border-web-mm-top!"
    :class="isExpanded ? 'w-56' : 'w-13'"
    :data-expanded="isExpanded || null"
  >
    <!-- region Logo -->
    <div class="flex justify-center border-b border-web-mm-top">
      <button @click="isExpanded = !isExpanded" class="h-6 px-2 py-1.5 flex items-center min-w-0 hover:bg-web-mm-top">
        <img :src="'/icons/web/mm/' + mmIcon" alt="Memory Mall logo" class="group-hover:hidden" />
        <Icon name="bi:layout-sidebar" alt="Memory Mall logo" class="hidden group-hover:block" />
      </button>
    </div>
    <!-- endregion Logo -->

    <!-- region Navlinks -->
    <nav class="flex-1 flex flex-col gap-2 px-1 ">
      <div class="flex flex-col">
        <div class="local-category">
          <span class="local-category-short">B</span>
          <span class="local-category-full">Buy</span>
        </div>
        <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/p" text="Products" alt="Loud music icon" />
        <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/history" text="History" alt="History scroll icon" />
        <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/jazz" text="Jazz" alt="Jazz trumpet icon" />
        <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/yummy" text="Yummy" alt="Knife and fork icon" />
      </div>

      <div class="flex flex-col">
        <div class="local-category">
          <span class="local-category-short">S</span>
          <span class="local-category-full">Sell</span>
        </div>
        <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/attribution" text="Attribution" alt="Credited authors icon" />
      </div>
    </nav>
    <!-- endregion Navlinks -->

    <!-- region User -->
    <div class="flex flex-col px-1 border-t border-web-mm-top">
      <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/cart" text="Cart" alt="Cart icon" />
      <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/settings" text="Settings" alt="Userprofile icon" />
      <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/result" text="Log in" alt="Login icon" />
      <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/result" text="Log out" alt="Login icon" />
      <!--      <form action="/web/mm/auth/logout" method="POST">-->
      <!--        <input type="hidden" name="csrf" />-->
      <!--        <button type="submit" class="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors mb-0 group/item w-full cursor-pointer">-->
      <!--          <img src="/icons/web/mm/logo-000.svg" alt="Logout icon" />-->
      <!--          <span class="local-item-text">Log out</span>-->
      <!--        </button>-->
      <!--      </form>-->
    </div>
    <!-- endregion User -->
  </div>
  <!-- endTEMPLATE WebMmLayoutNav.vue -->
</template>

<style>
@import "~/assets/css/web/memory-mall.css";

.local-category {
  @apply flex items-center px-3 py-2 ml-1 font-semibold text-sm text-red-500;
}

.local-category-short {
  @apply group-data-expanded:opacity-0 duration-300;
}

.local-category-full {
  @apply opacity-0 group-data-expanded:opacity-100 absolute duration-300;
}
</style>
