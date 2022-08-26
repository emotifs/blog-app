export default {
    state: {
        token: null, username: "", email: "", firstname: "", lastname: ""
    }, getters: {
        token(state) {
            return state.token
        }, isAuth(state) {
            return !!localStorage.getItem('token')
        }
    }, mutations: {
        setUser(state, payload) {
            state.token = payload.token
            state.username = payload.username;
            state.email = payload.email;
            state.firstname = payload.first_name;
            state.lastname = payload.last_name;
        },

        updateProfile(state, payload) {
            state.username = payload.username;
            state.email = payload.email;
            state.firstname = payload.first_name;
            state.lastname = payload.last_name;
        }
    }, actions: {
        async login(context, payload) {
            await context.dispatch("auth", {
                ...payload, mode: "login"
            });
        }, async signup(context, payload) {
            await context.dispatch("auth", {
                ...payload, mode: "signup"
            });
        }, async auth(context, payload) {
            const mode = payload.mode;
            let url = "http://127.0.0.1:8000/api/v1/user-login";
            if (mode === "signup") {
                url = "http://127.0.0.1:8000/api/v1/user-create";
            }
            let headers = new Headers();
            headers.append("Authorization", "Basic bXVoYW1tYWRqb246YWRtaW4=");
            headers.append("Content-Type", "application/json")
            const response = await fetch(url, {
                method: "POST", headers: headers, body: JSON.stringify({
                    username: payload.username, password: payload.password,
                })
            });

            const responseData = await response.json();
            if (mode === 'login') {
                if (responseData.status !== "ok") {
                    throw new Error(responseData.message || "Failed to authenticate. Check your login data.");
                }

            } else {
                if (!response.ok) {
                    throw new Error(responseData.message || "Failed to authenticate. Check your login data.");
                }
            }


            localStorage.setItem("token", responseData.token)

            let userData;
            let headers1 = new Headers();
            headers1.append("Authorization", `Bearer ${responseData.token}`);
            headers1.append("Content-Type", "application/json")
            await fetch("http://127.0.0.1:8000/api/v1/get-user", {
                method: "POST", headers: headers1, body: responseData.token
            }).then(res => {
                userData = res.json()
            });

            userData.then(function (res) {
                context.commit("setUser", {
                    token: responseData.token,
                    username: res.username,
                    email: res.email,
                    first_name: res.first_name,
                    last_name: res.last_name,

                });

                localStorage.setItem("username", res.username)
                localStorage.setItem("email", res.email)
                localStorage.setItem("first_name", res.first_name)
                localStorage.setItem("last_name", res.last_name)
            })

        }, async updateUser(context, payload) {
            let userData;
            let headers1 = new Headers();
            headers1.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
            headers1.append("Content-Type", "application/json")
            await fetch("http://127.0.0.1:8000/api/v1/user-update", {
                method: "PUT",
                headers: headers1,
                body: JSON.stringify(payload)
            }).then(res => {
                userData = res.json();
            });

            console.log(payload)
            userData.then(
                function(res){
                    console.log(localStorage.getItem(res))
                }
            )


        }, logout(context) {
            localStorage.removeItem('token')
            localStorage.removeItem("username")
            localStorage.removeItem("email")
            localStorage.removeItem("first_name")
            localStorage.removeItem("last_name")
            context.commit("setUser", {
                token: null, username: "", email: "", first_name: "", last_name: "",
            });
        },
    },
}
