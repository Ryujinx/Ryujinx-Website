<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { NavigationNode } from "@/types";

defineProps({
  navigations: {
    type: Array as PropType<NavigationNode[]>,
    required: true,
  },
  navClass: {
    type: String,
    default: "space-x-4 md:space-x-6",
  },
  linkClass: {
    type: String,
    default: "font-semibold text-gray-300 hover:text-white",
  }
});
</script>

<template>
  <nav :class="navClass">
    <template
      v-for="(node, nodeIndex) in navigations"
      :key="`part-${nodeIndex}`"
    >
      <RouterLink
        v-if="node.to"
        v-slot="{ isActive }"
        :to="{ name: node.to }"
        :class="linkClass"
      >
        <span :class="{ 'text-white': isActive }">{{ node.name }}</span>
      </RouterLink>

      <a v-else :href="node.href" :class="linkClass">
        <span>{{ node.name }}</span>
      </a>
    </template>
  </nav>
</template>
