<template>
  <div class="flex flex-col items-center justify-center pt-20">
    <!-- text -->
    <div
      class="w-[80%] flex flex-col items-center justify-center py-20 gap-y-8"
    >
      <h1 class="text-5xl font-bold text-theme">주변은행을 찾아보세요! 🗺</h1>

      <form @submit.prevent="geocoderRes">
        <input
          type="text"
          v-model="text"
          placeholder="장소, 도로 검색"
          class="border border-theme w-[600px] p-4 focus:outline-none rounded-lg text-theme"
        />
      </form>

      <div class="pb-4 w-[80%] overflow-x-scroll flex gap-x-4">
        <LocationBtn
          v-for="bank in store.locations"
          :key="bank.name"
          :bank="bank"
        />
      </div>
    </div>

    <naver-map
      style="width: 80%; height: 80vh"
      @on-load="onLoadMap"
      :map-options="mapOptions"
    >
      <naver-marker
        v-for="bank in store.banks"
        :key="bank.name"
        :latitude="bank.lat"
        :longitude="bank.lng"
      >
        <div
          class="p-1 rounded-full bg-white border-2 border-[#317b22]"
          @click="clickBank(bank)"
        >
          <img :src="bank.image" class="w-8 h-8 rounded-full" />
        </div>
      </naver-marker>
    </naver-map>
  </div>
</template>

<script setup>
import LocationBtn from "@/components/LocationBtn.vue";
import { ref } from "vue";
import { NaverMap, NaverMarker, NaverInfoWindow } from "vue3-naver-maps";
import { useBankStore } from "@/stores/bank";

const store = useBankStore();

const text = ref("");
const markerPosition = ref({
  lat: 37.501392,
  lng: 127.039587,
});

const mapOptions = {
  latitude: 37.501392,
  longitude: 127.039587,
  zoom: 18,
  zoomControl: false,
};

const morphOption = {
  duration: 300,
  easing: "easeOutCubic",
};

const onLoadMap = (naverMap) => {
  store.nmap = naverMap;
};

const geocoderRes = async () => {
  await changePosition();
  //panTo
  store.nmap.panTo(markerPosition.value, morphOption);
};

const changePosition = async () => {
  return new Promise((resolve, reject) => {
    //주소를 좌표로 변환
    naver.maps.Service.geocode({ address: text.value }, (status, response) => {
      if (status === naver.maps.Service.Status.ERROR) {
        alert("주소를 찾을 수 없습니다.");
        reject();
        return;
      }

      const result = response.v2.addresses[0];
      if (response.result.total === 0) {
        alert("주소를 찾을 수 없습니다.");
        reject();
        return;
      }

      markerPosition.value = {
        lat: parseFloat(result.y),
        lng: parseFloat(result.x),
      };

      resolve();
    });
    text.value = "";
  });
};

const clickBank = (bank) => {
  alert(
    "📌위치 정보를 알려드려요!\n장소 : " +
      bank.name +
      "\n주소 : " +
      bank.address
  );
};
</script>

<style scoped></style>
