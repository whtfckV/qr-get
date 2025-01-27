<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const model = defineModel<Date[]>();
const startTime = ref([
  { hours: 0, minutes: 0 },
  { hours: 99, minutes: 99 },
]);

const formatDate = ([dateStart, dateEnd]: [Date, Date]) => {
  return (
    dateStart.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }) +
    " - " +
    dateEnd.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};
</script>

<template>
  <VueDatePicker v-model="model" :start-time="startTime" class="vuetify-style-datepicker" range utc locale="ru"
    select-text="Выбрать" cancel-text="Отменить" position="left" :format="formatDate" :clearable="false" :time-picker-inline="true" />
</template>

<style lang="scss">
/* В глобальных стилях или внутри компонента */
:root {
  --dp-primary-color: #1976d2;
  /* Синий цвет, как в Vuetify */
  --dp-border-radius: 4px;
  --dp-font-family: "Roboto", sans-serif;
}

/* Кастомизация кнопок */
.dp__action_button {
  border-radius: 4px !important;
}

/* Ховер дат */
.dp__cell_inner:hover {
  background: #e3f2fd !important;
}

.vuetify-style-datepicker .dp__input {
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  padding-top: 15px;
  padding-bottom: 15px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;

  &:hover {
    border-color: #212121;
  }
}

.vuetify-style-datepicker .dp__active_date {
  background: #1976d2 !important;
  color: white !important;
}
</style>
