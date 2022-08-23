<script lang="ts" setup>
import {
  QuestionMarkCircleIcon,
  CodeIcon,
  CashIcon,
} from "@heroicons/vue/solid";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const DISCORD_URL = import.meta.env.VITE_DISCORD_URL;
const PATREON_URL = import.meta.env.VITE_PATREON_URL;
</script>

<template>
  <div>
    <!-- Heading -->
    <div class="bg-gray-800">
      <div
        class="flex flex-col lg:flex-row-reverse space-y-16 lg:space-y-0 text-center lg:text-left container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32"
      >
        <div class="lg:w-1/2 lg:flex lg:items-center">
          <div>
            <i18n-t
              class="text-3xl md:text-4xl font-extrabold mb-4 text-white"
              keypath="views.contribute.title1"
              tag="h2"
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
        <div
          class="lg:w-1/2 lg:mr-16 lg:flex lg:justify-center lg:items-center"
        >
          <div class="relative">
            <img
              alt="Hero Image"
              class="relative mx-auto"
              src="/assets/images/shell.png"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Github + patreon -->
    <div class="bg-gray-100">
      <div
        class="space-y-16 container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32"
      >
        <!-- Heading -->
        <div class="text-center">
          <div
            class="text-sm uppercase font-bold tracking-wider mb-1 text-sky-700"
          >
            <QuestionMarkCircleIcon
              class="hi-solid hi-terminal inline-block w-10 h-10"
            />
          </div>
          <h2 class="text-3xl md:text-4xl font-extrabold mb-4">
            {{ t("views.contribute.titleContribute") }}
          </h2>
        </div>

        <!-- Features -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <div
            class="group p-5 transition ease-out duration-200 border border-transparent rounded-2xl hover:border-gray-200 flex flex-col"
          >
            <div class="text-center">
              <div
                class="inline-flex items-center justify-center w-12 h-12 m-5 mb-12 relative"
              >
                <div
                  class="absolute inset-0 rounded-3xl -m-5 transform rotate-3 bg-sky-300 transition ease-out duration-200 group-hover:-rotate-3 group-hover:scale-105 group-hover:shadow-lg"
                />
                <div
                  class="absolute inset-0 rounded-2xl -m-2 transform -rotate-3 bg-sky-700 bg-opacity-75 shadow-inner transition ease-out duration-200 group-hover:rotate-2 group-hover:scale-105"
                />
                <CodeIcon
                  class="text-white relative transform transition ease-out duration-200 group-hover:scale-110 hi-outline hi-adjustments inline-block w-8 h-8"
                />
              </div>
            </div>
            <h4 class="text-lg font-bold mb-2 text-center">
              {{ t("views.contribute.areaDevTitle") }}
            </h4>
            <p class="leading-relaxed text-gray-600 mb-3 flex-grow">
              {{ t("views.contribute.areaDevDescription") }}
            </p>
            <div class="text-center">
              <GButton variant="sky" rounded :href="DISCORD_URL">{{ t("views.contribute.joinDiscord") }}</GButton>
            </div>
          </div>
          <div
            class="group p-5 transition ease-out duration-200 border border-transparent rounded-2xl hover:border-gray-200 flex flex-col"
          >
            <div class="text-center">
              <div
                class="inline-flex items-center justify-center w-12 h-12 m-5 mb-12 relative"
              >
                <div
                  class="absolute inset-0 rounded-3xl -m-5 transform rotate-3 bg-red-300 transition ease-out duration-200 group-hover:-rotate-3 group-hover:scale-105 group-hover:shadow-lg"
                />
                <div
                  class="absolute inset-0 rounded-2xl -m-2 transform -rotate-3 bg-red-700 bg-opacity-75 shadow-inner transition ease-out duration-200 group-hover:rotate-2 group-hover:scale-105"
                />
                <CashIcon
                  class="text-white relative transform transition ease-out duration-200 group-hover:scale-110 hi-outline hi-adjustments inline-block w-8 h-8"
                />
              </div>
            </div>
            <h4 class="text-lg font-bold mb-2 text-center">
              {{ t("views.contribute.areaDonationTitle") }}
            </h4>
            <p class="leading-relaxed text-gray-600 mb-3 flex-grow">
              {{ t("views.contribute.areaDonationDescription") }}
            </p>
            <div class="text-center">
              <GButton variant="light-red" :href="PATREON_URL" rounded>{{ t("views.contribute.becomePatron") }}</GButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
