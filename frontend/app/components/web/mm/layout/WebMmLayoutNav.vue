<script setup lang="ts">
import { ref } from "vue";
const isExpanded = ref(true);
</script>

<template>
  <div class="web-mm-STYLE group flex flex-col shrink-0 h-full bg-web-mm-bg-top" :class="isExpanded ? 'w-64' : 'w-13'" :data-expanded="isExpanded || null">
    <!-- region Logo -->
    <div class="flex items-center justify-between h-16 p-4 border-b border-neutral-200">
      <button @click="isExpanded = !isExpanded" class="p-0 flex items-center min-w-0 hover:brightness-50">
        <img src="/icons/web/mm/logo-000.svg" alt="Memory Mall logo" class="w-8 h-8 group-hover:hidden" />
        <Icon name="bi:layout-sidebar" alt="Memory Mall logo" class="w-8 h-8 hidden group-hover:block" />
      </button>
    </div>
    <!-- endregion Logo -->

    <!-- region Navlinks -->
    <nav class="flex-1 py-4 flex flex-col gap-4 px-2 overflow-y-auto overflow-x-hidden">
      <div class="flex flex-col">
        <div class="local-category">
          <span class="local-category-short">E</span>
          <span class="local-category-full">Events</span>
        </div>
        <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/p" text="Products" alt="Loud music icon" />
        <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/history" text="History" alt="History scroll icon" />
        <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/jazz" text="Jazz" alt="Jazz trumpet icon" />
        <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/yummy" text="Yummy" alt="Knife and fork icon" />
      </div>

      <div class="flex flex-col">
        <div class="local-category">
          <span class="local-category-short">O</span>
          <span class="local-category-full">Other</span>
        </div>
        <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/attribution" text="Attribution" alt="Credited authors icon" />
      </div>
    </nav>

    <!-- region User -->
    <div class="border-t border-neutral-200 p-2">
      <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/cart" text="Cart" alt="Cart icon" />
      <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/settings" text="Settings" alt="Userprofile icon" />
      <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/login" text="Log in" alt="Login icon" />
      <WebMmLayoutNavLink mmIconLight="logo-000.svg" mmIconDark="logo-FFF.svg" mmLink="/login" text="Log out" alt="Login icon" />
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
</template>

<style>
@import "~/assets/css/web/memory-mall.css";

.local-category {
  @apply flex items-center p-3 pt-3 rounded-md font-semibold text-sm text-neutral-400 relative mb-0;
}

.local-category-short {
  @apply group-data-expanded:opacity-0 transition-opacity duration-300 w-6 text-center shrink-0;
}

.local-category-full {
  @apply opacity-0 group-data-expanded:opacity-100 transition-opacity duration-300 absolute left-3 top-3 whitespace-nowrap;
}
</style>
