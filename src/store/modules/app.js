import Cookies from 'js-cookie'
import {loginOut} from "@/api/login.js"
const state = {
	userName: '',
	token: '',
	user: '',
	commentData:{}
}



const mutations = {
	SET_USER_NAME(state, name) {
		state.userName = name
	},
	SAVE_Token(state, token) {
		state.token = token,
			Cookies.set("Token", token)
	},
	SAVE_User(state, user) {
		state.user = user
		localStorage.setItem("user", JSON.stringify(user))
	},
	logout(state) {
		state.token = null;
		state.user = {};
		Cookies.set("Token", "",-1)
		localStorage.clear();
		loginOut().then(res=>{})
	}
}
const actions = {
	// 设置name
	setUserName({
		commit
	}, name) {
		commit('SET_USER_NAME', name)
	},
	SaveToken({
		commit
	}, token) {

		commit('SAVE_Token', token);
	},
	SaveUser({
		commit
	}, user) {
		commit('SAVE_User', user);
	}
}
export default {
	state,
	mutations,
	actions
}
