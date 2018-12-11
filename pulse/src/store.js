import Vue from 'vue';
import Vuex from 'vuex';
import $socket from './socket-instance';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        connected: false,
        error: '',
        lastBeat: [null, null],
        hasBeat: [null, null],
        human1: {
            name: null,
            phone: null,
        },
        human2: {
            name: null,
            phone: null,
        },
    },
    mutations: {
        SOCKET_CONNECT(state) {
            state.connected = true
        },
        SOCKET_DISCONNECT(state) {
            state.connected = false
        },
        SOCKET_BEAT(state, message) {
            const chan = message.connection - 1;
            Vue.set(state.lastBeat, chan, new Date().getTime())
            Vue.set(state.hasBeat, chan, true)
        },
        SOCKET_ERROR(state, message) {
            state.error = message.error
        },
        ASYNC_CLEAR_BEAT(state, message) {
            const chan = message.connection - 1;
            if (state.lastBeat[chan] && new Date().getTime() - state.lastBeat[chan] > 500) {
                Vue.set(state.hasBeat, chan, false)
            }
        },
        UPDATE_INPUT(state, {target, field, value}) {
            Vue.set(state[target], field, value);
        },
        CLEAR_USER(state) {
            state.human1.name = null
            state.human1.phone = null
            state.human2.name = null
            state.human2.phone = null
        },
        SOCKET_USER_DATA_SAVED(state, key) {
            console.log('user data saved!', key)
        },
    },
    actions: {
        update_input({commit}, {target, field, value}) {
            commit('UPDATE_INPUT', {target, field, value});
        },
        save_user({commit, rootState}, data) {
            const {human1, human2} = rootState;
            const key = Math.random().toString(36).substr(2, 9);
            $socket.emit('saveUserData', {key: key, human1, human2});
        },
        clear_beat({commit}, message) {
            commit('ASYNC_CLEAR_BEAT', message)
        },
        socket_beat({commit, dispatch}, message) {
            commit('SOCKET_BEAT', message)
            setTimeout(() => {
                dispatch('clear_beat', message)
            }, 500)
        }
    }
})