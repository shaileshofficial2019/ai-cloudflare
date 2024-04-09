import { NextResponse } from "next/server";
export const runtime = 'edge';
export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { messages } = body;
		if (!messages) {
			return new NextResponse("Messages are required", { status: 400 });
		}
		const data = {
			messages: [
				{
					role: "system",
					content:
						"you are Conversation bot who reply in plain text formate and user friendly replies.",
				},
				messages,
			],
		};
		const response = await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-2-7b-chat-fp16`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.CLOUDFLARE_AUTH_TOKEN}`,
				},
				body: JSON.stringify(data),
			}
		);
		const res = await response.json();
		return NextResponse.json(res.result.response);
	} catch (error) {
		console.log("[CONVERSATION_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
