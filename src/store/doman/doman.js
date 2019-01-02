/**
 * Created by qiancongcong on 2018/3/28.
 */

const doman = {
    state: {
        domanId: ''
    },
    mutations: {
        getDomanId (state, id) {
            state.domanId = id;
        }
    },
    actions: {
        getDomanId ({commit}, id) {
            commit('getDomanId', id)
        }
    },
    getters: {
        getDomanId(state) {
            return state.domanId;
        }
    }
};

export default doman;
