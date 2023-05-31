<script lang="ts" setup>
import { IssueSearch } from "@/types";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const data = ref<PlayableTier[]>([
  {
    labelName: "status-playable",
    prettyPrintName: "Playable",
    count: 0
  },
  {
    labelName: "status-ingame",
    prettyPrintName: "In-Game",
    count: 0
  },
  {
    labelName: "status-menus",
    prettyPrintName: "Menus",
    count: 0
  },
  {
    labelName: "status-boots",
    prettyPrintName: "Boots",
    count: 0
  },
  {
    labelName: "status-nothing",
    prettyPrintName: "Nothing",
    count: 0
  },
]);

onMounted(() => {
  fetchStats();
});

interface PlayableTier {
  labelName: string;
  prettyPrintName: string;
  count: number;
}

const fetchStats = async () => {
  try {
    data.value.forEach(async tier => {
      const result = await axios.get<IssueSearch>(
        `${import.meta.env.VITE_LABEL_SEARCH_URL}label:${tier.labelName}+state:open`
      );

      tier.count = result.data.total_count;
    });

    console.log(data.value);
  } catch (err) {
    console.error(err);
  }
}
</script>

<template></template>