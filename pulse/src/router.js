import Vue from 'vue';
import Router from 'vue-router';

import Humans from './pages/Humans.vue';
import SettingsPage from './pages/Sensors.vue';
import SavingPage from './pages/Saving.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Humans,
        },
        {
            path: '/go',
            name: 'start',
            component: SettingsPage,
        },
        {
            path: '/saving',
            name: 'saving',
            component: SavingPage,
        },
    ],
    mode: 'history',
})