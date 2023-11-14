<template>
  <Menu as="div" class="relative inline-block">
    <MenuButton
      id="tk-dropdown-layouts-user"
      type="button"
      class="inline-flex justify-center items-center border font-semibold focus:outline-none px-3 py-2 leading-5 rounded border-gray-900 bg-gray-700 shadow-sm hover:bg-opacity-50 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-opacity-100 active:shadow-none"
    >
      <img class="w-5 h-5" :src="availableLanguages[getCurrentLang()].image" :alt="availableLanguages[getCurrentLang()].name">
    </MenuButton>

    <!-- Dropdown -->
    <transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="transform opacity-0 scale-75"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-75"
    >
      <MenuItems
        ref="languageDropdown"
        role="navigation"
        aria-labelledby="tk-dropdown-simple"
        class="absolute right-0 origin-top-right mt-2 w-48 shadow-xl rounded"
      >
        <div
          class="bg-white ring-1 ring-black ring-opacity-5 rounded divide-y divide-gray-100"
        >
          <MenuItem
            v-for="language in availableLanguages"
            :key="language.name"
            @click="changeLang(language)"
          >
            <div class="p-2 space-y-1">
              <a
                role="menuitem"
                href="javascript:void(0)"
                class="flex items-center space-x-2 rounded py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-700"
              >
                <img class="w-5 h-5 object-center" :src="language.image" :alt="language.name">
                <span>{{ language.name }}</span>
              </a>
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { availableLanguages } from "@/common/constants/languages";
import { Language } from "@/types";

const getCurrentLang = () => {
  try {
    const storeValue = localStorage.getItem("lang");
    const lang = JSON.parse(storeValue as string);

    if (lang == undefined) {
      return 0;
    }
    return lang.id;
  } catch (e) {
    console.error("Invalid lang:" + e);
  }
  return 0;
};

const changeLang = (language: Language) => {
  localStorage.setItem("lang", JSON.stringify(language));
  location.reload();
};
</script>
