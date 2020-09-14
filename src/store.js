import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Api from './api';

Vue.use(Vuex, axios);
/* eslint-disable no-unused-expressions */

export const store = new Vuex.Store({

  state: {
    tasks: [],
  },
  mutations: {
    SET_TASKS(state, task) {
      state.tasks = task;
    },
    ADD_TASKS(state, task) {
      state.tasks.push[task];
    },
    CHANGE_TASKS(state, activity) {
      let changedValue = '';
      state.tasks.map((val) => {
        if (val.id === activity.id) {
          const aux = !val.completed;
          changedValue = val;
          changedValue.completed = aux;
        }
        return changedValue;
      });
    },
  },
  actions: {
    loadTasks({ commit }) {
      Api.getTasks().then((result) => {
        commit('SET_TASKS', result.data);
      }).catch((error) => {
        throw new Error(`API ${error}`);
      });
    },
    addTask({ commit }, { task }) {
      console.log('task', task);
      Api.createTask(task).then((result) => {
        console.log(result);
        commit('ADD_TASKS', result.data);
      }).catch((error) => {
        throw new Error(`API ${error}`);
      });
    },

    changeTask({ commit }, { id, task }) {
      Api.updateTask(id, task).then((result) => {
        console.log(result);
        commit('CHANGE_TASKS', result.data);
      }).catch((error) => {
        throw new Error(`API ${error}`);
      });
    },

  },
  getters: {
    getAllTasks(state) {
      return state.tasks.filter((value) => Object.keys(value).length !== 0);
    },
  },
});
export default store;
