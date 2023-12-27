import { NextPage } from 'next'

import ActorEdit from '@/components/screens/Admin/Actor/ActorEdit'

interface IActorProps {
	params: { id: string }
}

const ActorEditPage: NextPage<IActorProps> = ({ params }) => {
	return <ActorEdit actorId={params.id} />
}

export default ActorEditPage
