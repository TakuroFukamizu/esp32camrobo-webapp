import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Connection from '../components/Connection.vue'
import SendCommand from '../components/SendCommand.vue'

const router = new Router({
    routes: [
        {
            name: 'Connection',
            path: '/connection',
            meta: {
                needCon: false
            },
            component: Connection
        },
        {
            name: 'SendCommand',
            path: '/sendcommand',
            meta: {
                needCon: true
            },
            component: SendCommand
        },
        { path: '*', redirect: '' }
    ]
})
// router.beforeEach((to, from, next) => { 
//     if (to.meta && to.meta.needCon) { 
        
//     } 
// })

export default router
