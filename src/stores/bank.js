import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useBankStore = defineStore("bank", () => {
  //서울이 default
  const nmap = ref(null);
  const currentLocation = ref({
    name: "싸피",
    lat: 37.501392,
    lng: 127.039587,
  });

  const banks = ref([
    {
      name: "멀티캠퍼스 역삼",
      image: "/assets/icons/ssafy-logo.png",
      address: "서울특별시 강남구 테헤란로 212",
      lat: 37.501392,
      lng: 127.039587,
    },
    {
      name: "KB국민은행 강남역종합금융센터",
      image: "/assets/icons/banks/gookmin-logo.svg",
      address: "서울특별시 강남구 테헤란로 127",
      lat: 37.498394,
      lng: 127.027622,
    },
    {
      name: "신한은행 강남 중앙기업금융센터",
      image: "/assets/icons/banks/shinhan-logo.svg",
      address: "서울특별시 강남구 테헤란로 147",
      lat: 37.500847,
      lng: 127.035617,
    },
    {
      name: "우리은행 GS타워금융센터",
      image: "/assets/icons/banks/woori-logo.svg",
      address: "서울특별시 강남구 논현로 508",
      lat: 37.501904,
      lng: 127.037016,
    },
    {
      name: "신한은행 역삼역 금융센터점",
      image: "/assets/icons/banks/shinhan-logo.svg",
      address: "서울특별시 강남구 테헤란로 146",
      lat: 37.500111,
      lng: 127.035625,
    },
    {
      name: "제주은행 서울",
      image: "/assets/icons/banks/jeju-logo.svg",
      address: "서울특별시 강남구 테헤란로 143",
      lat: 37.500514,
      lng: 127.035078,
    },
    {
      name: "우리은행 동역삼동지점",
      image: "/assets/icons/banks/woori-logo.svg",
      address: "서울특별시 강남구 테헤란로 133",
      lat: 37.50003,
      lng: 127.033544,
    },
    {
      name: "IBK 기업은행 테헤란로지점",
      image: "/assets/icons/banks/ibk-logo.svg",
      address: "서울특별시 강남구 테헤란로 132",
      lat: 37.499451,
      lng: 127.03334,
    },
    {
      name: "하나은행 강남중앙지점",
      image: "/assets/icons/banks/hana-logo.svg",
      address: "서울특별시 강남구 테헤란로 126",
      lat: 37.499144,
      lng: 127.032421,
    },
    {
      name: "신한은행 강남별관",
      image: "/assets/icons/banks/shinhan-logo.svg",
      address: "서울특별시 강남구 역삼로 251",
      lat: 37.498732,
      lng: 127.044278,
    },
    {
      name: "한국은행 강남본부",
      image: "/assets/icons/banks/korea-logo.svg",
      address: "서울특별시 강남구 테헤란로 202",
      lat: 37.500677,
      lng: 127.037981,
    },
    {
      name: "우리은행 선릉지점",
      image: "/assets/icons/banks/woori-logo.svg",
      address: "서울특별시 강남구 테헤란로 301",
      lat: 37.50295,
      lng: 127.043143,
    },
    {
      name: "KEB하나은행 역삼역점",
      image: "/assets/icons/banks/hana-logo.svg",
      address: "서울특별시 강남구 테헤란로 203",
      lat: 37.501435,
      lng: 127.037768,
    },
  ]);

  const locations = ref([
    {
      name: "싸피",
      lat: 37.501392,
      lng: 127.039587,
    },
    //서울 - 경기
    {
      name: "서울",
      lat: 37.566535,
      lng: 126.977969,
    },
    {
      name: "경기",
      lat: 37.413294,
      lng: 127.269311,
    },
    {
      name: "인천",
      lat: 37.456256,
      lng: 126.705206,
    },
    //충청
    {
      name: "대전",
      lat: 36.350412,
      lng: 127.384548,
    },
    {
      name: "충남",
      lat: 36.350412,
      lng: 127.384548,
    },
    {
      name: "충북",
      lat: 36.800384,
      lng: 127.708711,
    },
    {
      name: "세종",
      lat: 36.480132,
      lng: 127.288056,
    },
    {
      name: "강원",
      lat: 37.8228,
      lng: 128.1555,
    },
    //경상
    {
      name: "대구",
      lat: 35.871435,
      lng: 128.601445,
    },
    {
      name: "울산",
      lat: 35.538377,
      lng: 129.311359,
    },
    {
      name: "부산",
      lat: 35.179554,
      lng: 129.075642,
    },
    {
      name: "경남",
      lat: 35.460669,
      lng: 128.213711,
    },
    {
      name: "경북",
      lat: 36.576032,
      lng: 128.505373,
    },

    //제주 - 전라
    {
      name: "제주",
      lat: 33.499621,
      lng: 126.531188,
    },
    {
      name: "전남",
      lat: 34.816095,
      lng: 126.462884,
    },
    {
      name: "전북",
      lat: 35.716705,
      lng: 127.144185,
    },
    {
      name: "광주",
      lat: 35.159545,
      lng: 126.852601,
    },
  ]);

  //현재 선택된 위치
  const selectedLocation = computed(() => {
    return locations.value.find(
      (location) => location.name === currentLocation.value.name
    );
  });

  //action
  const changeLocation = (bank) => {
    currentLocation.value = bank;

    //위치 변경
    nmap.value.panTo(new naver.maps.LatLng(bank.lat, bank.lng));

    nmap.value.fitBounds(
      new naver.maps.LatLngBounds(
        new naver.maps.LatLng(bank.lat - 0.01, bank.lng - 0.01),
        new naver.maps.LatLng(bank.lat + 0.01, bank.lng + 0.01)
      )
    );
  };

  return {
    nmap,
    banks,
    locations,
    selectedLocation,
    changeLocation,
  };
});
