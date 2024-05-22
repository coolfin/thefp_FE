<template>
  <div class="fixed flex flex-col bottom-10 right-10">
    <div
      v-if="!isModalShow"
      class="bg-theme w-[350px] h-[500px] flex flex-col shadow-lg rounded-lg"
    >
      <header class="h-[50px] flex gap-x-4 items-center px-4">
        <div class="rounded-full bg-theme">
          <img src="/assets/logo.png" class="w-8 h-8" alt="logo" />
        </div>
        <div class="flex flex-col">
          <h3 class="font-bold text-white">THE FP AI</h3>
          <span class="text-xs text-[#ccc]"
            >금융관련 기본 지식을 답변해 드려요</span
          >
        </div>
      </header>
      <div class="flex-1 w-full p-4 overflow-scroll bg-white bg-opacity-90">
        <!-- type이 oper이면 operChat, my이면 myChat -->
        <div v-for="item in store.getChat" :key="item.text">
          <template v-if="item.type === 'oper'">
            <operChat :text="item.text" :item="item" />
          </template>
          <template v-else>
            <myChat :text="item.text" :item="item" />
          </template>
        </div>
      </div>
      <form
        @submit.prevent="onSubmitMsg"
        class="h-[50px] flex px-4 text-theme items-center"
      >
        <input
          class="w-full text-sm text-white bg-transparent focus:outline-none"
          v-model="gptText"
        />
        <button type="submit">
          <img
            src="/assets/icons/msg-send-icon.svg"
            alt="send-icon"
            class="w-6 h-6"
          />
        </button>
      </form>
    </div>

    <div class="flex items-center justify-end pt-4">
      <button
        class="flex items-center justify-center w-10 h-10 rounded-full shadow-xl bg-theme"
        @click="isModalShow = !isModalShow"
      >
        <img
          src="/assets/logo.png"
          alt="chat-btn"
          class="w-8 h-8 rounded-full"
          v-if="isModalShow"
        />
        <div v-else class="text-sm font-bold text-white">X</div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import myChat from "@/components/gpt/myChat.vue";
import operChat from "@/components/gpt/operChat.vue";

import { useGptStore } from "@/stores/gpt";

const isModalShow = ref(true);
const gptText = ref("");

const store = useGptStore();

const onSubmitMsg = () => {
  store.sendMessage(gptText.value);
  gptText.value = "";
};
</script>

<style scoped></style>
