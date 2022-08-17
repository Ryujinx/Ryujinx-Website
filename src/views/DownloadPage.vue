<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";
import axios from "axios";
import dayjs from "dayjs";

import { DownloadRelease } from "@/types";

const { t } = useI18n();
const isLoading = ref(true);
const downloadRelease = ref<DownloadRelease>();
const linuxBuildUrl = ref("");
const windowBuildUrl = ref("");

onMounted(() => {
  fetchBuilds();
});

const fetchBuilds = async () => {
  try {
    const result = await axios.get<DownloadRelease>(
      import.meta.env.VITE_RELEASE_URL
    );
    downloadRelease.value = result.data;

    console.log(result.data);
  } catch (err) {
    console.error(err);
  }
  isLoading.value = false;
};
</script>

<template>
  <div>
    <!-- Download -->
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
          v-if="!isLoading"
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
                {{ downloadRelease.tag_name }}
              </div>
              <div class="relative w-12 mb-8 text-indigo-500 mx-auto">
                <img
                  src="/assets/images/icons/windows.png"
                  alt="windows logo"
                />
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
                {{ downloadRelease.tag_name }}
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
              <div
                class="text-xs uppercase text-gray-400 font-semibold tracking-wider mb-4"
              >
                {{ t("views.download.supportPlanned") }}
              </div>
              <div class="relative w-12 mb-8 text-indigo-500 mx-auto">
                <img src="/assets/images/icons/macos.png" alt="macos logo" />
              </div>
              <h4 class="text-lg font-semibold mb-1 text-gray-900">macOS</h4>
              <div
                class="flex justify-center items-center space-x-1 mt-4 pt-4 text-sm font-medium text-gray-500 border-t border-gray-100"
              >
                <span>{{ t("views.download.notSupported") }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Build -->
        <div
          v-if="!isLoading"
          class="md:flex items-center rounded-lg ring-1 ring-gray-50 ring-opacity-5 bg-white"
        >
          <div class="grow p-5 lg:p-6">
            <h4 class="text-xl font-bold mb-1">Build information</h4>
            <p class="leading-relaxed text-gray-500 mb-5">
              This build was released on
              <span class="font-semibold">
                {{ dayjs(downloadRelease.published_at).format("YYYY-MM-DD") }}
              </span>
            </p>
            <h5 class="flex items-center my-8">
              <span
                class="text-sm uppercase tracking-wide text-indigo-600 font-semibold mr-3"
              >
                GitHub
              </span>
              <span
                aria-hidden="true"
                class="grow bg-indigo-50 rounded h-0.5"
              ></span>
            </h5>
            <div
              class="lg:flex lg:space-x-12 space-y-4 lg:space-y-0 font-medium"
            >
              <ul class="space-y-4 text-sm">
                <li class="flex items-center space-x-2">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    class="text-emerald-500 hi-solid hi-check-circle inline-block w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span> <strong>300+</strong> UI Components </span>
                </li>
                <li class="flex items-center space-x-2">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    class="text-emerald-500 hi-solid hi-check-circle inline-block w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span> <strong>200</strong> Paying Clients </span>
                </li>
              </ul>
              <ul class="space-y-4 text-sm">
                <li class="flex items-center space-x-2">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    class="text-emerald-500 hi-solid hi-check-circle inline-block w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span> <strong>100GB</strong> SSD Storage </span>
                </li>
                <li class="flex items-center space-x-2">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    class="text-emerald-500 hi-solid hi-check-circle inline-block w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span> <strong>Custom</strong> Editors </span>
                </li>
              </ul>
              <ul class="space-y-4 text-sm">
                <li class="flex items-center space-x-2">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    class="text-emerald-500 hi-solid hi-check-circle inline-block w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span> <strong>Builder</strong> Access </span>
                </li>
                <li class="flex items-center space-x-2">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    class="text-emerald-500 hi-solid hi-check-circle inline-block w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span> <strong>24/7</strong> Email Support </span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Author info -->
          <div class="flex-none relative md:w-72 p-5">
            <div class="p-5 lg:p-6 text-center rounded-lg bg-sky-50">
              <a :href="downloadRelease.author.html_url">
                <div>
                  <img
                    class="w-16 h-16 inline-block"
                    :src="downloadRelease.author.avatar_url"
                  />
                </div>
                <div
                  class="inline-flex space-x-1 items-center text-xs uppercase tracking-wider font-semibold px-3 py-1 bg-indigo-200 bg-opacity-50 text-sky-600 rounded-full mb-4"
                >
                  <span>{{ downloadRelease.author.login }}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
