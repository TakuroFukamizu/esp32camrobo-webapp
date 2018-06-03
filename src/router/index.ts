import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Connection from '../components/Connection.vue'
import SendCommand from '../components/SendCommand.vue'

const routes = [
  {
    name: 'Connection',
    path: '/connection',
    component: Connection
  },
  {
    name: 'SendCommand',
    path: '/sendcommand',
    component: SendCommand
  },
  { path: '*', redirect: '' }
]

export default new Router({ routes })
