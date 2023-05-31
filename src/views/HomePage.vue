<script setup lang="ts">
import {
  UserGroupIcon,
  GlobeAltIcon,
  PlayIcon,
  DesktopComputerIcon,
} from "@heroicons/vue/solid";
import { useI18n } from "vue-i18n";

import TeamList from "@/modules/TeamList.vue";
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { IssueSearch, Repo } from "@/types";

const { t } = useI18n();
const DISCORD_URL = import.meta.env.VITE_DISCORD_URL;
const issueSearch = ref<IssueSearch>({} as IssueSearch);
const repo = ref<Repo>({} as Repo);
const playableGames = computed(() => {
  return formatNumber(issueSearch.value?.total_count);
});
const stars = computed(() => {
  return formatNumber(repo.value?.stargazers_count);
});

onMounted(() => {
  fetchStats();
});

function formatNumber(num: number): string {
  return new Intl.NumberFormat(getLang(), {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(num);
}

function getLang() {
  if (navigator.languages != undefined) 
    return navigator.languages[0]; 
  return navigator.language;
}

const fetchStats = async () => {
  try {
    const result = await axios.get<IssueSearch>(
      import.meta.env.VITE_LABEL_SEARCH_URL + "+label:status-playable"
    );

    issueSearch.value = result.data;
  } catch (err) {
    console.error(err);
  }

  try {
    const result = await axios.get<Repo>(
      import.meta.env.VITE_REPO_URL
    );

    repo.value = result.data;
  } catch (err) {
    console.error(err);
  }
}

</script>
<template>
  <div>
    <!-- Features list -->
    <div class="bg-gray-100 overflow-hidden">
      <div class="container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32">
        <div
          class="flex flex-col lg:flex-row lg:items-center space-y-12 lg:space-y-0 lg:space-x-20"
        >
          <div class="lg:w-5/12 xl:w-5/12 md:py-12 space-y-10">
            <div>
              <div
                class="text-sm uppercase font-bold tracking-wider mb-1 text-blue-700"
              >
                Ryujinx
              </div>
              <h2 class="text-3xl md:text-4xl font-extrabold mb-4">
                {{ t("views.homepage.aboutProject") }}
              </h2>
              <h3
                class="text-lg md:text-xl md:leading-relaxed font-medium text-gray-600"
              >
                {{ t("views.homepage.featureDescription") }}
              </h3>
            </div>
          </div>

          <div class="lg:w-7/12 xl:w-7/12 flex-none relative">
            <div
              class="pattern-dots-xl opacity-10 absolute top-0 left-0 w-48 h-64 md:mt-20 transform -translate-x-10 -translate-y-10"
            ></div>
            <div
              class="pattern-dots-xl opacity-10 absolute bottom-0 right-0 w-48 h-64 md:mb-20 transform translate-x-10 translate-y-10"
            ></div>
            <div
              class="relative flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0"
            >
              <div class="md:w-1/2 md:mt-24 space-y-6">
                <div
                  class="group bg-white p-5 transition ease-out duration-200 border-2 border-gray-200 rounded-2xl hover:border-green-300"
                >
                  <div
                    class="inline-flex items-center justify-center w-10 h-10 m-2 mb-6 relative"
                  >
                    <div
                      class="absolute inset-0 rounded-3xl -m-2 transform rotate-6 bg-green-300 transition ease-out duration-200 group-hover:-rotate-3 group-hover:scale-105"
                    ></div>
                    <div
                      class="absolute inset-0 rounded-2xl transform -rotate-6 bg-green-700 bg-opacity-75 shadow-inner transition ease-out duration-200 group-hover:rotate-2 group-hover:scale-105"
                    ></div>
                    <GlobeAltIcon
                      class="text-white relative transform transition ease-out duration-200 group-hover:scale-110 hi-solid hi-adjustments inline-block w-5 h-5"
                    />
                  </div>
                  <h4 class="text-lg font-bold mb-2">
                    {{ t("views.homepage.openSource") }}
                  </h4>
                  <i18n-t
                    keypath="views.homepage.openSourceDescription"
                    tag="p"
                    class="leading-relaxed text-gray-600"
                  >
                    <a
                      class="text-blue-500"
                      href="https://github.com/Ryujinx/Ryujinx"
                    >
                      {{ t("views.homepage.github") }}</a
                    >.
                  </i18n-t>
                </div>
                <div
                  class="group bg-white p-5 transition ease-out duration-200 border-2 border-gray-200 rounded-2xl hover:border-red-300"
                >
                  <div
                    class="inline-flex items-center justify-center w-10 h-10 m-2 mb-6 relative"
                  >
                    <div
                      class="absolute inset-0 rounded-3xl -m-2 transform rotate-6 bg-red-300 transition ease-out duration-200 group-hover:-rotate-3 group-hover:scale-105"
                    ></div>
                    <div
                      class="absolute inset-0 rounded-2xl transform -rotate-6 bg-red-700 bg-opacity-75 shadow-inner transition ease-out duration-200 group-hover:rotate-2 group-hover:scale-105"
                    ></div>
                    <DesktopComputerIcon
                      class="text-white relative transform transition ease-out duration-200 group-hover:scale-110 inline-block w-5 h-5"
                    />
                  </div>
                  <h4 class="text-lg font-bold mb-2">
                    {{ t("views.homepage.crossPlatform") }}
                  </h4>
                  <p class="leading-relaxed text-gray-600">
                    {{ t("views.homepage.crossPlatformDescription") }}
                  </p>
                </div>
              </div>
              <div class="md:w-1/2 space-y-6">
                <div
                  class="group bg-white p-5 transition ease-out duration-200 border-2 border-slate-200 rounded-2xl hover:border-emerald-300"
                >
                  <div
                    class="inline-flex items-center justify-center w-10 h-10 m-2 mb-6 relative"
                  >
                    <div
                      class="absolute inset-0 rounded-3xl -m-2 transform rotate-6 bg-teal-300 transition ease-out duration-200 group-hover:-rotate-3 group-hover:scale-105"
                    ></div>
                    <div
                      class="absolute inset-0 rounded-2xl transform -rotate-6 bg-teal-700 bg-opacity-75 shadow-inner transition ease-out duration-200 group-hover:rotate-2 group-hover:scale-105"
                    ></div>
                    <PlayIcon
                      class="text-white relative transform transition ease-out duration-200 group-hover:scale-110 hi-solid hi-globe inline-block w-5 h-5"
                    />
                  </div>
                  <h4 class="text-lg font-bold mb-2">
                    {{ t("views.homepage.compatibility") }}
                  </h4>
                  <p class="leading-relaxed text-gray-600">
                    {{ t("views.homepage.compatibilityDescription") }}
                  </p>
                </div>
                <div
                  class="group bg-white p-5 transition ease-out duration-200 border-2 border-gray-200 rounded-2xl hover:border-sky-300"
                >
                  <div
                    class="inline-flex items-center justify-center w-10 h-10 m-2 mb-6 relative"
                  >
                    <div
                      class="absolute inset-0 rounded-3xl -m-2 transform rotate-6 bg-sky-300 transition ease-out duration-200 group-hover:-rotate-3 group-hover:scale-105"
                    ></div>
                    <div
                      class="absolute inset-0 rounded-2xl transform -rotate-6 bg-sky-700 bg-opacity-75 shadow-inner transition ease-out duration-200 group-hover:rotate-2 group-hover:scale-105"
                    ></div>

                    <UserGroupIcon
                      class="text-white relative transform transition ease-out duration-200 group-hover:scale-110 inline-block w-5 h-5"
                    />
                  </div>
                  <h4 class="text-lg font-bold mb-2">
                    {{ t("views.homepage.support") }}
                  </h4>
                  <i18n-t
                    keypath="views.homepage.supportDescription"
                    tag="p"
                    class="leading-relaxed text-gray-600"
                  >
                    <a class="text-blue-500" :href="DISCORD_URL">
                      {{ t("views.homepage.discord") }}</a
                    >
                  </i18n-t>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Name -->
    <div
      class="bg-cover"
      style="background-image: url('assets/images/wallp2.png')"
    >
      <div class="bg-gray-800 bg-opacity-90 backdrop-filter">
        <div
          class="space-y-16 container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32"
        >
          <div class="text-center">
            <i18n-t
              tag="h2"
              keypath="views.homepage.nameQuestion"
              class="text-3xl md:text-4xl font-extrabold mb-4 text-white"
            >
              <span class="text-sky-500"> {{ t("views.homepage.name") }}</span>
            </i18n-t>
            <i18n-t
              keypath="views.homepage.nameDescription"
              tag="h3"
              class="text-lg md:text-xl md:leading-relaxed font-medium text-gray-200 lg:w-2/3 mx-auto"
            >
              <span class="italic">{{t("views.homepage.spelled")}}</span>
            </i18n-t>
          </div>
        </div>
      </div>
    </div>

    <!-- Team List -->
    <TeamList />

    <!-- Stats -->
    <div class="bg-gray-100 overflow-hidden">
      <div class="container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32">
        <div class="text-center mb-16">
          <div
            class="text-sm uppercase font-bold tracking-wider mb-1 text-sky-700"
          >
            {{ t("views.homepage.supportUs") }}
          </div>
          <h2 class="text-3xl md:text-4xl font-extrabold mb-4">
            {{ t("views.homepage.trustedCommunities") }}
          </h2>
          <h3
            class="text-lg md:text-xl md:leading-relaxed font-medium text-gray-600 lg:w-2/3 mx-auto"
          >
            {{ t("views.homepage.trustedCommunitiesDescription") }}
          </h3>
        </div>

        <div class="relative">
          <div
            class="pattern-dots-md text-gray-300 absolute top-0 right-0 w-32 h-32 transform -translate-y-12 translate-x-12"
          ></div>
          <div
            class="pattern-dots-md text-gray-300 absolute bottom-0 left-0 w-32 h-32 transform translate-y-12 -translate-x-12"
          ></div>
          <div
            class="grid grid-cols-1 sm:grid-cols-3 text-center rounded-xl shadow-md bg-white divide-y sm:divide-y-0 sm:divide-x divide-gray-100 overflow-hidden relative"
          >
            <dl
              class="space-y-1 px-5 py-12 hover:bg-gray-50 hover:bg-opacity-50"
            >
              <dt class="text-4xl font-extrabold text-sky-600">{{stars}}+</dt>
              <dd class="text-sm uppercase tracking-wide font-semibold">
                {{ t("views.homepage.githubStar") }}
              </dd>
            </dl>
            <dl
              class="space-y-1 px-5 py-12 hover:bg-gray-50 hover:bg-opacity-50"
            >
              <dt class="text-4xl font-extrabold text-sky-600">{{playableGames}}+</dt>
              <dd class="text-sm uppercase tracking-wide font-semibold">
                {{ t("views.homepage.playableGames") }}
              </dd>
            </dl>
            <dl
              class="space-y-1 px-5 py-12 hover:bg-gray-50 hover:bg-opacity-50"
            >
              <dt class="text-4xl font-extrabold text-sky-600">500+</dt>
              <dd class="text-sm uppercase tracking-wide font-semibold">
                {{ t("views.homepage.patreonContributors") }}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
