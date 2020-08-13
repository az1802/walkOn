import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let moduleA = {
  namespaced: true,
  state: {
    aCount: 0,
  },
  mutations: {
    increment(state, rootState) {
      console.log("aIncrement -> rootState", rootState)
      state.aCount++;
    }
  }
}


export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    }
  },
  mutations: {
    asyncIncrement(state) {
      console.log(state)
      state.count++;

    },
    increment(state, count = 1, count2 = 1) {
      console.log(state)
      state.count += (count + count2);
    }
  },
  actions: {
    asyncIncrement(context) {
      console.log("Increment -> context", context);
      setTimeout(() => {
        context.commit("asyncIncrement")
      }, 2000)
    },
    async actionA({
      commit
    }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("第一次提交 2s");
          commit("asyncIncrement")
          resolve()
        }, 2000)
      })
    },
    async actionB({
      commit,
      dispatch
    }) {
      await dispatch("actionA")
      setTimeout(() => {
          console.log("第二次提交");
          commit("asyncIncrement")
        },
        2000)
    }
  },
  modules: {
    moduleA: moduleA
  }
})