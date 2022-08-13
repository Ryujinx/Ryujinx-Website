<script setup lang="ts">
import BaseNavigation from "@/common/components/navigations/BaseNavigation.vue";
import SocialIconList from "@/modules/SocialIconList.vue";
import { navigations } from "@/common/constants/navigation";
</script>

<template>
  <div class="bg-cover bg-bottom" style="background-image: url('assets/images/wallp.png');">
    <div class="bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-sm">
      <!-- Header -->
      <header id="page-header" class="flex flex-none items-center py-10">
        <div class="flex flex-col text-center md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0 container xl:max-w-7xl mx-auto px-4 lg:px-10">
          <div>
            <RouterLink :to="{name: 'home'}" class="inline-flex items-center space-x-2 font-bold text-lg tracking-wide text-white hover:opacity-75">
              <img src="assets/images/logo.png" class="text-indigo-300 opacity-75 hi-outline hi-cube-transparent inline-block w-6 h-6" alt="logo">
              <span>Ryujinx</span>
            </RouterLink>
          </div>
          <div class="flex flex-col text-center md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0 md:space-x-10">
            <BaseNavigation :navigations="navigations" />

            <div class="flex items-center justify-center space-x-3">
              <SocialIconList />
            </div>
          </div>
        </div>
      </header>

      <div class="text-center container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32">
        <h1 class="text-3xl md:text-4xl font-extrabold mb-4 text-white">
          A simple, experimental <span class="text-red-500">Nintendo Switch</span> emulator
        </h1>
        <h2 class="text-lg md:text-xl md:leading-relaxed font-medium text-gray-400 lg:w-2/3 mx-auto">
          Ryujinx is an open-source Nintendo Switch emulator created by <span class="text-red-50">gdkchan</span> and written in C#.
          This emulator aims at providing excellent accuracy and performance, a user-friendly interface, and consistent builds.
        </h2>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-center space-y-2 sm:space-y-0 sm:space-x-2 pt-10 pb-16">
          <a href="javascript:void(0)" class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-6 py-4 leading-6 rounded border-sky-500 bg-sky-500 text-white hover:text-white hover:bg-indigo-800 hover:border-indigo-800 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-700 active:border-indigo-700">
            <span>Get Started</span>
          </a>
          <a href="javascript:void(0)" class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-6 py-4 leading-6 rounded border-red-500 bg-red-500 text-white hover:text-white hover:bg-gray-800 hover:border-gray-800 focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-gray-700 active:border-gray-700">
            <span>Contribute</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
