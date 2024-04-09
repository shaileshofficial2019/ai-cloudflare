import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { prompt } = body;

		if (!prompt) {
			return new NextResponse("Prompt is required", { status: 400 });
		}
		const response = await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/lykon/dreamshaper-8-lcm`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.CLOUDFLARE_AUTH_TOKEN}`,
				},
				body: JSON.stringify({ prompt }),
			}
		).then((res) => res.arrayBuffer());

		const data = Buffer.from(response).toString("base64");
		return NextResponse.json(data);
	} catch (error) {
		console.log("[IMAGE_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
