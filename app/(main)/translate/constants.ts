import * as z from "zod";

export const formSchema = z.object({
	prompt: z.string().min(1, {
		message: "Translation prompt is required",
	}),
	source_lang: z.string().min(1, {
		message: "Please Select Source Language",
	}),
	target_lang: z.string().min(1, {
		message: "Please Select Target Language",
	}),
});

export const sourceOption = [
	{
		value: "en",
		label: "English",
	},
	{
		value: "hi",
		label: "Hindi",
	},
	{
		value: "gu",
		label: "Gujarati",
	},
	{
		value: "pa",
		label: "Panjabi",
	},
	{
		value: "mr",
		label: "Marathi",
	},
	{
		value: "ml",
		label: "Malayalam",
	},
	{
		value: "ta",
		label: "Tamil",
	},
	{
		value: "or",
		label: "Oriya",
	},
	{
		value: "ne",
		label: "Nepali",
	},
	{
		value: "fr",
		label: "French",
	},
];
