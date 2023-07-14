# Custom Cloudflare Workers

## For Notion Task Scheduler

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-f38020?logo=cloudflare)](https://workers.cloudflare.com/)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/LeonHuzen/cloudflare-workers/cloudflare-worker)](https://github.com/LeonHuzen/cloudflare-workers/actions)
[![License](https://img.shields.io/github/license/LeonHuzen/cloudflare-workers)](LICENSE)

🌐 **[Cloudflare Workers](https://workers.cloudflare.com/)** integration with **[Notion](https://www.notion.so/)** for scheduling household tasks.

### Overview

This project utilizes Cloudflare Workers to control Notion tasks and schedule household tasks. It provides a convenient way to automate and manage your household chores using the power of Cloudflare's serverless platform and Notion's collaborative workspace.

### Prerequisites

Before deploying this project, make sure you have the following:

- Cloudflare API Token: Obtain an API Token from your Cloudflare account to authenticate API requests.

- Notion API Key: Generate an API Key from your Notion workspace to access and manipulate tasks.

- Notion Container: Configure a Notion container that contains the tasks you want to schedule. Each task should have specific properties to define its schedule and other relevant details.

### Deployment

1. Clone this repository:

   ```bash
   git clone https://github.com/LeonHuzen/cloudflare-workers.git
   cd cloudflare-workers
   cd household
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

3. Configure your environment variables:
   Edit the `wrangler.toml` file in the household directory:

    ```toml
    CLOUDFLARE_API_TOKEN=your-cloudflare-api-token
    NOTION_API_KEY=your-notion-api-key
    ```

4. Deploy the Cloudflare Worker:

   ```bash
   npm run deploy
   ```

### Usage

Once deployed and running, the Cloudflare Worker will automatically control your Notion tasks based on the defined schedule. Update the Notion Container with the relevant tasks and their properties, and the worker will take care of managing and executing them according to the specified schedule.

Feel free to customize the worker's behavior and add any additional functionality to meet your specific needs.

### License

This project is licensed under the [MIT License](LICENSE).
Feel free to modify the content and customize it further according to your project's requirements.
