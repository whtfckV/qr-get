<script lang="ts" setup>
  import { Line } from 'vue-chartjs'
  import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
  import { CustomDataset, Props } from '.'
  import { formatDate } from '@/utils/formatDate'

  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

  const props = defineProps<Props>()

  const data = {
    labels: props.data.map(({ period }) => formatDate(period)),
    datasets: [
      {
        label: 'Продажи',
        data: props.data.map(item => item.sales),
        borderColor: '#FF9140',
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
      },
      {
        label: 'Возвраты',
        data: props.data.map(item => item.returns),
        borderColor: '#FFF140',
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
      },
      {
        label: 'Разница',
        data: props.data.map(item => item.remaind),
        borderColor: '#FF3140',
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
      },
    ] as CustomDataset[],
  }
  const options = {
    responsive: true,
    // maintainAspectRatio: false,
  }
</script>
<template>
  <v-container fluid>
    <v-card>
      <v-card-title>Графическое отображение</v-card-title>
      <v-card-text>
        <Line :data="data" :options="options" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
</style>
