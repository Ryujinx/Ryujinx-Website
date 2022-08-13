<script setup lang="ts">
import { teamMembers } from "@/common/constants/teams";
</script>

<template>
  <div class="bg-white">
    <div
      class="space-y-16 container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32"
    >
      <!-- Heading -->
      <div class="text-center">
        <h2 class="text-3xl md:text-4xl font-extrabold mb-4">
          Our team
        </h2>
        <h3
          class="text-lg md:text-xl md:leading-relaxed font-medium text-gray-600 lg:w-2/3 mx-auto"
        >
          They are working nonstop behind the scenes to build the better Switch emulator.
        </h3>
      </div>

      <!-- Team -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 text-center"
      >
        <div v-for="member in teamMembers" :key="member.name">
          <span class="inline-block rounded-full bg-white shadow-lg p-2 mb-5">
            <img
              :src="member.avatar"
              alt="User Avatar"
              class="inline-block w-28 h-28 rounded-full"
            />
          </span>
          <h4 class="text-xl font-semibold mb-1">{{ member.name }}</h4>
          <p class="text-gray-600 font-medium">{{member.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
