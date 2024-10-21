<script setup lang="ts">
  import { TLine } from '@/components/LineChart/types'
  import { useDisputsGraph } from '@/stores/graphs/disputs'
  import { GraphType } from '@/types/reports/graphs'
  import { formatDate } from '@/utils/formatDate'
  import moment from 'moment'

  const disputsStore = useDisputsGraph()
  const type = ref<GraphType>('sum')
  const dates = computed<string[]>(() => disputsStore.graph.map(({ period }) => moment(period).format(formatDate(disputsStore.step))))

  const data = computed<TLine[]>(() => ([
    {
      name: 'Диспуты',
      data: disputsStore.graph.map(({ value }) => value),
      color: '#36FF30',
    },
  ]))
  const oldData = computed<TLine[]>(() => ([
    {
      name: 'Диспуты',
      data: disputsStore.graph.map(({ value }) => value),
      color: '#36FF3046',
    },
  ]))

  onMounted(() => {
    disputsStore.get()
  })

</script>
<template>
  <line-chart
    v-model="disputsStore.step"
    :data
    :dates
    :old-data
    :y="type"
  >
    <v-col cols="3">
      <v-radio-group v-model="disputsStore.type" inline label="Тип данных:">
        <v-radio label="Сумма" value="sum" />
        <v-radio label="Колличество" value="amount" />
      </v-radio-group>
    </v-col>
  </line-chart>
</template>
