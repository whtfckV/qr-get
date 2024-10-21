<script setup lang="ts">
  import { TLine } from '@/components/LineChart/types'
  import { useProfitsGraph } from '@/stores/graphs/profits'
  import { formatDate } from '@/utils/formatDate'
  import moment from 'moment'

  const profitStore = useProfitsGraph()
  const dates = computed<string[]>(() => profitStore.graph.map(({ period }) => moment(period).format(formatDate(profitStore.step))))

  const data = computed<TLine[]>(() => ([
    {
      name: 'Прибыль',
      data: profitStore.graph.map(({ value }) => value),
      color: '#36FF30',
    },
  ]))
  const oldData = computed<TLine[]>(() => ([
    {
      name: 'Прибыль',
      data: profitStore.oldGraph.map(({ value }) => value),
      color: '#36FF3046',
    },
  ]))

  onMounted(() => {
    profitStore.get()
  })

</script>
<template>
  <line-chart
    v-model="profitStore.step"
    v-model:old="profitStore.oldStep"
    :data
    :dates
    :oldData
  />
</template>
