"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import toastMessage from "@/utils/toast-message";

import { Loader2Icon, StarsIcon } from "lucide-react";
import { useState } from "react";

type ResultProps = {
	title: string;
	description: string;
};

export function ResultPopup({ title, description }: ResultProps) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<string | null>(null);
	const cleanHtml = (str: string) => {
		return str.replace(/```html|```/g, "").trim();
	};

	const generateText = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/suggest-task", {
				method: "POST",
				headers: {
					"Content-type": "Application/json",
				},
				body: JSON.stringify({
					title,
					description,
				}),
			});
			if (response.status === 200) {
				const data = await response.json();
				setResult(cleanHtml(data.output));
			}

			if (response.status === 404) {
				toastMessage("Not Found");
				return;
			}
			setOpen(true);
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "Failed to fetch") {
					toastMessage("Network error. Please check your connection.");
				}
			} else {
				toastMessage("Something Went Wrong");
			}
		} finally {
			setLoading(false);
		}
	};

	const handleOpenChange = () => {
		setResult(null);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant="outline" onClick={generateText} className="mt-5">
					Suggest Subtasks
					{loading ? <Loader2Icon className="animate-spin" /> : <StarsIcon />}
				</Button>
			</DialogTrigger>
			{result && (
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle className="text-center">Subtasks</DialogTitle>
					</DialogHeader>
					<div dangerouslySetInnerHTML={{ __html: result }} />
				</DialogContent>
			)}
		</Dialog>
	);
}
