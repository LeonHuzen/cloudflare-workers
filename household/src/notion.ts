let notionHeaders = new Headers({
	'Content-Type': 'application/json',
	'Notion-Version': '2022-06-28',
})

export function initNotionHeaders(notionApiKey: string) {
	notionHeaders.delete('Authorization')
	notionHeaders.append('Authorization', `Bearer ${notionApiKey}`)
}

export function notionRequestOptions(method: 'POST' | 'PATCH', body: any) {
	return {
		method,
		body,
		headers: notionHeaders,
		redirect: 'follow',
	}
}
