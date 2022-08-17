<script setup lang="ts">
import { computed, defineEmits, defineProps } from "vue";
import { RefreshIcon } from "@heroicons/vue/outline";

import {
  buttonClassic,
  buttonBlue,
  buttonEmerald,
  buttonOrange,
  buttonPink,
  buttonRed,
  buttonLightBlue,
  buttonLightRed,
  buttonLightOrange,
  buttonGrey,
  buttonLightGray,
  buttonSky
} from "@/common/constants/buttonColors";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  extraClass: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "button",
  },
  loading: Boolean,
  size: {
    type: String,
    default: "",
    validator: (val: string) => ["esm", "sm", "lg", "elg", ""].includes(val),
  },
  to: {
    type: [String, Object],
    default: undefined,
  },
  href: {
    type: String,
    default: undefined,
  },
  variant: {
    type: String,
    default: "",
    validator: (val: string) =>
      [
        "",
        "sky",
        "emerald",
        "orange",
        "red",
        "blue",
        "pink",
        "sky",
        "grey",
        "light-blue",
        "light-red",
        "light-orange",
        "light-gray",
      ].includes(val),
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  roundedLeft: {
    type: Boolean,
    default: false,
  },
  roundedRight: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits<{
  (e: "onClick"): void;
}>();

const buttonSize = computed(() => {
  switch (props.size) {
    case "esm":
      return "px-2 py-1 leading-5 text-sm";
    case "sm":
      return "px-3 py-2 leading-5 text-sm";
    case "lg":
      return "px-4 py-3 leading-6";
    case "elg":
      return "px-6 py-4 leading-6";
    default:
      return "px-3 py-2 leading-6";
  }
});

const colors = computed(() => {
  switch (props.variant) {
    case "emerald":
      return buttonEmerald;
    case "orange":
      return buttonOrange;
    case "red":
      return buttonRed;
    case "blue":
      return buttonBlue;
    case "pink":
      return buttonPink;
    case "sky":
      return buttonSky;
    case "light-blue":
      return buttonLightBlue;
    case "light-red":
      return buttonLightRed;
    case "light-orange":
      return buttonLightOrange;
    case "grey":
      return buttonGrey;
    case "light-gray":
      return buttonLightGray;
    default:
      return buttonClassic;
  }
});

const componentType = computed(() => {
  if (props.disabled) {
    return "button";
  }

  if (props.to !== undefined) {
    return "router-link";
  }

  if (props.href !== undefined) {
    return "a";
  }

  return "button";
});

const componentClass = computed(() => {
  return [
    "inline-flex justify-center items-center md:lg:space-x-2 border font-semibold focus:outline-none appearance-none",
    props.extraClass,
    buttonSize.value,
    colors.value,
    {
      "cursor-not-allowed opacity-50": props.disabled,
      "cursor-pointer": props.to !== undefined,
      rounded: props.rounded,
      "rounded-l": props.roundedLeft,
      "rounded-r": props.roundedRight,
    },
  ];
});

const onClick = () => {
  if (props.disabled || props.loading) {
    return;
  }

  emit("onClick");
};
</script>

<template>
  <Component
    :is="componentType"
    v-if="componentType !== 'router-link' ||  disabled"
    :to="to"
    :href="href"
    :type="type"
    :disabled="disabled"
    :class="componentClass"
    @click="onClick"
  >
    <slot name="loading-icon">
      <RefreshIcon
        v-if="loading"
        class="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      />
    </slot>
    <slot v-if="!loading" name="icon"></slot>
    <span><slot /></span>
  </Component>

  <!-- Prevent Href attribute override -->
  <router-link v-else :to="to" :class="componentClass" :type="type">
    <slot name="loading-icon">
      <RefreshIcon
        v-if="loading"
        class="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      />
    </slot>
    <slot v-if="!loading" name="icon"></slot>
    <span><slot /></span>
  </router-link>
</template>
