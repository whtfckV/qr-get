<script setup lang="ts">
  import { useSellesReturnGraph } from '@/stores/graphs/selles_returns'

  const sellesReturnGraph = useSellesReturnGraph()

</script>

<template>
  hoome page

  <line-chart :data="sellesReturnGraph.graph" />

</template>
