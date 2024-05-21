import { defineStore } from "pinia";
import { ref, computed } from "vue";
import OpenAI from "openai";

export const useGptStore = defineStore(
  "gpt",
  () => {
    const chat = ref([]);
    const isLoadingGpt = ref(false);

    const getChat = computed(() => chat.value);

    const sendMessage = async (text) => {
      chat.value.push({ text, type: "user", isLoading: false });
      chat.value.push({ text: "Thinking...", type: "oper", isLoading: true });

      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_GPT_API_KEY,
        dangerouslyAllowBrowser: true,
      });
      //axios로 gpt-3 api 호출하는 코드 추가
      try {
        isLoadingGpt.value = true;
        const res = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are an expert in financial knowledge, including savings accounts, fixed deposits, and personal loans.",
            },
            {
              role: "user",
              content: text,
            },
          ],
          temperature: 0.7,
          top_p: 0.9,
        });

        chat.value[chat.value.length - 1] = {
          text: res.choices[0].message.content,
          type: "oper",
          isLoading: false,
        };

        //아래로 스크롤
      } catch (error) {
        console.error("err", error);
      }
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
