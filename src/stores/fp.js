import { defineStore } from "pinia";
import { ref } from 'vue';

export const useFpStore = defineStore("fp", () => {
  const recommendProducts = ref([]);
  const allFpProducts = ref([]);

  const dummyRecommend = [
    {
      kor_co_nm: "국민은행",
      fin_prdt_nm: "스무살 우리 적금",
      intr_rate_type_nm: "단리",
      intr_rate2: 2.1,
      save_trm: 12
    },
    {
      kor_co_nm: "우리은행",
      fin_prdt_nm: "나무적금",
      intr_rate_type_nm: "단리",
      intr_rate2: 1.5,
      save_trm: 12
    },
    {
      kor_co_nm: "신한은행",
      fin_prdt_nm: "e-통장",
      intr_rate_type_nm: "단리",
      intr_rate2: 1.2,
      save_trm: 12
    },

    // {
    //   kor_co_nm: "하나은행",
    //   fin_prdt_nm: "하나 첫째적금",
    //   intr_rate_type_nm: "단리",
    //   intr_rate2: 2.5,
    //   save_trm: 12
    // },
    // {
    //   kor_co_nm: "농협은행",
    //   fin_prdt_nm: "프리미엄 적금",
    //   intr_rate_type_nm: "단리",
    //   intr_rate2: 2.3,
    //   save_trm: 12
    // }
  ];

  const getRecommendProducts = () => {
    // 더미 데이터 생성

    // {
    //   data: [
    //    {
    //      kor_co_nm: string,
    //      fin_prdt_nm: string,
    //      intr_rate_type_nm: string
    //      intr_rate2: float,
    //      save_trm: int
    //     }
    //   ]
    // }	 
    recommendProducts.value = dummyRecommend;
  }

  return {
    recommendProducts,
    getRecommendProducts
  }
},
  {
    persist: true
  }
)