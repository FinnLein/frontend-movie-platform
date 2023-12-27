import Link from 'next/link'

import Heading from '@/components/ui/heading/Heading'

export default function NotFound() {
	return (
		<>
			<section className="flex-col text-white p-3">
				<Heading title="Not Found" className="text-xl pb-5" />
				<div>Could not find requested resource</div>
				<div>
					<Link href="/" className="text-primary">
						return home
					</Link>
				</div>
			</section>
		</>
	)
}
