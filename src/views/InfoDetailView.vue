<template>
  <div class="flex items-center justify-center py-20">
    <!-- wrapper -->
    <div class="w-[800px] flex flex-col gap-y-16">
      <!-- background banner -->
      <div>
        <img
          src="/assets/detail-banner.png"
          alt="banner"
          class="object-cover h-[300px] w-full object-center rounded-lg"
        />
      </div>

      <!-- 로고, 상품명 -->
      <div class="flex flex-col gap-y-8">
        <!-- 로고 -->
        <img
          alt="bank-logo"
          class="w-[100px] h-[100px]"
          :src="store.getDetailImage"
        />
        <div class="flex flex-col justify-center pl-2">
          <!-- 금융회사명 -->
          <h3 class="text-xl">{{ productItem.product.kor_co_nm }}</h3>
          <!-- 상품명 -->
          <h1 class="text-3xl font-bold">
            {{ productItem.product.fin_prdt_nm }}
          </h1>
        </div>
      </div>

      <!-- callout -->
      <div class="bg-[#eee] w-full rounded-lg px-2 py-4">
        💡 THE FP의 예적금 금융상품은 금융감독원 api를 기반으로 제공되었습니다.
        실제 가입 시기에 따라 상이할 수 있습니다.
      </div>

      <!-- 상품정보 헤더 container -->
      <div class="flex flex-col justify-center pl-2 gap-y-12">
        <!-- 금리 -->
        <div class="flex items-center">
          <!-- 최고 금리 -->
          <div class="flex flex-col justify-center flex-1 gap-y-2 text-theme">
            <h3 class="font-bold">최고 금리</h3>
            <p class="text-2xl font-bold">{{ store.getHighestRate }}%</p>
          </div>

          <!-- 기본 금리 -->
          <div class="flex flex-col justify-center flex-1 gap-y-2">
            <h3 class="font-bold">기본 금리</h3>
            <p class="text-2xl">{{ store.getNormalRate.intr_rate2 }}%</p>
          </div>
        </div>

        <!-- 가입대상 -->
        <div class="flex flex-col justify-center gap-y-2">
          <h3 class="font-bold">가입 대상</h3>
          <p>{{ productItem.product.join_member }}</p>
        </div>

        <!-- 가입방법 -->
        <div class="flex flex-col justify-center gap-y-2">
          <h3 class="font-bold">가입 방법</h3>
          <p>{{ productItem.product.join_way }}</p>
        </div>

        <!-- 우대조건 -->
        <div class="flex flex-col justify-center gap-y-2">
          <h3 class="font-bold">우대 조건</h3>
          <p>{{ productItem.product.spcl_cnd }}</p>
        </div>
      </div>

      <!-- 상품정보 container -->
      <div class="flex flex-col justify-center pl-2 gap-y-2">
        <h2 class="text-2xl font-bold">상품 정보</h2>
        <div v-for="info in store.getDetailProductInfo" :key="info">
          {{ info }}
        </div>
      </div>

      <!-- 기간 별 금리비교 container -->
      <div class="flex flex-col justify-center gap-y-4">
        <h2 class="text-2xl font-bold">
          상품의 가입기간 별 금리를 비교해 보세요
        </h2>

        <div class="flex-1">
          <!-- 기간 별 금리 비교 -->
          <header class="flex">
            <div class="w-1/6 border-b border-[#eee]"></div>
            <div class="flex items-center overflow-scroll">
              <IntrPeriodBtn
                v-for="option in productItem.options"
                :key="option.id"
                :option="option"
                @click="clickOption"
                :class="{
                  '!bg-white !text-theme !border-x-theme !border-t-theme border !border-b-white':
                    curOpt === option,
                }"
              />
            </div>

            <div class="w-1/6 border-b border-[#eee]"></div>
          </header>

          <!-- 금리 값 출력 컨테이너 -->
          <div class="flex flex-col items-center justify-center py-20 gap-y-2">
            <h2 class="text-3xl font-bold">금리 {{ curOpt.intr_rate2 }}%</h2>
            <p v-if="productItem.product.spcl_cnd !== '해당사항 없음'">
              우대조건이 없어요 😢
            </p>
            <div class="flex flex-col items-center justify-center" v-else>
              <p>기본 {{ curOpt.intr_rate }}%</p>
              <p>우대 {{ curOpt.intr_rate2 }}%</p>
            </div>
          </div>
        </div>
      </div>

      <ReviewContainer />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useFpStore } from "@/stores/fp";

import IntrPeriodBtn from "@/components/info/detail/IntrPeriodBtn.vue";
import ReviewContainer from "@/components/info/detail/ReviewContainer.vue";

const route = useRoute();
const store = useFpStore();

const productId = ref(route.params.id);
const productItem = ref(store.getDetailProduct(productId.value));

const curOpt = ref(productItem.value.options[0]);

const clickOption = (option) => {
  curOpt.value = option;
};
</script>

<style scoped></style>
