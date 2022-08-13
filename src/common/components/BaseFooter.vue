<script setup lang="ts">
import { useI18n } from "vue-i18n";

import SocialIconList from "@/modules/SocialIconList.vue";

const copyrightYear = new Date().getFullYear();

const { t } = useI18n();
</script>

<template>
  <footer id="page-footer" class="bg-gray-800 min-h-[10vh]">
    <div
      class="flex flex-col md:flex-row-reverse md:justify-between space-y-6 md:space-y-0 text-center md:text-left text-sm lg:text-base container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-16"
    >
      <nav class="space-x-4">
        <SocialIconList />
      </nav>
      <nav class="space-x-2 sm:space-x-4">
        <router-link
          class="font-medium text-gray-300 hover:text-gray-400"
          v-slot="{ isActive }"
          :to="{ name: 'download' }"
        >
          <span :class="{ 'text-white': isActive }">{{
            t("footer.getStarted")
          }}</span>
        </router-link>
        <RouterLink
          class="font-medium text-gray-300 hover:text-gray-400"
          v-slot="{ isActive }"
          :to="{ name: 'contribute' }"
        >
          <span :class="{ 'text-white': isActive }">{{
            t("footer.contribute")
          }}</span>
        </RouterLink>
      </nav>
      <div class="text-gray-400">
        <span class="font-medium">Ryujinx</span> © {{ copyrightYear }}
      </div>
    </div>
  </footer>
</template>
