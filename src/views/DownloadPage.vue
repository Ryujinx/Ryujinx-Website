<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <!-- Features Section: Card Links -->
  <div class="bg-gray-50">
    <div
      class="container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32 space-y-16"
    >
      <!-- Heading -->
      <div class="text-center">
        <i18n-t
          keypath="views.download.title1"
          tag="h2"
          class="text-3xl md:text-4xl font-extrabold mb-4"
        >
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-red-500"
            >{{ t("views.download.title2") }}</span
          >
        </i18n-t>
        <div class="w-12 h-1.5 bg-gray-200 rounded-lg mb-3 mx-auto"></div>
        <h3
          class="md:text-lg text-gray-600 md:leading-relaxed font-medium lg:w-2/3 mx-auto"
        >
          {{ t("views.download.subTitle") }}
        </h3>
      </div>

      <!-- Features -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <!-- Windows -->
        <a
          href="javascript:void(0)"
          class="group relative p-4 lg:p-6 bg-white rounded-xl transition duration-150 shadow-md shadow-gray-100"
        >
          <div
            class="absolute inset-0 bg-white rounded-xl shadow-md shadow-gray-200 transition duration-100 scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-105 group-active:scale-100 group-active:opacity-0"
          ></div>
          <div class="relative text-center">
            <div
              class="text-xs uppercase text-gray-400 font-semibold tracking-wider mb-4"
            >
              1.1.27
            </div>
            <div class="relative w-12 mb-8 text-indigo-500 mx-auto">
              <img src="/assets/images/icons/windows.png" alt="windows logo" />
            </div>
            <h4 class="text-lg font-semibold mb-1 text-gray-900">Windows</h4>
            <p class="leading-relaxed text-gray-500 text-sm font-medium">
              {{ t("views.download.supportWindows") }}
            </p>
            <div
              class="flex justify-center items-center space-x-1 mt-4 pt-4 text-sm font-medium text-gray-500 border-t border-gray-100 group-hover:text-sky-500"
            >
              <span>{{ t("views.download.download") }}</span>
            </div>
          </div>
        </a>
        <!-- Linux -->
        <a
          href="javascript:void(0)"
          class="group relative p-4 lg:p-6 bg-white rounded-xl transition duration-150 shadow-md shadow-gray-100"
        >
          <div
            class="absolute inset-0 bg-white rounded-xl shadow-md shadow-gray-200 transition duration-100 scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-105 group-active:scale-100 group-active:opacity-0"
          ></div>
          <div class="relative text-center">
            <div
              class="text-xs uppercase text-gray-400 font-semibold tracking-wider mb-4"
            >
              1.1.27
            </div>
            <div class="relative w-12 mb-8 text-indigo-500 mx-auto">
              <img src="/assets/images/icons/linux.png" alt="linux logo" />
            </div>
            <h4 class="text-lg font-semibold mb-1 text-gray-900">Linux</h4>
            <p class="leading-relaxed text-gray-500 text-sm font-medium">
              {{ t("views.download.supportLinux") }}
            </p>
            <div
              class="flex justify-center items-center space-x-1 mt-4 pt-4 text-sm font-medium text-gray-500 border-t border-gray-100 group-hover:text-sky-500"
            >
              <span>{{ t("views.download.download") }}</span>
            </div>
          </div>
        </a>
        <!-- Mac OS -->
        <div
          class="group relative p-4 lg:p-6 bg-white rounded-xl transition duration-150 shadow-md shadow-gray-100 opacity-60"
        >
          <div
            class="absolute inset-0 bg-white rounded-xl shadow-md shadow-gray-200 transition duration-100 scale-100 opacity-0"
          ></div>
          <div class="relative text-center">
            <div class="relative w-12 mb-8 text-indigo-500 mx-auto">
              <img src="/assets/images/icons/macos.png" alt="macos logo" />
            </div>
            <h4 class="text-lg font-semibold mb-1 text-gray-900">macOS</h4>
            <p class="leading-relaxed text-gray-500 text-sm font-medium">
              1.1.27
            </p>
            <div
              class="flex justify-center items-center space-x-1 mt-4 pt-4 text-sm font-medium text-gray-500 border-t border-gray-100"
            >
              <span>{{ t("views.download.notSupported") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
