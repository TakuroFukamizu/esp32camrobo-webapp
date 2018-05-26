
import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

Vue.router = router;

// Vue.use(NProgress)

// Enable devtools
Vue.config.devtools = true

// sync(store, router)

// const nprogress = new NProgress({ parent: '.nprogress-container' })

// const { state } = store

// router.beforeEach((route, redirect, next) => {
//   if (state.app.device.isMobile && state.app.sidebar.opened) {
//     store.commit(TOGGLE_SIDEBAR, false)
//   }
//   next()
// })


const app = new Vue({
  router,
  store,
//   nprogress,
  ...App
})

export { app, router, store }
