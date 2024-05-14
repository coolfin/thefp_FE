<template>
  <div class="flex flex-col items-center justify-center gap-y-20 py-20">
    <!-- header text -->
    <div class="gap-y-2 flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold text-theme">환율을 계산해 보세요!</h1>
      <p class="text-[#5B8266] text-sm">
        환율 정보는 매일 자정에 업데이트 됩니다.
      </p>
    </div>

    <!-- input -->
    <div
      class="w-[600px] bg-white border border-theme rounded-lg flex justify-between items-center"
    >
      <div class="flex items-center p-4 bg-theme rounded-l-lg">
        <select
          v-model="FromselectedExchange"
          class="text-white px-2 font-bold focus:outline-none appearance-none bg-transparent text-center"
        >
          <option
            v-for="exchange in dummyExchange"
            :value="exchange"
            :key="'_from' + exchange.name"
            class="text-theme font-bold"
          >
            {{ exchange.name }}
          </option>
        </select>
      </div>

      <input
        type="text"
        :placeholder="FromselectedExchange.symbol"
        class="text-theme flex-1 focus:outline-none text-end pr-4"
        v-model="FromNum"
        @input="calExchange"
      />
    </div>

    <!-- result -->
    <div
      v-if="FromNum && ToNum"
      class="text-theme gap-y-4 text-4xl font-bold flex flex-col justify-center items-center"
    >
      <p>{{ FromNum }} 원</p>
      <p>=</p>
      <p>{{ ToNum }} {{ FromselectedExchange.symbol }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';

const FromNum = ref('');
const ToNum = ref('');

const FromselectedExchange = ref({
  name: '대한민국 원',
  rate: 1,
  symbol: '원',
});

const dummyExchange = ref([
  { name: '대한민국 원', rate: 1, symbol: '원' },
  { name: '미국 달러', rate: 0.00073, symbol: '달러' },
  { name: '유럽 유로', rate: 0.00068, symbol: '유로' },
  { name: '일본 엔', rate: 0.11, symbol: '엔' },
  { name: '중국 위안', rate: 0.0053, symbol: '위안' },
]);

watch(FromselectedExchange, () => {
  calExchange();
});

const calExchange = () => {
  ToNum.value = FromNum.value * FromselectedExchange.value.rate;
};
</script>
<style scoped></style>
