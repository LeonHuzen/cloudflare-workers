import { notionRequestOptions } from './notion'

export async function getAllFinishedTasks(): Promise<any[]> {
	let res: any[] = []
	await fetch(
		'https://api.notion.com/v1/databases/4fb9499e5cf948da98c70657fec3431c/query',
		notionRequestOptions(
			'POST',
			JSON.stringify({
				filter: {
					property: 'Done',
					checkbox: {
						equals: true,
					},
				},
			})
		)
	)
		.then((response) => response.text())
		.then((data) => JSON.parse(data))
		.then((result) => {
			res = result.results
			console.log(`Retrieved ${res.length} task${res.length > 1 ? 's' : ''}`)
		})
		.catch((error) => console.log('error', error))

	return res
}
