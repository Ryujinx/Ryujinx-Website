<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="bg-gray-800">
    <div
      class="flex flex-col lg:flex-row-reverse space-y-16 lg:space-y-0 text-center lg:text-left container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32"
    >
      <div class="lg:w-1/2 lg:flex lg:items-center">
        <div>
          <i18n-t
            keypath="views.contribute.title1"
            tag="h2"
            class="text-3xl md:text-4xl font-extrabold mb-4 text-white"
          >
            <span
              class="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-red-500"
              >{{ t("views.contribute.title2") }}</span
            >
          </i18n-t>
          <h3
            class="text-lg md:text-xl md:leading-relaxed font-medium text-gray-300"
          >
            {{ t("views.contribute.subTitle") }}
          </h3>
        </div>
      </div>
      <div class="lg:w-1/2 lg:mr-16 lg:flex lg:justify-center lg:items-center">
        <div class="relative">
          <img
            src="assets/images/shell.png"
            alt="Hero Image"
            class="relative mx-auto"
          />
        </div>
      </div>
    </div>
  </div>
</template>
