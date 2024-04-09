"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Copy, Languages } from "lucide-react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";

import { formSchema, sourceOption } from "./constants";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const TranslationPage = () => {
	const router = useRouter();
	const [translate, setTranslate] = useState<string>();
	function copyClick() {
		window.navigator.clipboard.writeText(translate as string);
		toast.success("Translation Copied to Clipboard");
	}
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
			source_lang: "en",
			target_lang: "hi",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setTranslate(undefined);
			const response = await axios.post("/api/translate", values);
			setTranslate(response.data.result.translated_text);
			form.reset();
		} catch (error: any) {
			if (error?.response?.status === 403) {
				return;
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
				title="Translation Generation"
				description="Translate your prompt into any Language."
				icon={Languages}
				iconColor="text-emerald-500"
				bgColor="bg-emerald-500/10"
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
            "
					>
						<FormField
							name="prompt"
							render={({ field }) => (
								<FormItem className="col-span-12 lg:col-span-6">
									<FormControl className="m-0 p-0">
										<Input
											className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
											disabled={isLoading}
											placeholder="Namaste India"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="source_lang"
							render={({ field }) => (
								<FormItem className="col-span-12 lg:col-span-2">
									<Select
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue defaultValue={field.value} />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{sourceOption.map((option,i) => (
												<SelectItem key={i} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="target_lang"
							render={({ field }) => (
								<FormItem className="col-span-12 lg:col-span-2">
									<Select
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue defaultValue={field.value} />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{sourceOption.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
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
				{!translate && !isLoading && <Empty label="No music generated." />}
				{translate && (
					<div className="p-8 mt-3 w-full flex gap-x-8 rounded-lg bg-white border border-black/10 justify-between items-center">
						<p className="text-sm">{translate}</p>
						<Button variant="ghost" onClick={copyClick}>
							<Copy className="h-5 w-5" />
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default TranslationPage;
