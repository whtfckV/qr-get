<script setup lang="ts">
  import { TLine } from '@/components/LineChart/types'
  import { useSalesGraph } from '@/stores/graphs/sales'
  import { formatDate } from '@/utils/formatDate'
  import moment from 'moment'

  const salesStore = useSalesGraph()
  const dates = computed<string[]>(() => salesStore.graph.map(({ period }) =>
    moment(period).format(formatDate(salesStore.step))))

  const data = computed<TLine[]>(() => ([
    {
      name: 'Продажи',
      data: salesStore.graph.map(({ sales }) => sales),
      color: '#36FF30',
    },
    {
      name: 'Возвраты',
      data: salesStore.graph.map(({ returns }) => returns),
      color: '#FF364F',
    },
    {
      name: 'Разница',
      data: salesStore.graph.map(({ remaind }) => remaind),
      color: '#00CAFF',
    },
  ]))
  const oldData = computed<TLine[]>(() => ([
    {
      name: 'Продажи',
      data: salesStore.oldGraph.map(({ sales }) => sales),
      color: '#36FF3046',
    },
    {
      name: 'Возвраты',
      data: salesStore.oldGraph.map(({ returns }) => returns),
      color: '#FF364F46',
    },
    {
      name: 'Разница',
      data: salesStore.oldGraph.map(({ remaind }) => remaind),
      color: '#00CAFF46',
    },
  ]))

  onMounted(() => {
    salesStore.get()
  })

</script>
<template>
  <line-chart
    v-model="salesStore.step"
    v-model:old="salesStore.oldStep"
    :data
    :dates
    :old-data
    :y="salesStore.type"
  >
    <v-col cols="3">
      <v-radio-group v-model="salesStore.type" inline label="Тип данных:">
        <v-radio label="Сумма" value="sum" />
        <v-radio label="Колличество" value="amount" />
      </v-radio-group>
    </v-col>
  </line-chart>
</template>
