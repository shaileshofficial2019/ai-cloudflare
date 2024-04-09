"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Copy, WrapText } from "lucide-react";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";

import { formSchema } from "./constants";
import { Textarea } from "@/components/ui/textarea";

const SummaryPage = () => {
	const router = useRouter();
	const [summary, setSummary] = useState<string>();
	function copyClick() {
		window.navigator.clipboard.writeText(summary as string);
		toast.success("Summarization Copied to Clipboard");
	}
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setSummary(undefined);

			const response = await axios.post("/api/summarize", values);

			setSummary(response.data);
			form.reset();
		} catch (error: any) {
			if (error?.response?.status === 403) {
				return
			} else {
				toast.error("Something went wrong.");
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="Text Summarization"
				description="Summarize your text prompt."
				icon={WrapText}
				iconColor="text-orange-700"
				bgColor="bg-orange-700/10"
			/>
			<div className="px-4 lg:px-8">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="
              rounded-lg 
              border 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
              items-center
            "
					>
						<FormField
							name="prompt"
							render={({ field }) => (
								<FormItem className="col-span-12 lg:col-span-10">
									<FormControl className="m-0 p-0">
										<Textarea
											className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
											disabled={isLoading}
											placeholder="Summarize a long text with Cloudflare's Open AI models"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							className="col-span-12 lg:col-span-2 w-full"
							type="submit"
							disabled={isLoading}
							size="icon"
						>
							Generate
						</Button>
					</form>
				</Form>
				{isLoading && (
					<div className="p-20">
						<Loader />
					</div>
				)}
				{!summary && !isLoading && <Empty label="No text summarization	 generated." />}
				{summary && (
					<div className="p-8 mt-3 w-full flex gap-x-8 rounded-lg bg-white border border-black/10 justify-between items-center">
						<p className="text-sm">{summary}</p>
						<Button variant="ghost" onClick={copyClick}>
							<Copy className="h-5 w-5" />
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default SummaryPage;
