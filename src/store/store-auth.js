import { firebaseAuth } from 'boot/firebase';

const state = {
};

const mutations = {
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
