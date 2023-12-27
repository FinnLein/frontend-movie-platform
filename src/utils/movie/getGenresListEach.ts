export const getGenresListEach = (
	index: number,
	length: number,
	name: string
) => (index + 1 === length ? name : name + ', ')

interface IArray {
	name: string
}

export const getGenresList = (array: IArray[]) => array.map((i) => i.name).join(', ')
