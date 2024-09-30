<script lang="ts" setup>
  import { Line } from 'vue-chartjs'
  import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
  import { CustomDataset, Props } from '.'

  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

  const props = defineProps<Props>()

  const data = {
    labels: props.data.map(({ period }) => period.getDate()),
    datasets: [
      {
        label: 'Data One',
        data: [40, 39, 10, 40, 39, 80, 40],
        borderColor: '#FF9140',
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
      },
    ] as CustomDataset[],
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  }
</script>
<template>
  <v-card>
    <v-card-title>Line Chart</v-card-title>
    <v-card-text>
      <Line :data="data" :options="options" />
    </v-card-text>
  </v-card>
</template>

<style scoped>
</style>
