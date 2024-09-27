import { defineStore } from 'pinia'

const MOCK = [
  {
    period: new Date('2024-09-17'),
    sales: 7,
    returns: 8,
    remaind: 8,
  },
  {
    period: new Date('2024-09-18'),
    sales: 9,
    returns: 0,
    remaind: 4,
  },
  {
    period: new Date('2024-09-19'),
    sales: 9,
    returns: 6,
    remaind: 4,
  },
  {
    period: new Date('2024-09-20'),
    sales: 9,
    returns: 6,
    remaind: 9,
  },
  {
    period: new Date('2024-09-21'),
    sales: 1,
    returns: 5,
    remaind: 10,
  },
  {
    period: new Date('2024-09-22'),
    sales: 4,
    returns: 2,
    remaind: 1,
  },
  {
    period: new Date('2024-09-23'),
    sales: 1,
    returns: 0,
    remaind: 8,
  },
  {
    period: new Date('2024-09-24'),
    sales: 10,
    returns: 10,
    remaind: 8,
  },
  {
    period: new Date('2024-09-25'),
    sales: 7,
    returns: 7,
    remaind: 8,
  },
  {
    period: new Date('2024-09-26'),
    sales: 10,
    returns: 0,
    remaind: 2,
  },
]

export const useSellesReturnGraph = defineStore('sellesReturnGraph', () => {
  const graph = ref(MOCK)

  return {
    graph,
  }
})
