import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";

export const useFpStore = defineStore(
  "fp",
  () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const products = ref({});
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
        imageUrl: "/assets/icons/banks/woori-logo.svg",
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
    const detailProduct = ref({});

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

    const getDetailImage = computed(() => {
      return detailProduct.value.product.imageUrl;
    });

    //action
    const fetchAllProducts = () => {
      //products.value = dummyData;

      const store = useUserStore();
      axios({
        method: "get",
        url: BASE_URL + "/fp/deposit-products/",
        headers: {
          Authorization: `Token ${store.token}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          products.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const setDetailProducts = () => {
      detailProduct.value = dummyDetailData;
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
      setDetailProducts,
      getDetailProduct,
      getDetailImage,
      getHighestRate,
      getNormalRate,
      getDetailProductInfo,

      fetchAllProducts,
    };
  },
  {
    persist: true,
  }
);
