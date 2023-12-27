import { getUsersUrl } from "@/configs/api.config"
import axios from "api/interceptots"

export const AdminService = {
    async getCountUsers(){
        return axios.get<number>(getUsersUrl('/count'))
    }
}