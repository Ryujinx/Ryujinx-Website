<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import {
  CogIcon,
  ExternalLinkIcon,
  InformationCircleIcon,
} from "@heroicons/vue/solid";

import { DownloadRelease } from "@/types";

const GUIDE_URL = import.meta.env.VITE_GUIDE_URL;
const LDN_BUILD_URL = import.meta.env.VITE_LDN_BUILD_URL;
const { t } = useI18n();
const isLoading = ref(true);
const downloadRelease = ref<DownloadRelease>();
const linuxBuildUrl = ref("");
const windowBuildUrl = ref("");

onMounted(() => {
  fetchBuilds();
});

const totalDownload = computed(() => {
  let total = 0;

  downloadRelease.value?.assets.forEach((a) => (total += a.download_count));

  return total;
});

const fetchBuilds = async () => {
  try {
    const result = await axios.get<DownloadRelease>(
      import.meta.env.VITE_RELEASE_URL
    );
    downloadRelease.value = result.data;

    downloadRelease.value?.assets.forEach((asset) => {
      if (asset.name.endsWith("win_x64.zip")) {
        windowBuildUrl.value = asset.browser_download_url;
      } else if (asset.name.endsWith("linux_x64.tar.gz")) {
        linuxBuildUrl.value = asset.browser_download_url;
      }
    });
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
            class="text-3xl md:text-4xl font-extrabold mb-4"
            keypath="views.download.title1"
            tag="h2"
          >
            <span
              class="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-red-500"
              >{{ t("views.download.title2") }}</span
            >
          </i18n-t>
          <div class="w-12 h-1.5 bg-gray-200 rounded-lg mb-3 mx-auto"></div>
          <i18n-t
            class="md:text-lg text-gray-600 md:leading-relaxed font-medium lg:w-2/3 mx-auto"
            keypath="views.download.subTitle"
            tag="h2"
          >
            <a :href="GUIDE_URL" class="text-sky-500 underline"
              >{{ t("views.download.startupGuide") }}
            </a>
          </i18n-t>
        </div>

        <!-- Features -->
        <div
          v-if="!isLoading"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          <!-- Windows -->
          <a
            :href="windowBuildUrl"
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
                  alt="windows logo"
                  src="/assets/images/icons/windows.png"
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
            :href="linuxBuildUrl"
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
                <img alt="linux logo" src="/assets/images/icons/linux.png" />
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
                <img alt="macos logo" src="/assets/images/icons/macos.png" />
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

        <!-- LDN Build -->
        <div
          class="p-10 lg:py-10 lg:px-16 bg-white rounded text-center relative"
        >
          <div class="space-y-10">
            <!-- Heading -->
            <div class="text-center">
              <i18n-t class="text-2xl md:text-2xl font-extrabold mb-4" tag="h2" keypath="views.download.ldnBuildTitle">
                <span class="text-sky-600">{{ t("views.download.ldnBuild") }}</span>
              </i18n-t>
              <h3
                class="text-lg md:text-xl md:leading-relaxed font-medium text-gray-600"
              >
                {{ t("views.download.ldnBuildDescription") }}
              </h3>
            </div>

            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-center space-y-4 sm:space-y-0 sm:space-x-2"
            >
              <a
                :href="LDN_BUILD_URL"
                class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-6 py-4 leading-6 rounded border-gray-200 bg-gray-200 text-gray-700 hover:text-gray-700 hover:bg-gray-300 hover:border-gray-300 focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-gray-200 active:border-gray-200"
                target="_blank"
              >
                <InformationCircleIcon
                  class="opacity-50 hi-solid hi-information-circle inline-block w-5 h-5"
                />
                <span>{{ t("views.download.learnMore") }}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Build -->
        <div
          v-if="!isLoading"
          class="md:flex items-center rounded-lg ring-1 ring-gray-50 ring-opacity-5 bg-white"
        >
          <div class="grow p-5 lg:p-6">
            <h4 class="text-xl font-bold mb-1">
              {{ t("views.download.buildInformation") }}
            </h4>
            <i18n-t
              class="leading-relaxed text-gray-500 mb-5"
              keypath="views.download.buildRelease"
              tag="p"
            >
              <span class="font-semibold">
                {{ dayjs(downloadRelease.published_at).format("YYYY-MM-DD") }}
              </span>
            </i18n-t>
            <h5 class="flex items-center my-8">
              <span
                class="text-sm uppercase tracking-wide text-blue-600 font-semibold mr-3"
              >
                GitHub
              </span>
              <span
                aria-hidden="true"
                class="grow bg-indigo-50 rounded h-0.5"
              ></span>
            </h5>

            <!-- Github Info -->
            <div
              class="lg:flex lg:space-x-12 space-y-4 lg:space-y-0 font-medium"
            >
              <ul class="space-y-4 text-sm">
                <!-- Assets -->
                <li class="flex items-center space-x-2">
                  <CogIcon class="text-sky-500 inline-block w-5 h-5" />
                  <span>
                    <span class="font-bold uppercase">
                      {{ downloadRelease.assets.length }}
                    </span>
                    {{ t("views.download.assets") }}
                  </span>
                </li>

                <!-- Tag -->
                <li class="flex items-center space-x-2">
                  <CogIcon class="text-sky-500 inline-block w-5 h-5" />
                  <span>
                    {{ t("views.download.tag") }}:
                    <strong>{{ downloadRelease.tag_name }}</strong>
                  </span>
                </li>
              </ul>

              <ul class="space-y-4 text-sm">
                <li class="flex items-center space-x-2">
                  <CogIcon class="text-sky-500 inline-block w-5 h-5" />
                  <span>
                    <strong>{{ totalDownload }}</strong>
                    {{ t("views.download.downloads") }}
                  </span>
                </li>
              </ul>
              <div>
                <a
                  :href="downloadRelease.html_url"
                  class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none w-full px-4 py-3 leading-6 rounded border-sky-700 bg-sky-700 text-white hover:text-white hover:bg-sky-800 hover:border-sky-800 focus:ring focus:ring-sky-500 focus:ring-opacity-50 active:bg-sky-700 active:border-sky-700"
                  target="_blank"
                >
                  <ExternalLinkIcon class="opacity-50 inline-block w-5 h-5" />
                  <span>{{ t("views.download.manualDownload") }}</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Author info -->
          <div class="flex-none relative md:w-72 p-5">
            <div class="p-5 lg:p-6 text-center rounded-lg bg-sky-50">
              <a :href="downloadRelease.author.html_url">
                <div>
                  <img
                    :src="downloadRelease.author.avatar_url"
                    alt="Author avatar"
                    class="w-16 h-16 inline-block"
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
