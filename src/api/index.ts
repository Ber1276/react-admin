import requests from "../utils/requests"
import { ILoginData } from "../types"


export default {
    login(data: ILoginData) {
        return requests.post('/users/login', data)
    },
    getUserInfo() {
        return requests.get('/users/getUserInfo');
    },
}