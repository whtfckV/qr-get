<script lang="ts" setup>
  import { Line } from 'vue-chartjs'
  import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
  import { CustomDataset, Props, TLine } from './types'

  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

  const props = defineProps<Props>()
  const inputs = ref(props.data.map(item => item.name))
  const old = ref(true)
  const data = computed(() => ({
    labels: props.dates,
    datasets: [
      ...props.data.filter(item => inputs.value.includes(item.name)).map(createData),
      ...(old.value ? props.oldData.filter(item => inputs.value.includes(item.name)).map(createData) : []),
    ] as CustomDataset[],
  }))

  const createData = (item:TLine) => ({
    label: item.name,
    data: item.data,
    borderColor: item.color,
    backgroundColor: item.color,
    hoverBorderWidth: 5,
    cubicInterpolationMode: 'monotone',
    tension: 0.4,
  })

  let delayed: boolean = false

  const options = {
    responsive: true,
    interaction: {
      intersect: false,
    },
    animation: {
      onComplete: () => {
        delayed = true
      },
      delay: (context: any) => {
        let delay = 0
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 100 + context.datasetIndex * 100
        }
        return delay
      },
    },
    // scales: {
    //   x: {
    //     display: true,
    //     title: {
    //       display: true,
    //     },
    //   },
    //   y: {
    //     display: true,
    //     title: {
    //       display: true,
    //       text: 'Value',
    //     },
    //   },
    // },
    // maintainAspectRatio: false,
  }

</script>
<template>
  <v-container fluid>
    <v-card>
      <v-card-title>Графическое отображение</v-card-title>
      <v-card-text>
        <div class="d-flex">
          <v-checkbox
            v-for="item in props.data"
            :key="item.name"
            v-model="inputs"
            :defaults-target="item.name"
            :label="item.name"
            multiple
            :value="item.name"
          />
          <v-spacer />
          <v-checkbox v-model="old" label="Прошлый период" />
        </div>
        <Line :data="data" :options="options" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
</style>
