<script setup lang="ts">
  import { TLine } from '@/components/LineChart/types'
  import { useSalesGraph } from '@/stores/graphs/sales'
  import { formatDate } from '@/utils/formatDate'

  const salesStore = useSalesGraph()
  const dates = computed<string[]>(() => salesStore.graph.map(({ period }) => formatDate(new Date(period))))

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
      data: salesStore.graph.map(({ sales }) => sales - 2),
      color: '#36FF3046',
    },
    {
      name: 'Возвраты',
      data: salesStore.graph.map(({ returns }) => returns - 3),
      color: '#FF364F46',
    },
    {
      name: 'Разница',
      data: salesStore.graph.map(({ remaind }) => remaind - 3),
      color: '#00CAFF46',
    },
  ]))

  onMounted(() => {
    salesStore.get()
  })

</script>

<template>
  hoome page

  <line-chart :data :dates :old-data />

</template>
