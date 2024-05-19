<template>
  <div class="flex flex-col items-center justify-center pt-20">
    <!-- text -->
    <div class="flex flex-col items-center justify-center py-20 gap-y-8">
      <h1 class="text-5xl font-bold text-theme">주변은행을 찾아보세요! 🗺</h1>
      <form @submit.prevent="geocoderRes">
        <input
          type="text"
          v-model="text"
          placeholder="장소, 도로 검색"
          class="border border-theme w-[600px] p-4 focus:outline-none rounded-lg text-theme"
        />
      </form>
    </div>

    <naver-map style="width: 80%; height: 80vh">
      <naver-marker latitude="37.51347" longitude="127.041722" />
    </naver-map>
  </div>
</template>

<script setup>
import { NaverMap } from "vue3-naver-maps";
import { NaverMarker } from "vue3-naver-maps";
import { ref } from "vue";

const text = ref("");

const geocoderRes = () => {
  const geocoder = new naver.maps.services.Geocoder();

  geocoder.addressSearch(text.value, function (status, response) {
    if (status === naver.maps.Service.Status.ERROR) {
      return alert("주소를 찾을 수 없습니다.");
    }
    const result = response[0];
    const lat = result.y;
    const lng = result.x;
    console.log(lat, lng);
  });
};
</script>

<style scoped></style>
