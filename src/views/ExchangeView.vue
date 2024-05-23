<template>
  <div class="flex flex-col items-center justify-center py-20 gap-y-20">
    <!-- header text -->
    <div class="flex flex-col items-center justify-center flex-1 pt-20 gap-y-4">
      <h1 class="text-5xl font-bold text-theme">환율을 계산해 보세요!</h1>
      <p class="text-[#5B8266] text-lg">
        환율 정보는 매일 자정에 업데이트 됩니다.
      </p>
    </div>

    <!-- input -->
    <div
      class="w-[600px] bg-white border border-theme rounded-lg flex justify-between items-center"
    >
      <div class="flex items-center p-4 rounded-l-lg bg-theme">
        <select
          v-model="FromselectedExchange"
          class="px-2 font-bold text-center text-white bg-transparent appearance-none cursor-pointer focus:outline-none"
        >
          <option
            v-for="exchange in exchange"
            :value="exchange"
            :key="'_from' + exchange.cur_nm"
            class="font-bold text-theme"
          >
            {{ exchange.cur_nm }}
          </option>
        </select>
      </div>

      <input
        type="text"
        placeholder="금액을 입력하세요."
        class="flex-1 pr-4 text-theme focus:outline-none text-end"
        v-model="FromNum"
        @input="calExchange"
      />
    </div>

    <!-- result -->
    <div
      v-if="FromNum && ToNum"
      class="h-[300px] flex flex-col items-center justify-center text-4xl font-bold text-theme"
    >
      <p>{{ showFromExchangeNum }}</p>
      <p>=</p>
      <p>{{ showToExchangeNum }}</p>
    </div>
    <div v-else class="h-[300px]">
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, watch, computed, onMounted } from "vue";

const FromNum = ref("");
const ToNum = ref("");

const exchange = ref([]);
const FromselectedExchange = ref({});

watch(FromselectedExchange, () => {
  calExchange();
});

const calExchange = () => {
  if (FromNum.value.length > 12) {
    alert("금액은 12자리까지 입력 가능합니다.");
    FromNum.value = FromNum.value.slice(0, 12);
  }

  const regexp = /^[0-9]*$/;
  if (!regexp.test(FromNum.value)) {
    alert("숫자만 입력 가능합니다.");
    FromNum.value = FromNum.value.slice(0, -1);
  }

  const tar_rate = parseFloat(
    FromselectedExchange.value.kftc_deal_bas_r.replace(",", "")
  );

  ToNum.value = FromNum.value / tar_rate;
  ToNum.value = ToNum.value.toString();
};

const showFromExchangeNum = computed(() => {
  if (FromNum.value.length <= 4) {
    return `${FromNum.value} 원`;
  } else if (FromNum.value.length <= 8) {
    return `${FromNum.value.slice(0, -4)}만 ${FromNum.value.slice(-4)} 원`;
  }
  return `${FromNum.value.slice(0, -8)}억 ${FromNum.value.slice(
    -8,
    -4
  )}만 ${FromNum.value.slice(-4)} 원`;
});

const showToExchangeNum = computed(() => {
  if (FromselectedExchange.value.cur_unit === "KRW") {
    if (ToNum.value.length <= 4) {
      return `${ToNum.value} 원`;
    } else if (ToNum.value.length <= 8) {
      return `${ToNum.value.slice(0, -4)}만 ${ToNum.value.slice(-4)} 원`;
    }
    return `${ToNum.value.slice(0, -8)}억 ${ToNum.value.slice(
      -8,
      -4
    )}만 ${ToNum.value.slice(-4)} 원`;
  } else {
    const integerPart = Math.floor(parseFloat(ToNum.value)).toString();
    const decimalPart = Math.round(
      (parseFloat(ToNum.value) - parseFloat(integerPart)) * 10000
    ).toString();

    if (integerPart.length <= 4) {
      return `${integerPart}.${decimalPart} ${FromselectedExchange.value.cur_unit}`;
    } else if (integerPart.length <= 8) {
      return `${integerPart.slice(0, -4)}만 ${integerPart.slice(
        -4
      )}.${decimalPart} ${FromselectedExchange.value.cur_unit}`;
    } else if (integerPart.length <= 12) {
      return `${integerPart.slice(0, -8)}억 ${integerPart.slice(
        -8,
        -4
      )}만 ${integerPart.slice(-4)}.${decimalPart} ${
        FromselectedExchange.value.cur_unit
      }`;
    }
    return `${integerPart.slice(0, -12)}조 ${integerPart.slice(
      -12,
      -8
    )}억 ${integerPart.slice(-8, -4)}만 ${integerPart.slice(
      -4
    )}.${decimalPart} ${FromselectedExchange.value.cur_unit}`;
  }
});

onMounted(async () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  await axios({
    method: "get",
    url: BASE_URL + "/exchange/exchange_rate/",
  })
    .then((res) => {
      exchange.value = res.data.exchange_rate;

      const korea = exchange.value.filter((item) => item.cur_unit === "KRW");
      console.log(korea);
      FromselectedExchange.value = korea[0];
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>
<style scoped></style>
