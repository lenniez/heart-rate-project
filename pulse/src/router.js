import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

import Humans from './pages/Humans.vue';
import SettingsPage from './pages/Sensors.vue';
import SavingPage from './pages/Saving.vue';
import RunningPage from './pages/Running.vue';


Vue.use(Router);
Vue.use(Meta);

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
        {
            path: '/run',
            name: 'running',
            component: RunningPage,
        },
    ],
    mode: 'history',
})