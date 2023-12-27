
import { FC } from 'react'

import SearchField from '@/components/ui/searchField/SearchField'

import Styles from './Search.module.scss'
import SearchList from './searchList/SearchList'
import { useSearch } from './useSearch'

const Search: FC = () => {
	const { isSuccess, data, handleSearch, searchTerm } = useSearch()

	return (
		<div className={Styles.wrapper}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch}/>
			{isSuccess && <SearchList movies={data || []} />} 
            
		</div>
	)
}

export default Search
