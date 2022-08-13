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
  activeClass: {
    type: String,
    default: "text-blue-600 bg-blue-50",
  },
});

const getComponent = (node: NavigationNode) => {
  if (node.to) {
    return { component: "RouterLink", props: { to: { name: node.to } } };
  }
  return { component: "a", props: { href: node.href } };
};
</script>

<template>
  <nav :class="navClass">
    <template
      v-for="(node, nodeIndex) in navigations"
      :key="`part-${nodeIndex}`"
    >
      <component
        :is="getComponent(node).component"
        v-bind="{...getComponent(node).props}"
        class="font-semibold text-gray-300 hover:text-gray-400"
        :active-class="activeClass"
      >
        <span>{{ node.name }}</span>
      </component>
    </template>
  </nav>
</template>
