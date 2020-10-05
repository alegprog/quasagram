import { firebaseAuth } from 'boot/firebase';

const state = {
  loggedIn: false,
};

const mutations = {
  setLoggedIn: (state, value) => state.loggedIn = value,
};

const actions = {
  registerUser: ({}, payload) => {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('response: ', response);
      })
      .catch(error => {
        console.error('Error: ', error.message);
      });
  },
  loginUser: ({}, payload) => {
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('response: ', response);
      })
      .catch(error => {
        console.error('Error: ', error.message);
      });
  },
  handleAuthStateChange: ({ commit }) => {
    firebaseAuth.onAuthStateChanged(function(user) {
      if (user) {
        commit('setLoggedIn', true);
      } else {
        commit('setLoggedIn', false);
      }
    });
  },
};

const getters = {
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
