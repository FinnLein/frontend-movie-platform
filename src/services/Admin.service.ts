import { getUsersUrl } from "@/configs/api.config"
import { instance } from "api/interceptots"

export const AdminService = {
    async getCountUsers(){
        return instance.get<number>(getUsersUrl('/count'))
    }
}