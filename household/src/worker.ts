/**
 * Welcome to Cloudflare Workers!
 *
 * This is a template for a Scheduled Worker: a Worker that can run on a
 * configurable interval:
 * https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { getAllFinishedTasks } from './getAllFinishedTasks'
import { initNotionHeaders } from './notion'
import { rescheduleTasks } from './rescheduleTasks'

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
	//
	// Example binding to a D1 Database. Learn more at https://developers.cloudflare.com/workers/platform/bindings/#d1-database-bindings
	// DB: D1Database

	NOTION_API_KEY: string
	HOUSEHOLD_KV: KVNamespace
}

export default {
	// The scheduled handler is invoked at the interval set in our wrangler.toml's
	// [[triggers]] configuration.
	async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
		initNotionHeaders(env.NOTION_API_KEY)
		const finishedTasks = await getAllFinishedTasks()
		const rescheduled = await rescheduleTasks(finishedTasks, env.HOUSEHOLD_KV)

		console.log(rescheduled)
	},
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return new Response(
			'This worker is intended to be used as a Scheduled Worker! For more info visit https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/',
			{
				headers: { 'content-type': 'text/plain' },
			}
		)
	},
}
