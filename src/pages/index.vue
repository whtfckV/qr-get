<script setup lang="ts">
import { dialogTypes } from '@/components/AddMoney/types';
import ExpensesCategories from '@/components/ExpensesCategories/ExpensesCategories.vue';
import { useBalanceStore } from '@/stores/balance';
import { usePaymentsStore } from '@/stores/payments';
import { Payment } from '@/types/payments';
import moment from 'moment';

type Header = {
  title: string,
  key: keyof Payment
}

const headers: Header[] = [
  { title: 'Дата', key: 'date' },
  { title: 'Фактический доход', key: 'fact_sum' },
  { title: 'Планируемый доход', key: 'plan_sum' },
  { title: 'Расход', key: 'expenses_sum' },
]

const balanceStore = useBalanceStore()
const paymentsStore = usePaymentsStore()
const dialog = ref(false)
const expensesDialog = ref(false)
const dialogType = ref<dialogTypes>('payment')

const closeDialog = () => {
  dialog.value = false
}

const openDialog = (type: dialogTypes) => {
  dialogType.value = type
  dialog.value = true
}

const handleSuccess = () => {
  balanceStore.get()
  closeDialog()
}

onMounted(() => {
  balanceStore.get()
  paymentsStore.get()
})
</script>

<template>
  <v-app-bar title="Точка контроля денежных средств">
    <v-btn @click="openDialog('payment')" base-color="indigo-lighten-2" class="mr-4" prepend-icon="mdi-cash-plus"
      variant="tonal">
      Добавить доход
    </v-btn>
    <v-btn @click="openDialog('expense')" base-color="indigo-lighten-2" class="mr-4" prepend-icon="mdi-cash-minus"
      variant="tonal">
      Добавить расход
    </v-btn>
    <v-btn to="categories" base-color="indigo-lighten-2" class="mr-4" prepend-icon="mdi-shape"
      variant="tonal">
      Категории расходов
    </v-btn>
  </v-app-bar>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="3" align>
        <DateFilter v-model="paymentsStore.dates" />
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-skeleton-loader v-if="balanceStore.isLoading" :loading="balanceStore.isLoading" width="300" type="heading" />
        <h2 v-else>Факт: ₽ {{ balanceStore.balance }}</h2>
      </v-col>
      <v-col cols="4">
        <v-skeleton-loader v-if="balanceStore.isLoading" :loading="balanceStore.isLoading" width="300" type="heading" />
        <h2 v-else>План: ₽ {{ balanceStore.balancePlan }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table :loading="paymentsStore.isLoading" :headers :items="paymentsStore.payments" items-per-page="-1">
            <template #item.date="{ item }">
              {{ moment(item.date).format('DD.MM.YYYY') }}
            </template>
            <template v-slot:loading>
              <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog" max-width="500">
    <AddMoney :type='dialogType' :closeDialog @success="handleSuccess" />
  </v-dialog>
  <v-dialog v-model="expensesDialog" max-width="600">
    <ExpensesCategories />
  </v-dialog>
</template>
