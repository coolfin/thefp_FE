<template>
  <form
    @submit.prevent="onSubmit"
    class="flex flex-col items-center justify-center py-20 gap-y-4"
  >
    <div class="flex flex-col items-center justify-center flex-1 py-20 gap-y-4">
      <h1 class="text-5xl font-bold text-theme">
        {{ userStore.getLoginUser.user.nickname }}님에게 어울리는 상품을
        추천해드려요!
      </h1>
      <p class="text-[#5B8266] text-lg">
        환율 정보는 매일 자정에 업데이트 됩니다.
      </p>
    </div>

    <div class="w-[500px] flex flex-col gap-y-8 p-6 shadow-lg rounded-md">
      <!-- 성별 -->
      <div class="flex items-center justify-between">
        <p class="w-1/3 mr-4 font-bold">성별</p>
        <div class="flex flex-1 gap-x-2">
          <input type="radio" value="0" v-model="gender" id="male" />
          <label for="male">남성</label>
          <input type="radio" value="1" v-model="gender" id="female" />
          <label for="female">여성</label>
        </div>
      </div>
      <!-- 신용등급(0-999) -->
      <div class="flex items-center justify-between">
        <p class="w-1/3 mr-4 font-bold">신용등급</p>
        <div class="flex-1">
          <input
            id="crdt_grad"
            type="number"
            v-model="credit"
            placeholder="신용등급(0-999)"
            class="px-4 py-1 text-sm border rounded-md focus:outline-none border-theme"
          />
        </div>
      </div>
      <!-- 연봉(만원) -->
      <div class="flex items-center justify-between">
        <p class="w-1/3 mr-4 font-bold">연봉</p>
        <div class="flex-1">
          <input
            id="annual_income"
            type="number"
            v-model="annualIncome"
            placeholder="연봉(만원)"
            class="px-4 py-1 text-sm border rounded-md focus:outline-none border-theme"
          /><span class="ml-2">만원</span>
        </div>
      </div>
      <!-- 월 소비 금액(만원) -->
      <div class="flex items-center justify-between">
        <p class="w-1/3 mr-4 font-bold">월 소비 금액</p>
        <div class="flex-1">
          <input
            id="monthly_expense"
            type="number"
            v-model="monthlyExpense"
            placeholder="월 소비 금액(만원)"
            class="px-4 py-1 text-sm border rounded-md focus:outline-none border-theme"
          /><span class="ml-2">만원</span>
        </div>
      </div>
      <!-- 순 자산(만원) -->
      <div class="flex items-center justify-between">
        <p class="w-1/3 mr-4 font-bold">순 자산</p>
        <div class="flex-1">
          <input
            id="net_asset"
            type="number"
            v-model="netAsset"
            placeholder="순 자산(만원)"
            class="px-4 py-1 text-sm border rounded-md focus:outline-none border-theme"
          /><span class="ml-2">만원</span>
        </div>
      </div>
      <!-- 부동산 보유여부(bool) -->

      <div class="flex items-center justify-between">
        <p class="w-1/3 mr-4 font-bold">부동산 보유여부</p>
        <div class="flex flex-1 gap-x-2">
          <input
            type="radio"
            id="no_real_estate"
            v-model="hasRealEstate"
            value="0"
          />
          <label for="no_real_estate">없다</label>

          <input
            type="radio"
            id="has_real_estate"
            v-model="hasRealEstate"
            value="1"
          />
          <label for="has_real_estate">있다</label>
        </div>
      </div>
      <!-- 투자 성향 -->
      <div class="flex items-center justify-between">
        <p class="w-1/3 mr-4 font-bold">투자 성향</p>
        <div class="flex flex-1">
          <select
            id="investment_tendency"
            class="px-4 py-1 text-sm border rounded-md focus:outline-none border-theme"
            v-model="investmentTendency"
          >
            <option value="1">안정형</option>
            <option value="2">안정추구형</option>
            <option value="3">위험중립형</option>
            <option value="4">적극투자형</option>
            <option value="5">공격투자형</option>
          </select>
        </div>
      </div>
      <!-- 보유한 예적금 상품 수 -->
      <div class="flex items-center justify-between">
        <p class="w-1/3 mr-4 font-bold">보유한 예적금 상품 수</p>
        <div class="flex-1">
          <input
            id="deposit_product_count"
            type="number"
            v-model="depositProductCount"
            placeholder="보유한 예적금 상품 수"
            class="px-4 py-1 text-sm border rounded-md focus:outline-none border-theme"
          /><span class="ml-2">개</span>
        </div>
      </div>
      <!-- 선호 가입 경로(checkbox) -->
      <div class="flex items-center justify-between">
        <p class="w-1/3 mr-4 font-bold">선호 가입 경로</p>
        <div class="flex flex-1 gap-x-2">
          <input
            type="checkbox"
            id="internet"
            value="인터넷"
            v-model="preferredJoinPath"
          />
          <label for="internet">인터넷</label>
          <input
            type="checkbox"
            id="mobile"
            value="스마트폰"
            v-model="preferredJoinPath"
          />
          <label for="mobile">모바일</label>
          <input
            type="checkbox"
            id="offline"
            value="영업점"
            v-model="preferredJoinPath"
          />
          <label for="offline">오프라인</label>
          <input
            type="checkbox"
            id="call"
            value="전화"
            v-model="preferredJoinPath"
          />
          <label for="call">전화</label>
        </div>
      </div>
      <!-- 선호 상품 타입 선택 -->
      <div class="flex items-center justify-between">
        <p class="w-1/3 mr-4 font-bold">선호 상품 타입</p>
        <div class="flex flex-1 gap-x-2">
          <input
            type="checkbox"
            value="예금"
            v-model="preferredProductType"
            id="deposit"
          />
          <label for="deposit">예금</label>
          <input
            type="checkbox"
            value="적금"
            v-model="preferredProductType"
            id="saving"
          />
          <label for="saving">적금</label>
        </div>
      </div>
      <!-- 선호 금리 타입 -->
      <div class="flex items-center justify-between">
        <p class="w-1/3 mr-4 font-bold">선호 금리 타입</p>
        <div class="flex flex-1 gap-x-2">
          <input
            type="checkbox"
            value="단리"
            v-model="preferredInterestType"
            id="fixed"
          />
          <label for="fixed">단리</label>
          <input
            type="checkbox"
            value="복리"
            v-model="preferredInterestType"
            id="floating"
          />
          <label for="floating">복리</label>
        </div>
      </div>
      <!-- 희망 금리 -->
      <div class="flex items-center justify-between">
        <p class="w-1/3 mr-4 font-bold">희망 금리</p>
        <div class="flex-1">
          <input
            id="preferred_interest_rate"
            type="number"
            v-model="preferredInterestRate"
            placeholder="희망 금리"
            class="px-4 py-1 text-sm border rounded-md focus:outline-none border-theme"
          /><span class="ml-2">%</span>
        </div>
      </div>
      <!-- 희망 저축 기간 -->
      <div class="flex items-center justify-between">
        <p class="w-1/3 mr-4 font-bold">희망 저축 기간</p>
        <div class="flex-1">
          <input
            id="preferred_saving_period"
            type="number"
            v-model="preferredSavingPeriod"
            placeholder="희망 저축 기간"
            class="px-4 py-1 text-sm border rounded-md focus:outline-none border-theme"
          /><span class="ml-2">개월</span>
        </div>
      </div>

      <button type="submit" class="px-12 py-4 text-white rounded-lg bg-theme">
        추천 받기
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const gender = ref(0);
const credit = ref();
const annualIncome = ref();
const monthlyExpense = ref();
const netAsset = ref();
const hasRealEstate = ref(0);
const investmentTendency = ref(1);
const depositProductCount = ref();
const preferredJoinPath = ref([]);
const preferredProductType = ref([]);
const preferredInterestType = ref([]);
const preferredInterestRate = ref();
const preferredSavingPeriod = ref();

import { useUserStore } from "@/stores/user";
import axios from "axios";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const onSubmit = async () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  await axios({
    method: "post",
    url: BASE_URL + "/fp/recommend_product/",
    data: {
      gender: gender.value,
      crdt_grad: credit.value,
      salary: annualIncome.value,
      m_consumption: monthlyExpense.value,
      asset: netAsset.value,
      real_estate: hasRealEstate.value,
      invest_tendency: investmentTendency.value,
      pro_cnt: depositProductCount.value,
      join_way: preferredJoinPath.value,
      join_way_cnt: preferredJoinPath.value.length,
      type: preferredProductType.value,
      intr_rate_type_nm: preferredInterestType.value,
      intr_rate: preferredInterestRate.value,
      save_trm: preferredSavingPeriod.value,
    },
    headers: {
      Authorization: `Token ${userStore.token}`,
    },
  })
    .then((res) => {
      console.log(res.data);
      result.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  router.push({ name: "info-detail", params: { id: 11 } });
};
</script>

<style scoped></style>
