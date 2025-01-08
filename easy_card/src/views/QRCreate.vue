<script setup>
import { onMounted, ref } from "vue";
import QRCode from "qrcode";
import vCardsJS from "vcards-js";
import {useStore} from "vuex";

const store = useStore();

const vCardData = ref("");
// 유저정보 불러오기
const userInfo = {...store.state.userInfo};
const errorMessage = ref(""); // 오류 메시지를 저장할 변수

onMounted(() => {

  if (store.getters.isUserInfo) {
    // vCard 객체 생성
    const card = vCardsJS();
    card.firstName = userInfo.firstName || "";
    card.lastName = userInfo.lastName || "";
    card.cellPhone = userInfo.phoneWork || "";
    card.email = userInfo.email || "";
    card.address = userInfo.address || "";
    card.city = userInfo.city || "";
    card.country = userInfo.country || "";
    card.company = userInfo.company || "";
    card.title = userInfo.title || "";
    card.birthday = new Date(userInfo.birthday) || "";
    console.log(card.getFormattedString());

    // vCard 데이터를 문자열로 변환
    vCardData.value = card.getFormattedString();
    const canvas = document.getElementById("qrcode");

    if (canvas) {
      // QR 코드 생성
      QRCode.toCanvas(canvas, vCardData.value, function (error) {
        if (error) {
          console.error("QR 코드 생성 중 오류 발생:", error);
          errorMessage.value = "QR 코드 생성 중 오류가 발생했습니다.";
        } else {
          console.log("QR 코드 생성 완료!");
        }
      });
    }
  } else {
    // userInfo가 없을 경우 오류 메시지 설정
    errorMessage.value = "정보를 입력해주세요.";
  }
});
</script>

<template>
  <h1>명함 생성</h1>
  <div id="card">
    <!-- 오류 메시지 출력 영역 -->
    <div
        v-if="errorMessage"
        style="color: red; text-align: center"
    >
      {{ errorMessage }}
    </div>

    <!-- 명함 출력 영역 -->
    <div v-else>
      <h2>{{ store.getters.fullName || '이름없음' }}</h2>
      <canvas
          id="qrcode"
          width="256"
          height="256"
      />
      <p>T : {{ userInfo.phoneWork }}</p>
      <p>E : {{ userInfo.email }}</p>
      <p>A : {{ userInfo.address }}</p>
    </div>
  </div>
</template>

<style scoped>

h2 {
  margin: 20px 0;
  text-align: left;
}

#card {
  width: 20%;

  margin: 50px auto;
  padding: 25px;

  color : #548687;
  border: 1px solid #548687;
  border-radius: 3%;
}

#card p {
  text-align: left;
  margin: 10px;
}

canvas {
  display: block;
  border: 1px solid #ccc;
  margin: 10px auto;
}
</style>

