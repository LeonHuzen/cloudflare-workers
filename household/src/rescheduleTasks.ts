import { notionRequestOptions } from './notion'

interface Task {
	id: any
	properties: { Done: { checkbox: boolean }; Tags: any }
}
export async function rescheduleTasks(finishedTasks: Task[], kv: KVNamespace) {
	let promises: Promise<any[]>[] = []
	finishedTasks.forEach((task) => {
		promises.push(rescheduleTask(task, kv))
	})
	return await Promise.allSettled(promises)
}

async function rescheduleTask({ id, properties: { Tags } }: Task, kv: KVNamespace): Promise<any[]> {
	return setNextTodoDate(id, dateToReschedule(Tags.multi_select.map((item: { name: string }) => item.name)))
}
function dateToReschedule(periods: string[]): Date {
	const periodMap: Record<string, number> = {
		weekly: 1,
		biweekly: 2,
		triweekly: 3,
		monthly: 4,
		bimonthly: 8,
		quarterly: 12,
		biquarterly: 24,
		yearly: 52,
	}

	const addPeriod: number =
		periods.reduce((accumulator, period) => {
			return accumulator + (periodMap[period] || 0)
		}, 0) * 604800000

	return new Date(Date.now() + addPeriod)
}

async function setNextTodoDate(taskId: string, newReminder: Date, kv: KVNamespace) {
	let res: any[] = []

	await fetch(
		`https://api.notion.com/v1/pages/${taskId}`,
		notionRequestOptions(
			'PATCH',
			JSON.stringify({
				properties: {
					Done: {
						checkbox: false,
					},
					Date: {
						date: {
							start: newReminder.toISOString(),
							end: null,
							time_zone: null,
						},
					},
				},
			})
		)
	)
		.then((response) => response.text())
		.then((data) => JSON.parse(data))
		.then((result) => {
			kv.put(result.properties.Name.title[0].plain_text, newReminder.toISOString())
			return result
		})
		.then((result) => console.log(`updated task ${result.properties.Name.title[0].plain_text} to ${newReminder.toISOString()}`))
		.then(() => (res = res.concat(taskId)))
		.catch((error) => console.log('error', error))

	return res
}
