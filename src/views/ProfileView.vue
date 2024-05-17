<template>
  <div class="flex justify-center items-center">
    <!-- container -->
    <div
      class="w-[90%] flex flex-col gap-y-8 md:w-[50%] h-[700px] shadow-xl rounded-md mt-20 p-10"
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
          <h1 class="font-bold text-2xl">
            {{ store.loginUser.name }}님, 어서오세요 🖐
          </h1>
          <p class="text-lg">{{ store.loginUser.email }}</p>
        </div>
      </div>

      <!-- 이름 정보 수정 -->
      <div class="flex flex-col justify-center gap-y-2">
        <h1 class="text-2xl font-bold">이름</h1>
        <div class="flex gap-x-2 items-center" v-if="!canEditName">
          {{ store.loginUser.name }}
          <img
            @click="changeName"
            src="@/assets/icons/name-edit-icon.svg"
            alt="name-edit-icon"
            class="w-4 h-4 cursor-pointer hover:opacity-60"
          />
        </div>

        <div class="flex gap-x-2 items-center" v-else>
          <input
            class="w-fit border border-theme pl-2 text-sm rounded-md focus:outline-none"
            v-model="name"
          />
          <button
            @click="saveEditName"
            class="bg-theme px-2 rounded-md text-sm text-white border border-theme"
          >
            저장
          </button>
          <button
            @click="changeName"
            class="bg-white border border-theme px-2 rounded-md text-sm font-bold text-theme"
          >
            취소
          </button>
        </div>
      </div>

      <!-- 찜한 상품   -->
      <div class="flex-1 flex flex-col justify-center gap-y-2">
        <h1 class="text-2xl font-bold">찜한 상품</h1>

        <div class="h-[300px] overflow-scroll flex flex-col gap-y-2">
          <LikedFinancialProduct v-for="item in 10" :key="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import LikedFinancialProduct from '@/components/profile/LikedFinancialProduct.vue';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

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
</script>
<style scoped></style>
