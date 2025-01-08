import { createStore } from "vuex";

// 유저 정보
export default createStore({
  state: {
    userInfo: {
      firstName: null,
      lastName: null,
      phoneWork: null,
      email: null,
      address: null,
      city: null,
      country: null,
      company: null,
      title: null,
      birthday: null,
    },
  },
  getters: {
    // 전체 이름 변경
    fullName(state) {
      return state.userInfo.firstName != null
            ?`${state.userInfo.firstName}${state.userInfo.lastName}` : '이름없음'
    },
    isUserInfo(state) {
      return state.userInfo.firstName !== null
    }
  },
  mutations: {
    // 유저 정보 할당
    setUserInfo(state, payload) {
      state.userInfo = {...state.userInfo, ...payload}
    },
  },
  actions: {},
  modules: {},
});
