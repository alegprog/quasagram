const state = {
  tasks: [
    { id: 1, name: 'Go to shop', completed: false, dueDate: '2019-05-12', dueTime: '18:30' },
    { id: 2, name: 'Get bananas', completed: false, dueDate: '2019-05-13', dueTime: '15:30' },
    { id: 3, name: 'Get apples', completed: false, dueDate: '2019-05-14', dueTime: '12:30' },
  ]
};

const mutations = {

};

const actions = {

};

const getters = {
  tasks: state => state.tasks,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
