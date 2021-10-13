import Vuex from 'vuex'
import Vue from 'vue'
import calendar from './modules/calendar'
import vueMoment from 'vue-moment' 
//import createPersistedState from "vuex-persistedstate"

Vue.use(vueMoment);
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        calendar
    }
    /*,
    plugins: [ createPersistedState({ //주목! : 여기에 쓴 모듈만 저장됩니다. 
        paths: ["calendar"] })
    ]
    */
})