import UserEdit from '@/components/screens/Admin/User/UserEdit'
import { NextPage } from 'next'

interface IUsersEdit {
	params: { id: string }
}

const UsersPageEdit: NextPage<IUsersEdit> = ({ params }) => {
	return <UserEdit userId={params.id}/>
}

export default UsersPageEdit
