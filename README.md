# AI App for Chat, Code Copilot, Translation, Image Generation
![ai-app-banner](/public/banner.png)
## Details of AI Models used

| Type             | Model Name |
|------------------|------------|
| Conversation     | [@cf/meta/llama-2-7b-chat-fp16](https://developers.cloudflare.com/workers-ai/models/llama-2-7b-chat-fp16)     |
| Image generation | [@cf/lykon/dreamshaper-8-lcm](https://developers.cloudflare.com/workers-ai/models/dreamshaper-8-lcm)        |
| Summarization    | [@cf/facebook/bart-large-cnn](https://developers.cloudflare.com/workers-ai/models/bart-large-cnn)      |
| Translation      | [@cf/meta/m2m100-1.2b](https://developers.cloudflare.com/workers-ai/models/m2m100-1.2b)           |
| Code             | [@hf/mistral/mistral-7b-instruct-v0.2](https://developers.cloudflare.com/workers-ai/models/mistral-7b-instruct-v0.2)     |

## Environmental Variables

```env
CLOUDFLARE_AUTH_TOKEN=""

CLOUDFLARE_ACCOUNT_ID=""
```

open [https://dash.cloudflare.com](https://dash.cloudflare.com) and grab your cridentials.

## Run Development Server

```bash
npm run dev
```

## Deploy on Cloudflare Pages

The easiest way to deploy your Next.js app is to use the [Cloudflare Pages](https://developers.cloudflare.com/pages/)

