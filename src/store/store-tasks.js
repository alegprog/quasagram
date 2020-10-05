import Vue from 'vue';
import { uid } from 'quasar';
import { firebaseDb, firebaseAuth } from 'boot/firebase';

const state = {
  tasks: {
    // 'ID1': {
      // name: 'Go to shop',
      // completed: false,
      // dueDate: '2019-05-12',
      // dueTime: '18:30'
    // },
    // 'ID2': {
      // name: 'Get bananas',
      // completed: false,
      // dueDate: '2019-05-13',
      // dueTime: '15:30'
    // },
    // 'ID3': {
      // name: 'Get apples',
      // completed: false,
      // dueDate: '2019-05-14',
      // dueTime: '12:30'
    //},
  },
  search: '',
  sort: 'dueDate',
};

const mutations = {
  updateTask: (state, payload) => Object.assign(state.tasks[payload.id], payload.updates),
  deleteTask: (state, id) => Vue.delete(state.tasks, id),
  addTask: (state, payload) => Vue.set(state.tasks, payload.id, payload.task),
  setSearch: (state, value) => state.search = value,
  setSort: (state, value) => state.sort = value,
};

const actions = {
  updateTask: ({ dispatch }, payload) => dispatch('fbUpdateTask', payload),
  deleteTask: ({ commit }, id) => commit('deleteTask', id),
  addTask({ dispatch }, task) {
    let taskId = uid();
    let payload = {
      id: taskId,
      task
    };
    dispatch('fbAddTask', payload);
  },
  setSearch: ({ commit }, value) => commit('setSearch', value),
  setSort: ({ commit }, value) => commit('setSort', value),
  fbReadData({ commit }) {
    const userId = firebaseAuth.currentUser.uid;
    const userTasksRef = firebaseDb.ref(`tasks/${ userId }`);

    // child added
    userTasksRef.on('child_added', snapshot => {
      const task = snapshot.val();
      const payload = {
        id: snapshot.key,
        task,
      };
      commit('addTask', payload);
    });

    // child changed
    userTasksRef.on('child_changed', snapshot => {
      const task = snapshot.val();
      const payload = {
        id: snapshot.key,
        updates: task,
      };
      commit('updateTask', payload);
    });

    // child removed
    userTasksRef.on('child_removed', snapshot => {
      const taskId = snapshot.key;
      commit('deleteTask', taskId);
    });

  },
  fbAddTask({}, payload) {
    const userId = firebaseAuth.currentUser.uid;
    const taskRef = firebaseDb.ref(`tasks/${ userId }/${ payload.id }`);
    taskRef.set(payload.task);
  },
  fbUpdateTask({}, payload) {
    const userId = firebaseAuth.currentUser.uid;
    const taskRef = firebaseDb.ref(`tasks/${ userId }/${ payload.id }`);
    taskRef.update(payload.updates);
  },
};

const getters = {
  tasksSorted: state => {
    let tasksSorted = {},
        keysOrdered = Object.keys(state.tasks);

     keysOrdered.sort((a, b) => {
       let taskAProp = state.tasks[a][state.sort].toLowerCase(),
           taskBProp = state.tasks[b][state.sort].toLowerCase();

       if (taskAProp > taskBProp) return 1;
       else if (taskAProp < taskBProp) return -1;
       else return 0;
     });

    keysOrdered.forEach(key => tasksSorted[key] = state.tasks[key]);

    return tasksSorted;
  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted,
        tasksFiltered = {};

    if (state.search) {
      Object.keys(tasksSorted).forEach(key => {
        let task = tasksSorted[key],
            taskNameLowerCase = task.name.toLowerCase(),
            searchLowerCase = state.search.toLowerCase();

        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task;
        }
      });
      return tasksFiltered;
    }
    return tasksSorted;
  },
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach(key => {
      let task = tasksFiltered[key];
      if(!task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
  tasksCompleted: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach(key => {
      let task = tasksFiltered[key];
      if(task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
