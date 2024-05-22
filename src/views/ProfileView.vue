<template>
  <div class="flex items-center justify-center">
    <!-- container -->
    <div
      class="w-[90%] flex flex-col gap-y-12 md:w-[50%] shadow-xl rounded-md mt-20 p-10"
    >
      <!-- 유저 정보 -->
      <div class="flex items-center gap-x-4">
        <!-- 이미지 -->
        <div>
          <img
            src="@/assets/icons/profile-icon.svg"
            alt="user-icon"
            class="w-30 h-30"
          />
        </div>

        <!-- 환영메시지, 이메일 -->
        <div>
          <h1 class="text-2xl font-bold">
            {{ store.loginUser?.name }}님, 어서오세요 🖐
          </h1>
          <p class="text-lg">{{ store.loginUser?.email }}</p>
        </div>
      </div>

      <!-- 이름 정보 수정 -->
      <div class="flex flex-col justify-center gap-y-2">
        <h1 class="text-2xl font-bold">이름</h1>
        <div class="flex items-center gap-x-2" v-if="!canEditName">
          {{ store.loginUser?.name }}
          <img
            @click="changeName"
            src="@/assets/icons/name-edit-icon.svg"
            alt="name-edit-icon"
            class="w-4 h-4 cursor-pointer hover:opacity-60"
          />
        </div>

        <div class="flex items-center gap-x-2" v-else>
          <input
            class="pl-2 text-sm border rounded-md w-fit border-theme focus:outline-none"
            v-model="name"
          />
          <button
            @click="saveEditName"
            class="px-2 text-sm text-white border rounded-md bg-theme border-theme"
          >
            저장
          </button>
          <button
            @click="changeName"
            class="px-2 text-sm font-bold bg-white border rounded-md border-theme text-theme"
          >
            취소
          </button>
        </div>
      </div>

      <div class="flex flex-col justify-center gap-y-2">
        <h1 class="text-2xl font-bold">차트</h1>
        <div class="items-center gap-x-2 h-[400px]">
          <canvas id="chart">차트</canvas>
        </div>
      </div>

      <!-- 찜한 상품   -->
      <div class="flex flex-col justify-center flex-1 gap-y-2">
        <h1 class="text-2xl font-bold">찜한 상품</h1>

        <div class="h-[300px] overflow-scroll flex flex-col gap-y-2">
          <LikedFinancialProduct v-for="item in 10" :key="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import LikedFinancialProduct from "@/components/profile/LikedFinancialProduct.vue";
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";

//chartjs
import Chart from "chart.js/auto";
const barChart = ref(null);

const store = useUserStore();

const canEditName = ref(false);
const name = ref(store.loginUser.name);

const changeName = () => {
  canEditName.value = !canEditName.value;
};

const saveEditName = () => {
  store.editLoginuserName(name.value);
  canEditName.value = !canEditName.value;
};

onMounted(() => {
  barChart.value = new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels: ["#1", "#2", "#3", "#4", "#5", "6"],
      datasets: [
        {
          label: "찜한 상품의 금리 비교",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          fill: true,
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
</script>
<style scoped></style>
