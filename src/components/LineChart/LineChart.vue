<script lang="ts" setup>
import { Line } from 'vue-chartjs'
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { CustomDataset, Props, StepType, TLine } from './types'
import { GraphOldStep, GraphStep, GraphType } from '@/types/reports/graphs'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const items: StepType[] = [
  { title: 'По дням', value: 'day' },
  { title: 'По неделям', value: 'week' },
  { title: 'По месяцам', value: 'month' },
]

const types: Record<GraphType, string> = {
  sum: 'Сумма',
  amount: 'Колличество',
}

const props = defineProps<Props>()
const model = defineModel<GraphStep>()
const oldModel = defineModel<GraphOldStep>('old')
const inputs = ref(props.data.map(item => item.name))
const oldItems = ref<any[]>([])
const old = ref(true)
const data = computed(() => ({
  labels: props.dates,
  datasets: [
    ...props.data.filter(item => inputs.value.includes(item.name)).map(createData),
    ...(old.value ? props.oldData.filter(item => inputs.value.includes(item.name)).map(createData) : []),
  ] as CustomDataset[],
}))
const options = computed(() => ({
  responsive: true,
  interaction: {
    intersect: false,
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: props.y ? types[props.y] : '',
      },
    },
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
}))

// onMounted(() => {
//   console.log(props.oldData)
// })

const createData = (item: TLine) => ({
  label: item.name,
  data: item.data,
  borderColor: item.color,
  backgroundColor: item.color,
  hoverBorderWidth: 5,
  cubicInterpolationMode: 'monotone',
  tension: 0.4,
})

let delayed: boolean = false

watch(() => props.dates, (newDates) => {
  if (!newDates.length) return;

  // const start = newDates[0];
  // const end = newDates.at(-1);

  // const startMonth = start.split('.')[1];
  // const endMonth = end!.split('.')[1];

  oldItems.value = [
    {
      title: 'Прошлый месяц',
      value: 'month',
      // props: {
      //   disabled: startMonth !== endMonth,
      // },
    },
    {
      title: 'Прошлый год',
      value: 'year',
    },
  ];
}, { immediate: true })
</script>
<template>
  <v-container fluid>
    <v-card>
      <v-card-title>Графическое отображение</v-card-title>
      <v-card-text>
        <v-row align="center" justify="space-between">
          <v-col cols="3">
            <v-select v-model="model" :items label="Выбор периода" variant="outlined" />
          </v-col>
          <slot />
        </v-row>
        <v-row>
          <v-col class="d-flex">
            <template v-if="props.data.length > 1">
              <v-checkbox v-for="item in props.data" :key="item.name" v-model="inputs" :defaults-target="item.name"
                :label="item.name" multiple :value="item.name" />
            </template>
          </v-col>
          <v-spacer />
          <v-col class="d-flex">
            <v-checkbox v-model="old" />
            <v-select :disabled="!old" v-model="oldModel" :items=oldItems label="Прошлый период" variant="outlined" />
          </v-col>
        </v-row>
        <Line :data="data" :options="options" />
      </v-card-text>
    </v-card>
  </v-container>
</template>
