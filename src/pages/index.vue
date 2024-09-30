<script setup lang="ts">
  import { TLine } from '@/components/LineChart/types'
  import { useSellesReturnGraph } from '@/stores/graphs/selles_returns'
  import { formatDate } from '@/utils/formatDate'

  const sellesReturnGraph = useSellesReturnGraph()

  const dates = sellesReturnGraph.graph.map(({ period }) => formatDate(period))
  const data: TLine[] = [
    {
      name: 'Продажи',
      data: sellesReturnGraph.graph.map(({ sales }) => sales),
      color: '#36FF30',
    },
    {
      name: 'Возвраты',
      data: sellesReturnGraph.graph.map(({ returns }) => returns),
      color: '#FF364F',
    },
    {
      name: 'Разница',
      data: sellesReturnGraph.graph.map(({ remaind }) => remaind),
      color: '#00CAFF',
    },
  ]
  const oldData: TLine[] = [
    {
      name: 'Продажи',
      data: sellesReturnGraph.graph.map(({ sales }) => sales - 2),
      color: '#36FF3046',
    },
    {
      name: 'Возвраты',
      data: sellesReturnGraph.graph.map(({ returns }) => returns - 3),
      color: '#FF364F46',
    },
    {
      name: 'Разница',
      data: sellesReturnGraph.graph.map(({ remaind }) => remaind - 3),
      color: '#00CAFF46',
    },
  ]

</script>

<template>
  hoome page

  <line-chart :data :dates :old-data />

</template>
