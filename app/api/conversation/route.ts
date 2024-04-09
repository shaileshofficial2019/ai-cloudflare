import { NextResponse } from "next/server";
export const runtime = 'edge';

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { messages } = body;
		if (!messages) {
			return new NextResponse("Messages are required", { status: 400 });
		}

		const updatedmessages = [
			{
				role: "system",
				content:
					"You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
			},
			messages,
		];

		const response = await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@hf/mistral/mistral-7b-instruct-v0.2`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.CLOUDFLARE_AUTH_TOKEN}`,
				},
				body: JSON.stringify({ messages: updatedmessages }),
			}
		);
		const data = await response.json();
		return NextResponse.json(data.result.response);
	} catch (error) {
		console.log("[CODE_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
