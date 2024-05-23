<template>
  <div class="relative shrink-0">
    <div
      v-if="item === 2"
      class="absolute top-0 left-0 z-10 w-full h-full bg-opacity-80 bg-[#333] flex items-center justify-center rounded-lg"
    >
      <span class="text-2xl font-bold text-[#AEF6C7]">종료된 상품입니다.</span>
    </div>
    <div
      @click="clickFinancialProduct"
      class="flex items-center px-2 py-4 hover:bg-[#eee] rounded-lg cursor-pointer transition duration-300 ease-in-out"
    >
      <div class="flex items-center w-2/12 gap-x-4">
        <img class="w-10 rounded-lg" :src="item.imgUrl" alt="bank-logo-image" />
        <span>{{ item.kor_co_nm }}</span>
      </div>

      <div class="w-1/12">
        <div
          class="px-3 py-1 text-sm border rounded-full text-theme border-theme w-fit"
        >
          적금
        </div>
      </div>

      <div class="w-3/12 pr-2 truncate">{{ item.fin_prdt_nm }}</div>

      <div class="flex justify-between flex-1">
        <span class="w-1/3">{{ item.intr_rate2 }}%</span>
        <span class="flex-1">{{ item.save_trm }}개월</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useFpStore } from "@/stores/fp";
const router = useRouter();

const props = defineProps({
  item: Object,
});

const store = useFpStore();
const clickFinancialProduct = async () => {
  console.log(props);
  await store.fetchDetailProduct(props.item.id);
  router.push({ name: "info-detail", params: { id: props.item.id } });
};
</script>

<style scoped></style>
