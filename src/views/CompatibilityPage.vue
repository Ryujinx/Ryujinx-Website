<script lang="ts" setup>
import { IssueSearch } from "@/types";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Doughnut } from "vue-chartjs";
import { Chart, ArcElement, Title, Legend, Tooltip, Colors, ChartData, ChartOptions, elements } from 'chart.js'

Chart.register(ArcElement, Title, Legend, Tooltip, Colors);
Tooltip.positioners.cursor = function(elements, eventPosition) {
  return {
    x: eventPosition.x,
    y: eventPosition.y
  };
}

const { t } = useI18n();
const tierData = ref<PlayableTier[]>([
  {
    labelName: "status-playable",
    localeKey: "playable",
    // Tailwind Emerald-600
    color: "#059669",
    count: 0
  },
  {
    labelName: "status-ingame",
    localeKey: "ingame",
    // Tailwind Lime-600
    color: "#65a30d",
    count: 0
  },
  {
    labelName: "status-menus",
    localeKey: "menus",
    // Tailwind Yellow-600  
    color: "#ca8a04",
    count: 0
  },
  {
    labelName: "status-boots",
    localeKey: "boots",
    // Tailwind Orange-600
    color: "#ea580c",
    count: 0
  },
  {
    labelName: "status-nothing",
    localeKey: "nothing",
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
  localeKey: string;
  color: string;
  count: number;
}

function setWithExpiry(key: string, value: PlayableTier[], ttl: number) {
	const now = new Date()

	const item = {
		value: value,
		expiry: now.getTime() + (ttl * 60 * 60 * 1000),
	}
	localStorage.setItem(key, JSON.stringify(item))
}

function getWithExpiry(key: string): PlayableTier[] {
	const itemStr = localStorage.getItem(key)
	if (!itemStr) {
		return []
	}

	const item = JSON.parse(itemStr)
	const now = new Date()
	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key)
		return []
	}

	return item.value
}

function setData() {
  chartData.value = ({
    labels: tierData.value.flatMap((tier) => t(`views.compatibility.${tier.localeKey}`)),
    datasets: [
      {
        data: tierData.value.flatMap((tier) => tier.count),
        backgroundColor: tierData.value.flatMap((tier) => tier.color),
      }
    ]
  })
}

const fetchStats = async () => {
  var stats = getWithExpiry("git-stats");
  if (stats.length == 0) {
    try {
      await Promise.all(tierData.value.map(async tier => {
        const result = await axios.get<IssueSearch>(
          `${import.meta.env.VITE_LABEL_SEARCH_URL}label:${tier.labelName}+state:open`
        );

        tier.count = result.data.total_count;
      }));

      setWithExpiry("git-stats", tierData.value, 10);
      setData();
    } catch (err) {
      console.error(err);
    }
  } else {
    tierData.value = stats;

    setData();
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
          size: 16
        }
      }
    },
    tooltip: {
      usePointStyle: true,
      position: "cursor" as const,
      bodyFont: {
        family: "Inter",
        size: 12
      },
      titleFont: {
        family: "Inter",
        size: 14
      }
    }
  },
  onClick: (e: any, activeEls: any) => {
    let datasetIndex = activeEls[0].datasetIndex;
    let dataIndex = activeEls[0].index;
    let value = e.chart.data.datasets[datasetIndex].data[dataIndex];
    var tier = tierData.value.find((tier) => tier.count == value);

    if (tier != null) {
      window.location.href = import.meta.env.VITE_LABEL_URL + tier.labelName;
    }
  }
}

</script>

<template>
  <div class="space-y-16 container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32">
    <div class="text-center">
      <h2 class="text-3xl md:text-4xl font-extrabold mb-4">
        {{ t("views.compatibility.title") }}
      </h2>
      <h3 class="text-lg md:text-xl md:leading-relaxed font-medium text-gray-600 lg:w-2/3 mx-auto">
        {{ t("views.compatibility.description") }}
      </h3>
    </div>

    <div class="container flex justify-center">
      <div class="lg:w-1/2">
        <Doughnut :data="chartData" :options="chartOptions"/>
      </div>
    </div>
  </div>
</template>