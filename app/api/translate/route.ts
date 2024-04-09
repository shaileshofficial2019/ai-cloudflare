import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { prompt, source_lang, target_lang } = body;

		if (!prompt) {
			return new NextResponse("Prompt is required", { status: 400 });
		}
		if (!source_lang) {
			return new NextResponse("Source Language is required", { status: 400 });
		}
		if (!target_lang) {
			return new NextResponse("Target Language is required", { status: 400 });
		}
		const data = {
			text: prompt,
			source_lang,
			target_lang,
		};
		const response = await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/m2m100-1.2b`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.CLOUDFLARE_AUTH_TOKEN}`,
				},
				body: JSON.stringify(data),
			}
		);
		const resp = await response.json();

		return NextResponse.json(resp);
	} catch (error) {
		console.log("[TRANSLATION_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
