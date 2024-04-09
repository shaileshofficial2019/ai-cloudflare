"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { formSchema } from "./constants";

const ImagePage = () => {
	function FileDownload(src: any) {
		const atag = document.createElement("a");
		atag.href = src;
		atag.download = "image.png";
		document.body.appendChild(atag);
		atag.click();
		document.body.removeChild(atag);
	}

	// const proModal = useProModal();
	const router = useRouter();
	const [photos, setPhotos] = useState<string[]>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setPhotos([]);

			const response = await axios.post("/api/image", values);

			const urls = response.data;
			const dataURL = `data:image/png;base64,${urls}`;
			setPhotos([dataURL]);
			console.log(photos);
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
				title="Image Generation"
				description="Turn your prompt into an image with cloudflare's open models."
				icon={ImageIcon}
				iconColor="text-pink-700"
				bgColor="bg-pink-700/10"
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
								<FormItem className="col-span-12 lg:col-span-10">
									<FormControl className="m-0 p-0">
										<Input
											className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
											disabled={isLoading}
											placeholder="A picture of beautiful sunset"
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
				{photos.length === 0 && !isLoading && (
					<Empty label="No images generated." />
				)}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
					{photos.map((src) => (
						<Card key={src} className="rounded-lg overflow-hidden">
							<div className="relative aspect-square">
								<Image fill alt="Generated" src={src} />
							</div>
							<CardFooter className="p-2">
								<Button
									onClick={() => FileDownload(src)}
									variant="secondary"
									className="w-full"
								>
									<Download className="h-4 w-4 mr-2" />
									Download
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default ImagePage;
