<script lang="ts" setup>
import { IssueSearch } from "@/types";
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Bar } from "vue-chartjs";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip, Colors, ChartData, ChartOptions } from 'chart.js'
import { ChartDataset } from "chart.js";

const { t } = useI18n();
const STATS_KEY = "git-stats";
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

function setData(this: any) {
  chartData.value = ({
    labels: ["label"],
    datasets: tierData.value.map((tier: PlayableTier): ChartDataset<'bar', number[]> => ({
      data: [tier.count],
      label: t(`views.compatibility.${tier.localeKey}`),
      backgroundColor: tier.color
    })).reverse(),
  })
}

function updateCanvasWidth() {
  var canvas = document.getElementById('chart');
  var screenWidth = window.innerWidth;
  var canvasWidth = screenWidth * 0.6;
  if (canvas) {
    canvas.style.width = canvasWidth + 'px';
  }
}

const fetchStats = async () => {
  var stats = getWithExpiry(STATS_KEY);
  if (stats.length == 0) {
    try {
      await Promise.all(tierData.value.map(async tier => {
        const result = await axios.get<IssueSearch>(
          `${import.meta.env.VITE_LABEL_SEARCH_URL}+label:${tier.labelName}`
        );

        tier.count = result.data.total_count;
      }));

      setWithExpiry(STATS_KEY, tierData.value, 10);
      setData();
    } catch (err) {
      console.error(err);
    }
  } else {
    tierData.value = stats;

    setData();
  }
}

const chartData = ref<ChartData<'bar'>>({
  labels: [],
  datasets: []
});

const chartOptions = ref<ChartOptions<'bar'>>({
  indexAxis: "y" as const,
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      max: NaN,
      display: false,
      stacked: true,
    },
    y: {
      display: false,
      stacked: true
    }
  },
  plugins: {
    tooltip: {
      usePointStyle: true,
      position: "cursor" as const,
      bodyFont: {
        family: "Inter",
        size: 12
      },
      titleFont: {
        size: 0
      },
      titleMarginBottom: 0,
      xAlign: "center" as const,
      yAlign: "bottom" as const,
    },
    legend: {
      labels: {
        padding: 15,
        color: "black",
        usePointStyle: true,
        font: {
          family: "Inter",
        }
      }
    }
  },
  onClick: (e, elements) => {
    var index = tierData.value.length - elements[0].datasetIndex - 1;
    var tier = tierData.value[index];
    window.location.href = import.meta.env.VITE_LABEL_URL + tier.labelName;
  }
});

window.addEventListener('resize', updateCanvasWidth);
Chart.register(CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip, Colors);
Tooltip.positioners.cursor = function(elements, eventPosition) {
  return {
    x: eventPosition.x,
    y: eventPosition.y
  };
}

onMounted(() => {
  fetchStats();
  updateCanvasWidth();
})
</script>

<template>
  <div class="space-y-16 container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32">
    <div class="text-center">
      <div class="flex-none relative">
        <div
          class="pattern-dots-xl opacity-10 absolute top-0 left-0 w-48 h-64 md:mt-20 transform"
        ></div>
      </div>
      <div class="text-sm uppercase font-bold tracking-wider mb-1 text-blue-700">
        {{ t("views.compatibility.subtitle") }}
      </div>
      <h2 class="text-3xl md:text-4xl font-extrabold mb-4">
        {{ t("views.compatibility.title") }}
      </h2>
      <h3 class="text-lg md:text-xl md:leading-relaxed font-medium text-gray-600 lg:w-2/3 mx-auto">
        {{ t("views.compatibility.description") }}
      </h3>
    </div>

    <div class="container flex justify-center">
      <div class="relative lg:h-1/3" lg:w-1vw>
        <Bar id="chart" ref="chart" :data="chartData" :options="chartOptions"/>
      </div>
    </div>
  </div>

  <div class="bg-white">
    <div class="space-y-16 container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32">
      <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-extrabold mb-4">
            {{t("views.compatibility.title2")}}
          </h2>
          <h3 class="text-lg md:text-xl md:leading-relaxed font-medium text-gray-600 lg:w-2/3 mx-auto">
            {{t("views.compatibility.description2")}}
          </h3>
        </div>
    </div>
  </div>
</template>