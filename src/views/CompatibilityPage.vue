<script lang="ts" setup>
import { IssueSearch } from "@/types";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Doughnut } from "vue-chartjs";
import { Chart, ArcElement, Title, Legend, Tooltip, Colors, ChartData, ChartOptions, elements } from 'chart.js'

Chart.register(ArcElement, Title, Legend, Tooltip, Colors);

const { t } = useI18n();
const tierData = ref<PlayableTier[]>([
  {
    labelName: "status-playable",
    prettyPrintName: "Playable",
    // Tailwind Emerald-600
    color: "#059669",
    count: 0
  },
  {
    labelName: "status-ingame",
    prettyPrintName: "In-Game",
    // Tailwind Lime-600
    color: "#65a30d",
    count: 0
  },
  {
    labelName: "status-menus",
    prettyPrintName: "Menus",
    // Tailwind Yellow-600  
    color: "#ca8a04",
    count: 0
  },
  {
    labelName: "status-boots",
    prettyPrintName: "Boots",
    // Tailwind Orange-600
    color: "#ea580c",
    count: 0
  },
  {
    labelName: "status-nothing",
    prettyPrintName: "Nothing",
    // Tailwind Red-600
    color: "#dc2626",
    count: 0
  },
]);

onMounted(() => {
  fetchStats();
});

interface PlayableTier {
  labelName: string;
  prettyPrintName: string;
  color: string;
  count: number;
}

const fetchStats = async () => {
  try {
    await Promise.all(tierData.value.map(async tier => {
      const result = await axios.get<IssueSearch>(
        `${import.meta.env.VITE_LABEL_SEARCH_URL}label:${tier.labelName}+state:open`
      );

      tier.count = result.data.total_count;
    }));
    
    chartData.value = ({
      labels: tierData.value.flatMap((tier) => tier.prettyPrintName),
      datasets: [
        {
          data: tierData.value.flatMap((tier) => tier.count),
          backgroundColor: tierData.value.flatMap((tier) => tier.color),
        }
      ]
    })
  } catch (err) {
    console.error(err);
  }
}

const chartData = ref<ChartData<'doughnut'>>({
  datasets: []
})

const chartOptions = {
  plugins: {
    legend: {
      reverse: true,
      labels: {
        color: "black",
        padding: 20,
        usePointStyle: true,
        font: {
          family: "Inter",
          size: 12
        }
      }
    }
  }
}

</script>

<template>
  <div class="space-y-16 container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32">
    <div class="text-center">
      <h2 class="text-3xl md:text-4xl font-extrabold mb-4">
        Compatibility
      </h2>
      <h3 class="text-lg md:text-xl md:leading-relaxed font-medium text-gray-600 lg:w-2/3 mx-auto">
        {{ t("views.homepage.ourTeamDescription") }}
      </h3>
    </div>

    <div class="container flex justify-center">
      <Doughnut :data="chartData" :options="chartOptions"/>
    </div>
  </div>
</template>