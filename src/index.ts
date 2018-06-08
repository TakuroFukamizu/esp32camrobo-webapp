import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import App from './app.vue'
import router from './router'
import store from './store'

// Scss/css
import './stylesheets/bulma.scss'
import './stylesheets/main.scss'

Vue.use(Buefy)

new Vue({
    router,
    store,
    render: h => h(App),
    el: 'app',
    components: {
        App
    }
})
