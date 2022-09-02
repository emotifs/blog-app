export default {
    state : {
        token : '',
        username : '',
        email : '',
        first_name : '',
        last_name : '',
        id: null,
        isAuth : false,
    },

    getters : {
        token(state){
            return state.token
        },

        isAuth(state){
            return !!localStorage.getItem('token')
        }
    },

    mutations : {
        setToken(state, payload){
            state.token = payload
            state.isAuth = true
            localStorage.setItem('token', payload)
        },


        removeToken(state){
            state.token = ''
            state.isAuth = false
            localStorage.removeItem('token')
        }
    }
}
