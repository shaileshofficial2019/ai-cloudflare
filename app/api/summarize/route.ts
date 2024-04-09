import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { prompt } = body;

		if (!prompt) {
			return new NextResponse("Prompt is required", { status: 400 });
		}

		const data = {
			input_text: prompt,
			max_length: 1024,
		};
		const response = await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/facebook/bart-large-cnn`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.CLOUDFLARE_AUTH_TOKEN}`,
				},
				body: JSON.stringify(data),
			}
		).then((res) => res.json());

		return NextResponse.json(response.result.summary);
	} catch (error) {
		console.log("[SUMMARIZATION_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
