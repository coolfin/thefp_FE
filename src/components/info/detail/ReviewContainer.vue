<template>
  <div>
    <!-- header -->
    <form
      @submit.prevent="submitReview"
      class="flex flex-col p-4 mb-4 border-2 rounded-lg border-theme gap-y-2"
    >
      <!-- 유저명 -->
      <h3 class="text-lg font-bold text-theme">
        {{ userStore.getLoginUser.name }}
      </h3>

      <!-- textarea -->

      <textarea
        v-model="reviewText"
        placeholder="댓글을 작성해보세요."
        class="w-full py-2 text-sm focus:outline-none text-theme min-h-[100px]"
        style="resize: none"
      />

      <!-- footer -->
      <div class="border-t border-[#eee] flex items-center justify-end pt-4">
        <button class="px-5 py-2 text-sm text-white rounded-lg bg-theme">
          제출
        </button>
      </div>
    </form>

    <div v-if="fpStore.getReviews.length">
      <ReviewItem
        v-for="comment in fpStore.getReviews"
        :key="comment?.id"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script setup>
import ReviewItem from "@/components/info/detail/ReviewItem.vue";
import { useUserStore } from "@/stores/user";
import { useFpStore } from "@/stores/fp";
import { ref } from "vue";

const userStore = useUserStore();
const fpStore = useFpStore();

const reviewText = ref("");

const submitReview = () => {
  fpStore.createReview(reviewText.value);
  reviewText.value = "";
};
</script>

<style scoped></style>
