import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";

export const useFpStore = defineStore(
  "fp",
  () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const products = ref({});
    const detailProduct = ref({});

    //상세조회 페이지 getter

    //detail
    const getHighestRate = computed(() => {
      const highestRate = detailProduct.value.options.reduce((prev, curr) => {
        return prev.intr_rate > curr.intr_rate ? prev : curr;
      });
      return highestRate.intr_rate2;
    });

    const getDetailProduct = computed(() => {
      return detailProduct.value;
    });

    const getReviews = computed(() => {
      return detailProduct.value.comment;
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
      return detailProduct.value.product?.imgUrl;
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
          products.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const fetchDetailProduct = async (pk) => {
      await axios({
        method: "get",
        url: BASE_URL + `/fp/deposit-product-options/${pk}/`,
      })
        .then((res) => {
          detailProduct.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const createReview = async (review) => {
      const pk = detailProduct.value.product.id;
      const store = useUserStore();
      await axios({
        method: "post",
        url: BASE_URL + `/fp/deposit-product-options/${pk}/`,
        data: { content: review },
        headers: {
          Authorization: `Token ${store.token}`,
        },
      }).then((res) => {
        alert("리뷰가 등록되었습니다.");
        fetchDetailProduct(pk);
      });
    };

    const addLikedProduct = async (pk) => {
      const store = useUserStore();
      await axios({
        method: "post",
        url: BASE_URL + `/fp/deposit-like/${pk}/`,
        headers: {
          Authorization: `Token ${store.token}`,
        },
      })
        .then(() => {
          store.getUserInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      products,
      detailProduct,

      getDetailProduct,
      getDetailImage,
      getHighestRate,
      getNormalRate,
      getDetailProductInfo,
      getReviews,

      fetchAllProducts,
      fetchDetailProduct,
      createReview,
      addLikedProduct,
    };
  },
  {
    persist: true,
  }
);
