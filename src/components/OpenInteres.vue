<template>
  <div class="title">
    {{ props.coin }}
  </div>
  <div class="interes">
    <div class="interes__item" v-for="(item, index) in tableData">
      {{ item.timestamp }}
      <div>
        OP - {{ item.openInterest }}
      </div>
      <div v-if="tableData[index + 1]" class="delta"
        :class="{ 'delta--red': item.openInterest - tableData[index + 1].openInterest < 0 }">
        {{ item.openInterest - tableData[index + 1].openInterest }}
        {{ ((item.openInterest - tableData[index + 1].openInterest) / (tableData[index + 1].openInterest /
          100)).toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import getOpenInteres from '@/stores/getOpenInteres';
import { onMounted, onUnmounted, ref } from 'vue';
import formatTimestamp from './formatTimestamp';
import shortFormatTimestamp from './shortformatTimestamp';
import getCoinPrice from '@/stores/getCoinPrice';

const props = defineProps(['coin'])
const tableData: any = ref([]);
let interval: any

onMounted(async () => {
  formatData(await getOpenInteres(props.coin))

  getCoinPrice(props.coin, '5min')
  interval = setInterval(async () => {
    formatData(await getOpenInteres(props.coin))
  }, 15000);
})

onUnmounted(() => {
  clearInterval(interval);
});



function formatData(data: any) {
  tableData.value = [];
  data.result.list.forEach((item: { time: any, openInterest: string }, index: any) => {
    const time = shortFormatTimestamp(item.timestamp);
    tableData.value.push({ timestamp: time, openInterest: item.openInterest.split('.')[0] })
  });
}

</script>

<style scoped>
.title {
  font-size: 1.1rem;
  font-weight: 700;
  color: hsla(160, 100%, 37%, 1);
  margin-bottom: 8px;
}

.interes {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;

  .interes__item {
    width: fit-content;
    font-size: 1.05rem;

    .delta {
      color: green;
      font-weight: 500;
    }

    .delta--red {
      color: red;
    }
  }
}
</style>