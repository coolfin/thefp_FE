import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useFpStore = defineStore(
  "fp",
  () => {
    const products = ref({});
    const dummyData = {
      recommends: [
        {
          id: 1,
          kor_co_nm: "국민은행",
          fin_prdt_nm: "스무살 우리 적금",
          intr_rate_type_nm: "단리",
          intr_rate2: 2.1,
          save_trm: 12,
          text: "가장 높은 최고우대금리를 가진 상품이에요📈",
          tags: ["적금", "1금융권"],
          imageUrl: "@/assets/icons/banks/gookmin-logo.svg",
        },

        {
          id: 2,
          kor_co_nm: "우리은행",
          fin_prdt_nm: "나무적금",
          intr_rate_type_nm: "단리",
          intr_rate2: 1.5,
          save_trm: 12,
          text: "가장 많은 사람들이 찾았어요! 🥳",
          tags: ["적금", "1금융권"],
          imageUrl: "@/assets/icons/banks/woori-logo.svg",
        },

        {
          id: 3,
          kor_co_nm: "신한은행",
          fin_prdt_nm: "e-통장",
          intr_rate_type_nm: "단리",
          intr_rate2: 1.2,
          save_trm: 12,
          text: "저축기간이 가장 짧아요! 🏃",
          tags: ["적금", "1금융권"],
          imageUrl: "@/assets/icons/banks/shinhan-logo.svg",
        },
      ],

      display: [
        {
          id: 4,
          kor_co_nm: "국민은행",
          fin_prdt_nm: "스무살 우리 적금",
          intr_rate_type_nm: "단리",
          intr_rate2: 2.1,
          save_trm: 12,
          imageUrl: "@/assets/icons/banks/gookmin-logo.svg",
        },
        {
          id: 5,
          kor_co_nm: "우리은행",
          fin_prdt_nm: "나무적금",
          intr_rate_type_nm: "단리",
          intr_rate2: 1.5,
          save_trm: 12,
          imageUrl: "@/assets/icons/banks/woori-logo.svg",
        },
        {
          id: 6,
          kor_co_nm: "신한은행",
          fin_prdt_nm: "e-통장",
          intr_rate_type_nm: "단리",
          intr_rate2: 1.2,
          save_trm: 12,
          imageUrl: "@/assets/icons/banks/shinhan-logo.svg",
        },

        {
          id: 7,
          kor_co_nm: "하나은행",
          fin_prdt_nm:
            "하나 첫째적금인데 이름을 엄청나게 늘려서 잘리는지 확인을 해볼게요",
          intr_rate_type_nm: "단리",
          intr_rate2: 2.5,
          save_trm: 12,
          imageUrl: "@/assets/icons/banks/hana-logo.svg",
        },
        {
          id: 8,
          kor_co_nm: "농협은행",
          fin_prdt_nm: "프리미엄 적금",
          intr_rate_type_nm: "단리",
          intr_rate2: 2.3,
          save_trm: 12,
          imageUrl: "@/assets/icons/banks/nh-logo.svg",
        },
        {
          id: 9,
          kor_co_nm: "국민은행",
          fin_prdt_nm: "스무살 우리 적금",
          intr_rate_type_nm: "단리",
          intr_rate2: 2.1,
          save_trm: 12,
          imageUrl: "@/assets/icons/banks/gookmin-logo.svg",
        },
        {
          id: 10,
          kor_co_nm: "우리은행",
          fin_prdt_nm: "나무적금",
          intr_rate_type_nm: "단리",
          intr_rate2: 1.5,
          save_trm: 12,
          imageUrl: "@/assets/icons/banks/woori-logo.svg",
        },
        {
          id: 11,
          kor_co_nm: "신한은행",
          fin_prdt_nm: "e-통장",
          intr_rate_type_nm: "단리",
          intr_rate2: 1.2,
          save_trm: 12,
          imageUrl: "@/assets/icons/banks/shinhan-logo.svg",
        },

        {
          id: 12,
          kor_co_nm: "하나은행",
          fin_prdt_nm: "하나 첫째적금",
          intr_rate_type_nm: "단리",
          intr_rate2: 2.5,
          save_trm: 12,
          imageUrl: "@/assets/icons/banks/hana-logo.svg",
        },
        {
          id: 13,
          kor_co_nm: "농협은행",
          fin_prdt_nm: "프리미엄 적금",
          intr_rate_type_nm: "단리",
          intr_rate2: 2.3,
          save_trm: 12,
          imageUrl: "@/assets/icons/banks/nh-logo.svg",
        },
      ],
    };
    const dummyDetailData = {
      product: {
        id: 1,
        fin_prdt_cd: "WR0001B",
        kor_co_nm: "우리은행",
        fin_co_no: "0010001",
        fin_prdt_nm: "WON플러스예금",
        etc_note:
          "- 가입기간: 1~36개월\n- 최소가입금액: 1만원 이상\n- 만기일을 일,월 단위로 자유롭게 선택 가능\n- 만기해지 시 신규일 당시 영업점과 인터넷 홈페이지에 고시된 계약기간별 금리 적용",
        join_deny: 1,
        join_member: "실명의 개인",
        join_way: "인터넷,스마트폰,전화(텔레뱅킹)",
        spcl_cnd: "해당사항 없음",
        imageUrl: "@/assets/icons/banks/woori-logo.svg",
      },
      options: [
        {
          id: 1,
          fin_prdt_cd: "WR0001B",
          fin_co_no: "0010001",
          intr_rate_type_nm: "단리",
          intr_rate: 3.0,
          intr_rate2: 3.0,
          save_trm: 1,
          product: 1,
        },
        {
          id: 2,
          fin_prdt_cd: "WR0001B",
          fin_co_no: "0010001",
          intr_rate_type_nm: "단리",
          intr_rate: 3.5,
          intr_rate2: 3.5,
          save_trm: 3,
          product: 1,
        },
        {
          id: 3,
          fin_prdt_cd: "WR0001B",
          fin_co_no: "0010001",
          intr_rate_type_nm: "단리",
          intr_rate: 3.5,
          intr_rate2: 3.5,
          save_trm: 6,
          product: 1,
        },
        {
          id: 4,
          fin_prdt_cd: "WR0001B",
          fin_co_no: "0010001",
          intr_rate_type_nm: "단리",
          intr_rate: 3.55,
          intr_rate2: 3.55,
          save_trm: 12,
          product: 1,
        },
        {
          id: 5,
          fin_prdt_cd: "WR0001B",
          fin_co_no: "0010001",
          intr_rate_type_nm: "단리",
          intr_rate: 3.0,
          intr_rate2: 3.0,
          save_trm: 24,
          product: 1,
        },
        {
          id: 6,
          fin_prdt_cd: "WR0001B",
          fin_co_no: "0010001",
          intr_rate_type_nm: "단리",
          intr_rate: 3.0,
          intr_rate2: 3.0,
          save_trm: 36,
          product: 1,
        },
      ],
    };
    const detailProduct = ref(dummyDetailData);

    //상세조회 페이지 getter

    //detail
    const getHighestRate = computed(() => {
      const highestRate = detailProduct.value.options.reduce((prev, curr) => {
        return prev.intr_rate > curr.intr_rate ? prev : curr;
      });
      return highestRate.intr_rate2;
    });

    const getNormalRate = computed(() => {
      return detailProduct.value.options[0];
    });

    const getDetailProductInfo = computed(() => {
      let info = detailProduct.value.product.etc_note.split("\n");
      info = info.map((i) => {
        return i.replace("- ", "");
      });

      return info;
    });

    //action
    const setRecommendProducts = () => {
      products.value = dummyData;
    };

    const getDetailProduct = (id) => {
      // const tar = products.value.display.find(
      //   (product) => product.id === parseInt(id)
      // );
      // return tar;

      return detailProduct.value;
    };

    return {
      products,
      detailProduct,
      setRecommendProducts,
      getDetailProduct,
      getHighestRate,
      getNormalRate,
      getDetailProductInfo,
    };
  },
  {
    persist: true,
  }
);
