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
    <div class="bg-theme p-2 rounded-lg">
      <div class="w-[500px] flex items-center py-4">
        <select
          v-model="FromselectedExchange"
          class="text-white font-bold focus:outline-none appearance-none bg-transparent text-center"
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
        <input
          type="text"
          placeholder="0"
          class="text-theme flex-1 focus:outline-none text-end pr-4"
          v-model="FromNum"
          @input="calExchange"
        />
      </div>
    </div>

    <!-- result -->
    <div
      v-if="FromNum && ToNum"
      class="text-theme gap-y-4 text-4xl font-bold flex flex-col justify-center items-center"
    >
      <p>{{ FromNum }}$</p>
      <p>=</p>
      <p>{{ ToNum }}{{ FromselectedExchange.symbol }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';

const FromNum = ref('');
const ToNum = ref('');

const FromselectedExchange = ref({ name: '미국 달러', rate: 1, symbol: '$' });

const dummyExchange = ref([
  { name: '미국 달러', rate: 1, symbol: '$' },
  { name: '대한민국 원', rate: 1130, symbol: '₩' },
  { name: '유럽 유로', rate: 0.84, symbol: '€' },
  { name: '일본 엔', rate: 110, symbol: '¥' },
]);

watch(FromselectedExchange, () => {
  calExchange();
});

const calExchange = () => {
  ToNum.value = FromNum.value * FromselectedExchange.value.rate;
};
</script>
<style scoped></style>
