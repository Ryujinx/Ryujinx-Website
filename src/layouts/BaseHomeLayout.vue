<script setup lang="ts">
import { useRouter } from "vue-router";

import BaseHomeHeader from "@/common/components/BaseHomeHeader.vue";
import BaseFooter from "@/common/components/BaseFooter.vue";

const { currentRoute } = useRouter();
</script>

<template>
  <div
    id="page-container"
    class="flex flex-col mx-auto w-full min-h-screen bg-gray-100"
  >
    <main id="page-content" class="flex flex-auto flex-col max-w-full">
      <div class="bg-gray-800">
        <BaseHomeHeader />
      </div>

      <div class="grow">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="currentRoute.path" />
          </transition>
        </router-view>
      </div>

      <BaseFooter />
    </main>
  </div>
</template>
