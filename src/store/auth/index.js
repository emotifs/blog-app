export default {
    state: {
        token : null,
    },
    getters: {
        token(state){
            return state.token
        },
        isAuth(state){
            return !!localStorage.getItem('token')
        }
    },
    mutations: {
        setUser(state, payload){
            state.token = payload.token
        },

    },
    actions: {
        async login(context, payload) {
            await context.dispatch("auth", {
                ...payload,
                mode: "login"
            });
        },
        async signup(context, payload) {
            await context.dispatch("auth", {
                ...payload,
                mode: "signup"
            });
        },
        async auth(context, payload) {
            const mode = payload.mode;
            let url =
                "http://127.0.0.1:8000/api/v1/user-login";
            if (mode === "signup") {
                url =
                    "http://127.0.0.1:8000/api/v1/user-create";
            }
            let headers = new Headers();
            headers.append("Authorization", "Basic bXVoYW1tYWRqb246YWRtaW4=");
            headers.append("Content-Type", "application/json")
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    username: payload.username,
                    password: payload.password,
                })
            });

            const responseData = await response.json();

            if(mode === 'login'){
                if (!response.ok || responseData.status !== "ok") {
                    throw new Error(
                        responseData.message || "Failed to authenticate. Check your login data."
                    );
                }
            } else{
                if (!response.okb) {
                    throw new Error(
                        responseData.message || "Failed to authenticate. Check your login data."
                    );
                }
            }

            localStorage.setItem("token", responseData.token);

            context.commit("setUser", {
                token: responseData.token,
            });
        },
        logout(context) {
            localStorage.removeItem("token");
            context.commit("setUser", {
                token: null,
            });
        },
    },
}
