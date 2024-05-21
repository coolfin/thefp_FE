import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useGptStore = defineStore(
  "gpt",
  () => {
    const chat = ref([]);
    const isLoadingGpt = ref(false);

    const getChat = computed(() => chat.value);

    const sendMessage = (text) => {
      chat.value.push({ text, type: "user" });

      //axios로 gpt-3 api 호출하는 코드 추가
      setTimeout(() => {
        isLoadingGpt.value = true;
        chat.value.push({ text: "안녕하세요", type: "oper" });
      }, 2000);

      isLoadingGpt.value = false;
    };
    return {
      chat,
      isLoadingGpt,
      getChat,
      sendMessage,
    };
  },
  {
    persist: true,
  }
);
