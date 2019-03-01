/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

import ethers from './ethers'
import userdata from './userdata'
import createEasyFirestore from "vuex-easy-firestore";

const easyFirestore = createEasyFirestore(
  {
    firestorePath: 'userdata',
    firestoreRefType: 'collection',
    moduleName: 'userdata',
    statePropName: 'data',
    namespaced: true
  },
  {
    logging: true,
    FirebaseDependency: Vue.$db
  }
)

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userdata,
    ethers
  },
  plugins: [easyFirestore]
})

store.dispatch('ethers/init')

// if we want some HMR magic for it, we handle
// the hot update like below. Notice we guard this
// code with "process.env.DEV" -- so this doesn't
// get into our production build (and it shouldn't).
if (process.env.DEV && module.hot) {
  module.hot.accept(['./ethers'], () => {
    const newethers = require('./ethers').default
    store.hotUpdate({ modules: { ethers: newethers } })
  })
}

export default store
