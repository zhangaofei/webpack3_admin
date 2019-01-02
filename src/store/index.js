import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import admin from './modules/admin';
import dhcp from './DHCP/dhcp';
import doman from './doman/doman'

import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        user,
        admin,
        dhcp,
        doman
    },
    getters
});

export default store
