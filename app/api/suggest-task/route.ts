import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const data = await req.json();

		const ai = new GoogleGenAI({
			apiKey: process.env.GEMINI_API_KEY, // Ensure API_KEY is set
		});
		const prompt = `${data.title}\n${data.description}`;

		const response = await ai.models.generateContent({
			model: "gemini-2.0-flash",
			contents: prompt, // Use prompt as a string
			config: {
				systemInstruction: `You are a task analyzer and experience coach who helps people simplify complex tasks. Break down the given task into 4 to 5 easy and effective steps.

														Return the output in a <div> tag using Tailwind CSS.

														Highlight each step number at the top of the step (e.g., Step 1).

														Only include step titles, no explanations.

														Follow a consistent visual format (like a demo structure).

														Do not include keynotes, summaries, or any extra suggestions—just the steps.
				

													<div class=" mx-auto p-6 shadow-lg rounded-2xl space-y-4 text-base leading-relaxed">
													<div class="text-2xl font-bold text-center ">Get Married</div>

													<div><span class="font-semibold text-green-500">Step 1:</span> Clearly define what kind of partner you’re seeking.</div>
													<div><span class="font-semibold text-green-500">Step 2:</span> Let your family and trusted circle know you're ready to marry.</div>
													<div><span class="font-semibold text-green-500">Step 3:</span> Actively search on reliable platforms and arrange intentional conversations.</div>
													<div><span class="font-semibold text-green-500">Step 4:</span> Involve guardians quickly and finalize a short engagement plan.</div>
													<div><span class="font-semibold text-green-500">Step 5:</span> Keep the nikah simple and proceed without unnecessary delays.</div>
													</div>
													`,
			},
		});

		console.log("Gemini API raw response:", response);
		const output =
			response.candidates?.[0]?.content?.parts?.[0]?.text || "No output";
		return NextResponse.json({ output });
	} catch (error: any) {
		console.error("Suggest-task API error:", error);
		if (error?.response) {
			console.error(
				"Gemini API error response:",
				await error.response.text?.()
			);
		}
		return NextResponse.json(
			{ error: error?.message || "Internal Server Error" },
			{ status: 500 }
		);
	}
}
