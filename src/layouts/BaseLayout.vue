<script setup lang="ts">
import { useRouter } from "vue-router";

import BaseHeader from "@/common/components/BaseHeader.vue";

const { currentRoute } = useRouter();
</script>

<template>
  <div
    id="page-container"
    class="flex flex-col mx-auto w-full min-h-screen bg-gray-100"
  >
    <main id="page-content" class="flex flex-auto flex-col max-w-full">
      <div class="bg-gray-800">
        <BaseHeader />
      </div>

      <div class="grow">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="currentRoute.path" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>
