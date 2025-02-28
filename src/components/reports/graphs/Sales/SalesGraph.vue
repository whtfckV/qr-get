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

// Data
const headers = computed(() => {
  // tableDates.value =
  return [
    {
      title: 'Партнёр',
      value: 'partner',
      // align: 'start'
    },
    ...salesStore.table.map((day: any) => day.period)
      .map((date: string) => ({
        title: formatDateTable(date),
        // align: 'center',
        children: [
          {
            title: 'Продажи',
            value: `sales_${date}`,
          },
          {
            title: 'Расторг/диспут',
            value: `returns_${date}`
          },
        ]
      })),
  ]
})

// Миша сука такое говно прислал.
const tableData = computed<any[]>(() => {
  if (!salesStore.table.length) return []

  const data: any[] = []

  salesStore.table.forEach((item: any) => {
    item.partners.forEach((partner: any) => {
      const findPartnerIndex = data.findIndex((dataItem: any) => dataItem.partner === partner.partner_name)
      if (findPartnerIndex < 0) {
        data.push({
          partner: partner.partner_name,
        })
      }
    })
  })

  salesStore.table.forEach((item: any) => {
    data.map((dataItem: any) => {
      dataItem[`sales_${item.period}`] = formatValue(0)
      dataItem[`returns_${item.period}`] = formatValue(0)

      const partner = item.partners.find((iPartner: any) => iPartner.partner_name === dataItem.partner)
      // console.log(partner)
      if (partner) {
        dataItem[`sales_${item.period}`] = formatValue(partner.sales)
        dataItem[`returns_${item.period}`] = formatValue(partner.returns)
      }
    })
  })

  return data
})

const formatDateTable = (date: string) => moment(date).format('DD.MM.YYYY')
const formatValue = (value: number) => {
  return Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  }).format(value)
}


onMounted(() => {
  console.log('get')
  salesStore.get()
})

</script>
<template>
  <v-data-table class="no-wrap-table" :headers :hide-default-footer="true" :items="tableData">
    <template #body.append>
      <tr>
        <td>
          Итого
        </td>
        <td colspan="2" v-for="date in salesStore.table" :key="date">
          {{ formatValue(date.net) }}
        </td>
      </tr>
    </template>
  </v-data-table>
  <line-chart v-model="salesStore.step" v-model:old="salesStore.oldStep" :data :dates :old-data :y="salesStore.type">
    <v-col cols="3">
      <v-radio-group v-model="salesStore.type" inline label="Тип данных:">
        <v-radio label="Сумма" value="sum" />
        <v-radio label="Колличество" value="amount" />
      </v-radio-group>
    </v-col>
  </line-chart>
</template>

<style lang="scss">
.no-wrap-table {
  text-wrap: nowrap;
}
</style>
