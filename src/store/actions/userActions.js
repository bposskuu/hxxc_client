import axios from 'axios'
import {API_URL} from "../../../config";

export default {
    async registration (name, email, password) {
        try {
            const response = await axios.post(API_URL + '/api/auth/registration', {
                name,
                email,
                password
            })

            alert(response.data.message)
        } catch (e) {
            if (e.response.data.errors) alert(e.response.data.errors.errors[0].msg)
            else alert(e.response.data.message)
            console.log(e)
        }
    },

    async login (email, password, callback)  {
        try {
            const response = await axios.post(API_URL + '/api/auth/login', {
                email,
                password
            })


            callback(response.data.user)
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
            console.log(e)
        }
    },

    async auth (callback) {
        try {
            const token = localStorage.getItem('token')
            if (token === 'undefined' || token === null) return
            const response = await axios.get(API_URL + '/api/auth/auth',
                {headers: {Authorization: 'Bearer ' + token}})

            callback(response.data.user)
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
            console.log(e)
            localStorage.removeItem('token')
        }
    }
}