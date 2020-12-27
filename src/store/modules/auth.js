import axios from "axios";
import router from "../../router"

const state = {
  user: null
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  user: (state) => state.user,
};

const actions = {

  async Register({dispatch}, form) {
    await axios.post('register', form)
    let UserForm = new FormData()
    UserForm.append('username', form.username)
    UserForm.append('password', form.password)
    await dispatch('LogIn', UserForm)
  },

  async LogIn({commit}, user) {
    await axios.post(router.getEnv(router.envKeys.API_URL) + "/user/authenticate", user).then(response => {
      commit("setUserData",response.data);
    });
    
  },

  async LogOut({ commit }) {
    commit("setUserData", { 
      isSuccess: false
    });
  }

};

const mutations = {
  setUserData(state, response) {
    state.user = null;
    if(response.isSuccess) {
      state.user = response.data.user;
      state.user.token = response.data.token;
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};