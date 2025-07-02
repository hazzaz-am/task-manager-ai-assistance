"use client";
import { Button } from "@/components/ui/button";

// Error boundaries must be Client Components

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-5">
			<h2>Something went wrong!</h2>
			<p className="text-red-500 bg-red-500/10 p-5 rounded-md">
				{error.message}
			</p>
			<Button variant="destructive" onClick={() => reset()}>
				Try again
			</Button>
		</div>
	);
}
