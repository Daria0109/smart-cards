import axios from "axios";
import {LoginDataType, RegDataType} from '../m3-bll/auth-reducer';

const baseLocalhostURL = 'http://localhost:7542/2.0/'
const baseHerokuURL = 'https://neko-back.herokuapp.com/2.0/'

const instance = axios.create({
	baseURL: baseLocalhostURL,
	withCredentials: true,
})

type ResponseUserType = {
	created: string
	email: string
	isAdmin: boolean
	name: string
	publicCardPacksCount: number
	rememberMe: boolean
	token: string
	tokenDeathTime: string
	updated: string
	verified: boolean
	__v: number
	_id: string
}


export const authAPI = {
	signUp(registrationData: RegDataType) {
		return instance.post("auth/register", registrationData)
			.then(res => res)
	},
	me() {
		return instance.post<ResponseUserType>("auth/me", {})
			.then(res => res.data)
	},
	login(loginData: LoginDataType) {
		return instance.post<ResponseUserType>("auth/login", loginData)
			.then(res => res.data)
	},
	logout() {
		return instance.delete('auth/me')
			.then(res => res)
	},
	sendEmail(email: string) {
		return instance.post('auth/forgot', {
			email: email,
			from: 'test-front-admin <ai73a@yandex.by>',
			message: '<div style=\'background-color: lime; padding: 15px\'>' +
				' password recovery link:' +
				' <a href=\'https://daria0109.github.io/Cards_ReactTS/#/set/$token$\'> link</a></div>'
		}).then(res => res)
	},
	setPassword(password: string, token: string) {
		return instance.post('auth/set-new-password', {
			password,
			resetPasswordToken: token
		}).then(res => res)
	}
}




// created: "2021-02-07T19:05:49.207Z"
// email: "sergdiag19@gmail.com"
// isAdmin: false
// name: "sergdiag19@gmail.com"
// publicCardPacksCount: 0
// rememberMe: false
// token: "44e9b950-6af2-11eb-a3aa-43f1dde77f4b"
// tokenDeathTime: 1612898233573
// updated: "2021-02-09T16:17:13.574Z"
// verified: false
// __v: 0
// _id: "60203a0d5c268c2adcce842a"