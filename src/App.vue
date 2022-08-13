<script setup lang="ts"></script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<style>
@import "./assets/tailkit.css";
</style>
