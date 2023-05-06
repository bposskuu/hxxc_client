import user from "@/store/actions/userActions";

export default {
    state: () => {
        return {
            currentUser: {},
            isAuth: false
        }
    },
    getters: {
        getIsAuth: state => {
            return state.isAuth
        },
        getCurrentUser: state => {
            return state.currentUser
        }

    },
    mutations: {
        setIsAuth(state, isAuth) {
            state.isAuth = isAuth
        },
        setCurrentUser(state, user) {
            state.currentUser = user
        }
    },
    actions: {
        logout({commit}) {
            commit('setCurrentUser', null)
            commit('setIsAuth', false)
            localStorage.removeItem('token')
        },

        async registration(context, payload) {
            await user.registration(payload.name, payload.email, payload.password)
        },
        async login({commit}, payload) {
            await user.login(payload.email, payload.password, (user) => {
                commit('setCurrentUser', user)
                commit('setIsAuth', true)
            })
        },
        async auth({commit}) {
            await user.auth(user => {
                commit('setCurrentUser', user)
            })
        },
    }
}