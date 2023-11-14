<script setup lang="ts">
import BaseNavigation from "@/common/components/navigations/BaseNavigation.vue";
import SocialIconList from "@/modules/SocialIconList.vue";
import LanguageSelector from "@/modules/LanguageSelector.vue";
import { navigations } from "@/common/constants/navigation";
</script>

<template>
  <div class="bg-cover bg-bottom">
    <div class="bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-sm">
      <!-- Header -->
      <header id="page-header" class="flex flex-none items-center py-10 z-1">
        <div class="flex flex-col text-center md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0 container xl:max-w-7xl mx-auto px-4 lg:px-10">
          <div>
            <RouterLink :to="{name: 'home'}" class="inline-flex items-center space-x-2 font-bold text-lg tracking-wide text-white hover:opacity-75">
              <img src="/assets/images/logo.png" class="text-indigo-300 opacity-75 hi-outline hi-cube-transparent inline-block w-6 h-6" alt="logo">
              <span>Ryujinx</span>
            </RouterLink>
          </div>
          <div class="flex flex-col text-center md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0 md:space-x-10">
            <BaseNavigation :navigations="navigations" />

            <div class="flex items-center justify-center space-x-3">
              <SocialIconList />
            </div>

            <LanguageSelector />
          </div>
        </div>
      </header>
    </div>
  </div>
</template>
