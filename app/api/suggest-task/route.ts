import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const data = await req.json();

		if (!data.title || !data.description) {
			return NextResponse.json(
				{ error: "title and description are required." },
				{ status: 400 }
			);
		}

		const ai = new GoogleGenAI({
			apiKey: process.env.GEMINI_API_KEY,
		});
		const prompt = `${data.title}\n${data.description}`;

		const response = await ai.models.generateContent({
			model: "gemini-2.0-flash",
			contents: prompt,
			config: {
				systemInstruction: `You are a task analyzer and experience coach who helps people simplify complex tasks.
														User give you the title and description for a specific tasks.
														Break down the given task into 4 to 5 easy and effective steps.
														Return the output in a <div> tag using Tailwind CSS.
														Highlight each step number at the top of the step (e.g., Step 1).
														Only include step titles, no explanations.
														Follow a consistent visual format (like a demo structure).
														Do not include keynotes, summaries, or any extra suggestions—just the steps.
														If you didn't understand the title and description of the task only than return a message in p tag.

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

		const output =
			response.candidates?.[0]?.content?.parts?.[0]?.text || "No output";

		if (!output) {
			return NextResponse.json(
				{ error: "Something went wrong. Please try again." },
				{ status: 502 }
			);
		}

		return NextResponse.json({ output });
	} catch (error) {
		let message = "Internal Server Error";
		if (error instanceof Error) {
			message = error.message;
		} else {
			message = "Invalid input or network issue.";
		}

		return NextResponse.json({ error: message }, { status: 500 });
	}
}
