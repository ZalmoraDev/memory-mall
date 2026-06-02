<script setup lang="ts">
import { ref } from "vue";
const isExpanded = ref(true);
</script>

<template>
  <aside
    class="web-mm-STYLE group flex flex-col shrink-0 h-full transition-all duration-300 ease-in-out bg-web-mm-bg-top border-r border-neutral-200"
    :class="isExpanded ? 'w-64' : 'w-16'"
    :data-expanded="isExpanded || undefined"
  >
    <!-- Section: Logo -->
    <div class="flex items-center justify-between h-16 p-4 border-b border-neutral-200">
      <!-- Logo and Site Name -->
      <a href="/" class="flex items-center min-w-0 hover:brightness-50">
        <img src="/icons/web/mm/logo-000.svg" alt="Haarlem Festival Logo" class="w-8 h-8 shrink-0"/>
        <h1 class="opacity-0 group-data-[expanded]:opacity-100 text-xl ml-2 whitespace-nowrap overflow-hidden transition-opacity duration-300"></h1>
      </a>
    </div>

    <!-- Collapse Button -->
    <div class="p-4 border-b border-neutral-200 flex justify-center">
      <button
        @click="isExpanded = !isExpanded"
        class="text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 cursor-pointer whitespace-nowrap overflow-hidden transition-colors"
      >
        {{ isExpanded ? 'Collapse' : 'Expand' }}
      </button>
    </div>

    <!-- Section: Pagenav -->
    <nav class="flex-1 py-4 flex flex-col gap-4 px-2 overflow-y-auto overflow-x-hidden">
      <!-- Category: Themes -->
      <div class="flex flex-col">
        <div class="fest-nav-category">
          <span class="fest-nav-category-short">E</span>
          <span class="fest-nav-category-full">Events</span>
        </div>
        <WebMmLayoutNavLink mmIcon="logo-000.svg" mmLink="/p" text="Products" alt="Loud music icon" />
        <WebMmLayoutNavLink mmIcon="logo-000.svg" mmLink="/history" text="History" alt="History scroll icon" />
        <WebMmLayoutNavLink mmIcon="logo-000.svg" mmLink="/jazz" text="Jazz" alt="Jazz trumpet icon" />
        <WebMmLayoutNavLink mmIcon="logo-000.svg" mmLink="/yummy" text="Yummy" alt="Knife and fork icon" />
      </div>

      <!-- Category: Other -->
      <div class="flex flex-col">
        <div class="fest-nav-category">
          <span class="fest-nav-category-short">O</span>
          <span class="fest-nav-category-full">Other</span>
        </div>
        <WebMmLayoutNavLink mmIcon="logo-000.svg" mmLink="/attribution" text="Attribution" alt="Credited authors icon" />
      </div>
    </nav>

    <!-- Section: User Info -->
    <div class="border-t border-neutral-200 p-2">
      <WebMmLayoutNavLink mmIcon="logo-000.svg" mmLink="/cart" text="Cart" alt="Cart icon" />
      <WebMmLayoutNavLink mmIcon="logo-000.svg" mmLink="/settings" text="Settings" alt="Userprofile icon" />
      <WebMmLayoutNavLink mmIcon="logo-000.svg" mmLink="/login" text="Log in" alt="Login icon" />
      <form action="/auth/logout" method="POST">
        <input type="hidden" name="csrf">
        <button type="submit" class="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors mb-0 group/item w-full cursor-pointer">
          <img src="/icons/web/mm/logo-000.svg" alt="Logout icon">
          <span class="fest-nav-item-text">Log out</span>
        </button>
      </form>
    </div>
  </aside>
</template>

<style>
@import "~/assets/css/web/memory-mall.css";
</style>
