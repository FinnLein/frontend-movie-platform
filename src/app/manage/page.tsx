import Admin from '@/components/screens/Admin/Admin'
import { MovieService } from '@/services/movie/Movie.service'

export const revalidate = 60




const AdminPanel = async () => {
	return <Admin />
}


export default AdminPanel
